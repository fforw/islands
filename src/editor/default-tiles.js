import { Object3D } from "three"

/**
 * @typedef {Object} TileDefinition
 *
 * @property {Array<Object3D>} variants         imported variants objects for this tile
 * @property {Number} id                        tile id. For multi-tiles the id of the upper left tile in rotation 0.
 * @property {Number} size                      tile size. default is 1
 * @property {HTMLCanvasElement} thumbnail      generated thumbnail as canvas
 *
 */



export const DEFAULT_TILES = {
        "cactus": {
            "variants": ["cactus_short", "cactus_tall"],
            "colors" : [ "#0c0"]
        },
        "flower": {
            "variants": [
                "flower_purpleA",
                "flower_purpleB",
                "flower_purpleC",
                "flower_redA",
                "flower_redB",
                "flower_redC",
                "flower_yellowA",
                "flower_yellowB",
                "flower_yellowC"
            ],
            "colors" : [ "#ff0"]
        },
        "stone_large": {
            "variants": ["stone_largeD", "stone_largeE", "stone_largeF"],
            "colors" : [ "#eee"]
        },
        "stone_small": {
            "variants": ["stone_smallD"],
            "colors" : [ "#888"]
        },
        "palm_tree": {
            "variants": ["tree_palmDetailedTall", "tree_palmShort", "tree_palmTall"],
            "colors" : [ "#8c0"]
        },
        "pine": {
            "variants": ["tree_pineRoundD", "tree_pineTallC_detailed", "tree_pineTallD"],
            "colors" : [ "#480"]
        },
        "tree_plateau": {
            "variants": ["tree_plateau"],
            "colors" : [ "#482"]
        },
        "tree_tall_dark": {
            "variants": ["tree_tall_dark"],
            "colors" : [ "#360"]
        },
        "tree_thin": {
            "variants": ["tree_thin"],
            "colors" : [ "#684"]
        },
        "house": {
            "variants": ["House"],
            "sizeX" : 3,
            "sizeY" : 2,
            "sizeZ" : 3,
            "reachable": true,
            "colors" : ["#f00"],

            "idCount" : 1,

            /**
             * Complex pattern (negative values are local ids: -1 = id, -2 = id +1 etc)
             */
            "pattern" : [
                0, 0, 0,
                0,-1, 0,
                0, 0, 0
            ]
        }
    }
;

