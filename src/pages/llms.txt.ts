import type { APIRoute } from "astro";
import { patterns, roles, states } from "../data/patterns";

export const prerender = true;

const canonical = "https://kevinastuhuaman.github.io/enterprise-ai-interface-kit/";

export const GET: APIRoute = () => {
  const patternLines = patterns.map(
    (pattern, index) => `${index + 1}. ${pattern.name}: ${pattern.question} Contract: ${pattern.contract}`,
  );
  const stateLines = states.map((state) => `- ${state.label}: ${state.stage}. ${state.authority}`);
  const roleLines = roles.map((role) => `- ${role.label}: can ${role.can.toLowerCase()}; cannot ${role.cannot.toLowerCase()}.`);

  const body = [
    "# Enterprise AI Interface Kit",
    "",
    "> An original, public-safe product design artifact by Kevin Astuhuaman for reasoning about uncertainty, authority, and recovery in enterprise AI interfaces.",
    "",
    "## Canonical resources",
    `- Live interface: ${canonical}`,
    `- Pattern specification: ${canonical}patterns.json`,
    `- Project metadata: ${canonical}project.json`,
    "- Source: https://github.com/kevinastuhuaman/enterprise-ai-interface-kit",
    "- Portfolio: https://portfolio.kevinastuhuaman.com",
    "",
    "## What this demonstrates",
    "The reference workflow shows how an AI product can expose evidence provenance, calibrated confidence, role permissions, state-bound approval, observable events, scoped failure recovery, and honest no-data states. It is a coherent operator workflow, not a gallery of visual components.",
    "",
    "## Pattern contracts",
    ...patternLines,
    "",
    "## Reference states",
    ...stateLines,
    "",
    "## Role boundaries",
    ...roleLines,
    "",
    "## Interpretation guidance",
    "- Confidence is decision context, not authority.",
    "- Approval binds to an exact state and expires after input changes.",
    "- Traces show observable events and references, never private chain-of-thought.",
    "- Failure recovery preserves completed work and retries the smallest safe boundary.",
    "- Missing evidence produces an explicit absence state rather than invented certainty.",
    "",
    "## Public boundary",
    "All companies, people, policies, identifiers, evidence, and events in the reference product are fictional. This repository contains no employer assets, customer data, private prompts, credentials, production infrastructure details, or proprietary Trackly code.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
