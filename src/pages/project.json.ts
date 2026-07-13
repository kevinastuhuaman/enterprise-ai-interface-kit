import type { APIRoute } from "astro";

export const prerender = true;

const project = {
  schemaVersion: "1.0",
  title: "Enterprise AI Interface Kit",
  author: "Kevin Astuhuaman",
  status: "Public product design artifact",
  canonical: "https://kevinastuhuaman.github.io/enterprise-ai-interface-kit/",
  source: "https://github.com/kevinastuhuaman/enterprise-ai-interface-kit",
  portfolio: "https://portfolio.kevinastuhuaman.com",
  description:
    "An opinionated interface system for provenance, calibrated confidence, permissions, approvals, observable traces, scoped failures, recovery, and honest empty states in enterprise AI products.",
  capabilities: [
    "Interactive five-state enterprise workflow",
    "Four explicit role and authority boundaries",
    "Seven reusable product pattern contracts",
    "Responsive and reduced-motion interface",
    "Machine-readable pattern and project metadata",
  ],
  publicBoundary:
    "All scenario data is fictional. No employer assets, customer data, private prompts, credentials, production infrastructure detail, or proprietary Trackly code is included.",
  resources: {
    llmContext: "./llms.txt",
    patternSpec: "./patterns.json",
    sitemap: "./sitemap.xml",
    decisions: [
      "https://github.com/kevinastuhuaman/enterprise-ai-interface-kit/blob/main/DECISIONS/001-patterns-answer-product-questions.md",
      "https://github.com/kevinastuhuaman/enterprise-ai-interface-kit/blob/main/DECISIONS/002-confidence-is-not-a-score.md",
    ],
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(project, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
