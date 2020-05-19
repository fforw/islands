import React, { useMemo, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from "react-three-fiber"
import { ExtrudeBufferGeometry, DirectionalLight, Plane, MeshStandardMaterial } from "react-three-fiber/components"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import OrganicQuads from "@fforw/organic-quads";


import {Shape} from "three"

function Islands()
{

    const island = useMemo(() => {

        const organicQuads = new OrganicQuads({
            numberOfRings: 3,
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
            const h = onEdge ? 0.5  : rnd < 0.7 ? 2 : rnd < 0.98 ? 10 : 15;
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
                    <MeshStandardMaterial attach="material" roughness={0.1} color="#ffebc2"/>
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
        </mesh>

    )
}

ReactDOM.render(
    <Canvas
        shadowMap
        camera={{
            position: [0, -75, 100],
            fov: 60
        }}
    >
        <Islands />
        <mesh
            receiveShadow
        >
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <MeshStandardMaterial attach="material" roughness={0.9} color="#6687e8"/>
        </mesh>
        <directionalLight position={[-10, -10, 30]} intensity={0.5} />
        <spotLight intensity={1} position={[30, 30, 50]} angle={0.7} penumbra={0.5} castShadow />
    </Canvas>,
    document.getElementById('root')
)
