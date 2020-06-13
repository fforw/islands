import { DEFAULT_TILES } from "./default-tiles";
import threeJsThumbnailer from "../util/threeJsThumbnailer";


export function getMaxId(tiles)
{
    return tiles[tiles.length - 1].id + tiles[tiles.length - 1].sizeX * tiles[tiles.length - 1].sizeZ;
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
            const tileGroup = DEFAULT_TILES[name];
            const {variants, sizeX = 1, sizeY = 1, sizeZ = 1} = tileGroup;
            tiles[pos] = {
                id: -1,
                name,
                ...tileGroup,
                symmetric: typeof tileGroup.symmetric === "undefined" ? true : tileGroup.symmetric,
                sizeX,
                sizeY,
                sizeZ,
                variants: tilesGLTF ? tilesGLTF.scene.children.filter(o => variants.indexOf(o.name) >= 0) : variants,
                thumbnail: null
            };
            pos++;
        }
    }

    tiles.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);

    // provide ids
    let idCounter = 1;
    tiles.forEach(t => {
        t.id = idCounter;
        idCounter += t.sizeX * t.sizeZ;
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
                sizeX: 1,
                sizeY: 0.1,
                sizeZ: 1,
                thumbnail: createEmptyThumbnail()
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
            sizeX: 1,
            sizeY: 0.1,
            sizeZ: 1,
            thumbnail: null
        });


        return tiles;
    }

}
