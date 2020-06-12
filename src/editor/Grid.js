import { DoubleSide, Group, Mesh, PlaneBufferGeometry, Scene } from "three";
import { DIRT, TAU } from "../constants";

export const TILE_SIZE = 1;

export default class Grid
{
    /**
     * Construcst a new material grid.
     *
     * @param {Scene} scene         three.js scene
     * @param {Number} size         edge length of one material field (int)
     * @param {Array} materials     array with materials
     */
    constructor(scene, size, materials, tiles)
    {
        this.scene = scene;
        this.size = size;
        this.tiles = tiles;

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
        group.name = "MaterialGrid"

        for (let curr = 0; curr < numMaterials; curr++)
        {
            offsets[index++] = x;
            offsets[index++] = y;

            console.log("MATERIAL #", curr, "at", x, y);

            const geo = new PlaneBufferGeometry(TILE_SIZE * size, TILE_SIZE * size, 1, 1);
            const mat = materials[curr].clone();
            mat.side = DoubleSide;
            const mesh = new Mesh(geo, mat);
            mesh.name = "M" + curr;
            mesh.position.set(x, y, 0);
            //mesh.rotation.y = -Math.PI
            group.add(mesh);


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


    /**
     * Sets or clears a tile or multi-tile in the grid. The given position must be a valid location to set a tile of that size.
     *
     * @param {Number} material                 material index
     * @param {Number} tx                       x-position in material
     * @param {Number} ty                       y-position in material
     * @param {TileDefinition} tile             tile definition
     * @param {Number} rotation                 tile rotation 0-3
     * @param {function|boolean} [cleanFn]      callback to clean other tiles from a given offset. If not given, the method will clear the multi tile on that offset
     */
    setTile(material, tx, ty, tile, rotation, cleanFn = null)
    {
        const { size : gridSize } = this;
        const { size } = tile;

        const rotationIndex = rotation * 2;

        let posX = tx + offsets[rotationIndex] * (size - 1);
        let posY = ty + offsets[rotationIndex + 1] * (size - 1);

        const dx = directions[rotationIndex];
        const dy = directions[rotationIndex + 1];

        const matOff = material * gridSize * gridSize;

        const clean = !cleanFn;
        const indexes = !clean && new Array(size * size);

        // correction of line plus rotated vector
        const lineDx = - dx * size - dy;
        const lineDy = - dy * size + dx;


        let index = 0;
        let value = tile.id
        for (let y = 0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const offset = matOff + posX + posY * gridSize;

                if (clean)
                {
                    if (this.data[offset] === value)
                    {
                        this.data[offset] = 0;
                    }
                }
                else
                {
                    if (this.data[offset] !== 0)
                    {
                        if (typeof cleanFn === "function")
                        {
                            cleanFn(offset);
                        }
                    }
                    indexes[index++] = offset;
                    this.data[offset] = value;
                }

                value++;
                posX += dx;
                posY += dy;
            }
            posX += lineDx;
            posY += lineDy;
        }

        return indexes;
    }

    clearTile(instance)
    {
        this.setTile(instance.material, instance.x, instance.y, instance.tile, instance.rotation, null);
    }
}

const offsets = [
    0,0,
    1,0,
    1,1,
    0,1
]

const directions = [
    1,0,
    0,1,
    -1,0,
    0,-1
]
