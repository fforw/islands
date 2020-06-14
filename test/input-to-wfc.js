import { describe, it } from "mocha";
const assert = require("power-assert");
import prepareTiles, { getMaxId } from "../src/editor/prepareTiles";
import inputToWfc, { tileName } from "../src/util/inputToWFC";
import { numMaterials } from "../src/editor/Grid";
import { MATERIAL_NAMES } from "../src/constants";
import printMask from "../src/util/printMask";

const inputData = require("./test-input.json");


const WEIGHT_TARGETS = [
	1, // WATER
	0.8, // SAND
	0.3, // GRASS
	0.1, // FOREST
	0.6, // STONE
	1, // ICE
	1, // DIRT
	1, // PACKED_ICE
];




describe("Input-To-WFC", function(){
	it("creates WFC stats from input rules", function()
	{
		const tiles = prepareTiles()

		//console.log("TILES", JSON.stringify(tiles, null, 4))

		const {weights, adjacencies} = inputToWfc(inputData, 12, tiles, WEIGHT_TARGETS);


		console.log({weights});

		const maxId = getMaxId(tiles);
		const numEntries = maxId + 1;

		const numInts = (maxId + 31) >> 5;

		for (let i=0; i < numMaterials; i++)
		{
			const off = i * numEntries;
			if (weights[off + 1] === 1)
			{
				console.log("On " + MATERIAL_NAMES[i]+ ": " + tileName(tiles,0)," = 100%");
			}
			else
			{
				const sum = weights[off];
				let buf = "";
				for (let j = 0; j < maxId; j++)
				{
					const value = weights[off + 1 + j];
					if (value > 0)
					{
						buf += tileName(tiles,j) + " = " + Math.round(value / sum * 100) + "%, "
					}
				}
				console.log("On " + MATERIAL_NAMES[i]+ ": " + buf);
			}
		}

		console.log("\n------------------------------------------------------------------------------\n")

	    for (let i=0; i < numMaterials; i++)
		{
			for (let j = 0; j < maxId; j++)
			{
				const buf = printMask(tiles, adjacencies, maxId, numInts, i, j);

				if (buf.length)
				{
					console.log("ON ", MATERIAL_NAMES[i] , ", " , tileName(tiles, j), "is adjacent to ", buf);
				}
			}

			console.log("DEFAULT MASK ON ", MATERIAL_NAMES[i], ": ", printMask(tiles, adjacencies, maxId, numInts, i, maxId))
		}



	});
});
