export function dump(obj, level = "")
{
    const {type} = obj;
    if (type === "Group")
    {
        console.log(level + "GROUP", obj.name)

        const nextLevel = level + "    "

        const {children} = obj;
        for (let i = 0; i < children.length; i++)
        {
            dump(children[i], nextLevel);
        }
    }
    else if (type === "Mesh")
    {
        console.log(level + "MESH", obj.name)
    }
}
