import { DEFAULT_TILES } from "./default-tiles";
import threeJsThumbnailer from "../util/threeJsThumbnailer";


export function getMaxId(tiles)
{
    return tiles[tiles.length - 1].id + tiles[tiles.length - 1].idCount;
}

function createEmptyThumbnail()
{
    const canvas = document.createElement("canvas");
    canvas.width = thumbnailWidth;
    canvas.height = thumbnailHeight;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255,64,64,0.5)";
    ctx.fillStyle = "#fff";

    const hw = thumbnailWidth * 0.5;
    const hh = thumbnailHeight * 0.5;
    const size = Math.min(hh,hw) * 0.3;

    ctx.beginPath();
    ctx.moveTo(-size + hw,-size + hh);
    ctx.lineTo( size + hw, size + hh);
    ctx.moveTo( size + hw,-size + hh);
    ctx.lineTo(-size + hw, size + hh);
    ctx.rect(0,0,thumbnailWidth,thumbnailHeight)
    ctx.stroke();

    ctx.fillText("None", 4, thumbnailHeight - 4);
    return canvas;
}
    
const thumbnailWidth = 40;
const thumbnailHeight = thumbnailWidth / 0.75;

export default function prepareTiles(tilesGLTF)
{
    const tiles = [];

    let pos = 0;
    for (let name in DEFAULT_TILES)
    {
        if (DEFAULT_TILES.hasOwnProperty(name))
        {
            const raw = DEFAULT_TILES[name];
            const { variants, sizeX = 1, sizeY = 1, sizeZ = 1 } = raw;
            tiles[pos] = {
                id: -1,
                name,
                ... raw,
                variants: tilesGLTF ? tilesGLTF.scene.children.filter(o => variants.indexOf(o.name) >= 0) : variants,
                pattern: raw.pattern ? raw.pattern.slice() : null,
                idCount: raw.idCount || 1,
                sizeX,
                sizeY,
                sizeZ,
                reachable: raw.reachable || false,
                thumbnail: null
            };
            pos++;
        }
    }

    tiles.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);

    // provide ids
    let idCounter = 1;
    tiles.forEach(t => {

        const { name, idCount, pattern, sizeX, sizeZ } = t;

        t.id = idCounter;
        idCounter += idCount;

        if (t.pattern)
        {
            if (!pattern || !Array.isArray(pattern))
            {
                throw new Error("Tile '" + name + "': tiles with idCount > 1 must define a pattern");
            }

            const size = sizeX * sizeZ;
            if (pattern.length !== size)
            {
                throw new Error("Tile '" + name + "': Pattern must be " + sizeX + " x " + sizeZ + " = " + size + " elements long: " + pattern);
            }

            for (let i = 0; i < pattern.length; i++)
            {
                // if the pattern in the JSON is negative
                if (pattern[i] < 0)
                {
                    // we use the local id backwards starting with -1 basically
                    pattern[i] = -pattern[i] - 1 + t.id;
                }

            }
        }
        else
        {
            // create 1x1 "pattern"
            t.pattern = [ t.id ];
        }
    });

    if (tilesGLTF)
    {
        const thumbNames = [];
        const objects = [];

        tiles.forEach((t, idx) => {
            thumbNames[idx] = t.name;
            objects[idx] = t.variants[0];
        });

        //console.log({objects, thumbNames, tiles})

        return threeJsThumbnailer(
            objects,
            thumbnailWidth,
            thumbnailHeight,
            thumbNames
        ).then(thumbnails => {

            thumbnails.forEach((th, idx) => tiles[idx].thumbnail = th);

            tiles.unshift({
                id: 0,
                name: "empty",
                variants: [],
                idCount: 1,
                sizeX: 1,
                sizeY: 0.1,
                sizeZ: 1,
                thumbnail: createEmptyThumbnail(),
                pattern: [0]
            });

            return tiles;
        })
    }
    else
    {
        tiles.unshift({
            id: 0,
            name: "empty",
            variants: [],
            idCount: 1,
            sizeX: 1,
            sizeY: 0.1,
            sizeZ: 1,
            reachable:false,
            colors: ["#000"],
            thumbnail: null
        });


        return tiles;
    }

}
