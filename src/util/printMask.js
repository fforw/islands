import { tileName } from "./inputToWFC";


export default function printMask(tileDefinitions, adjacencies, maxId, numInts, material, tileId)
{
    let buf = "";

    const numEntries = maxId + 1;

    for (let k = 0; k < maxId; k++)
    {
        const index = k >> 5;
        const bit = 1 << (k - (index << 5));
        const mask = adjacencies[material * numEntries * numInts + tileId * numInts + index];
        if (mask & bit)
        {
            buf += tileName(tileDefinitions, k) + ", ";
        }
    }

    return buf;
}

