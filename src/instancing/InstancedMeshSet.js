import {
    BufferGeometry,
    InstancedBufferGeometry,
    InstancedMesh,
    InterleavedBuffer,
    InterleavedBufferAttribute,
    Object3D
} from "three";
import reduceSum from "../util/reduceSum";
import { toIndexed } from "./toIndexed";


function sortNumerical(a,b)
{
    return a - b;
}

const DEFAULT_OPTIONS = {
    objects: [],
    attributeDefs: [],
    defaultCount: 100,
    maxInstances: -1
}

const tmpObject = new Object3D();



export function attr1(name)
{
    return {
        name,
        itemSize: 1,
        normalized: false
    };
}

export function attr3(name)
{
    return {
        name,
        itemSize: 3,
        normalized: false
    };
}

export default class InstancedMeshSet
{
    nameLookup = new Map();

    opts = null;

    instances = null;

    /**
     * 
     * @type {number}
     */
    maxInstances = 0;

    constructor(gltf, opts)
    {
        this.opts = ({
            ... DEFAULT_OPTIONS,
            ... opts
        });

        this.calculateMaxInstances();
        this.importGeometries(gltf);
        this.instanceSize = (1 + this.maxGeomsPerInstance);
        this.instances = new Uint32Array(this.maxInstances * this.instanceSize);
        this.meshes = this.createMeshes();

        console.log("Created InstancedMeshSet", this);
    }


    calculateMaxInstances()
    {
        const {objects, defaultCount} = this.opts;

        let maxInstances = 0;
        for (let i = 0; i < objects.length; i++)
        {
            const { count = defaultCount } = objects[i];
            maxInstances += count;
        }
        
        this.maxInstances = maxInstances;
    }



    importGeometries(gltf)
    {
        const { objects, defaultCount } = this.opts;

        let maxGeomsPerInstance = 1;

        let index = 0;
        for (let i = 0; i < objects.length; i++)
        {
            const { name, count = defaultCount } = objects[i];

            const object = gltf.scene.children.find(kid => kid.name === name);
            if (!object)
            {
                throw new Error("Could not find Object '" + name + "'");
            }

            this.nameLookup.set(name, index);
            objects[i].index = index;
            objects[i].count = count;

            if (object.type === "Group")
            {
                const meshes = object.children.filter(kid => kid.type === "Mesh");

                if (meshes.length > maxGeomsPerInstance)
                {
                    maxGeomsPerInstance = meshes.length;
                }
                objects[i].meshes = meshes;
                index += meshes.length;
            }
            else if (object.type === "Mesh")
            {
                objects[i].meshes = [ object ]
                index++;
            }
            else
            {
                throw new Error("Invalid object type: " + JSON.stringify(object))
            }
        }

        this.maxGeomsPerInstance = maxGeomsPerInstance;
        this.numGeoms = index;
    }

    createMeshes()
    {
        const { numGeoms } = this;
        const { objects } = this.opts;

        const meshes = new Array(numGeoms);

        for (let i = 0; i < objects.length; i++)
        {
            const { name, index, meshes : inputMeshes, count } = objects[i];

            for (let j = 0; j < inputMeshes.length; j++)
            {
                const object = inputMeshes[j];
                const instancedMesh = this.createInstancedMesh(object, count);

                instancedMesh.name = "InstancedMesh " + name + "#" + j
                meshes[index + j] = instancedMesh;
            }

         }

        return meshes;
    }

    createInstancedMesh(inputMesh, maxInstances)
    {

        console.log("createInstancedMesh", inputMesh);

        const { attributeDefs } = this.opts;


        const geometry = new InstancedBufferGeometry();

        BufferGeometry.prototype.copy.call(geometry, inputMesh.geometry);

        let offset = 0

        attributeDefs.forEach(
            a => {
                offset += a.itemSize;
            }
        )
        const stride = offset;
        const buffer = new InterleavedBuffer(new Float32Array(maxInstances * stride), stride);

        attributeDefs.forEach(
            ({ name, itemSize, normalized }) => {
                geometry.setAttribute(name, new InterleavedBufferAttribute(buffer, itemSize, offset, normalized));
                offset += itemSize;
            }
        );

        //console.log("Instance count for ", MATERIAL_NAMES[i], "/", CASE_NAMES[j], " = ", count, geometry);
        const instancedMesh = new InstancedMesh(geometry, inputMesh.material.clone(), maxInstances);
        return instancedMesh;
        // for (let i = 0; i < count; i++)
        // {
        //     const idx = i * 3;
        //     const x = positions[idx]
        //     const y = positions[idx + 1]
        //     const z = positions[idx + 2]
        //
        //     tmpObject.position.set(x, y, z);
        //     //dummy.rotation.x = TAU/4;
        //     tmpObject.updateMatrix();
        //
        //     mesh.setMatrixAt(i, tmpObject.matrix)
        // }
        //
        // mesh.needsUpdate = true;
        // return mesh;
    }
}
/**
 * We go from the GLTF structure
 * gltf:
 *  [
 *      group [
 *          ... object
 *      ]
 *      object
 *  ]
 *
 * to a multi-instanced-mesh-by-geometry
 *
 * instanceMesh:{
 *
 *      names: []
 *
 *     instances: [
 *         kind,
 *         geomId0
 *         geomId0 ... geomIdN
 *     ]
 *     meshes: [
 *         InstancedMesh, ...
 *     ]
 * }
 *
 *
 */


