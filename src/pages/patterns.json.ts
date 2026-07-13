import type { APIRoute } from "astro";
import patternSpec from "../data/patterns.json";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(patternSpec, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
