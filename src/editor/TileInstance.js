import { TILE_SIZE } from "./Grid";

import { Scene, Vector3 } from "three"
import { TAU } from "../constants";


let idCounter = 0;

export default class TileInstance
{
    scene;
    tile;
    position;
    object = null;
    indexes = null;

    /**
     *  Creates a new tile instance
     *
     * @param {Scene} scene             three.js scene
     * @param {TileDefinition} tile     tile definition
     * @param {Vector3} position        position of the tile
     * @param {number} rotation         tile rotation (0-3)
     * @param {Number} material         material index
     * @param {Number} x                tile x
     * @param {Number} y                tile y
     */
    constructor(scene, tile, position, rotation, material, x, y)
    {
        this.id = ++idCounter;

        this.scene = scene;
        this.tile = tile;
        this.position = position.clone();
        this.rotation = rotation;

        this.material = material;
        this.x = x;
        this.y = y;

        if (scene)
        {
            this.createObject();
        }
    }

    createObject()
    {
        const { tile, scene, position, rotation } = this;
        const { variants } = tile;

        this.variant = Math.random() * variants.length|0;

        const newObject = variants[this.variant].clone();
        newObject.scale.set(TILE_SIZE, TILE_SIZE, TILE_SIZE)
        newObject.position.copy(position)

        newObject.rotation.y = TAU * rotation / 4;

        this.object = newObject;
        scene.add(newObject);
    }

    removeObject()
    {
        const { scene, object } = this;

        if (object)
        {
            scene.remove(object);
            this.object = null;
        }
    }

}
