import TileInstance from "./TileInstance";
import { Vector3, Scene } from "three";
import findNamed from "../util/findNamed";


/**
 * Loads the input instance data from a JSON file
 *
 * @param {Object} data                     raw JSON data
 * @param {Array<TileDefinition>} tiles     array of tile definition
 * @param {Grid} grid                       grid instance
 * @param {Set<TileInstance>} [instances]   set of tile instances
 * @param {Scene} [scene]                   scene
 */
export default function loadInstanceJSON(data, tiles, grid, instances, scene)
{
    const { instances: rawInstances } = data;

    const notFound = new Set();

    for (let i = 0; i < rawInstances.length; i++)
    {
        const raw = rawInstances[i];

        const tile = findNamed(tiles, raw.name);

        if (tile)
        {
            const instance = new TileInstance(
                scene,
                tile,
                new Vector3(raw.position[0], raw.position[1], raw.position[2]),
                raw.rotation,
                raw.material,
                raw.x,
                raw.y
            );

            instance.variant = (Math.random() * tile.variants.length)|0;
            instance.indexes = raw.indexes;

            grid.setTile(instance.material, instance.x, instance.y, instance.tile, instance.rotation, true);

            if (instances)
            {
                instances.add(instance);
            }
        }
        else
        {
            notFound.add(raw.name);
        }
    }

    if (notFound.size > 0)
    {
        console.log("Could not find some tiles: ", notFound)
    }

}
