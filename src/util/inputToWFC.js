import Grid, { numMaterials } from "../editor/Grid";
import loadInstanceJSON from "../editor/loadInstanceJSON";
import { MATERIAL_NAMES } from "../constants";
import { getMaxId } from "../editor/prepareTiles";



export function tileName(tiles, tileId)
{
    for (let i = 0; i < tiles.length; i++)
    {
        const { name, id, idCount} = tiles[i];

        if (tileId === id)
        {
            return name;
        }

        if (tileId > id && tileId < id + idCount)
        {
            return name + "-" + (tileId - id + 1);
        }
    }

    return "ERR:" + tileId;
}



export default function inputToWFC(inputData, size, tiles, weightTargets)
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

            //console.log(MATERIAL_NAMES[mat], ":", tileName(tiles, tileA), " -> ", tileName(tiles, tileB), { index, bit} )
        }
    }

    const numEntries = maxId + 1;

    const numWeights = numMaterials * numEntries;
    const weights = new Uint32Array( numWeights);

    const numAdjacencies = numMaterials * maxId * numInts;
    const adjacencies = new Uint32Array(numAdjacencies);

    for (let mat = 0; mat < numMaterials; mat++)
    {
        for (let y=0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const tile = grid.data[index];

                if (tile !== 0)
                {
                    weights[mat * numEntries + 1 + tile]++;
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

    index = 0;
    for (let i=0; i < numMaterials; i++)
    {
        let sum = 0;
        for (let j = 1; j < maxId; j++)
        {
            sum += weights[index + 1 + j];
        }
        if (sum === 0)
        {
            weights[index + 1] = 1;
            weights[index] = 1;
        }
        else
        {
            const emptyWeight = sum * weightTargets[i];
            weights[index + 1] = emptyWeight;
            weights[index] = sum + emptyWeight;
        }
        index += numEntries
    }


    return {
        weights,
        adjacencies
    };
}
