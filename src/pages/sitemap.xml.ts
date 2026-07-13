import type { APIRoute } from "astro";

export const prerender = true;

const canonical = "https://kevinastuhuaman.github.io/enterprise-ai-interface-kit/";

export const GET: APIRoute = () => {
  const urls = [canonical, `${canonical}llms.txt`, `${canonical}patterns.json`, `${canonical}project.json`];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
