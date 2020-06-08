import domready from "domready"
import raf from "raf"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { Vector } from "@fforw/organic-quads";


const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;

const config = {
    width: 0,
    height: 0
};

let ctx, canvas;


let mouseX = 0;
let mouseY = 0;

let pos;
let vX1;
let vX2;
let vY1;

/**
 * Basic 2D visualization of our 3D quad projection.
 *
 * Projects the mouse cursor relative to the blue quad onto the red squad and draws a green dot.
 *
 */
domready(
    () => {

        const container = document.getElementById("container");

        canvas = document.createElement("canvas");
        container.appendChild(canvas);

        ctx = canvas.getContext("2d");

        const width = (window.innerWidth) | 0;
        const height = (window.innerHeight) | 0;



        config.width = width;
        config.height = height;

        canvas.width = width;
        canvas.height = height;

        const hw = width / 2;
        const hh = height / 2;

        const boxSize = Math.min(width, height) / 2;

        const bx = width/4;
        const by = -boxSize/2;

        ctx.translate(width/3, hh)

        let vertices;

        const randomQuad = () => {
            vertices = [];
            for (let i=0; i < TAU; i += TAU/4)
            {
                const angle = i - TAU/16 + Math.random() * TAU/8;
                const dist = hh / PHI - hh/16 + Math.random() * hh / 8;

                // start at the bottom, clockwise order
                const x = -Math.sin(angle) * dist;
                const y = Math.cos(angle) * dist;
                vertices.push(x, y);
            }

            pos = new Vector(vertices[0],  vertices[1]);
            vX1 = new Vector(vertices[6] - vertices[0], vertices[7] - vertices[1]);
            vX2 = new Vector(vertices[4] - vertices[2], vertices[5] - vertices[3]);
            vY1 = new Vector(vertices[2] - vertices[0], vertices[3] - vertices[1]);

        }


        function clear()
        {
            ctx.fillStyle = "#000";
            ctx.fillRect(-hw, -hh, width, height);
        }


        function renderQuads()
        {

            ctx.strokeStyle = "#f00";
            ctx.beginPath();

            const {length} = vertices

            ctx.moveTo(vertices[length - 2], vertices[length - 1]);
            for (let i = 0; i < length; i += 2)
            {
                ctx.lineTo(vertices[i], vertices[i + 1]);
            }
            ctx.stroke();

            ctx.strokeStyle = "#46f";
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + boxSize, by);
            ctx.lineTo(bx + boxSize, by + boxSize);
            ctx.lineTo(bx, by + boxSize);
            ctx.lineTo(bx, by);

            ctx.moveTo(bx, by);
            ctx.lineTo(bx + boxSize, by + boxSize);

            ctx.moveTo(bx, by + boxSize);
            ctx.lineTo(bx + boxSize, by);

            ctx.stroke();

            ctx.strokeStyle = "#F00";
            {
                ctx.beginPath();
                const p = interpolate(0,0);
                ctx.moveTo(p.x,p.y)
                for (let x = 0.1; x < 1; x += 0.1)
                {
                    const p = interpolate(x,x);

                    ctx.lineTo(p.x, p.y);
                }

                ctx.stroke();
            }
            {
                ctx.beginPath();
                const p = interpolate(0,1);
                ctx.moveTo(p.x,p.y)
                for (let x = 0.1; x < 1; x += 0.1)
                {
                    const p = interpolate(x,1 - x);
                    ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }

        }


        function interpolate(x, y)
        {
            const vAxisStart = vX1.copy().scale(x).add(pos);
            const vAxisEnd = vX2.copy().scale(x).add(pos).add(vY1);

            return vAxisEnd.subtract(vAxisStart).scale(y).add(vAxisStart);
        }

        const mainLoop = () =>{

            clear();
            renderQuads();

            const transformed = interpolate(mouseX, mouseY);

            //console.log((mouseX - width/3 - 300)/boxSize, (100 - (mouseY - hh))/boxSize, "=>", transformed.x, transformed.y);

            ctx.fillStyle = "#0f0";
            ctx.fillRect(transformed.x - 2, transformed.y - 2, 4, 4);

            raf(mainLoop)

        }

        randomQuad();

        const updateCoords = ev =>{

            const rect = canvas.getBoundingClientRect();

            let x,y;
            if (ev.touches)
            {
                x = ev.touches[0].clientX - rect.left;
                y = ev.touches[0].clientY - rect.top;
            }
            else
            {
                x = ev.clientX - rect.left;
                y = ev.clientY - rect.top;
            }


            // if the mouse is within the blue box, it's position goes from 0,0 to 1,1
            mouseX = (x - width/3 - bx)/boxSize;
            mouseY = (boxSize/2 - (y - hh))/boxSize;

        };

        canvas.addEventListener("click", randomQuad, true);
        canvas.addEventListener("mousemove", updateCoords, true)
        canvas.addEventListener("touchmove", updateCoords, true)

        raf(mainLoop)
    }
);

