# AGENTS.md

## Product boundary

This repository is a public-safe product-design system built with fictional enterprise records. Do not include employer assets, Trackly production code, private prompts, credentials, customer or applicant data, private infrastructure detail, or realistic security bypasses.

## Pattern rules

- A pattern must answer a product question, not merely restyle a component.
- Confidence must preserve uncertainty and calibration context.
- Provenance must identify source, time, and transformation state.
- Approval must bind to an exact object state and expire when that state changes.
- Traces contain observable actions and decisions, never private chain-of-thought.
- Failure states must name what was preserved, what can retry, and who owns recovery.
- Keep pattern and scenario definitions in `src/data/patterns.json` as the single source of truth.

## Quality gate

Run `npm run validate:patterns`, `npm test`, and `npm run build` before committing. Verify desktop and mobile pixels with Playwright. Do not merge until reviewer and CI gates pass.
