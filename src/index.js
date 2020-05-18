import React, { useRef, useState } from "react"
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from "react-three-fiber"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { Color } from "three";

const VOLUME = 8;

const randomSize = () => {
    const out = new Array(3);

    const w = Math.round((1 + Math.random()) * 10)/10;
    const h = Math.round((1 + Math.random()) * 10)/10;
    const d = VOLUME / (w * h);
    out[0] = w;
    out[1] = h;
    out[2] = d;

    console.log("SIZE: " + out.join(" x "));

    return out;
};

function Thing() {

    const [size, setSize] = useState(randomSize);

    const ref = useRef();
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
    return (
        <mesh
            ref={ref}
            onClick={e => setSize(randomSize()) }
            onPointerOver={e => console.log('hover')}
            onPointerOut={e => console.log('unhover')}>
            <boxBufferGeometry attach="geometry" args={ size } />
            <meshPhongMaterial attach="material" color={ new Color(0,0,128)} />
        </mesh>
    )
}

ReactDOM.render(
    <Canvas>
        <Thing />
    </Canvas>,
    document.getElementById('root')
)
