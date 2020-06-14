import { describe, it } from "mocha";
const assert = require("power-assert");

const inputData = require("./test-input.json");

import Grid from "../src/editor/Grid";
import loadInstanceJSON from "../src/editor/loadInstanceJSON";
import prepareTiles from "../src/editor/prepareTiles";

const tiles = prepareTiles()

const array = require("./array.json");

describe("Input Rules", function(){
	it("can be loaded from JSON", function()
	{

	    const grid = new Grid(12);

	    loadInstanceJSON(inputData, tiles, grid);

	    //console.log(JSON.stringify([ ... grid.data ]))

        assert.deepEqual(
            array,
            [ ... grid.data ]
        )

		//console.log({tiles})

	});
});
