import { readFile } from "node:fs/promises";

const file = new URL("../src/data/patterns.json", import.meta.url);
const spec = JSON.parse(await readFile(file, "utf8"));
const errors = [];

if (spec.version !== "1.0") errors.push("pattern spec version must be 1.0");
if (!Array.isArray(spec.patterns) || spec.patterns.length !== 7) errors.push("exactly seven patterns are required");
if (!Array.isArray(spec.roles) || spec.roles.length !== 4) errors.push("exactly four roles are required");
if (!Array.isArray(spec.states) || spec.states.length !== 5) errors.push("exactly five reference states are required");

/**
 * @param {Array<{ id?: string }>} items
 * @param {string} label
 */
const requireUniqueIds = (items, label) => {
  const ids = new Set();
  for (const item of Array.isArray(items) ? items : []) {
    if (!item.id) {
      errors.push(`${label}: missing id`);
      continue;
    }
    if (ids.has(item.id)) {
      errors.push(`${label}: duplicate id ${item.id}`);
      continue;
    }
    ids.add(item.id);
  }
};

requireUniqueIds(spec.patterns, "patterns");
requireUniqueIds(spec.roles, "roles");
requireUniqueIds(spec.states, "states");

for (const pattern of Array.isArray(spec.patterns) ? spec.patterns : []) {
  if (!pattern.name || !pattern.question || !pattern.contract || !pattern.prevents) errors.push(`${pattern.id}: incomplete pattern contract`);
}

for (const role of Array.isArray(spec.roles) ? spec.roles : []) {
  if (!role.label || !role.can || !role.cannot) errors.push(`${role.id}: incomplete role boundary`);
}

for (const state of Array.isArray(spec.states) ? spec.states : []) {
  if (!state.label || !state.stage || !state.tone || !state.summary || !state.recommendation || !state.authority) errors.push(`${state.id}: incomplete product state`);
  if (!state.confidence?.band || !state.confidence?.range || !state.confidence?.coverage || !state.confidence?.threshold || !state.confidence?.note) errors.push(`${state.id}: incomplete confidence contract`);
  if (!state.approval?.status || !state.approval?.owner || !state.approval?.binding || !state.approval?.expiry) errors.push(`${state.id}: incomplete approval contract`);
  if (!Array.isArray(state.sources) || !Array.isArray(state.trace)) errors.push(`${state.id}: sources and trace must be arrays`);
  if (state.id === "failed" && !state.recovery) errors.push("failed: recovery contract is required");
  if (state.id === "empty" && !state.empty) errors.push("empty: empty-state contract is required");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${spec.patterns.length} patterns, ${spec.roles.length} roles, and ${spec.states.length} reference states.`);
