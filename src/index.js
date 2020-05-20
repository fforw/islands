import React, { useMemo, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import domready from 'domready'
import { Canvas, useFrame } from "react-three-fiber"
import { ExtrudeBufferGeometry, DirectionalLight, Plane, MeshStandardMaterial, HemisphereLight  } from "react-three-fiber/components"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import OrganicQuads from "@fforw/organic-quads";


import {Shape} from "three"
import loadScene from "./loadScene";
import loadTexture from "./loadTexture";

function Islands()
{

    const island = useMemo(() => {

        const organicQuads = new OrganicQuads({
            numberOfRings: 4,
            width: 100,
            height: 100,
            addQuads: true
        });

        const {quads, graph} = organicQuads;

        const {length} = quads;

        const height = new Float32Array(length / 4);

        const boxes = [];
        for (let i = 0; i < height.length; i++)
        {

            const n0 = quads[i * 4];
            const n1 = quads[i * 4 + 1];
            const n2 = quads[i * 4 + 2];
            const n3 = quads[i * 4 + 3];

            const onEdge = (graph[n0 + 2] || graph[n1 + 2] || graph[n2 + 2] || graph[n3 + 2])

            const cx = (graph[n0] + graph[n1] + graph[n2] + graph[n3]) / 4;
            const cy = (graph[n0 + 1] + graph[n1 + 1] + graph[n2 + 1] + graph[n3 + 1]) / 4;

            const rnd = Math.random();
            const h = onEdge ? 0.5  : rnd < 0.7 ? 2 : rnd < 0.98 ? 10 + Math.random() : 15;
            height[i] = h;

            const shape = new Shape();

            shape.moveTo(graph[n0], graph[n0 + 1]);
            shape.lineTo(graph[n1], graph[n1 + 1]);
            shape.lineTo(graph[n2], graph[n2 + 1]);
            shape.lineTo(graph[n3], graph[n3 + 1]);
            shape.lineTo(graph[n0], graph[n0 + 1]);

            const box = (
                <mesh
                    key={i}
                    rotateOnWorldAxis={true}
                    castShadow
                    receiveShadow
                >
                    <ExtrudeBufferGeometry
                        attach="geometry"
                        args={[
                            shape,
                            {
                                steps: 2,
                                depth: h,
                                bevelEnabled: true,
                                bevelThickness: 0.5,
                                bevelSize: 0.5,
                                bevelOffset: 0,
                                bevelSegments: 2
                            }
                        ]}

                    />
                    <MeshStandardMaterial attach="material" roughness={0.9} color="#ffe6ee"/>
                </mesh>
            );

            //console.log("BOX", h, box);

            boxes.push(
                box
            )
        }

        console.log("INIT", {quads, height})

        return {
            organicQuads,
            height,
            boxes
        }
    }, [])

    const ref = useRef();
    useFrame(() => (ref.current.rotation.z += 0.01));

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
        >
            {
                island.boxes
            }
            <planeBufferGeometry attach="geometry" args={[1000, 1000, 10, 100, 100, 10]} />
            <MeshStandardMaterial attach="material" roughness={0.33} color="#6687e8" normalMap={ oceanNormals }/>
        </mesh>

    )
}

const Game = () => {

    return (
        <Canvas
            shadowMap
            camera={{
                position: [0, -50, 75],
                fov: 60
            }}
        >
            <Islands />
            <directionalLight position={[0,0,1]} intensity={0.4} color="#e6e8ff"/>
            <spotLight intensity={1} position={[30, 30, 50]} angle={0.7} penumbra={1} castShadow color="#fff9e6"/>
        </Canvas>
    )
}

let waterMaterial;
let oceanNormals;

Promise.all([
    loadScene(
        "assets/tiles.glb",
    ),
    loadTexture(
        "assets/ocean-normals.png"
    )
])
.then(([gltf, tOceanNormals]) => {

    //scene.add( gltf.scene );

    console.log("Scene Objects", gltf.scene.children.map(kid => kid.name).join(", "))

    waterMaterial = gltf.scene.children.find(
        kid => kid.name === "Water"
    ).material;

    oceanNormals = tOceanNormals;

    // gltf.animations; // Array<THREE.AnimationClip>
    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object

    ReactDOM.render(
        <Game/>,
        document.getElementById("root")
    )

})
