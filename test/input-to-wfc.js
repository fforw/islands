import { describe, it } from "mocha";
const assert = require("power-assert");

const inputData = require("./test-input.json");

import Grid, { numMaterials } from "../src/editor/Grid";
import loadInstanceJSON from "../src/editor/loadInstanceJSON";
import prepareTiles, { getMaxId } from "../src/editor/prepareTiles";
import inputToWfc from "../src/util/inputToWfc";
import { MATERIAL_NAMES } from "../src/constants";

const tiles = prepareTiles()

describe("Input-To-WFC", function(){
	it("creates stats", function()
	{
		const table = inputToWfc(inputData, 12);

		const maxId = getMaxId(tiles);

		const numTiles = tiles.length;

		const names = new Map();

		for (let i=0; i < numTiles; i++)
		{
			const { name, id, sizeX, sizeZ } = tiles[i];

			const subCount = sizeX * sizeZ;

			for (let j=0; j < subCount; j++)
			{
				names.set(id + j, name + "-" + (j + 1));
			}
		}


		const t_size = maxId + 1;

		for (let i=0; i < numMaterials; i++)
		{
			for (let j=0; j < maxId; j++)
			{
				let stats = "";
				for (let k=0; k < maxId; k++)
				{
					const v = table[i * maxId * t_size + j * t_size + 1 + k];
					if (v > 0)
					{
						stats += "from " + names.get(j) + " to " + names.get(k) + " = " + (v * 100) + "%, ";
					}
				}

				if (stats.length > 0)
				{
					console.log("TILE ", names.get(j), "ON", MATERIAL_NAMES[i], ":", stats);
				}

			}
		}

		//console.log({table})

	});
});
