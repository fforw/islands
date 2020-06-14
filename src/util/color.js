export const LUM_THRESHOLD = 0.03928;

export const PERCEPTIVE_FACTOR_RED = 0.2126;
export const PERCEPTIVE_FACTOR_GREEN = 0.7152;
export const PERCEPTIVE_FACTOR_BLUE = 0.0722;

const colorRegExp = /^(#)?([0-9a-f]+)$/i;

function checkColor(color)
{

    let m;
    if (typeof color !== "string" || !(m = colorRegExp.exec(color)))
    {
        return null;
    }
    const col = m[2];

    if (col.length === 3)
    {
        return {
            r: parseInt(col[0], 16) / 15,
            g: parseInt(col[1], 16) / 15,
            b: parseInt(col[2], 16) / 15
        };
    }
    else if (col.length === 6)
    {
        return {
            r: parseInt(col.substring(0, 2), 16) / 255,
            g: parseInt(col.substring(2, 4), 16) / 255,
            b: parseInt(col.substring(4, 6), 16) / 255
        };
    }
    else
    {
        return null;
    }
}

export function components(color)
{
    let col = checkColor(color);
    if (!col)
    {
        throw new Error("Invalid color " + color);
    }
    return col;
}

function gun_luminance(v)
{

    if (v <= LUM_THRESHOLD)
    {
        return v / 12.92
    }
    else
    {
        return Math.pow(((v + 0.055) / 1.055), 2.4);
    }
}

function hex(n)
{
    const s = n.toString(16);

    return s.length === 1 ? "0" + s : s;
}

// Contrast and luminance calculation follows http://www.w3.org/Translations/WCAG20-de/#contrast-ratiodef

export function isColor(color)
{
    const col = checkColor(color);
    return col && !isNaN(col.r) && !isNaN(col.g) && !isNaN(col.b);
}

export function getLuminance(color)
{
    const c = components(color);
    return PERCEPTIVE_FACTOR_RED * gun_luminance(c.r) + PERCEPTIVE_FACTOR_GREEN * gun_luminance(c.g) + PERCEPTIVE_FACTOR_BLUE * gun_luminance(c.b);
}

export function contrast(colorA, colorB)
{
    let h;
    let lum1 = getLuminance(colorA);
    let lum2 = getLuminance(colorB);

    if (lum1 < lum2)
    {
        h = lum1;
        lum1 = lum2;
        lum2 = h;
    }

    const contrast = (lum1 + 0.05) / (lum2 + 0.05);

//        console.debug("contrast: %o", contrast);

    return  contrast;
}

export function mix(col1, col2, ratio)
{
    const c1 = components(col1);
    const c2 = components(col2);

    const r = ((c1.r + (c2.r - c1.r) * ratio)    * 255) | 0;
    const g = ((c1.g + (c2.g - c1.g) * ratio) * 255) | 0;
    const b = ((c1.b + (c2.b - c1.b) * ratio) * 255) | 0;

    return rgb(r, g, b);
}

/**
 * Creates a color range between the given colors.
 *
 * @param {string} from     start color
 * @param {string} to       end color
 * @param {number} count    number of colors
 *
 * @return {array} array of RGB colors
 */
export function range(from, to, count)
{
    const step = 1/(count-1);

    const array = new Array(count);

    for (let i = 0, ratio = 0; i < count; i++, ratio += step)
    {
        array[i] = mix(from, to, ratio);
    }
    return array;
}

export function rgb(r, g, b)
{
    return "#" + hex(r) + hex(g) + hex(b);
}

export function fade(color, opacity)
{
    const col = components(color);
    return "rgba(" + col.r + ", " + col.g + ", " + col.b + ", " + opacity + ")";
}

export function bestTextColor(color, darkText = "#000", lightText = "#fff", contrastLimit = 7)
{
    // use dark text only if the contrast to the random color is above the contrast limit, otherwise use light text
    return contrast(color, darkText) >= contrastLimit ? darkText : lightText
}

