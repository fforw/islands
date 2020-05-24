import domready from "domready"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { heightLimit } from "./heightLimit";


const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

const config = {
    width: 0,
    height: 0
};

let ctx, canvas;


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

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "#fff";

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 256);
        ctx.lineTo(256, 256);
        ctx.stroke();

        ctx.strokeStyle = "#f00";



        ctx.beginPath();
        for (let i = 0; i < 1; i += 0.01)
        {
            const y = heightLimit(i);

            if (i === 0)
            {
                ctx.moveTo(
                    i * 256,
                    256 - y* 256
                );
            }
            else
            {
                ctx.lineTo(
                    i * 256,
                    256 - y* 256
                );

            }

        }

        ctx.stroke();

    }
);
