import raf from "raf"
import React from "react"
import ReactDOM from "react-dom"
// noinspection ES6UnusedImports
import STYLE from "../style.css"
import {
    CubeCamera,
    DirectionalLight,
    Group,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    MOUSE,
    PerspectiveCamera,
    PlaneBufferGeometry,
    Raycaster,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer
} from "three"
import loadScene from "../loadScene";
import { MATERIAL_NAMES, PHI } from "../constants";
import Grid from "./Grid";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import EditorUI from "./EditorUI";
import EditorState from "./EditorState";
import { reaction } from "mobx";
import "mobx-react-lite/batchingForReactDom"
import threeJsThumbnailer from "../util/threeJsThumbnailer";
import { DEFAULT_TILES } from "./default-tiles";


const TAU = Math.PI * 2;

//////////////////////////////////////////////////////////////////////



let container, stats, grid;
let camera, scene, renderer, light;
let controls, water;

let materials, cursor;

let uiContainer;

const sidebarWidth = 220;

const thumbnailWidth = 40;
const thumbnailHeight = thumbnailWidth / 0.75;

const skyParameters = {
    distance: 1000,
    inclination: 0.1,
    azimuth: 0.1
};

let cubeCamera, sky;

function getWidth()
{
    return window.innerWidth - (editorState.visible ?  sidebarWidth : 0);
}


function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / getWidth() ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
let mouse = new Vector2()
function onWindowResize()
{

    camera.aspect = getWidth() / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(getWidth(), window.innerHeight);

}

let INTERSECTED
const raycaster = new Raycaster();

function mainLoop()
{
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( grid.group.children );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED !== intersects[ 0 ].object ) {

            //if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;

            const { position } = INTERSECTED;
            cursor.position.set(position.x,position.z,position.y)
        }

    } else {
        INTERSECTED = null;
    }


    render();

    if (controls)
    {
        controls.update()
    }
    raf(mainLoop);

}


function render()
{

    const time = performance.now() * 0.0001;

    // sphere.position.y = Math.sin( time ) * 5 + 1;
    // sphere.rotation.x = time * 0.5;
    // sphere.rotation.z = time * 0.51;

    renderer.render(scene, camera);
}

const tiles = [];
let envMap;

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


function createEmptyThumbnail()
{
    const canvas = document.createElement("canvas");
    canvas.width = thumbnailWidth;
    canvas.height = thumbnailHeight;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255,64,64,0.5)";
    ctx.fillStyle = "#fff";

    const hw = thumbnailWidth * 0.5;
    const hh = thumbnailHeight * 0.5;
    const size = Math.min(hh,hw) * 0.3;

    ctx.beginPath();
    ctx.moveTo(-size + hw,-size + hh);
    ctx.lineTo( size + hw, size + hh);
    ctx.moveTo( size + hw,-size + hh);
    ctx.lineTo(-size + hw, size + hh);
    ctx.rect(0,0,thumbnailWidth,thumbnailHeight)
    ctx.stroke();

    ctx.fillText("None", 4, thumbnailHeight - 4);
    return canvas;
}


function createCursor()
{
    const lineMat = new LineBasicMaterial({
        color: 0x000000,
        linewidth: 1.2,
        depthTest: false,
        opacity: 0.5,
        transparent: true
    });

    const points = [];
    points.push(new Vector3(-0.5, 0, -0.5));
    points.push(new Vector3(0.5, 0, -0.5));
    points.push(new Vector3(0.5, 0, 0.5));
    points.push(new Vector3(-0.5, 0, 0.5));
    points.push(new Vector3(-0.5, 0, -0.5));

    const border = new Line(
        new BufferGeometry().setFromPoints(points),
        lineMat
    );

    const insidePlane = new Mesh(
        new PlaneBufferGeometry(
            1,
            1
        ),
        new MeshBasicMaterial({
            color: 0xffffff,
            depthTest: false,
            opacity: 0.2,
            transparent: true
        })
    );
    insidePlane.rotation.x = -TAU / 4;

    const cursor = new Group();
    cursor.add(insidePlane)
    cursor.add(border)

    return cursor;
}


function prepareTiles(tilesGLTF)
{
    const tiles = [];

    let pos = 0;
    for (let name in DEFAULT_TILES)
    {
        if (DEFAULT_TILES.hasOwnProperty(name))
        {
            const tileGroup = DEFAULT_TILES[name];
            const {variants, size = 1} = tileGroup;
            tiles[pos] = {
                id: -1,
                name,
                ...tileGroup,
                size,
                variants: tilesGLTF.scene.children.filter(o => variants.indexOf(o.name) >= 0),
            };
            pos++;
        }
    }

    tiles.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);

    let idCounter = 1;
    tiles.forEach( t => {
        t.id = idCounter;
        idCounter += t.size * t.size;
    });

    const thumbNames = [];
    const objects = [];

    tiles.forEach((t, idx) => {
        thumbNames[idx] = t.name;
        objects[idx] = t.variants[0];
    });

    //console.log({objects, thumbNames, tiles})

    return threeJsThumbnailer(
        objects,
        thumbnailWidth,
        thumbnailHeight,
        thumbNames
    ).then(thumbnails => {

        thumbnails.forEach((th, idx) => tiles[idx].thumbnail = th);

        tiles.unshift({
            id: 0,
            name: "empty",
            variants: [],
            thumbnail: createEmptyThumbnail()
        });

        return tiles;
    })
}

Promise.all([
    loadScene("assets/ground.glb"),
    loadScene("assets/tiles.glb").then( prepareTiles )
])
    .then(([ ground, _tiles  ]) => {

        tiles.push(...  _tiles);

        console.log({tiles});

        materials = MATERIAL_NAMES.map(n => {
            const kid = ground.scene.children.find(kid => kid.name === n);
            if (!kid)
            {
                throw new Error("Could not find " + n);
            }
            return kid.material;
        })



        //dump(_tiles.scene, "_tiles: ")
        //console.log(materials);


        document.title += " Rule Editor"

        container = document.getElementById("container");

        renderer = new WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(getWidth(), window.innerHeight);

        container.appendChild(renderer.domElement);

        uiContainer = document.createElement("div");
        uiContainer.setAttribute("id", "root");
        container.appendChild(uiContainer)

        scene = new Scene();

        camera = new PerspectiveCamera(55, getWidth() / window.innerHeight, 1, 20000);
        camera.up.set(0,1,0);

        const dist = 32;

        camera.position.set(0, dist, -dist * 0.75);
        camera.lookAt(new Vector3(0,0,0));
        camera.updateProjectionMatrix();

        light = new DirectionalLight("#fff8d5", 1.4);
        scene.add(light);

        cubeCamera = new CubeCamera(0.2, 1, 512);
        // cubeCamera.renderTarget.texture.generateMipmaps = true;
        // cubeCamera.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

        scene.background = cubeCamera.renderTarget;

        sky = new Sky();

        const uniforms = sky.material.uniforms;

        // uniforms["turbidity"].value = 5;
        // uniforms["rayleigh"].value = 1.2;
        // uniforms["luminance"].value = 1;
        // uniforms["mieCoefficient"].value = 0.05;
        // uniforms["mieDirectionalG"].value = 0.9;

        envMap = cubeCamera.renderTarget.texture


        updateSun();


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


        // const { children } = _tiles.scene;
        //
        // for (let i = 1; i < children.length; i++)
        // {
        //     const child = children[i];
        //     console.log("ADD", child)
        //     scene.add(child.clone());
        // }

        // const plane = new PlaneBufferGeometry(1000,1000,1,1);
        //
        // planeMesh = new Mesh(plane, materials[0]);
        // planeMesh.rotation.x = TAU/4;
        // scene.add(planeMesh)


        controls = new OrbitControls(camera, renderer.domElement);
        //controls.maxPolarAngle = Math.PI * 0.45;
        controls.maxPolarAngle = Math.PI;
        controls.target.set(0, 0, 0);
        controls.minDistance = 0.0;
        controls.maxDistance = 1500.0;
        controls.enableDamping = true;
        controls.dampingFactor = 0.02;
        controls.mouseButtons = {
            MIDDLE: MOUSE.ROTATE,
            RIGHT: MOUSE.PAN
        }
        controls.update();

        grid = new Grid(scene, 12, materials);

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        window.addEventListener("resize", onWindowResize, false);
        cursor = createCursor();
        scene.add( cursor );

        renderUI().then(mainLoop);
    })


const editorState = new EditorState(tiles);

reaction(
    () => editorState.visible,
    () => {
        onWindowResize();
        renderUI();
    }
)

reaction(
    () => editorState.activeTileIndex,
    () => {
        console.log("ACTIVE", editorState.activeTile)
    }
)

function renderUI()
{
    return new Promise(
        (resolve, reject) => {
            try
            {
                ReactDOM.render(
                    <EditorUI
                        editorState={ editorState }
                    />,
                    uiContainer,
                    resolve
                );

            }
            catch(e)
            {
                reject(e);
            }
        }
    );
}
