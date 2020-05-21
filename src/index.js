import React, { useMemo, useRef } from "react"
import raf   from "raf"
import ReactDOM from "react-dom"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import {
    Color,
    CubeCamera,
    DirectionalLight,
    FrontSide,
    Float32BufferAttribute,
    IcosahedronBufferGeometry,
    LinearMipmapLinearFilter,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneBufferGeometry,
    RepeatWrapping,
    Scene,
    TextureLoader,
    WebGLRenderer,
    BoxBufferGeometry
} from "three";
import OrganicQuads from "@fforw/organic-quads";
import loadScene from "./loadScene";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import loadTexture from "./loadTexture";
import Services from "./worker/Services";


const organicQuads = new OrganicQuads({
    numberOfRings: 4,
    width: 100,
    height: 100,
    addQuads: true
});

let container, stats;
let camera, scene, renderer, light;
let controls, water, sphere;


function init() {

    container = document.getElementById( "container" );

    //

    renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    scene = new Scene();

    //

    camera = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 30, 30, 100 );

    //

    light = new DirectionalLight( 0xffffff, 0.8 );
    scene.add( light );

    // Water

    const waterGeometry = new PlaneBufferGeometry(10000, 10000);

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            alpha: 0.9,
            sunDirection: light.position.clone().normalize(),
            sunColor: "#fff8d5",
            waterColor: "#000e1e",
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    // Skybox

    const sky = new Sky();

    const uniforms = sky.material.uniforms;

    uniforms[ "turbidity" ].value = 5;
    uniforms[ "rayleigh" ].value = 1.5;
    uniforms[ "luminance" ].value = 1;
    uniforms[ "mieCoefficient" ].value = 0.05;
    uniforms[ "mieDirectionalG" ].value = 0.8;

    const parameters = {
        distance: 1000,
        inclination: 0.05,
        azimuth: 0.25
    };

    const cubeCamera = new CubeCamera(0.1, 1, 512);
    cubeCamera.renderTarget.texture.generateMipmaps = true;
    cubeCamera.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

    scene.background = cubeCamera.renderTarget;

    function updateSun() {

        const theta = Math.PI * (parameters.inclination - 0.5);
        const phi = 2 * Math.PI * (parameters.azimuth - 0.5);

        light.position.x = parameters.distance * Math.cos( phi );
        light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
        light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

        sky.material.uniforms[ "sunPosition" ].value = light.position.copy( light.position );
        water.material.uniforms[ "sunDirection" ].value.copy( light.position ).normalize();

        cubeCamera.update( renderer, sky );

    }

    updateSun();

    //

    const geometry = new BoxBufferGeometry(20, 20, 20);
    const count = geometry.attributes.position.count;

    const colors = [];
    const color = new Color();

    for (let i = 0; i < count; i += 3 ) {

        color.setHex( Math.random() * 0xffffff );

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

    }

    geometry.setAttribute( "color", new Float32BufferAttribute( colors, 3 ) );

    const material = new MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.0,
        flatShading: true,
        envMap: cubeCamera.renderTarget.texture,
        side: FrontSide
    });

    sphere = new Mesh( geometry, material );
    scene.add( sphere );

    //

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.45;
    controls.target.set( 0, 0, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 300.0;
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.update();

    //

    // stats = new Stats();
    // container.appendChild( stats.dom );

    // GUI

    //var gui = new GUI();

    // var folder = gui.addFolder( "Sky" );
    // folder.add( parameters, "inclination", 0, 0.5, 0.0001 ).onChange( updateSun );
    // folder.add( parameters, "azimuth", 0, 1, 0.0001 ).onChange( updateSun );
    // folder.open();
    //
    // var uniforms = water.material.uniforms;
    //
    // var folder = gui.addFolder( "Water" );
    // folder.add( uniforms.distortionScale, "value", 0, 8, 0.1 ).name( "distortionScale" );
    // folder.add( uniforms.size, "value", 0.1, 10, 0.1 ).name( "size" );
    // folder.add( uniforms.alpha, "value", 0.9, 1, .001 ).name( "alpha" );
    // folder.open();

    //

    window.addEventListener( "resize", onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function mainLoop() {

    render();
    //stats.update();
    controls.update()
    raf( mainLoop );

}

function render() {

    const time = performance.now() * 0.001;

    sphere.position.y = Math.sin( time ) * 5 + 1;
    sphere.rotation.x = time * 0.5;
    sphere.rotation.z = time * 0.51;

    water.material.uniforms[ "time" ].value += 1.0 / 60.0;

    renderer.render( scene, camera );

}


let waterNormals;

Promise.all([
    loadScene("assets/tiles.glb"),
    loadTexture("assets/waternormals.jpg")
])
    .then(([gltf, oceanNormals]) => {

        //scene.add( gltf.scene );

        // console.log("Scene Objects", gltf.scene.children.map(kid => kid.name).join(", "))
        //
        // const obj  = gltf.scene.children.find(
        //     kid => kid.name === "tree_default"
        // );

        oceanNormals.wrapS = oceanNormals.wrapT = RepeatWrapping;
        waterNormals = oceanNormals;

        // gltf.animations; // Array<AnimationClip>
        // gltf.scene; // Group
        // gltf.scenes; // Array<Group>
        // gltf.cameras; // Array<Camera>
        // gltf.asset; // Object

        // ReactDOM.render(
        //     <Game/>,
        //     document.getElementById("root")
        // )

        init();
        mainLoop();
    })
