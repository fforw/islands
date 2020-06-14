import { getMaxId } from "../editor/prepareTiles";
import { numMaterials } from "../editor/Grid";
import { ICE, MATERIAL_NAMES, WATER } from "../constants";
import inputToWfc, { tileName } from "./inputToWFC";
import inputData from "../../input.json";
import {
    h_ground,
    h_size,
    td_bitmask,
    td_collapsed,
    td_entropy,
    td_ground,
    td_size,
    td_tileId,
    td_walkable
} from "../index";
import { g_size, t_n0, t_n1, t_n2, t_n3, t_size, t_tile0 } from "@fforw/organic-quads";
import printMask from "./printMask";


const WEIGHT_TARGETS = [
    1, // WATER
    0.95, // SAND
    0.5, // GRASS
    0.1, // FOREST
    0.8, // STONE
    1, // ICE
    1, // DIRT
    1, // PACKED_ICE
];

function calculateLogs(tiles, weights)
{
    const maxId = getMaxId(tiles);
    const numEntries = maxId + 1;
    const logsTable = new Float64Array(weights) ;

    for (let i=0; i < numMaterials; i++)
    {
        const off = i * numEntries + 1;
        for (let j = 0; j < maxId; j++)
        {
            const value = weights[off + j];
            if (value > 0)
            {
                logsTable[off + j] = Math.log2(value) * value;
            }
        }
    }

    //console.log({weights,logsTable});

    return logsTable;
}

let tiles, wfcData, logsTable;



const tmpCount = new Uint8Array(numMaterials);

let tmpMask;


function calculateEntropy(tileData, tileDataIndex, weights, numInts, maxId, ground)
{
    const numEntries = maxId + 1;

    let weightSum = 0;
    let sumWeightTimesLogWeight = 0;
    for (let j = 0; j < numInts; j++)
    {
        const maskValue = tileData[tileDataIndex + td_bitmask + j];

        let bit = 1;
        let tileId = 0;
        while (bit)
        {
            if ((maskValue & bit))
            {
                const offset = ground * numEntries + 1 + tileId;
                const weight = weights[offset];
                const weightTimesLogWeight = logsTable[offset];

                weightSum += weight;
                sumWeightTimesLogWeight += weightTimesLogWeight;
            }
            bit <<= 1
            tileId++;
        }
    }

    /*
        shannon_entropy_for_square = log(sum(weight)) - (sum( weight * log(weight) ) / sum(weight))
    */

    const entropy = Math.log2(weightSum) - (sumWeightTimesLogWeight / weightSum);

    //console.log("Entropy for #", tileDataIndex / td_size, MATERIAL_NAMES[ground], " = ", entropy )

    return entropy;
}


function prepare(oqTiles, heightMap, tileData, tileDefinitions)
{
    const { weights, adjacencies } = wfcData;

    const heightIndexFactor = h_size / g_size;

    const tileDataFactor = td_size / t_size;

    const maxId = getMaxId(tileDefinitions);
    const numInts = (maxId + 31) >> 5;

    const numEntries = maxId + 1;

    if (td_bitmask + numInts > td_size)
    {
        throw new Error("more td_bitmaskN values needed");
    }

    if (!tmpMask)
    {
        tmpMask = new Uint32Array(numInts)
    }

    const { length : tmpCountLen } = tmpCount;
    let tileDataIndex = 0;
    for (let i = 0; i < oqTiles.length; i += t_size)
    {
        // node indizes for our quad
        const n0 = oqTiles[i + t_n0];
        const n1 = oqTiles[i + t_n1];
        const n2 = oqTiles[i + t_n2];
        const n3 = oqTiles[i + t_n3];

        // equivalent height map indizes
        const heightIndex0 = n0 * heightIndexFactor;
        const heightIndex1 = n1 * heightIndexFactor;
        const heightIndex2 = n2 * heightIndexFactor;
        const heightIndex3 = n3 * heightIndexFactor;

        tmpCount.fill(0);

        tmpCount[heightMap[heightIndex0 + h_ground]]++;
        tmpCount[heightMap[heightIndex1 + h_ground]]++;
        tmpCount[heightMap[heightIndex2 + h_ground]]++;
        tmpCount[heightMap[heightIndex3 + h_ground]]++;

        let max = 0;
        let ground = -1;
        for (let j = 0; j < tmpCountLen; j++)
        {
            const value = tmpCount[j];
            if (value > max)
            {
                max = tmpCount[j];
                ground = j;
            }
        }
        tileData[tileDataIndex + td_ground ] = ground;

        // if we have no ground majority or if we have ground that's always empty
        if (ground === ICE || ground === WATER)
        {
            // store empty tile id and mark as collapsed
            tileData[tileDataIndex + td_tileId ] = 0;
            tileData[tileDataIndex + td_collapsed ] = 1;
        }
        else
        {
            let emptyNeighbor = false;
            for (let j = 0; j < 4; j++)
            {
                const other = oqTiles[i + t_tile0 + j];
                if (other >= 0)
                {
                    const otherTileDataIndex = other * tileDataFactor;

                    if (tileData[otherTileDataIndex + td_collapsed ])
                    {
                        emptyNeighbor = true;
                        break;
                    }
                }
            }

            const emptyOffset = ground * numEntries * numInts;
            const defaultsOffset = ground * numEntries * numInts + maxId * numInts;
            for (let j = 0; j < numInts; j++)
            {
                // if we have an empty neighbor, use empty's adjacencies as mask, otherwise use the default mask
                tileData[tileDataIndex + td_bitmask + j] = emptyNeighbor ?
                    adjacencies[emptyOffset + j] :
                    adjacencies[defaultsOffset + j];
            }

            //console.log("Initial Mask for #", tileDataIndex / td_size, " = ", tileData[tileDataIndex + td_bitmask])

            tileData[tileDataIndex + td_entropy] = calculateEntropy(tileData, tileDataIndex, weights, numInts, maxId, ground)
        }

        tileDataIndex += td_size;
    }

}


function printTileDataMask(tileDefinitions, tileData, tileDataIndex, numInts)
{
    let tileId = 0;
    let buf = "";
    for (let int = 0; int < numInts; int++)
    {
        let bit = 1;
        while (bit)
        {
            if (tileData[tileDataIndex + td_bitmask + int] & bit)
            {
                buf += tileName(tileDefinitions, tileId) + ", ";

            }
            bit <<=1;
            tileId++;
        }
    }

    return buf;
}


let tileIdReachable;


function createTileIdReachableLookup(maxId, tileDefinitions)
{
    const tileIdReachable = new Uint8Array(maxId);
    for (let i = 0; i < tileDefinitions.length; i++)
    {
        const {id, idCount, reachable} = tileDefinitions[i];

        if (reachable)
        {
            for (let j = 0; j < idCount; j++)
            {
                tileIdReachable[id + j] = 1;
            }

        }
    }

    return tileIdReachable;
}


export default function waveFunctionCollapse(organicQuads, heightMap, tileData, tileDefinitions)
{
    const { tiles } = organicQuads;

    //debugger;
    const maxId = getMaxId(tileDefinitions);
    const numInts = (maxId + 31) >> 5;
    const numEntries = maxId + 1;

    const tileFactor = t_size / td_size;
    const tileDataFactor = td_size / t_size;

    if (!wfcData)
    {
        wfcData = inputToWfc(inputData, 12, tileDefinitions, WEIGHT_TARGETS);

        // const { adjacencies } =  wfcData;
        //
        // for (let ground = 0; ground < numMaterials; ground++)
        // {
        //     console.log("DEFAULTS on ", MATERIAL_NAMES[ground], ": ", printMask(tileDefinitions, adjacencies, maxId, numInts, ground, maxId));
        // }

        logsTable = calculateLogs(tileDefinitions, wfcData.weights);
        tileIdReachable = createTileIdReachableLookup(maxId, tileDefinitions);
    }

    const { weights, adjacencies } = wfcData;

    prepare(tiles, heightMap, tileData, tileDefinitions)



    let tileWasCollapsed = false;

    let count = (tiles.length / t_size);
    let lowest = [];
    let lowCount;
    let choices = [];
    let choiceCount;
    let remainingWeightSum;


    do
    {
        lowCount = 0;
        let min = Infinity;

        for (let i = 0; i < tileData.length; i += td_size)
        {
            if (!tileData[i + td_collapsed])
            {
                const entropy = tileData[i + td_entropy];

                //console.log("entropy < min", entropy, min)
                if (entropy < min)
                {
                    min = entropy;
                    lowest[0] = i;
                    lowCount = 1;
                }
                else if (entropy === min)
                {
                    lowest[lowCount++] = i;
                }
            }
        }

        if (min === Infinity)
        {
            return;
        }


        let tileDataIndex;
        if (lowCount === 1)
        {
            tileDataIndex = lowest[0];
        }
        else
        {
            tileDataIndex = lowest[(Math.random() * lowCount)|0]
        }


        let choice = null;
        let tileId = 0;
        const ground = tileData[tileDataIndex + td_ground];


        choiceCount = 0;
        remainingWeightSum = 0;
        for (let int=0; int < numInts; int++)
        {
            const mask = tileData[tileDataIndex + td_bitmask + int];

            let bit = 1;
            while (bit)
            {
                if (mask & bit)
                {

                    if (tileData[tileDataIndex + td_walkable] || !tileIdReachable[tileId])
                    {
                        const weight = weights[ground * numEntries + 1 + tileId];

                        choices[choiceCount++] = weight;
                        choices[choiceCount++] = tileId;

                        remainingWeightSum += weight;
                    }

                }


                bit <<=1;
                tileId++;
            }
        }

        // choose from remaining choices

        if (choiceCount === 1)
        {
            choice = choices[1];
        }
        else
        {
            let rnd = Math.random() * remainingWeightSum|0;
            for (let j=0; j < choiceCount; j += 2)
            {
                const weight = choices[j]
                const tileId = choices[j + 1]
                rnd -= weight

                if (rnd <= 0)
                {
                    //console.log("choice = ", tileName(tileDefinitions, tileId))
                    choice = tileId;
                    break;
                }
            }
        }
        //console.log("Choose ", tileName(tileDefinitions, choice), " for ", tileDataIndex / td_size)

        tileData[tileDataIndex + td_tileId ] = choice;
        tileData[tileDataIndex + td_collapsed ] = 1;

        tileWasCollapsed = true;
        count--;

        const tileIndex = tileDataIndex * tileFactor;

        // propagate to neighbors
        for (let j=0; j < 4; j++)
        {
            const neighbor = tiles[tileIndex + t_tile0 + j];

            if (neighbor < 0)
            {
                continue;
            }

            //console.log("Propagate to " + neighbor / t_size)

            const neighborTileDataIndex = neighbor * tileDataFactor;
            const isCollapsed = tileData[neighborTileDataIndex + td_collapsed];
            if (!isCollapsed)
            {
                const ground = tileData[neighborTileDataIndex + td_ground];

                let first = true;

                // let buf = "";
                // let skipBuf = "";
                // let count = 1;
                for (let k=0; k < 4; k++)
                {
                    const connectedTile = tiles[neighbor + t_tile0 + k];
                    if (connectedTile < 0)
                    {
                        continue;
                    }
                    const connectedTileDataIndex = connectedTile * tileDataFactor;

                    const isCollapsed = tileData[connectedTileDataIndex + td_collapsed];
                    let tileId = tileData[connectedTileDataIndex + td_tileId];
                    if (isCollapsed && tileId !== -1)
                    {

                        const index = tileId >> 5;
                        const bit = 1 << (tileId - (index << 5));


                        if (!(adjacencies[ground * numEntries + maxId + index] & bit))
                        {
                            // if we find a tile on a neighboring layer with different ground that is not allowed
                            // on our terrain, we just ignore it.
                            // skipBuf += ("Skip " + tileName(tileDefinitions, tileId) + " on " + MATERIAL_NAMES[ground]+ ", index = " + index + ", bit = " + bit)
                            // skipBuf += printMask(tileDefinitions, adjacencies, maxId, numInts, ground, tileId)

                            continue;
                        }


                        for (let int=0; int < numInts; int++)
                        {
                            const maskValue = adjacencies[ground * numEntries + tileId + int];

                            if (first)
                            {
                                tileData[connectedTileDataIndex + td_bitmask + int ] = maskValue;

                                //buf += count++ + ":" + tileName(tileDefinitions, tileId) + ": Mask = " + printMask(tileDefinitions, adjacencies, maxId, numInts, ground, tileId) + "\n"

                            }
                            else
                            {
                                tileData[neighborTileDataIndex + td_bitmask + int ] &= maskValue;
                                //buf += count++ + ":" + tileName(tileDefinitions, tileId) + ": Mask = " + printMask(tileDefinitions, adjacencies, maxId, numInts, ground, tileId) + "\n"
                            }
                        }

                        first = false;
                    }
                }

                let empty = true;
                for (let int=0; int < numInts; int++)
                {
                    if (tileData[neighborTileDataIndex + td_bitmask + int])
                    {
                        empty = false;
                        break;
                    }
                }

                if (empty)
                {
                    // console.log("No solution for tile ", neighbor / t_size, " on " ,MATERIAL_NAMES[ground] , ":\n", buf)
                    // if (skipBuf.length)
                    // {
                    //     console.log("SKIP:", skipBuf)
                    // }

                    tileData[neighborTileDataIndex + td_tileId ] = 0;
                    tileData[neighborTileDataIndex + td_collapsed ] = 1;
                }
                else
                {
                    // update entropy
                    tileData[neighborTileDataIndex + td_entropy] = calculateEntropy(tileData, neighborTileDataIndex, weights, numInts, maxId, ground)
                }
            }
        }

    } while(tileWasCollapsed && count > 0)
}

