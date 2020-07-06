import React from "react"
import raf from "raf"
import ReactDOM from "react-dom"
// noinspection ES6UnusedImports
import BASE_STYLE from "../style.css"
// noinspection ES6UnusedImports
import UI_STYLE from "../editor/ui.css"
import {
    CubeCamera,
    DirectionalLight,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    MOUSE,
    PerspectiveCamera,
    PlaneBufferGeometry,
    Scene,
    sRGBEncoding,
    Vector3,
    WebGLRenderer
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky";
import { action, configure, observable, reaction } from "mobx";
import "mobx-react-lite/batchingForReactDom"
import { BendUI } from "./ui";
import { PHI } from "../constants";


const TAU = Math.PI * 2;

const GRID_SIZE = 12;

//////////////////////////////////////////////////////////////////////

const LOCAL_STORAGE_KEY = "@fforw/islands:data"

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
    return window.innerWidth - (bendUIState.visible ? sidebarWidth : 0);
}


function onWindowResize()
{

    camera.aspect = getWidth() / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(getWidth(), window.innerHeight);

}

const bzv0 = new Vector3();
const bzv1 = new Vector3();

function bezierPoint(vector, v0, v1, t)
{
    const x = v0.x + (v1.x - v0.x) * t;
    const y = v0.y + (v1.y - v0.y) * t;
    const z = v0.z + (v1.z - v0.z) * t;

    vector.x = x;
    vector.y = y;
    vector.z = z;

    return vector;
}

function quadraticBezier(v0,v1,v2, current, out)
{
    const a = bezierPoint(bzv0, v0, v1, current);
    const b = bezierPoint(bzv1, v1, v2, current);

    return bezierPoint(out, a, b, current);
}



const control = new Vector3(0,1 / PHI,0);
const start = new Vector3(0,0,0);
const tmp = new Vector3(0,0,0);

const DEG_2_RAD = TAU / 360;

function mainLoop()
{
    if (controls)
    {
        controls.update()
    }

    const height = 2;

    // uniforms
    const rad = bendUIState.angle * DEG_2_RAD;
    const windX = Math.cos(rad);
    const windY = Math.sin(rad);

    const factor = ((bendUIState.strength / 100) - (bendUIState.stiffness / 100)) * (bendUIState.influence / 100);

    const dx = windX * factor * height * 0.5;
    const dz = windY * factor * height * 0.5;

    topSquare.position.x = dx;
    topSquare.position.y = height;
    topSquare.position.z = dz;

    tmp.copy(topSquare.position).sub(bottomSquare.position)
    const f = height / tmp.length();

    topSquare.position.x *= f;
    topSquare.position.y *= f;
    topSquare.position.z *= f;


    quadraticBezier(start, control, topSquare.position, midPos, midSquare.position);

    const sinMid0 = midSquare.position.x / height;
    const sinMid1 = midSquare.position.z / height;
    midSquare.rotation.y = -Math.asin(sinMid0);
    midSquare.rotation.x = Math.asin(sinMid1) + TAU/4;
    midSquare.rotation.order = "XZY";

    const sinTop0 = topSquare.position.x / height;
    const sinTop1 = topSquare.position.z / height;
    topSquare.rotation.y = -Math.asin(sinTop0);
    topSquare.rotation.x = Math.asin(sinTop1) + TAU/4;
    topSquare.rotation.order = "XZY";

    render();

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


function onKeyDown(ev)
{
    const {keyCode} = ev;

    // if (keyCode === 82) // R / shift-R
    // {
    //      rotation = (rotation + (ev.shiftKey ? 1 : -1)) & 3;
    // }
    // else if (keyCode === 90 && ev.ctrlKey) // ctrl+Z / ctrl+shift+Z
    // {
    //     if (ev.shiftKey)
    //     {
    //         redo();
    //     }
    //     else
    //     {
    //         undo();
    //     }
    // }

}


// set MobX configuration
configure({
    enforceActions: "observed"
});


class BendUIState {
    @observable
    visible = true;

    @observable
    angle = 90;

    @observable
    stiffness = 20;

    @observable
    influence = 100;

    @observable
    strength = 100;

    @action.bound
    toggle(v)
    {
        this.visible = v;
    }
}


const bendUIState = new BendUIState();

reaction(
    () => bendUIState.visible,
    onWindowResize
)

// reaction(
//     () => bendUIState.activeTileIndex,
//     () => {
//
//         const { activeTile, activeTileIndex } = bendUIState;
//         cursor.object.scale.set(activeTile.sizeX,activeTile.sizeY,activeTile.sizeZ);
//
//     }
// )


function renderUI()
{
    return new Promise(
        (resolve, reject) => {
            try
            {
                ReactDOM.render(
                    <BendUI
                        state={ bendUIState }
                    />,
                    uiContainer,
                    resolve
                );

            } catch (e)
            {
                reject(e);
            }
        }
    );
}

// -- STARTUP ----------------------------------------------------------------------------------------------------------

let bottomSquare, topSquare, midSquare;

let midPos = 0.5;

const SENSITIVITY = 2;

function onDocumentMouseMove( event ) {

    event.preventDefault();

    midPos = 0.5 + Math.max( -0.5, Math.min(0.5, (( window.innerHeight/2 - event.clientY) / window.innerHeight) * SENSITIVITY) ) ;


}

Promise.all([])
    .then(([]) => {

        //dump(_tiles.scene, "_tiles: ")
        //console.log(materials);

        document.title += " Bend"

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

        camera = new PerspectiveCamera(70, getWidth() / window.innerHeight, 1, 20000);
        camera.up.set(0, 1, 0);

        const dist = 3;

        camera.position.set(-dist, dist, 0);
        camera.lookAt(new Vector3(0, 0, 0));
        camera.updateProjectionMatrix();

        light = new DirectionalLight("#fff9e6", 1.4);
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

        const ground = new Mesh(
            new PlaneBufferGeometry(10, 10, 1, 1),
            new MeshStandardMaterial({
                color: "#fff",
                roughness: 0.9,
                side: DoubleSide
            })
        )
        ground.rotation.x = TAU / 4;

        scene.add(ground);

        bottomSquare = new Mesh(
            new PlaneBufferGeometry(1, 1, 1, 1),
            new MeshBasicMaterial({
                color: "#000",
                side: DoubleSide,
                transparent: true,
                opacity: 0.25,
                depthTest: false
            })
        )
        bottomSquare.rotation.x = TAU / 4;


        topSquare = new Mesh(
            new PlaneBufferGeometry(1, 1, 1, 1),
            new MeshBasicMaterial({
                color: "#f00",
                side: DoubleSide,
                transparent: true,
                opacity: 0.25
            })
        )
        topSquare.position.y = 2;
        topSquare.rotation.x = TAU / 4;


        midSquare = new Mesh(
            new PlaneBufferGeometry(1, 1, 1, 1),
            new MeshBasicMaterial({
                color: "#0c0",
                side: DoubleSide,
                transparent: true,
                opacity: 0.25,
                depthTest: false
            })
        )
        midSquare.position.y = 1;
        midSquare.rotation.x = TAU / 4;

        scene.add(bottomSquare);
        scene.add(midSquare);
        scene.add(topSquare);


        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        window.addEventListener("resize", onWindowResize, false);

        renderUI().then(mainLoop);

    })

// --- OUTPUT ----------------------------------------------------------------------------------------------------------

class Output {
}


export default new Output()
