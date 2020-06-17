// noinspection ES6UnusedImports
import STYLE from "./style.css"
import { Box3, Color, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import loadScene from "./util/loadScene";
import { Sky } from "three/examples/jsm/objects/Sky";
import threeJsThumbnailer from "./util/threeJsThumbnailer";


const TAU = Math.PI * 2;

//////////////////////////////////////////////////////////////////////

let container, stats, grid;
let camera, scene, renderer, light;
let controls, water;


function render()
{
    const time = performance.now() * 0.0001;

    // sphere.position.y = Math.sin( time ) * 5 + 1;
    // sphere.rotation.x = time * 0.5;
    // sphere.rotation.z = time * 0.51;

    renderer.render(scene, camera);

    if (controls)
    {
        controls.update()
    }
}


let tiles, envMap;

let count = 0;
let current;

let width = 60;
let height = 80;

loadScene("assets/tiles.glb")

    .then((tiles) => {

        tiles = tiles.scene.children.filter(
            o => o.type === "Mesh" || o.type === "Group"
        );

        return Promise.all([
            tiles,
            threeJsThumbnailer(
                tiles,
                width,
                height
            )
        ])
    })
    .then(([tiles, thumbnails]) => {


        document.title += " Tumbnail test"

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const container = document.createElement("div")
        container.className = "flex"
        container.style.width = "200px"

        for (let i = 0; i < thumbnails.length; i++)
        {
            const thumbnail = thumbnails[i];
            //                        document.body.appendChild(document.createTextNode(tiles[i].name));
            container.appendChild(thumbnail);
        }

        document.body.appendChild(container);

    })


