import React from "react"
import raf from "raf"
import SimplexNoise from "simplex-noise"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import {
    BufferGeometry,
    CubeCamera,
    DirectionalLight,
    DoubleSide,
    Float32BufferAttribute,
    FrontSide,
    LinearMipmapLinearFilter,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneBufferGeometry,
    RepeatWrapping,
    Scene,
    WebGLRenderer
} from "three"

import OrganicQuads, {
    g_isEdge,
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
import loadScene from "./loadScene";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import loadTexture from "./loadTexture";


const EFFECTS = true;

const DETAIL = 12;
const MAX_HEIGHT = 500;
const QUARTER_HEIGHT = MAX_HEIGHT/4;
const NOISE_SCALE_1 = 0.003;
const NOISE_SCALE_2 = 0.07;
const GROUND_NOISE_SCALE = 0.005;
const NOISE_RATIO = 0.98;
const CLIFF_THRESHOLD = 10;

// size of the outer square around our big hexagon
const SIZE = 1500;

// distance from the center at which the ground becomes flat
const FLAT_DISTANCE = 410;

//////////////////////////////////////////////////////////////////////


const DISTANCE_TO_ANGLE_FACTOR = (Math.PI/2) / FLAT_DISTANCE;

const WATER = 0;
const SAND = 1;
const GRASS = 2;
const DIRT = 3;
const FOREST = 4;
const STONE = 5;
const STONE2 = 6;
const UNDEFINED = 7;

const GROUND_COLORS = {
    [WATER] : [0,0.4,0.8],
    [SAND] : [0.8,0.8,0],
    [GRASS] : [0,0.7,0],
    [DIRT] : [0.5,0.3,0.1],
    [FOREST] : [0.2,0.5,0.3],
    [STONE] : [0.5,0.5,0.5],
    [STONE2] : [0.7,0.7,0.7],
    [UNDEFINED] : [1,0,1]
}

const WATER_LIMIT = 2;
const SAND_LIMIT = 5.5;
const FOREST_LIMIT = 60;

let container, stats;
let camera, scene, renderer, light;
let controls, water, sphere;


const td_cx = 0;
const td_cy = 1;
const td_walkable = 2;
const td_cut0 = 3;
const td_cut1 = 4;
const td_cut2 = 5;
const td_cut3 = 6;
const td_size = 7;

let tileData;
let heightMap;

function updateCentroids()
{
    const { graph, tiles } = organicQuads;
    const { length } = tiles;

    let tileDataPos = 0;
    for (let i=0; i < length; i += t_size)
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



function heightFn(x0, z0)
{
    const distance = Math.sqrt(x0 * x0 + z0 * z0);
    const limit = heightLimit(1 - distance / (SIZE/2));

    return Math.max(0, (QUARTER_HEIGHT + ( noise.noise2D(x0 * NOISE_SCALE_1, z0 * NOISE_SCALE_1) * NOISE_RATIO + noise.noise2D(z0 * NOISE_SCALE_2, x0 * NOISE_SCALE_2) * (1-NOISE_RATIO)) * QUARTER_HEIGHT) * limit);
}

export function heightLimit(x)
{
    const beach = 0.05;
    const beachSquared = beach*beach;

    const mountain = 0.6;
    const mountain_mid = 0.5;

    if (x < beach)
    {
        x = beach - x;

        return beachSquared - x*x;
    }
    else if (x < mountain)
    {
        x = x - beach;
        const delta = mountain - beach;
        return beachSquared + (x * x * (mountain_mid - beachSquared)/ (delta*delta));
    }
    else
    {
        x = 1 - x;

        const delta = 1 - mountain;

        return 1 - x*x*x * (1 - mountain_mid)/ (delta*delta*delta);
    }
}


const tmpHeight= new Float64Array(5);

function cutCliffs()
{

    const { graph, tiles } = organicQuads;

    const { length } = tiles;

    const heightIndexFactor = h_size / g_size;
    const tileDataFactor = td_size / t_size;

    for (let i = 0; i < length; i += t_size)
    {
        // find indizes for connected centroid (values might be -1 if on the edge
        const tileDataIndex = i * tileDataFactor;
        const tileDataIndex0 = tiles[i + t_tile0] * tileDataFactor;
        const tileDataIndex1 = tiles[i + t_tile1] * tileDataFactor;
        const tileDataIndex2 = tiles[i + t_tile2] * tileDataFactor;
        const tileDataIndex3 = tiles[i + t_tile3] * tileDataFactor;

        tmpHeight[0] = heightFn( tileData[tileDataIndex], tileData[tileDataIndex + 1] )

        tmpHeight[1] = tileDataIndex0 >= 0 ? heightFn( tileData[tileDataIndex0 + td_cx], tileData[tileDataIndex0 + td_cy] ) : -1;
        tmpHeight[2] = tileDataIndex1 >= 0 ? heightFn( tileData[tileDataIndex1 + td_cx], tileData[tileDataIndex1 + td_cy] ) : -1;
        tmpHeight[3] = tileDataIndex2 >= 0 ? heightFn( tileData[tileDataIndex2 + td_cx], tileData[tileDataIndex2 + td_cy] ) : -1;
        tmpHeight[4] = tileDataIndex3 >= 0 ? heightFn( tileData[tileDataIndex3 + td_cx], tileData[tileDataIndex3 + td_cy] ) : -1;

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
            for (let j = 0 ; j < 4; j++)
            {
                if (cutMask & (1 << j))
                {
                    const heightMapIndex0 = tiles[i + t_n0 + j] * heightIndexFactor;
                    const heightMapIndex1 = (j === 3 ? tiles[i + t_n0] : tiles[i + t_n0 + j + 1]) * heightIndexFactor;

                    const cut0 = td_cut0 + j;
                    const cut1 = j === 3 ? td_cut0 : td_cut0 + j + 1;


                    const edgeBefore = j === 0 ? 3 : j - 1;
                    const edgeAfter = j === 3 ? 0 : j + 1;

                    const heightOnQuadBefore = tmpHeight[1 + edgeBefore];
                    const heightOnQuadAfter = tmpHeight[1 + edgeAfter];
                    const height0 = heightOnQuadBefore >= 0 ? (heightOnQuadBefore + tmpHeight[0]) / 2 : tmpHeight[0];
                    const height1 = heightOnQuadAfter >= 0 ? (tmpHeight[0] + heightOnQuadAfter) / 2 : tmpHeight[0];

                    tileData[tileDataIndex + cut0] = height0;
                    tileData[tileDataIndex + cut1] = height1;
                    heightMap[heightMapIndex0 + h_ground] = STONE;
                    heightMap[heightMapIndex1 + h_ground] = STONE;

                    // cut our connection to the other tile
                    tiles[i + t_tile0 + j] = -1;
                }
            }
        }
    }
}

const h_height = 0;
const h_ground = 1;
const h_size = 3;



function createScene()
{

    organicQuads = new OrganicQuads({
        numberOfRings: DETAIL,
        width: SIZE,
        height: SIZE,
        graphUserData: 1,
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


    const { graph, tiles, config } = organicQuads;
    const { length } = graph;

    const heightMapFactor = h_size / g_size;

    heightMap = new Float64Array(length * heightMapFactor);
    let pos = 0;
    for (let i=0; i < length; i += g_size)
    {
        heightMap[pos + h_height] = heightFn(graph[i + g_x], graph[i + g_y]);
        heightMap[pos + h_ground] = UNDEFINED;

        pos += h_size;
    }

    tileData = new Float64Array((organicQuads.tiles.length / t_size) * td_size);
    updateCentroids()
    cutCliffs()
    testWalkability();
    generateGround();

}

function generateGround()
{

    const { graph } = organicQuads;
    const { length } = graph;

    let heightMapPos = 0;
    let nodePos = 0;
    for (let i=0; i < length; i += g_size)
    {


        const x0 = graph[nodePos + g_x];
        const y0 = heightMap[heightMapPos + h_height];
        //const y0 = heightMap[heightIndex0 + h_height];
        const z0 = graph[nodePos + g_y];

        const ground = heightMap[heightMapPos + h_ground];

        if (ground !== STONE)
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

function testWalkability()
{
    const tileIndex = findEdgeTile();

    console.log("Starting to walk at #", tileIndex/t_size)

    const visited = new Set();
    walkRecursive(tileIndex, visited);
}

function findEdgeTile()
{
    const { tiles } = organicQuads;

    const { length } = tiles;

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

function walkRecursive(tileIndex, visited)
{
    if (tileIndex >= 0 && !visited.has(tileIndex))
    {
        visited.add(tileIndex);

        const { tiles } = organicQuads;

        tileData[tileIndex * tileDataFactor + td_walkable] = 1;

        walkRecursive(tiles[tileIndex + t_tile0], visited);
        walkRecursive(tiles[tileIndex + t_tile1], visited);
        walkRecursive(tiles[tileIndex + t_tile2], visited);
        walkRecursive(tiles[tileIndex + t_tile3], visited);

    }
}


const noise = new SimplexNoise();


function checkNaN(value, msg)
{
    if (isNaN(value))
    {
        debugger;
        throw new Error(msg + ": value is NaN")
    }
}


function addHeightMap()
{
    const geometry = new BufferGeometry();
    geometry.name = "Landscape-Debug"

    const vertices = [];
    const normals = [];
    const colors = [];

    const size = 20;
    const segments = 10;

    const halfSize = size / 2;
    const segmentSize = size / segments;

    // generate vertices, normals and color data for a simple grid geometry
    const { graph, tiles, config } = organicQuads;

    const { length } = tiles;


    console.log("Height map for ", length/t_size , " tiles");

    const heightIndexFactor = h_size / g_size;

    const UNDEFINED_COLOR = [1,0,1];


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

    const getColor = (hIdx) => {

        const tileDataIndex = hIdx * td_size / h_size;

        const ground = heightMap[hIdx + h_ground];
        const color = GROUND_COLORS[ground];
        // if (ground !== STONE && ground !== SAND && tileData[tileDataIndex + td_walkable])
        // {
        //     return GROUND_COLORS[GRASS];
        // }

        return color || UNDEFINED_COLOR;
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

        const walkable = tileData[tileDataIndex + td_walkable];


        const x0 = graph[n0 + g_x];
        const y0 = tileData[tileDataIndex + td_cut0] === -1 ? heightMap[heightIndex0 + h_height] : tileData[tileDataIndex + td_cut0];
        //const y0 = heightMap[heightIndex0 + h_height];
        const z0 = graph[n0 + g_y];

        const x1 = graph[n1 + g_x];
        const y1 = tileData[tileDataIndex + td_cut1] === -1 ? heightMap[heightIndex1 + h_height] : tileData[tileDataIndex + td_cut1];
        //const y1 = heightMap[heightIndex1 + h_height];
        const z1 = graph[n1 + g_y];

        const x2 = graph[n2 + g_x];
        const y2 = tileData[tileDataIndex + td_cut2] === -1 ? heightMap[heightIndex2 + h_height] : tileData[tileDataIndex + td_cut2];
        //const y2 = heightMap[heightIndex2 + h_height]
        const z2 = graph[n2 + g_y];

        const x3 = graph[n3 + g_x];
        const y3 = tileData[tileDataIndex + td_cut3] === -1 ? heightMap[heightIndex3 + h_height] : tileData[tileDataIndex + td_cut3];
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
        let nx = (n0x + n1x)/2;
        let ny = (n0y + n1y)/2;
        let nz = (n0z + n1z)/2;

        const f = 1 / Math.sqrt(nx*nx+ny*ny+nz*nz);
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

        const col0 = getColor(heightIndex0);
        const col1 = getColor(heightIndex1);
        const col2 = getColor(heightIndex2);
        const col3 = getColor(heightIndex3);

        if (
            !(col0 === GROUND_COLORS[WATER] &&
              col1 === GROUND_COLORS[WATER] &&
              col2 === GROUND_COLORS[WATER] &&
              col3 === GROUND_COLORS[WATER])
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

            colors.push(col0[0], col0[1], col0[2]);
            colors.push(col3[0], col3[1], col3[2]);
            colors.push(col1[0], col1[1], col1[2]);

            colors.push(col1[0], col1[1], col1[2]);
            colors.push(col3[0], col3[1], col3[2]);
            colors.push(col2[0], col2[1], col2[2]);
        }

        tileDataIndex += td_size;

    }

    //const values = Object.values(map);
    //console.log("SYMMETRY-CHECK", map, values.filter(n => n === 1).length, "of", values.length);

    //console.log("MAX DELTA", max);

    //
    console.log({vertices, normals, colors})


    geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

    const material = new MeshStandardMaterial({
        vertexColors: true,
        side: DoubleSide,
        roughness: 0.5
    });

    // material.onBeforeCompile = shader => {
    //
    //     const {vertexShader,fragmentShader,uniforms} = shader;
    //
    //     console.log("--- VERT:\n", vertexShader);
    //     console.log("--- FRAG:\n", fragmentShader);
    //     console.log({uniforms})
    // };

   const mesh = new Mesh( geometry, material );


    mesh.position.set(0, -WATER_LIMIT, 0);

    // var wireframe = new WireframeGeometry( geometry );
    //
    // var line = new LineSegments( wireframe );
    // line.material.depthTest = false;
    // line.material.opacity = 0.25;
    // line.material.transparent = true;
    //
    //
    // scene.add( line );
    scene.add( mesh );

}

const skyParameters = {
    distance: 1000,
    inclination: 0.05,
    azimuth: 0.25
};

function updateSun() {

    if (!sky)
    {
        return;
    }

    const theta = Math.PI * (skyParameters.inclination - 0.5);
    const phi = 2 * Math.PI * (skyParameters.azimuth - 0.5);

    light.position.x = skyParameters.distance * Math.cos( phi );
    light.position.y = skyParameters.distance * Math.sin( phi ) * Math.sin( theta );
    light.position.z = skyParameters.distance * Math.sin( phi ) * Math.cos( theta );

    sky.material.uniforms[ "sunPosition" ].value = light.position.copy( light.position );
    water && water.material.uniforms[ "sunDirection" ].value.copy( light.position ).normalize();

    cubeCamera.update( renderer, sky );

}

let cubeCamera, sky;

function init() {

    createScene();

    container = document.getElementById( "container" );

    //

    renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    scene = new Scene();

    camera = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 250, 250, 1000 );

    //

    light = new DirectionalLight( "#fff8d5", 0.8 );
    scene.add( light );

    cubeCamera = new CubeCamera(0.2, 1, 512);
    cubeCamera.renderTarget.texture.generateMipmaps = true;
    cubeCamera.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

    scene.background = cubeCamera.renderTarget;

    // Water

    const waterGeometry = new PlaneBufferGeometry(10000, 10000);
    if (EFFECTS)
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
                fog: true
            }
        );
        water.rotation.x = - Math.PI / 2;
        scene.add( water );
    }
    else
    {
        const material = new MeshStandardMaterial({
            side: FrontSide,
            color: "#048",
            envMap: cubeCamera.renderTarget.texture,
            roughness: 0.0
        });

        const mesh = new Mesh( waterGeometry, material );
        mesh.rotation.x = - Math.PI / 2;
        scene.add(mesh)
    }



    // Skybox

    if (EFFECTS)
    {
        sky = new Sky();

        const uniforms = sky.material.uniforms;

        uniforms[ "turbidity" ].value = 5;
        uniforms[ "rayleigh" ].value = 1.5;
        uniforms[ "luminance" ].value = 1;
        uniforms[ "mieCoefficient" ].value = 0.05;
        uniforms[ "mieDirectionalG" ].value = 0.9;


        envMap = cubeCamera.renderTarget.texture

        updateSun();
    }
    else
    {
        envMap = null;
    }




    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.45;
    controls.target.set( 0, 0, 0 );
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


    window.addEventListener( "resize", onWindowResize, false );

    ////////////////
    
    addHeightMap();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

let inclinationCount = 0;

function mainLoop() {

    render();
    //stats.update();

    skyParameters.inclination = Math.sin(inclinationCount += 0.01) * 0.5;

    updateSun();

    controls.update()
    raf( mainLoop );

}

function render() {

    const time = performance.now() * 0.001;

    // sphere.position.y = Math.sin( time ) * 5 + 1;
    // sphere.rotation.x = time * 0.5;
    // sphere.rotation.z = time * 0.51;

    if (water)
    {
        water.material.uniforms[ "time" ].value += 1.0 / 60.0;
    }

    renderer.render( scene, camera );

}


let waterNormals;


function extractMarchingSquares(scene)
{
    const { children } = scene;

    const map = new Map();

    for (let i = 0; i < children.length; i++)
    {
        const kid = children[i];
        if (kid.name.indexOf("case-") === 0)
        {
            map.set(kid.name, kid);
        }
    }
    return map;
}


Promise.all([
0,//        loadScene("assets/tiles.glb"),
        loadScene("assets/ground.glb"),
        loadScene("assets/ms.glb"),
        //loadScene("assets/ms-raised.glb"),
        loadTexture("assets/waternormals.jpg")
    ])
    .then(([
        tiles,
        ground,
        marchingSquares,
        //marchingSquaresRaised,
        tWaterNormals
        ]) => {

        //scene.add( tiles.scene );

        function dump(obj, level = "")
        {
            const { type }  = obj;
            if (type === "Group")
            {
                console.log(level + "GROUP", obj.name)

                const nextLevel = level + "    "

                const { children }  = obj;
                for (let i = 0; i < children.length; i++)
                {
                    dump(children[i], nextLevel);
                }
            }
            else if (type === "Mesh")
            {
                console.log(level + "MESH", obj.name)
            }
        }

        console.log({ground});


        const msMap = extractMarchingSquares(marchingSquares.scene);
        //const msMapRaised = extractMarchingSquares(marchingSquaresRaised.scene);
        //
        // console.log({msMap, msMapRaised})

        console.log(msMap);

        //dump(marchingSquares.scene, "ms-normal: ");
        //dump(marchingSquaresRaised.scene, "ms-raised: ");

        console.log("GLTF", tiles)

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
        mainLoop();
    })



