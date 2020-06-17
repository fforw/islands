import raf from "raf"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import perfNow from "performance-now"
import {
    BufferGeometry,
    CubeCamera,
    DirectionalLight,
    DoubleSide,
    Float32BufferAttribute, Group, InstancedMesh, InterleavedBuffer, InterleavedBufferAttribute,
    Mesh,
    MeshStandardMaterial, Object3D,
    PerspectiveCamera,
    PlaneBufferGeometry, Raycaster,
    Scene,
    sRGBEncoding,
    Vector2,
    WebGLRenderer
} from "three"

import OrganicQuads, { g_x, g_y, t_n0, t_n1, t_n2, t_n3, t_size } from "@fforw/organic-quads";
import loadScene from "./util/loadScene";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CASE_NAMES, ICE, MATERIAL_NAMES } from "./constants";

import { dump } from "./util/dump";
import { InstancedBufferGeometry } from "three/src/core/InstancedBufferGeometry";


const SKY_EFFECT = true;

const DETAIL = 1;

// size of the outer square around our big hexagon
const SIZE = 1500;

//////////////////////////////////////////////////////////////////////

let container, stats;
let camera, scene, renderer, light;
let controls, water;

let materials;
let tilesMesh;
let standardTileMaterial;
let selectedTileMaterial;

const raycaster = new Raycaster();

let organicQuads, envMap;


// how much to shrink down the individual tiles to we can see them 
const SHRINK_SCALE = 0.9;

function drawTiles()
{

    // generate vertices, normals and color data for a simple grid geometry
    const {graph, tiles} = organicQuads;

    const {length} = tiles;
    tilesMesh = new Group();

    standardTileMaterial = new MeshStandardMaterial({
        depthTest: false,
        side: DoubleSide,
        color: "#888",
        roughness: 0.7
    });

    selectedTileMaterial = new MeshStandardMaterial({
        depthTest: false,
        side: DoubleSide,
        transparent: true,
        opacity: 0.5,
        color: "#888",
        roughness: 0.7
    });

    for (let i = 0; i < length; i += t_size)
    {
        const geometry = new BufferGeometry();
        geometry.name = "Morph-Tiles"

        const vertices = [];
        const normals = [];

        // node indizes for our quad
        const n0 = tiles[i + t_n0];
        const n1 = tiles[i + t_n1];
        const n2 = tiles[i + t_n2];
        const n3 = tiles[i + t_n3];

        // scale-down around centroid
        const ox0 = graph[n0 + g_x];
        const oz0 = graph[n0 + g_y];
        const ox1 = graph[n1 + g_x];
        const oz1 = graph[n1 + g_y];
        const ox2 = graph[n2 + g_x];
        const oz2 = graph[n2 + g_y];
        const ox3 = graph[n3 + g_x];
        const oz3 = graph[n3 + g_y];

        const mx = (ox0 + ox1 + ox2 + ox3) / 4;
        const mz = (oz0 + oz1 + oz2 + oz3) / 4;

        const x0 = mx + (ox0 - mx) * SHRINK_SCALE
        const z0 = mz + (oz0 - mz) * SHRINK_SCALE
        const x1 = mx + (ox1 - mx) * SHRINK_SCALE
        const z1 = mz + (oz1 - mz) * SHRINK_SCALE
        const x2 = mx + (ox2 - mx) * SHRINK_SCALE
        const z2 = mz + (oz2 - mz) * SHRINK_SCALE
        const x3 = mx + (ox3 - mx) * SHRINK_SCALE
        const z3 = mz + (oz3 - mz) * SHRINK_SCALE

        const y0 = 0;
        const y1 = 0;
        const y2 = 0;
        const y3 = 0;

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
        }

        geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));

        const mesh = new Mesh(geometry, standardTileMaterial);
        mesh.position.set(0, 0, 0);

        tilesMesh.add(mesh)

    }


    scene.add(tilesMesh);

    // const wireframe = new WireframeGeometry( geometry );
    //
    // const line = new LineSegments( wireframe );
    // line.material.depthTest = false;
    // line.material.color = new Color("#000");
    // line.material.opacity = 0.25;
    // line.material.transparent = true;
    // scene.add( line );

}


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

    const {graph, tiles, config} = organicQuads;
    const {length} = graph;

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

const TILE_ATTRS_STRIDE = 15;


let cubeCamera, sky;

const dummy = new Object3D();

function createInstancedMesh()
{

    const attrs = [];

    const positionBuffer = new InterleavedBuffer(
        new Float32Array(attrs),
        TILE_ATTRS_STRIDE
    );

    const geometry = new InstancedBufferGeometry();

    let inputGeo;

    BufferGeometry.prototype.copy.call(geometry, inputGeo);

    geometry.setAttribute("pos", new InterleavedBufferAttribute(positionBuffer, 3, 0, false));
    geometry.setAttribute("up", new InterleavedBufferAttribute(positionBuffer, 3, 3, false));
    geometry.setAttribute("vX1", new InterleavedBufferAttribute(positionBuffer, 3, 6, false));
    geometry.setAttribute("vX2", new InterleavedBufferAttribute(positionBuffer, 3, 9, false));
    geometry.setAttribute("vY1", new InterleavedBufferAttribute(positionBuffer, 3, 12, false));

    //console.log("Instance count for ", MATERIAL_NAMES[i], "/", CASE_NAMES[j], " = ", count, geometry);

    const count = attrs.length / TILE_ATTRS_STRIDE;
    
    const mesh = new InstancedMesh(geometry, material, count);
    for (let i = 0; i < count; i++)
    {
        const idx = i * 3;
        const x = positions[idx]
        const y = positions[idx + 1]
        const z = positions[idx + 2]

        dummy.position.set(x, y, z);
        //dummy.rotation.x = TAU/4;
        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix)
    }

    mesh.needsUpdate = true;

    scene.add(mesh);
}


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

    const mesh = new Mesh(waterGeometry, materials[ICE]);
    mesh.rotation.x = -Math.PI / 2;
    //scene.add(mesh)

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

    drawTiles()

    createInstancedMesh()

}


function onWindowResize()
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


let currentTile = null;
let valid;


function mainLoop()
{
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(tilesMesh.children);

    if (intersects.length > 0)
    {
        if (currentTile !== intersects[0].object)
        {
            if (currentTile !== null)
            {
                currentTile.material = standardTileMaterial;
            }

            currentTile = intersects[0].object;
            currentTile.material = selectedTileMaterial;
        }

    }
    else
    {
        valid = false;
        if (currentTile !== null)
        {
            currentTile.material = standardTileMaterial;
            currentTile = null;
        }
    }

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

    renderer.render(scene, camera);

    if (first)
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


let mouse = new Vector2(100, 0)


function onDocumentMouseMove(event)
{

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


function start()
{
    let tStart;

    return Promise.all([
        loadScene("assets/tiles.glb"),
        loadScene("assets/ground.glb"),
    ])
        .then(([
                   _tiles,
                   ground,
               ]) => {

            //scene.add( tiles.scene );

            tStart = perfNow();

            dump(ground.scene, "tiles: ")

            materials = MATERIAL_NAMES.map(n => {
                return ground.scene.children.find(kid => kid.name === n).material;
            })

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

            console.log("Total: ", (end - tStart), "ms");

            raycaster.setFromCamera(mouse, camera)

            document.addEventListener("mousemove", onDocumentMouseMove, false);
        })

}

start().then(mainLoop);
