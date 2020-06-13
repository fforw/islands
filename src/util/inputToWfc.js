import Grid, { numMaterials } from "../editor/Grid";
import loadInstanceJSON from "../editor/loadInstanceJSON";
import prepareTiles, { getMaxId } from "../editor/prepareTiles";

const tiles = prepareTiles()
const maxId = getMaxId(tiles);
const t_size = maxId + 1;

export default function (inputData, size)
{
    const grid = new Grid(size);
    loadInstanceJSON(inputData, tiles, grid);

    const tileLookup = new Map();

    for (let i = 0; i < tiles.length; i++)
    {
        const tile = tiles[i];

        const { sizeX, sizeZ } = tile;
        const max = sizeX * sizeZ;
        for (let j = 0; j < max; j++)
        {
            tileLookup.put( i + j, tile);
        }
    }


    let index = 0;
    const last = size - 1;

    const tableSize = numMaterials * maxId * t_size;
    const table = new Float64Array(tableSize);

    for (let mat = 0; mat < numMaterials; mat++)
    {
        for (let y=0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const tile = grid.data[index];

                const top = y === 0 ? 0 : grid.data[index - size];
                const right = x === last ? 0 : grid.data[index + 1];
                const bottom = y === last ? 0 : grid.data[index + size];
                const left = x === 0 ? 0 : grid.data[index - 1];

                const off = mat * maxId * t_size + tile * t_size;
                table[ off ] += 4;

                table[ off + 1 + top]++;
                table[ off + 1 + right]++;
                table[ off + 1 + bottom]++;
                table[ off + 1 + left]++;
                index++;
            }
        }
    }

    for (let i = 0; i < tableSize; i += t_size)
    {
        const count = table[i];

        if (count > 0)
        {
            table[i] = i / t_size;

            const factor = 1 / count;

            for (let j=0; j < maxId ; j++)
            {
                table[i + 1 + j] *= factor;
            }
        }
    }

    return table;
}


/*

wx
yz

 */
