import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { quoteShipping } from "./shipping.mjs";

const PORT = Number(process.env.PORT ?? 4173);
const ROOT = new URL("./public/", import.meta.url).pathname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return JSON.parse(body || "{}");
}

createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/shipping-rates") {
    const address = await readJson(req);
    const result = quoteShipping(address);
    res.writeHead(result.error ? 422 : 200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(result));
    return;
  }

  const path = req.url === "/" ? "index.html" : req.url.slice(1).split("?")[0];
  try {
    const file = await readFile(join(ROOT, path));
    res.writeHead(200, {
      "content-type": TYPES[extname(path)] ?? "application/octet-stream",
    });
    res.end(file);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(PORT, () => console.log(`Shop on http://localhost:${PORT}`));
