import {
    Color, Group,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    PlaneBufferGeometry,
    Raycaster,
    Vector3
} from "three";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { TAU } from "../constants";
import { TILE_SIZE } from "./Grid";

const VALID_COLOR = new Color("#fff");
const INVALID_COLOR = new Color("#ff3c78");

function createCursorGeometry()
{
    const lineMat = new LineBasicMaterial({
        color: 0x000000,
        linewidth: 1.5,
        depthTest: false,
        opacity: 0.5,
        transparent: true
    });

    const points = [];
    points.push(new Vector3(-0.5, 0, -0.5));
    points.push(new Vector3(0.5, 0, -0.5));
    points.push(new Vector3(0.5, 0, 0.5));
    points.push(new Vector3(-0.5, 0, 0.5));
    points.push(new Vector3(-0.5, 0, -0.5));

    const border = new Line(
        new BufferGeometry().setFromPoints(points),
        lineMat
    );

    const insidePlane = new Mesh(
        new PlaneBufferGeometry(
            1,
            1
        ),
        new MeshBasicMaterial({
            color: 0xffffff,
            depthTest: false,
            opacity: 0.2,
            transparent: true
        })
    );
    insidePlane.rotation.x = -TAU / 4;

    const cursor = new Group();
    cursor.add(insidePlane)
    cursor.add(border)

    return cursor;
}

/**
 * Encapsulates the cursor 3D objects and hold the current selection position etc
 */
export default class Cursor
{
    constructor(scene, grid, editorState)
    {
        this.grid = grid;
        this.editorState = editorState;

        this.raycaster = new Raycaster();
        this.material = 0;
        this.current = null;

        this.object = createCursorGeometry();
        this.valid = false;

        scene.add( this.object );

    }

    setValid(valid)
    {
        this.valid = !!valid;
        this.object.children[0].material.color = valid ? VALID_COLOR : INVALID_COLOR;
        this.object.children[0].material.opacity = valid ? 0.2 : 0.8;
    }

    update(mouse, camera)
    {
        const { grid, raycaster, object, editorState } = this;

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObjects( grid.group.children );

        if (intersects.length > 0)
        {

            if (this.current !== intersects[0].object)
            {

                //if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                this.current = intersects[0].object;
                this.material = +this.current.name.substr(1);
            }

            const { point } = intersects[0];
            const { size } = editorState.activeTile;

            const matOff = this.material * 2;

            const offX = grid.offsets[matOff];
            const offY = grid.offsets[matOff + 1];

            // pos on current material (0 to grid.size - cursor_size )
            const x = Math.floor((point.x - offX ) / TILE_SIZE) + grid.size/2;
            const y = Math.floor((point.z - offY ) / TILE_SIZE) + grid.size/2;

            const valid =  x + size <= grid.size && y + size <= grid.size;
            this.setValid(valid);

            const objectX = offX + (x - grid.size/2) * TILE_SIZE + size / 2;
            const objectY = offY + (y - grid.size/2) * TILE_SIZE + size / 2;

            if (object.position.x !== objectX || object.position.z !== objectY)
            {
                //console.log("Material", this.material, "pos", x, y)

                this.x = x;
                this.y = y;

                object.position.set(
                    objectX,
                    0,
                    objectY
                );
            }

            this.object.visible = true;
        }
        else
        {
            this.object.visible = false;
            this.valid = false;
            this.current = null;
        }

    }
}
