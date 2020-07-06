import raf from "raf"
import Prando from "prando";
import SimplexNoise from "simplex-noise"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import perfNow from "performance-now"
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    CubeCamera,
    DirectionalLight,
    DoubleSide,
    Float32BufferAttribute,
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Object3D,
    PerspectiveCamera,
    PlaneBufferGeometry,
    RepeatWrapping,
    Scene,
    sRGBEncoding,
    Vector3,
    WebGLRenderer
} from "three"

import OrganicQuads, {
    g_size,
    g_x,
    g_y,
    t_isEdge,
    t_n0,
    t_n1,
    t_n2,
    t_n3,
    t_size,
    t_tile0,
    t_tile1,
    t_tile2,
    t_tile3
} from "@fforw/organic-quads";
import loadScene from "./util/loadScene";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries";
import loadTexture from "./util/loadTexture";
import { heightLimit } from "./heightLimit";
import { CASE_NAMES, FOREST, GRASS, MATERIAL_NAMES, SAND, STONE, UNDEFINED, WATER } from "./constants";

import prepareTiles from "./editor/prepareTiles";
import { tileName } from "./util/inputToWFC";

import { dump } from "./util/dump";
import waveFunctionCollapse from "./util/waveFunctionCollapse";
import { components } from "./util/color";


const SKY_EFFECT = true;
const WATER_EFFECT = false;
const HEIGHT_MAP = false;

const DETAIL = 15;
const MAX_HEIGHT = 250;
const QUARTER_HEIGHT = MAX_HEIGHT / 4;
const NOISE_SCALE_1 = 0.003;
const NOISE_SCALE_2 = 0.07;
const NOISE_SCALE_3 = 0.0007;
const GROUND_NOISE_SCALE = 0.005;
const NOISE_RATIO = 0.99;
const CLIFF_THRESHOLD = 7;

// size of the outer square around our big hexagon
const SIZE = 1500;

//////////////////////////////////////////////////////////////////////

const NUM_MATERIALS = 7;

const WATER_LIMIT = 2;
const SAND_LIMIT = 6.5;
const FOREST_LIMIT = 60;

let container, stats;
let camera, scene, renderer, light;
let controls, water;

export const td_cx = 0;
export const td_cy = 1;
export const td_walkable = 2;
export const td_cut0 = 3;
export const td_cut1 = 4;
export const td_cut2 = 5;
export const td_cut3 = 6;
export const td_tileId = 7;
export const td_entropy = 8;
export const td_collapsed = 9;
export const td_ground = 10;
export const td_bitmask = 11;
export const td_size = 12;

let tileData;
let heightMap;
let materials;

function updateCentroids()
{
    const {graph, tiles} = organicQuads;
    const {length} = tiles;

    let tileDataPos = 0;
    for (let i = 0; i < length; i += t_size)
    {
        const n0 = tiles[i + t_n0];
        const n1 = tiles[i + t_n1];
        const n2 = tiles[i + t_n2];
        const n3 = tiles[i + t_n3];

        tileData[tileDataPos + td_cx] = (graph[n0 + g_x] + graph[n1 + g_x] + graph[n2 + g_x] + graph[n3 + g_x]) / 4;
        tileData[tileDataPos + td_cy] = (graph[n0 + g_y] + graph[n1 + g_y] + graph[n2 + g_y] + graph[n3 + g_y]) / 4;
        tileData[tileDataPos + td_walkable] = 0;
        tileData[tileDataPos + td_cut0] = -1;
        tileData[tileDataPos + td_cut1] = -1;
        tileData[tileDataPos + td_cut2] = -1;
        tileData[tileDataPos + td_cut3] = -1;

        tileDataPos += td_size;
    }

}


let organicQuads, envMap;

const nOffset = Math.random() * 10;
const mOffset = Math.random() * 10;

function heightFn(x0, z0)
{
    const distance = Math.sqrt(x0 * x0 + z0 * z0);

    const w = 0; //noise.noise2D(x0 * NOISE_SCALE_3, mOffset + z0 * NOISE_SCALE_3) < 0.1 ? 0 : 0.6

    const limit = heightLimit(1 - distance / (SIZE / 2), w);

    return Math.max(0, (QUARTER_HEIGHT + (noise.noise2D(nOffset + x0 * NOISE_SCALE_1, z0 * NOISE_SCALE_1) * NOISE_RATIO + noise.noise2D(z0 * NOISE_SCALE_2, x0 * NOISE_SCALE_2 ) * (1 - NOISE_RATIO) + w) * QUARTER_HEIGHT) * limit);
}


const tmpHeight = new Float64Array(5);


function cutCliffs()
{

    const {graph, tiles} = organicQuads;

    const {length} = tiles;

    const tileDataFactor = td_size / t_size;

    const tileCuts = [];

    const cutNodes = new Set();


    for (let i = 0; i < length; i += t_size)
    {
        // find indizes for connected centroid (values might be -1 if on the edge
        const tileDataIndex = i * tileDataFactor;
        const tileDataIndex0 = tiles[i + t_tile0] * tileDataFactor;
        const tileDataIndex1 = tiles[i + t_tile1] * tileDataFactor;
        const tileDataIndex2 = tiles[i + t_tile2] * tileDataFactor;
        const tileDataIndex3 = tiles[i + t_tile3] * tileDataFactor;

        tmpHeight[0] = heightFn(tileData[tileDataIndex], tileData[tileDataIndex + 1])

        tmpHeight[1] =
            tileDataIndex0 >= 0 ? heightFn(tileData[tileDataIndex0 + td_cx], tileData[tileDataIndex0 + td_cy]) : -1;
        tmpHeight[2] =
            tileDataIndex1 >= 0 ? heightFn(tileData[tileDataIndex1 + td_cx], tileData[tileDataIndex1 + td_cy]) : -1;
        tmpHeight[3] =
            tileDataIndex2 >= 0 ? heightFn(tileData[tileDataIndex2 + td_cx], tileData[tileDataIndex2 + td_cy]) : -1;
        tmpHeight[4] =
            tileDataIndex3 >= 0 ? heightFn(tileData[tileDataIndex3 + td_cx], tileData[tileDataIndex3 + td_cy]) : -1;

        //console.log("HEIGHTS", tmpHeight.slice())

        let cutMask = 0;

        if (tileDataIndex0 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[1]) > CLIFF_THRESHOLD)
        {
            cutMask |= 1;
        }

        if (tileDataIndex1 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[2]) > CLIFF_THRESHOLD)
        {
            cutMask |= 2;
        }
        if (tileDataIndex2 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[3]) > CLIFF_THRESHOLD)
        {
            cutMask |= 4;
        }
        if (tileDataIndex3 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[4]) > CLIFF_THRESHOLD)
        {
            cutMask |= 8;
        }

        if (cutMask !== 0)
        {
            for (let j = 0; j < 4; j++)
            {
                if (cutMask & (1 << j))
                {
                    const cut0 = j;
                    const cut1 = j === 3 ? 0 : j + 1;

                    const heightMapIndex0 = tiles[i + t_n0 + cut0] * heightIndexFactor;
                    const heightMapIndex1 = tiles[i + t_n0 + cut1] * heightIndexFactor;

                    const height = tmpHeight[0];

                    const node0 = tiles[i + t_n0 + cut0];
                    const node1 = tiles[i + t_n0 + cut1];

                    cutNodes.add(node0)
                    cutNodes.add(node1)

                    tileData[tileDataIndex + td_cut0 + cut0] = height;
                    tileData[tileDataIndex + td_cut0 + cut1] = height;

                    //console.log("cut", tileDataIndex + td_cut0 + cut0, tileDataIndex + td_cut0 + cut1)

                    const rnd = Math.random();
                    if (rnd < 0.2)
                    {
                        heightMap[heightMapIndex0 + h_ground] = STONE;
                    }
                    else if (rnd < 0.4)
                    {
                        heightMap[heightMapIndex1 + h_ground] = STONE;
                    }


                    const other = tiles[i + t_tile0 + j];
                    // mark our connection to the other tile as cut
                    tiles[i + t_tile0 + j] = -1;

                    let usInOther = -1;
                    for (let k = 0; k < 4; k++)
                    {
                        if (
                            tiles[other + t_tile0 + k] === i &&
                            tileData[other * tileDataFactor + td_cut0 + k] === -1)
                        {
                            usInOther = i;
                            break;
                        }
                    }
                    if (usInOther !== -1)
                    {
                        tileCuts.push(0, i, other, cut0, cut1);
                    }
                }
            }


            for (let j = 0; j < 4; j++)
            {
                if (!(cutMask & (1 << j)))
                {
                    const prev = j === 0 ? 3 : j - 1;
                    const next = j === 3 ? 0 : j + 1;

                    const prevIsCut = cutMask & (1 << prev);
                    const nextIsCut = cutMask & (1 << next);

                    const other = tiles[i + t_tile0 + j];

                    if (prevIsCut || nextIsCut)
                    {
                        if (prevIsCut && nextIsCut)
                        {
                            // full cut
                            tileCuts.push(0, i, other, j, next);
                        }
                        else if (prevIsCut)
                        {
                            // triangle with two points on prev
                            tileCuts.push(2, i, other, j, next);
                        }
                        else
                        {
                            // triangle with two points on next
                            tileCuts.push(1, i, other, j, next);
                        }
                    }
                }
            }
        }
    }

    const cutTiles = new Set();

    for (let cut of cutNodes)
    {

        for (let i = 0; i < length; i += t_size)
        {
            for (let j = 0; j < 4 ; j++)
            {
                const node = tiles[i + t_n0 + j];
                if (node === cut)
                {
                    const tileDataIndex = i * tileDataFactor;

                    cutTiles.add(i);

                    if (tileData[tileDataIndex + td_cut0 + j] === -1)
                    {
                        tileData[tileDataIndex + td_cut0 + j] = heightFn(tileData[tileDataIndex + td_cx], tileData[tileDataIndex + td_cy])
                    }
                }
            }
        }
    }

    console.log("Tiles cut:", cutTiles.size, " of ", tileData.length / td_size)


    return { tileCuts, cutTiles };
}

const tc_case = 0;
const tc_tile0 = 1;
const tc_tile1 = 2;
const tc_cut0 = 3;
const tc_cut1 = 4;
const tc_size = 5;

export const h_height = 0;
export const h_ground = 1;
export const h_cuts = 2;
export const h_size = 3;

let tileCuts;

function createScene()
{
    tOrganicQuadsStart = perfNow();

    organicQuads = new OrganicQuads({
        numberOfRings: DETAIL,
        width: SIZE,
        height: SIZE,
        minTension: 10,
        // weightFunction: (x0,y0,x1,y1) => {
        //
        //     const dx = x1 - x0;
        //     const dy = y1 - y0;
        //     const dz = heightFn(x0,y0) - heightFn(x1,y1);
        //
        //     return Math.sqrt(dx * dx + dy * dy + dz * dz);
        //
        // }
    });

    const {graph, tiles, config} = organicQuads;
    const {length} = graph;

    const heightMapFactor = h_size / g_size;

    heightMap = new Float64Array(length * heightMapFactor);
    let pos = 0;
    for (let i = 0; i < length; i += g_size)
    {
        heightMap[pos + h_height] = heightFn(graph[i + g_x], graph[i + g_y]);
        heightMap[pos + h_ground] = UNDEFINED;

        pos += h_size;
    }

    tileData = new Float64Array((organicQuads.tiles.length / t_size) * td_size);
    updateCentroids()
    const cutData = cutCliffs();
    const { cutTiles, tileCuts : _tileCuts } = cutData;

    tileCuts = _tileCuts;

    generateGround();
    testWalkability(cutTiles);

}


function generateGround()
{

    const {graph} = organicQuads;
    const {length} = graph;

    let heightMapPos = 0;
    let nodePos = 0;
    for (let i = 0; i < length; i += g_size)
    {

        const x0 = graph[nodePos + g_x];
        const y0 = heightMap[heightMapPos + h_height];
        //const y0 = heightMap[heightIndex0 + h_height];
        const z0 = graph[nodePos + g_y];

        const ground = heightMap[heightMapPos + h_ground];

        if (ground === UNDEFINED)
        {
            if (y0 < WATER_LIMIT)
            {
                heightMap[heightMapPos + h_ground] = WATER;
            }
            else if (y0 < SAND_LIMIT)
            {
                heightMap[heightMapPos + h_ground] = SAND;
            }
            else
            {
                const n = noise.noise2D(x0 * GROUND_NOISE_SCALE, z0 * GROUND_NOISE_SCALE);

                if (y0 < FOREST_LIMIT)
                {
                    heightMap[heightMapPos + h_ground] = n < 0.2 ? GRASS : FOREST;
                }
                else
                {
                    heightMap[heightMapPos + h_ground] = n < 0.2 ? FOREST : GRASS;
                }
            }
        }

        heightMapPos += h_size;
        nodePos += g_size;
    }

}


function testWalkability(cutTiles)
{
    const tileIndex = findEdgeTile();

    console.log("Starting to walk at #", tileIndex / t_size)

    const visited = new Set();
    walkRecursive(tileIndex, visited, cutTiles);
}


function findEdgeTile()
{
    const {tiles} = organicQuads;

    const {length} = tiles;

    for (let i = 0; i < length; i += t_size)
    {
        if (tiles[i + t_isEdge])
        {
            return i;
        }
    }
    throw new Error("No edge!?")
}


const tileDataFactor = td_size / t_size;


function walkRecursive(tileIndex, visited, cutTiles)
{
    if (tileIndex >= 0 && !visited.has(tileIndex))
    {
        if (cutTiles.has(tileIndex))
        {
            //  console.log(tileIndex, "has been cut, ignoring..");
            return;
        }

        visited.add(tileIndex);

        const { tiles } = organicQuads;

        tileData[tileIndex * tileDataFactor + td_walkable] = 1;

        walkRecursive(tiles[tileIndex + t_tile0], visited, cutTiles);
        walkRecursive(tiles[tileIndex + t_tile1], visited, cutTiles);
        walkRecursive(tiles[tileIndex + t_tile2], visited, cutTiles);
        walkRecursive(tiles[tileIndex + t_tile3], visited, cutTiles);
    }
}


const rng = new Prando("TEST")

const noise = new SimplexNoise(() => rng.next());


function checkNaN(value, msg)
{
    if (isNaN(value))
    {
        debugger;
        throw new Error(msg + ": value is NaN")
    }
}


const UNDEFINED_COLOR = components("#f0f");

function addHeightMap(tileDefinitions)
{
    const geometry = new BufferGeometry();
    geometry.name = "Landscape-Debug"

    const vertices = [];
    const normals = [];
    const colors = [];

    const helperVertices = [];
    const helperNormals = [];

    // generate vertices, normals and color data for a simple grid geometry
    const { graph, tiles } = organicQuads;

    const { length } = tiles;

    console.log("Height map for ", length / t_size, " tiles");

    // const map = {};
    //
    // const insert = (a,b) => {
    //     if (a > b)
    //     {
    //         let h = a;
    //         a=b;
    //         b=h;
    //     }
    //
    //     const key = a + ":" + b;
    //
    //     const v = map[key];
    //     map[key] =  v === undefined ? 1 : v + 1;
    // }

    const getColor = (tileDefinitions, tileId) => {


        for (let i = 0; i < tileDefinitions.length; i++)
        {
            const { id, idCount, colors} = tileDefinitions[i];

            //console.log({id,idCount})

            if (tileId >= id && tileId < id + idCount)
            {
                const result = components(colors[tileId - id]);
                //console.log("Find color for ", tileId, "=>", result)
                return result;
            }
        }

        console.log("No color for ", tileName(tileDefinitions, tileId))

        return UNDEFINED_COLOR;
    };

    let tileDataIndex = 0;
    for (let i = 0; i < length; i += t_size)
    {
        // node indizes for our quad
        const n0 = tiles[i + t_n0];
        const n1 = tiles[i + t_n1];
        const n2 = tiles[i + t_n2];
        const n3 = tiles[i + t_n3];

        // const e0 = tiles[i + t_tile0]
        // const e1 = tiles[i + t_tile1]
        // const e2 = tiles[i + t_tile2]
        // const e3 = tiles[i + t_tile3]
        // e0 >= 0 && insert(i * tileFactor, e0 * tileFactor)
        // e1 >= 0 && insert(i * tileFactor, e1 * tileFactor)
        // e2 >= 0 && insert(i * tileFactor, e2 * tileFactor)
        // e3 >= 0 && insert(i * tileFactor, e3 * tileFactor)

        // equivalent height map indizes
        const heightIndex0 = n0 * heightIndexFactor;
        const heightIndex1 = n1 * heightIndexFactor;
        const heightIndex2 = n2 * heightIndexFactor;
        const heightIndex3 = n3 * heightIndexFactor;

        const x0 = graph[n0 + g_x];
        const y0 = tileData[tileDataIndex + td_cut0] === -1 ?
            heightMap[heightIndex0 + h_height] :
            tileData[tileDataIndex + td_cut0];
        //const y0 = heightMap[heightIndex0 + h_height];
        const z0 = graph[n0 + g_y];

        const x1 = graph[n1 + g_x];
        const y1 = tileData[tileDataIndex + td_cut1] === -1 ?
            heightMap[heightIndex1 + h_height] :
            tileData[tileDataIndex + td_cut1];
        //const y1 = heightMap[heightIndex1 + h_height];
        const z1 = graph[n1 + g_y];

        const x2 = graph[n2 + g_x];
        const y2 = tileData[tileDataIndex + td_cut2] === -1 ?
            heightMap[heightIndex2 + h_height] :
            tileData[tileDataIndex + td_cut2];
        //const y2 = heightMap[heightIndex2 + h_height]
        const z2 = graph[n2 + g_y];

        const x3 = graph[n3 + g_x];
        const y3 = tileData[tileDataIndex + td_cut3] === -1 ?
            heightMap[heightIndex3 + h_height] :
            tileData[tileDataIndex + td_cut3];
        //const y3 = heightMap[heightIndex3 + h_height];
        const z3 = graph[n3 + g_y];

        const ax = (x0 - x1);
        const ay = (y0 - y1);
        const az = (z0 - z1);
        const bx = (x2 - x1);
        const by = (y2 - y1);
        const bz = (z2 - z1);
        const cx = (x3 - x1);
        const cy = (y3 - y1);
        const cz = (z3 - z1);

        // normal vector based on points 0, 1 and 2
        const n0x = ay * bz - az * by;
        const n0y = az * bx - ax * bz;
        const n0z = ax * by - ay * bx;

        // normal vector based on points 0, 1 and 3
        const n1x = ay * cz - az * cy;
        const n1y = az * cx - ax * cz;
        const n1z = ax * cy - ay * cx;

        // average and renormalize
        let nx = (n0x + n1x) / 2;
        let ny = (n0y + n1y) / 2;
        let nz = (n0z + n1z) / 2;

        const f = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx *= f;
        ny *= f;
        nz *= f;

        // const cf = 4 / MAX_HEIGHT;
        //
        // colors.push( y3 * cf,1 - y3 * cf, 0);
        // colors.push( y1 * cf,1 - y1 * cf, 0);
        // colors.push( y1 * cf,1 - y1 * cf, 0);
        // colors.push( y3 * cf,1 - y3 * cf, 0);
        // colors.push( y2 * cf,1 - y2 * cf, 0);

        const ground0 = heightMap[heightIndex0 + h_ground];
        const ground1 = heightMap[heightIndex1 + h_ground];
        const ground2 = heightMap[heightIndex2 + h_ground];
        const ground3 = heightMap[heightIndex3 + h_ground];

        if (
            !(ground0 === WATER &&
              ground1 === WATER &&
              ground2 === WATER &&
              ground3 === WATER)
        )
        {
            vertices.push(x0, y0, z0);
            vertices.push(x3, y3, z3);
            vertices.push(x1, y1, z1);

            vertices.push(x1, y1, z1);
            vertices.push(x3, y3, z3);
            vertices.push(x2, y2, z2);

            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);

            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);


            const col = getColor(tileDefinitions, tileData[tileDataIndex + td_tileId])

            // colors.push(color0[0], color0[1], color0[2]);
            // colors.push(color3[0], color3[1], color3[2]);
            // colors.push(color1[0], color1[1], color1[2]);
            //
            // colors.push(color1[0], color1[1], color1[2]);
            // colors.push(color3[0], color3[1], color3[2]);
            // colors.push(color2[0], color2[1], color2[2]);


            colors.push(col.r, col.g, col.b);
            colors.push(col.r, col.g, col.b);
            colors.push(col.r, col.g, col.b);

            colors.push(col.r, col.g, col.b);
            colors.push(col.r, col.g, col.b);
            colors.push(col.r, col.g, col.b);

            // const mx = (x3 + x2) / 2;
            // const my = (y3 + y2) / 2;
            // const mz = (z3 + z2) / 2;
            //
            // helperVertices.push(
            //     (x1 + x0) / 2, (y1 + y0) / 2,(z1 + z0) / 2,
            //     (x3 + mx) / 2, (y3 + my) / 2,(z3 + mz) / 2,
            //     (x2 + mx) / 2, (y2 + my) / 2,(z2 + mz) / 2
            // )
            //
            // helperNormals.push(nx, ny, nz);
            // helperNormals.push(nx, ny, nz);
            // helperNormals.push(nx, ny, nz);

        }

        tileDataIndex += td_size;

    }

    //const values = Object.values(map);
    //console.log("SYMMETRY-CHECK", map, values.filter(n => n === 1).length, "of", values.length);

    //console.log("MAX DELTA", max);

    //
    //console.log({vertices, normals, colors})

    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
    geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    const material = new MeshStandardMaterial({
        vertexColors: true,
        side: DoubleSide,
        roughness: 0.5
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, -WATER_LIMIT, 0);
    scene.add(mesh);

    // const wireframe = new WireframeGeometry( geometry );
    //
    // const line = new LineSegments( wireframe );
    // line.material.depthTest = false;
    // line.material.color = new Color("#000");
    // line.material.opacity = 0.25;
    // line.material.transparent = true;
    // scene.add( line );

    if (helperVertices.length > 0)
    {
        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new BufferAttribute(new Float32Array(helperVertices), 3, false));
        geometry.setAttribute("normal", new BufferAttribute(new Float32Array(helperNormals), 3, false));

        const mesh = new Mesh(
            geometry,
            new MeshBasicMaterial({
                color: new Color("#f0f"),
                depthTest: false,
                // opacity: 0.2,
                // transparent: true
            })
        )

        scene.add(mesh);

    }

}


const skyParameters = {
    distance: 1000,
    inclination: 0.1,
    azimuth: 0.1
};


function updateSun()
{

    if (!sky)
    {
        return;
    }

    const theta = Math.PI * (skyParameters.inclination - 0.5);
    const phi = 2 * Math.PI * (skyParameters.azimuth - 0.5);

    light.position.x = skyParameters.distance * Math.cos(phi);
    light.position.y = skyParameters.distance * Math.sin(phi) * Math.sin(theta);
    light.position.z = skyParameters.distance * Math.sin(phi) * Math.cos(theta);

    sky.material.uniforms["sunPosition"].value = light.position.copy(light.position);
    water && water.material.uniforms["sunDirection"].value.copy(light.position).normalize();

    cubeCamera.update(renderer, sky);

}


let cubeCamera, sky;





function init()
{

    createScene();

    container = document.getElementById("container");

    //

    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = sRGBEncoding
    container.appendChild(renderer.domElement);

    //

    scene = new Scene();

    camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(250, 250, 1000);

    //

    light = new DirectionalLight("#fff8d5", 0.8);
    scene.add(light);

    cubeCamera = new CubeCamera(0.2, 1, 512);
    // cubeCamera.renderTarget.texture.generateMipmaps = true;
    // cubeCamera.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

    scene.background = cubeCamera.renderTarget;

    // Water

    const waterGeometry = new PlaneBufferGeometry(30000, 30000);
    if (WATER_EFFECT)
    {
        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals,
                alpha: 0.6,
                sunDirection: light.position.clone().normalize(),
                sunColor: "#fff8d5",
                waterColor: "#000e1e",
                distortionScale: 2.5,
                clipBias: 0.0001,
                fog: true
            }
        );
        water.rotation.x = -Math.PI / 2;
        scene.add(water);
    }
    else
    {
        const material = new MeshStandardMaterial({
            side: FrontSide,
            color: "#00232a",
            envMap: cubeCamera.renderTarget.texture,
            roughness: 0.2
        });

        const mesh = new Mesh(waterGeometry, material);
        mesh.rotation.x = -Math.PI / 2;
        //scene.add(mesh)
    }

    // Skybox

    if (SKY_EFFECT)
    {
        sky = new Sky();


        // uniforms["turbidity"].value = 5;
        // uniforms["rayleigh"].value = 1.2;
        // uniforms["luminance"].value = 1;
        // uniforms["mieCoefficient"].value = 0.05;
        // uniforms["mieDirectionalG"].value = 0.9;

        envMap = cubeCamera.renderTarget.texture

        updateSun();
    }
    else
    {
        envMap = null;
    }

    controls = new OrbitControls(camera, renderer.domElement);
    //controls.maxPolarAngle = Math.PI * 0.45;
    controls.maxPolarAngle = Math.PI;
    controls.target.set(0, 0, 0);
    controls.minDistance = 0.0;
    controls.maxDistance = 1500.0;
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.update();

    // stats = new Stats();
    // container.appendChild( stats.dom );

    // GUI

    //const gui = new GUI();

    // const folder = gui.addFolder( "Sky" );
    // folder.add( skyParameters, "inclination", 0, 0.5, 0.0001 ).onChange( updateSun );
    // folder.add( skyParameters, "azimuth", 0, 1, 0.0001 ).onChange( updateSun );
    // folder.open();
    //
    // const uniforms = water.material.uniforms;
    //
    // const folder = gui.addFolder( "Water" );
    // folder.add( uniforms.distortionScale, "value", 0, 8, 0.1 ).name( "distortionScale" );
    // folder.add( uniforms.size, "value", 0.1, 10, 0.1 ).name( "size" );
    // folder.add( uniforms.alpha, "value", 0.9, 1, .001 ).name( "alpha" );
    // folder.open();

    window.addEventListener("resize", onWindowResize, false);

    ////////////////

    const tileDefinitions = prepareTiles(
        null // no thumbnails please
    );

    tWFC = perfNow();

    waveFunctionCollapse(organicQuads, heightMap, tileData, tileDefinitions)

    tWFCEnd = perfNow();

    if (HEIGHT_MAP)
    {
        addHeightMap(tileDefinitions);
    }
    else
    {
        addMarchingSquareObjects(marchingSquaresArray);
    }
}





let materialCompile = 0;
let materialGenerate = 0;

const dummy = new Object3D();

function addMarchingSquareObjects(marchingSquaresArray)
{

    const vertexMap = new Map();
    let vertexCount = 0;

    const position = [];
    const uv = [];
    const normal = [];

    const insert = (x,y,z, nx, ny, nz, u, v) => {


        x = Math.round(x*16)/16;
        y = Math.round(y*16)/16;
        z = Math.round(z*16)/16;

        nx = Math.round(nx*1024)/1024;
        ny = Math.round(ny*1024)/1024;
        nz = Math.round(nz*1024)/1024;

        u = Math.round(u*4096)/4096;
        v = Math.round( v*4096)/4096;

        // const key = ((x*10)|0) + "," + ((y*10)|0) + "," + ((z*10)|0) + "/" +
        //             ((nx*e)|0) + ":" + ((ny*1000)|0) + ":" + ((nz*1000)|0) + "/" +
        //             ((u*4096)|0) + ":" + ((v*4096)|0);

        const key = x + "," + y + "," + z + "/" + nx + "," + ny + "," + nz + "/" + u  + "," + v;

        const index = vertexMap.get(key);
        if (index === undefined)
        {
            const newIndex = vertexCount++;
            vertexMap.set(key, newIndex);

            position.push(x,y,z);
            uv.push(u,v);
            normal.push(nx,ny,nz);

            return newIndex;
        }
        return index;
    }


    const facesByMaterial = new Array(NUM_MATERIALS);

    for (let currGround = WATER + 1; currGround < NUM_MATERIALS; currGround++)
    {
        const array = createMarchingSquares(currGround, insert, marchingSquaresArray);
        if (array.length)
        {
            facesByMaterial[currGround] = array;
        }
    }

    const { graph, tiles } = organicQuads;

    let faces = facesByMaterial[STONE];
    if (!faces)
    {
        faces = facesByMaterial[STONE] = [];
    }

    let tileDataIndex = 0;
    for (let i = 0; i < tileCuts.length; i += tc_size)
    {
        const cutCase = tileCuts[i + tc_case];
        const tileA = tileCuts[i + tc_tile0];
        const tileB = tileCuts[i + tc_tile1];
        const cut0 = tileCuts[i + tc_cut0];
        const cut1 = tileCuts[i + tc_cut1];

        const tileDataIndexA = tileA * tileDataFactor;
        const tileDataIndexB = tileB * tileDataFactor;

        let otherCut0 = -1, otherCut1 = -1

        let node0 = tiles[tileA + t_n0 + cut0];
        let node1 = tiles[tileA + t_n0 + cut1];

        for (let k = 0; k < 4; k++)
        {
            if (tiles[tileB + t_n0 + k] === node0)
            {
                otherCut0 = k;
                if (otherCut1 !== -1)
                {
                    break;
                }
            }
            else if (tiles[tileB + t_n0 + k] === node1)
            {
                otherCut1 = k;
                if (otherCut0 !== -1)
                {
                    break;
                }
            }
        }

        if (otherCut0 !== -1 && otherCut1 !== -1)
        {
            const x0 = graph[node0 + g_x];
            const y0 = tileData[tileDataIndexA + td_cut0 + cut0]
            const z0 = graph[node0 + g_y];

            const x1 = graph[node1 + g_x];
            const y1 = tileData[tileDataIndexA + td_cut0 + cut1]
            const z1 = graph[node1 + g_y];

            const x3 = x0;
            const y3 = tileData[tileDataIndexB + td_cut0 + otherCut0]
            const z3 = z0;

            const x2 = x1;
            const y2 = tileData[tileDataIndexB + td_cut0 + otherCut1]
            const z2 = z1;


            switch(cutCase)
            {
                case 0:
                {
                    const ax = (x0 - x1);
                    const ay = (y0 - y1);
                    const az = (z0 - z1);
                    const bx = (x2 - x1);
                    const by = (y2 - y1);
                    const bz = (z2 - z1);

                    // normal vector based on points 0, 1 and 2
                    const nx = ay * bz - az * by;
                    const ny = az * bx - ax * bz;
                    const nz = ax * by - ay * bx;

                    const indexA = insert(x0,y0,z0, nx,ny,nz, 0,0);
                    const indexB = insert(x1,y1,z1, nx,ny,nz, 0,1);
                    const indexC = insert(x2,y2,z2, nx,ny,nz, 1,1);
                    const indexD = insert(x3,y3,z3, nx,ny,nz, 1,0);


                    faces.push(indexB, indexA, indexC)
                    faces.push(indexC, indexA, indexD)
                    break;
                }
                case 1:
                {
                    const ax = (x0 - x1);
                    const ay = (y0 - y1);
                    const az = (z0 - z1);
                    const bx = (x2 - x1);
                    const by = (y2 - y1);
                    const bz = (z2 - z1);

                    // normal vector based on points 0, 1 and 2
                    const nx = ay * bz - az * by;
                    const ny = az * bx - ax * bz;
                    const nz = ax * by - ay * bx;

                    const indexA = insert(x0,y0,z0, nx,ny,nz, 0,0);
                    const indexB = insert(x1,y1,z1, nx,ny,nz, 0,1);
                    const indexC = insert(x2,y2,z2, nx,ny,nz, 1,1);

                    faces.push(indexA, indexB, indexC)
                    break;
                }
                case 2:
                {
                    const ax = (x0 - x3);
                    const ay = (y0 - y3);
                    const az = (z0 - z3);
                    const bx = (x2 - x3);
                    const by = (y2 - y3);
                    const bz = (z2 - z3);

                    // normal vector based on points 0, 1 and 2
                    const nx = ay * bz - az * by;
                    const ny = az * bx - ax * bz;
                    const nz = ax * by - ay * bx;

                    const indexA = insert(x0,y0,z0, nx,ny,nz, 0,0);
                    const indexC = insert(x2,y2,z2, nx,ny,nz, 1,1);
                    const indexD = insert(x3,y3,z3, nx,ny,nz, 1,0);

                    faces.push(indexA, indexC, indexD)

                    break;
                }
            }

        }
        else
        {
            console.log("No two cuts for", tileA, tileB, "=>", otherCut0, otherCut1)
        }


    }

    //console.log({facesByMaterial, position, normal, uv});

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(position), 3, false));
    geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normal), 3, false));
    geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uv), 2, false));

    let start = 0;
    const meshMaterials = [];

    let index = [];

    for (let i = 0; i < facesByMaterial.length; i++)
    {
        const faces = facesByMaterial[i];
        if (faces)
        {
            index = index.concat(faces);

            const numTris = faces.length;
            //console.log("geometry.addGroup(",start, numTris, meshMaterials.length,")");
            geometry.addGroup(start, numTris, meshMaterials.length);

            meshMaterials.push(
                materials[i].clone()
            )

            start += numTris;
        }
    }

    geometry.setIndex(index);

    const terrain = new Mesh(geometry, meshMaterials);
    scene.add(terrain);
}

const heightIndexFactor = h_size / g_size;

const pos = new Vector3();
const vX1 = new Vector3();
const vX2 = new Vector3();
const vY1 = new Vector3();

const vAxisStart = new Vector3();
const vAxisEnd = new Vector3();
const transformed = new Vector3();
const normal = new Vector3();
const vUp = new Vector3();

function createMarchingSquares(ground, insert, marchingSquaresArray)
{
    const {graph, tiles} = organicQuads;

    const {length} = tiles;

    const faces = [];
    let tileDataIndex = 0;
    for (let i = 0; i < length; i += t_size)
    {
        // node indizes for our quad
        const n0 = tiles[i + t_n0];
        const n1 = tiles[i + t_n1];
        const n2 = tiles[i + t_n2];
        const n3 = tiles[i + t_n3];

        // equivalent height map indizes
        const heightIndex0 = n0 * heightIndexFactor;
        const heightIndex1 = n1 * heightIndexFactor;
        const heightIndex2 = n2 * heightIndexFactor;
        const heightIndex3 = n3 * heightIndexFactor;

        // const centroidX = tileData[tileDataIndex + td_cx];
        // const centroidY = heightFn(tileData[tileDataIndex + td_cx], tileData[tileDataIndex + td_cy]);
        // const centroidZ = tileData[tileDataIndex + td_cy];

        const x0 = graph[n0 + g_x];
        const y0 = tileData[tileDataIndex + td_cut0] === -1 ?
            heightMap[heightIndex0 + h_height] :
            tileData[tileDataIndex + td_cut0];
        const z0 = graph[n0 + g_y];

        const x1 = graph[n1 + g_x];
        const y1 = tileData[tileDataIndex + td_cut1] === -1 ?
            heightMap[heightIndex1 + h_height] :
            tileData[tileDataIndex + td_cut1];
        const z1 = graph[n1 + g_y];

        const x2 = graph[n2 + g_x];
        const y2 = tileData[tileDataIndex + td_cut2] === -1 ?
            heightMap[heightIndex2 + h_height] :
            tileData[tileDataIndex + td_cut2];
        const z2 = graph[n2 + g_y];

        const x3 = graph[n3 + g_x];
        const y3 = tileData[tileDataIndex + td_cut3] === -1 ?
            heightMap[heightIndex3 + h_height] :
            tileData[tileDataIndex + td_cut3];
        const z3 = graph[n3 + g_y];

        const ax = (x0 - x1);
        const ay = (y0 - y1);
        const az = (z0 - z1);
        const bx = (x2 - x1);
        const by = (y2 - y1);
        const bz = (z2 - z1);
        const cx = (x3 - x1);
        const cy = (y3 - y1);
        const cz = (z3 - z1);

        // normal vector based on points 0, 1 and 2
        const n0x = ay * bz - az * by;
        const n0y = az * bx - ax * bz;
        const n0z = ax * by - ay * bx;

        // normal vector based on points 0, 1 and 3
        const n1x = ay * cz - az * cy;
        const n1y = az * cx - ax * cz;
        const n1z = ax * cy - ay * cx;

        // average with world up and renormalize
        let upX = (n0x + n1x) / 3;
        let upY = (n0y + n1y + 1) / 3;
        let upZ = (n0z + n1z) / 3;

        const f = 1 / Math.sqrt(upX * upX + upY * upY + upZ * upZ);
        upX *= f;
        upY *= f;
        upZ *= f;

        const g1 = heightMap[heightIndex0 + h_ground];
        const g2 = heightMap[heightIndex3 + h_ground];
        const g4 = heightMap[heightIndex2 + h_ground];
        const g8 = heightMap[heightIndex1 + h_ground];

        let tileCase = (
            ( g1 === ground ? 1 : 0) +
            ( g2 === ground ? 2 : 0) +
            ( g4 === ground ? 4 : 0) +
            ( g8 === ground ? 8 : 0)
        );


        if (tileCase !== 0)
        {
            // fix multi-color gaps
            if (tileCase === 1 && g2 !== g8)
            {
                tileCase = 16;
            }
            else if (tileCase === 2 && g4 !== g1)
            {
                tileCase = 17;
            }
            else if (tileCase === 4 && g8 !== g2)
            {
                tileCase = 18;
            }
            else if (tileCase === 8 && g1 !== g4)
            {
                tileCase = 19;
            }

            if (tileCase === 5 && (g1 === GRASS || g1 === STONE))
            {
                tileCase = 20;
            }

            if (tileCase === 10 && (g2 === GRASS || g2 === STONE))
            {
                tileCase = 21;
            }

            pos.set(x0, y0, z0);
            vX1.set(x3 - x0, y3 - y0, z3 - z0);
            vX2.set(x2 - x1, y2 - y1, z2 - z1);
            vY1.set(x1 - x0, y1 - y0, z1 - z0);

            const geo = marchingSquaresArray[tileCase];

            const index = geo.getIndex().array;
            const positions = geo.getAttribute("position").array;
            const uvs = geo.getAttribute("uv").array;
            const normals = geo.getAttribute("normal").array;

            //console.log({index, positions, normals, uvs})

            for (let j = 0; j < index.length; j ++)
            {
                const k = index[j];

                const idx = k * 3;
                const uvIdx = k * 2;

                const x = (positions[idx] + 0.5)* 1.01;
                const y = (positions[idx + 1]+ 0.5)* 1.01;
                const z = (positions[idx + 2]+ 0.5) * 1.01;

                const nx = normals[idx];
                const ny = normals[idx + 1];
                const nz = normals[idx + 2];

                vAxisStart.copy(vX1).multiplyScalar(x).add(pos);
                vAxisEnd.copy(vX2).multiplyScalar(x).add(pos).add(vY1);

                vUp.set(upX, upY, upZ).multiplyScalar(z)
                transformed.copy(vAxisEnd).sub(vAxisStart).multiplyScalar(y).add(vAxisStart).add(vUp);

                // so we act for a moment as if our normal vector was an actual position above the face and we transform
                // that point just like the geometry
                vAxisStart.copy(vX1).multiplyScalar(x + nx).add(pos);
                vAxisEnd.copy(vX2).multiplyScalar(x + nx).add(pos).add(vY1);

                vUp.set(upX, upY, upZ).multiplyScalar(z + nz)
                normal.copy(vAxisEnd).sub(vAxisStart).multiplyScalar(y + ny).add(vAxisStart).add(vUp);

                //  and then we substract the projected vertex and renormalize because our space is warped.
                normal.sub(transformed).normalize();

                faces.push(
                    insert(
                    transformed.x,
                    transformed.y,
                    transformed.z,
                    normal.x,
                    normal.y,
                    normal.z,
                    uvs[uvIdx],
                    uvs[uvIdx + 1]
                ))
            }
        }

        tileDataIndex += td_size;
    }
    return faces;
}


function onWindowResize()
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


let inclinationCount = 0;


function mainLoop()
{

    render();
    //stats.update();

    //skyParameters.inclination = -0.012 + Math.sin(inclinationCount += 0.01) * 0.524;

    updateSun();

    controls.update()
    raf(mainLoop);

}


let first = true;

function render()
{

    const time = performance.now() * 0.0001;

    // sphere.position.y = Math.sin( time ) * 5 + 1;
    // sphere.rotation.x = time * 0.5;
    // sphere.rotation.z = time * 0.51;

    if (water)
    {
        water.position.y = WATER_LIMIT - 0.1 + Math.sin(time) * 0.4;
        water.material.uniforms["time"].value += 1.0 / 60.0;
    }

    renderer.render(scene, camera);

    if(first)
    {
        //console.log({materialCompile})
    }

    first = false;
}


let waterNormals, marchingSquaresArray;


function extractMarchingSquares(scene)
{
    const {children} = scene;

    const array = new Array(CASE_NAMES.length);

    for (let i = 0; i < children.length; i++)
    {
        const kid = children[i];

        const index = CASE_NAMES.indexOf(kid.name);
        if (index >= 0)
        {
            array[index] = kid.geometry;
        }
    }
    return array;
}

let tStart;
let tOrganicQuadsStart;
let tWFC;
let tWFCEnd;

Promise.all([
    loadScene("assets/tiles.glb"),
    loadScene("assets/ground.glb"),
    loadScene("assets/ms.glb"),
    //loadScene("assets/ms-raised.glb"),
    loadTexture("assets/waternormals.jpg")
])
    .then(([
               _tiles,
               ground,
               marchingSquares,
               //marchingSquaresRaised,
               tWaterNormals
           ]) => {

        //scene.add( tiles.scene );

        tStart = perfNow();

        dump( ground.scene, "tiles: ")

        materials = MATERIAL_NAMES.map(n => {
            return ground.scene.children.find(kid => kid.name === n).material;
        })

        marchingSquaresArray = extractMarchingSquares(marchingSquares.scene);

        //console.log("INDEXED", marchingSquaresArray.map(ms => ({index:ms.index,attributes: ms.attributes})))

        //const msMapRaised = extractMarchingSquares(marchingSquaresRaised.scene);
        // console.log({marchingSquaresArray, msMapRaised})

        //dump(marchingSquares.scene, "ms-normal: ");
        //dump(marchingSquaresRaised.scene, "ms-raised: ");


        // console.log("Scene Objects", tiles.scene.children.map(kid => kid.name).join(", "))
        //
        // const obj  = tiles.scene.children.find(
        //     kid => kid.name === "tree_default"
        // );

        tWaterNormals.wrapS = tWaterNormals.wrapT = RepeatWrapping;
        waterNormals = tWaterNormals;

        // tiles.animations; // Array<AnimationClip>
        // tiles.scene; // Group
        // tiles.scenes; // Array<Group>
        // tiles.cameras; // Array<Camera>
        // tiles.asset; // Object

        // ReactDOM.render(
        //     <Game/>,
        //     document.getElementById("root")
        // )

        init();

        const end = perfNow();

        console.log("Init: ", (tOrganicQuadsStart-tStart),"ms");
        console.log("Organic Quads: ", (tWFCEnd-tOrganicQuadsStart),"ms");
        console.log("WFC: ", (tWFCEnd-tWFC),"ms");
        console.log("geo: ", (end-tWFCEnd),"ms");
        console.log("Total: ", (end-tStart),"ms");


        mainLoop();
    })



function group(array, count)
{
    const out = new Array(array.length / count);
    for (let i = 0; i < out.length; i++)
    {
        out[i] = array.slice(i * count, i * count + count );
    }

    return out;
}

