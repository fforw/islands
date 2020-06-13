import Grid, { numMaterials } from "../editor/Grid";
import loadInstanceJSON from "../editor/loadInstanceJSON";
import { MATERIAL_NAMES } from "../constants";
import { getMaxId } from "../editor/prepareTiles";



function tileName(tiles, tileId)
{
    for (let i = 0; i < tiles.length; i++)
    {
        const { name, id, idCount} = tiles[i];
        if (tileId >= id && tileId < id + idCount)
        {
            return name;
        }
    }

    return "ERR:" + tileId;
}



export default function (inputData, size, tiles)
{
    const maxId = getMaxId(tiles);

    // how many ints do we need to express a bitmask of with all possible tile states?
    const numInts = (maxId + 31) >> 5;

    const grid = new Grid(size);
    loadInstanceJSON(inputData, tiles, grid);

    let index = 0;
    const last = size - 1;

    const  add = (adjacencies, mat, tileA, tileB) =>
    {
        const index = tileB >> 5;
        const bit = 1 << (tileB - (index << 5));

        const offset = mat * maxId * numInts + tileA * numInts + index;
        const value = adjacencies[offset ];
        const changed = value | bit;
        if (value !== changed)
        {
            adjacencies[offset ] = changed;

            console.log(MATERIAL_NAMES[mat], ":", tileName(tiles, tileA), " -> ", tileName(tiles, tileB), { index, bit} )
        }
    }

    const counts = new Uint32Array( numMaterials * maxId);
    const tableSize = numMaterials * maxId * numInts;
    const adjacencies = new Uint32Array(tableSize);

    for (let mat = 0; mat < numMaterials; mat++)
    {
        for (let y=0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const tile = grid.data[index];

                if (tile !== 0)
                {
                    counts[mat * maxId + tile]++;
                }

                const top = y === 0 ? 0 : grid.data[index - size];
                const right = x === last ? 0 : grid.data[index + 1];
                const bottom = y === last ? 0 : grid.data[index + size];
                const left = x === 0 ? 0 : grid.data[index - 1];

                add(adjacencies, mat, tile, top)
                add(adjacencies, mat, tile, right)
                add(adjacencies, mat, tile, bottom)
                add(adjacencies, mat, tile, left)
                index++;
            }
        }
    }

    return {
        counts,
        adjacencies
    };
}
