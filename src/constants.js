export const WATER = 0;
export const SAND = 1;
export const GRASS = 2;
export const FOREST = 3;
export const STONE = 4;
export const ICE = 5;
export const DIRT = 6;
export const PACKED_ICE = 7;
export const UNDEFINED = 8;

export const MATERIAL_NAMES = [
    "Water", // WATER
    "Sand", // SAND
    "Grass", // GRASS
    "Forest", // FOREST
    "Stone", // STONE
    "Ice", // ICE
    "Dirt", // DIRT
    "Packed_Ice", // PACKED_ICE
];
export const CASE_NAMES = [
    null,
    "case-1",
    "case-2",
    "case-3",
    "case-4",
    "case-5-1",
    "case-6",
    "case-7",
    "case-8",
    "case-9",
    "case-10-1",
    "case-11",
    "case-12",
    "case-13",
    "case-14",
    "case-15",
    "case-m1",
    "case-m2",
    "case-m3",
    "case-m4",
    "case-5-2",
    "case-10-2"
];
export const GROUND_COLORS = {
    [WATER]: [0, 0.4, 0.8],
    [SAND]: [0.8, 0.8, 0],
    [GRASS]: [0, 0.7, 0],
    [DIRT]: [0.5, 0.3, 0.1],
    [FOREST]: [0.2, 0.5, 0.3],
    [STONE]: [0.5, 0.5, 0.5],
    [ICE]: [1, 1, 1],
    [PACKED_ICE]: [1, 1, 1],
    [UNDEFINED]: [1, 0, 1]
}
const GROUND_ROUGHNESS = {
    [WATER]: 0,
    [SAND]: 1,
    [GRASS]: 1,
    [DIRT]: 1,
    [FOREST]: 1,
    [STONE]: 0.4,
    [ICE]: 0.9,
    [PACKED_ICE]: 0.8,
    [UNDEFINED]: 0
}


export const TAU = Math.PI * 2;

export const PHI = (1 + Math.sqrt(5)) / 2;
