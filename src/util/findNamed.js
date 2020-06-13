/**
 * Finds a named element
 *
 * @param array     array of elements
 * @param name      name
 * @return {?Object} element or null
 */
export default function findNamed(array, name)
{
    for (let i = 0; i < array.length; i++)
    {
        const e = array[i];
        if (e.name === name)
        {
            return e;
        }
    }
    return null;
}
