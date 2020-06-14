import raf from "raf"
import React from "react"
import ReactDOM from "react-dom"
// noinspection ES6UnusedImports
import STYLE from "../style.css"
import {
    CubeCamera,
    DirectionalLight,
    MOUSE,
    PerspectiveCamera,
    Scene,
    sRGBEncoding,
    Vector2,
    Vector3,
    WebGLRenderer
} from "three"
import loadScene from "../loadScene";
import { MATERIAL_NAMES } from "../constants";
import Grid, { TILE_SIZE } from "./Grid";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky";
import EditorUI from "./EditorUI";
import EditorState from "./EditorState";
import { configure, reaction } from "mobx";
import "mobx-react-lite/batchingForReactDom"
import Cursor from "./Cursor";
import TileInstance from "./TileInstance";

import inputData from "../../input.json"
import download from "../util/download";
import loadInstanceJSON from "./loadInstanceJSON";
import prepareTiles from "./prepareTiles";


const TAU = Math.PI * 2;

const GRID_SIZE = 12;

//////////////////////////////////////////////////////////////////////

const LOCAL_STORAGE_KEY ="@fforw/islands:data"

const HISTORY_LIMIT = 32;
let container, stats, grid;
let camera, scene, renderer, light;
let controls, water;

let instances = new Set();

let materials, cursor;

let uiContainer;

const sidebarWidth = 220;


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
let mouse = new Vector2(100,0)

function onWindowResize()
{

    camera.aspect = getWidth() / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(getWidth(), window.innerHeight);

}

function mainLoop()
{
    cursor.update(mouse, camera);

    if (ghost)
    {
        ghost.rotation.y = TAU * rotation / 4;
        ghost.position.copy(cursor.object.position);
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




function convertTimestamp(data)
{
    const { timestamp } = data;

    if (typeof timestamp === "string")
    {
        data.timestamp = new Date(timestamp);
    }
}


convertTimestamp(inputData);

function loadFromLocalStorage()
{
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!json)
    {
        return null;
    }

    const data = JSON.parse(json);
    convertTimestamp(data);
    return data;
}




function loadInstances()
{
    let data = loadFromLocalStorage();

    if (!data || data.timestamp.getTime() < inputData.timestamp.getTime())
    {
        console.info("Loading input JSON");
        data = inputData;
    }
    else
    {
        console.info("Loading from localStorage");
    }

    return loadInstanceJSON(data, tiles, grid, instances, scene);
}

function getCurrentInstancesAsJSON()
{
    return JSON.stringify(
        {
            version: 1,
            timestamp: new Date().toISOString(),
            instances: [ ... instances].map( i => ({
                name: i.tile.name,
                position: [
                    i.position.x,
                    i.position.y,
                    i.position.z
                ],
                material: i.material,
                //indexes: i.indexes,
                x: i.x,
                y: i.y
            }))
        },
        null,
        4
    );
}

let history = [];

let timerId;

function debouncedSync()
{
    editorState.setDirty(true);

    if (timerId)
    {
        clearTimeout(timerId);
        timerId = null;
    }

    timerId = setTimeout(sync, 1000);
}

function sync()
{
    timerId = null;
    editorState.setDirty(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, getCurrentInstancesAsJSON())
}


function onCanvasClick(ev)
{
    const { activeTile } = editorState;

    if (cursor.valid)
    {
        const instance = activeTile.id !== 0 ? new TileInstance(
            scene,
            activeTile,
            ghost.position,
            rotation,
            cursor.material,
            cursor.x,
            cursor.y
        ) : null;

        const removed = [];

        const indexes = grid.setTile(cursor.material, cursor.x, cursor.y, activeTile, rotation, offset => {

            for (let curr of instances)
            {
                if (curr.indexes.indexOf(offset) >= 0)
                {
                    grid.clearTile(curr);
                    curr.removeObject();
                    removed.push(curr);
                    instances.delete(curr)
                    break;
                }
            }
        })

        if (instance)
        {
            instance.indexes = indexes;
            instances.add(instance);
        }
        addHistoryEntry(instance, removed);


        debouncedSync();

    }
}

function addHistoryEntry(added, removed)
{
    const newEntry = {
        added,
        removed
    };

    let { historyPos, historyEnd } = editorState;

    if (editorState.historyPos < HISTORY_LIMIT)
    {
        history[historyPos++] = newEntry;
        historyEnd = historyPos;

        editorState.updateHistory(historyPos, historyEnd)
    }
    else
    {
        for (let i = 0; i < historyPos; i++)
        {
            history[i] = history[i + 1];
        }
        history[historyPos] = newEntry;
    }

    //console.log("after addHistoryEntry: newEntry = ", newEntry, "grid.data = ",grid.data, "history = ", history)

}

function canRedo()
{
    const { historyPos, historyEnd } = editorState;
    return historyPos < historyEnd;
}

function canUndo()
{
    const { historyPos } = editorState;
    return historyPos > 0;
}

function redo()
{
    let { historyPos } = editorState;

    if (canRedo())
    {
        //console.log("REDO", history, historyPos)

        const { added, removed } = history[historyPos++];

        if (added)
        {
            grid.setTile(added.material, added.x, added.y, added.tile, added.rotation, true);
            added.createObject();

            instances.add(added)
        }

        if (removed)
        {
            for (let i = 0; i < removed.length; i++)
            {
                const instance = removed[i];
                grid.clearTile(instance);
                instance.removeObject();

                instances.delete(instance)
            }
        }

        debouncedSync();

        editorState.updateHistory(historyPos);

    }
}


function undo()
{
    if (canUndo())
    {
        //console.log("UNDO")

        let { historyPos } = editorState;


        const { added, removed } = history[--historyPos];

        if (added)
        {
            grid.clearTile(added);
            added.removeObject();
            instances.delete(added)
        }

        if (removed)
        {
            for (let i = 0; i < removed.length; i++)
            {
                const instance = removed[i];
                grid.setTile(instance.material, instance.x, instance.y, instance.tile, instance.rotation, true);
                instance.createObject();
                instances.add(instance)
            }
        }

        debouncedSync();

        editorState.updateHistory(historyPos);

    }
}


function onKeyDown(ev)
{
    const { keyCode } = ev;

    if (keyCode === 82) // R / shift-R
    {
         rotation = (rotation + (ev.shiftKey ? 1 : -1)) & 3;
    }
    else if (keyCode === 90 && ev.ctrlKey) // ctrl+Z / ctrl+shift+Z
    {
        if (ev.shiftKey)
        {
            redo();
        }
        else
        {
            undo();
        }
    }

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

        renderer.outputEncoding = sRGBEncoding

        container.appendChild(renderer.domElement);

        uiContainer = document.createElement("div");
        uiContainer.setAttribute("id", "root");
        container.appendChild(uiContainer)

        scene = new Scene();

        camera = new PerspectiveCamera(55, getWidth() / window.innerHeight, 1, 20000);
        camera.up.set(0,1,0);

        const dist = 35;

        camera.position.set(-dist, dist, 0);
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

        grid = new Grid( GRID_SIZE, scene, materials);
        cursor = new Cursor(scene, grid, editorState);
        cursor.update(mouse,camera)

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'keydown', onKeyDown, false );

        window.addEventListener("resize", onWindowResize, false);
        container.addEventListener("click", onCanvasClick, false);

        loadInstances()

        editorState.selectTile(1);

        renderUI().then(mainLoop);
    })


// set MobX configuration
configure({
    enforceActions: "observed"
});

const editorState = new EditorState(tiles);

reaction(
    () => editorState.visible,
    onWindowResize
)

let ghost;
let rotation = 0;

reaction(
    () => editorState.activeTileIndex,
    () => {

        const { activeTile, activeTileIndex } = editorState;
        cursor.object.scale.set(activeTile.sizeX,activeTile.sizeY,activeTile.sizeZ);


        if (ghost)
        {
            disposeMaterials(ghost);
            scene.remove(ghost);
        }

        if (activeTileIndex === 0)
        {
            ghost = null;
        }
        else
        {
            ghost = tiles[activeTileIndex].variants[0].clone();
            ghost.scale.set(TILE_SIZE, TILE_SIZE, TILE_SIZE)
            setOpacity(ghost,0.2)

            ghost.rotation.y = TAU * rotation / 4;

            console.log({ghost})
            scene.add(ghost)
        }
        console.log("ACTIVE", activeTile)
    }
)

function setOpacity(o, v)
{
    if (o.material)
    {
        o.material = o.material.clone();

        o.material.transparent = v < 1;
        o.material.opacity = v;
    }

    const { children } = o;
    if (children)
    {
        for (let i = 0; i < children.length; i++)
        {
            setOpacity(children[i], v);
        }
    }
}

function disposeMaterials(o)
{
    if (o.material)
    {
        o.material.dispose();
    }

    const { children } = o;
    if (children)
    {
        for (let i = 0; i < children.length; i++)
        {
            disposeMaterials(children[i]);
        }
    }
}

function clearAll()
{
    for (let curr of instances)
    {
        curr.removeObject();
        grid.clearTile(curr);
    }
    addHistoryEntry(null, [ ... instances ])
    instances.clear();
    debouncedSync();
}

function renderUI()
{
    return new Promise(
        (resolve, reject) => {
            try
            {
                ReactDOM.render(
                    <EditorUI
                        editorState={ editorState }
                        clearAll={ clearAll }
                        download={ () => {
                            download("input.json", getCurrentInstancesAsJSON(), "text/json");
                        }}
                        undo={ undo }
                        canUndo={ canUndo }
                        redo={ redo }
                        canRedo={ canRedo }
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


class Output
{
    KEY = LOCAL_STORAGE_KEY;

    download = download;

    get grid()
    {
        return grid;
    }
}

export default new Output()
