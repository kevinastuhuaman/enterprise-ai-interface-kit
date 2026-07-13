import patternSpec from "./patterns.json";

export type PatternSpec = typeof patternSpec;
export type ProductState = (typeof patternSpec.states)[number];
export type Role = (typeof patternSpec.roles)[number];

export const patterns = patternSpec.patterns;
export const roles = patternSpec.roles;
export const states = patternSpec.states;
export const spec = patternSpec;
