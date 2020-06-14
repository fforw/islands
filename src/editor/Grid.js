import { DoubleSide, Group, Mesh, PlaneBufferGeometry, Scene } from "three";
import { DIRT, TAU } from "../constants";
import { tileName } from "../util/inputToWFC";

export const TILE_SIZE = 1;

export const numMaterials = DIRT;

export default class Grid
{
    /**
     * Construct a new material grid.
     *
     * @param {Number} size         edge length of one material field (int)
     * @param {Scene} [scene]         three.js scene
     * @param {Array} [materials]     array with materials
     */
    constructor(size, scene, materials)
    {
        this.scene = scene;
        this.size = size;

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

                //console.log("MATERIAL #", curr, "at", x, y);

                if (scene)
                {
                    const geo = new PlaneBufferGeometry(TILE_SIZE * size, TILE_SIZE * size, 1, 1);
                    const mat = materials[curr].clone();
                    mat.side = DoubleSide;
                    const mesh = new Mesh(geo, mat);
                    mesh.name = "M" + curr;
                    mesh.position.set(x, y, 0);
                    //mesh.rotation.y = -Math.PI
                    group.add(mesh);
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

        if (scene)
        {
            this.group = group;

            scene.add(group);
        }

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
        const { sizeX, sizeZ } = tile;

        const rotationIndex = rotation * 2;

        let posX = tx + offsets[rotationIndex] * (sizeX - 1);
        let posY = ty + offsets[rotationIndex + 1] * (sizeZ - 1);

        const dx = directions[rotationIndex];
        const dy = directions[rotationIndex + 1];

        const matOff = material * gridSize * gridSize;

        const clean = !cleanFn;
        const indexes = !clean && new Uint32Array(sizeX * sizeZ);

        // correction of line plus rotated vector
        const lineDx = - dx * sizeX - dy;
        const lineDy = - dy * sizeZ + dx;


        let index = 0;
        for (let y = 0; y < sizeZ; y++)
        {
            for (let x = 0; x < sizeX; x++)
            {
                const offset = matOff + posX + posY * gridSize;

                const value = tile.pattern[y * sizeX + x];

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
