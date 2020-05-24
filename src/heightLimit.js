export function heightLimit(x)
{
    const beach = 0.05;
    const beachSquared = beach * beach;

    const mountain = 0.6;
    const mountain_mid = 0.5;

    if (x < beach)
    {
        x = beach - x;

        return beachSquared - x * x;
    }
    else if (x < mountain)
    {
        x = x - beach;
        const delta = mountain - beach;
        return beachSquared + (x * x * (mountain_mid - beachSquared) / (delta * delta));
    }
    else
    {
        x = 1 - x;

        const delta = 1 - mountain;

        return 1 - x * x * x * (1 - mountain_mid) / (delta * delta * delta);
    }
}
