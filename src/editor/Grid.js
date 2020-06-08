import { DoubleSide, Group, Mesh, PlaneBufferGeometry } from "three";
import { DIRT, TAU } from "../constants";


const TILE_SIZE = 1;

export default class Grid
{
    constructor(scene, size, materials)
    {
        this.scene = scene;

        const numMaterials = DIRT;
        this.data = new Float64Array(size * size * numMaterials)

        const offsets = new Float64Array(numMaterials * 2);
        this.offsets = offsets;

        let x = -size*TILE_SIZE/2;
        let y = -size*TILE_SIZE/2;

        let dx = 0;
        let dy = size * TILE_SIZE;

        let index = 0;
        let rotateEvery = 1;
        let rotateCount = rotateEvery;
        let flag = false;

        const group = new Group();

        for (let curr = 0; curr < numMaterials; curr++)
        {
            offsets[index++] = x;
            offsets[index++] = y;

            console.log("MATERIAL #", curr, "at", x, y);

            for (let ty = 0; ty < size; ty++)
            {
                for (let tx = 0; tx < size; tx++)
                {
                    const geo = new PlaneBufferGeometry(TILE_SIZE, TILE_SIZE, 1, 1);
                    const mat = materials[curr].clone();
                    mat.side = DoubleSide;
                    const mesh = new Mesh(geo, mat);
                    mesh.name = "M" + curr + "X" + (x/size) + "Y" + (y/size);
                    mesh.position.set(x + tx, y + ty, 0);
                    //mesh.rotation.y = -Math.PI
                    group.add(mesh);
                }
            }

            x += dx;
            y += dy;


            if (--rotateCount === 0)
            {
                const tmp = dx;
                dx = -dy;
                dy = tmp;

                if (flag)
                {
                    rotateEvery++;
                }
                flag = !flag;

                rotateCount = rotateEvery;
            }
        }

        group.rotation.x = TAU/4;

        this.group = group;

        scene.add(group);
    }

}
