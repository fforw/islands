
export default class InstancedMeshSet
{

    imported = new Map();

    instancedMeshes;

    constructor(gltf, names)
    {
        gltf.children
            .filter(
                kid => names.indexOf(kid.name) >= 0
            )
            .forEach(
                kid => this.imported.set(kid.name, kid)
            );

        
    }
}
