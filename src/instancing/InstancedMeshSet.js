
export default class InstancedMeshSet
{

    imported;

    instancedMeshes;

    constructor(gltf, names)
    {
        this.imported = gltf.children
            .filter( kid => names.indexOf(kid.name) >= 0);

        
    }
}
