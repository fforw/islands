import { Box3, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"



/**
 * Takes an array of three.js objects and resolves to an array of#
 * canvases containing thumbnails
 *
 * @param {Array<Object3D>} objects     array of objects
 * @param {Number} width                thumbnail image width
 * @param {Number} height               thumbnail image height
 * @param {Array<String>} [names]        optional array of names
 * @return {Promise<Array<HTMLCanvasElement>>}
 */
export default function threeJsThumbnailer(objects, width, height, names) {
    return new Promise(
        resolve => {

            const canvases = [];

            const container = document.createElement("div");
            document.body.appendChild(container)
            container.style.position = "absolute";
            container.style.top = "0px";
            container.style.left = "-10000px";

            const renderer = new WebGLRenderer({
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            container.appendChild(renderer.domElement);

            const scene = new Scene();
            //scene.background = new Color("#888")

            const camera = new PerspectiveCamera(55, width / height, 0.1, 100);

            const light = new DirectionalLight("#fff8d5", 1.4);
            light.position.set(0, 3, -1.5)
            scene.add(light);

            const images = [];

            let current;
            for (let i = 0; i < objects.length; i++)
            {
                if (current)
                {
                    scene.remove(current)
                }

                current = objects[i].clone();

                const box = new Box3();
                box.expandByObject(current)

                const size = Math.max(
                    box.max.x - box.min.x,
                    box.max.y - box.min.y
                )

                const isSmall = size < 1.5;
                const dist = isSmall ? Math.pow(size, 0.9) * 1.2 : size * 1.5;
                camera.up.set(0, 1, 0);

                //console.log(current.name, direction, box)
                camera.position.set(0, box.max.y * (isSmall ? 1.1 : 0.9), -dist);
                camera.lookAt(new Vector3(0, (box.max.y + box.min.y) / (isSmall ? 2 : 4), 0));
                camera.updateProjectionMatrix();

                current.position.set(0, 0, 0)
                scene.add(current);

                renderer.render(scene, camera);

                const copy = document.createElement("canvas")

                copy.width = width;
                copy.height = height;

                const ctx = copy.getContext("2d");
                ctx.drawImage(
                    renderer.domElement,
                    0,0
                );
                ctx.strokeStyle = "rgba(255,255,255,0.4)";
                ctx.fillStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(0,0,width, height)
                ctx.stroke();

                const thumbName = names ? names[i] : current.name;
                ctx.fillText(thumbName, 4, height - 4)


                // const img = new Image();
                // img.src = renderer.domElement.toDataURL();
                //
                // images.push(img);
                images.push(copy);
            }

            resolve(images);

            scene.dispose();
            renderer.dispose();

            document.body.removeChild(container)
        }
    )
}
