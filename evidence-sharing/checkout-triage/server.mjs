import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appDir = join(here, "app");
const port = Number(process.env.PORT ?? 4197);
const flags = JSON.parse(await readFile(join(here, "flags.json"), "utf8"));

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".ico": "image/x-icon",
};

const CART_ITEMS = [
  { name: "Trail running shoes", qty: 1, price: 12900 },
  { name: "Merino socks, 3-pack", qty: 2, price: 3600 },
  { name: "Insulated bottle", qty: 1, price: 2850 },
];

const DISCOUNT_CODES = {
  SAVE10: { percent: 10 },
  WELCOME15: { percent: 15 },
};

const subtotalOf = (items) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

const resolvers = {
  Cart: () => ({
    items: CART_ITEMS,
    subtotal: subtotalOf(CART_ITEMS),
  }),
  Viewer: () => ({ name: "Ana", plan: "Team" }),
  applyDiscount: (args) =>
    flags.newDiscountEngine ? applyDiscountV2(args) : applyDiscountV1(args),
};

function lookupDiscount(rawCode) {
  const code = rawCode.trim().toUpperCase();
  const entry = DISCOUNT_CODES[code];
  if (!entry) {
    throw new Error(`${rawCode.trim()} is not a valid code`);
  }
  const subtotal = subtotalOf(CART_ITEMS);
  const discount = Math.round((subtotal * entry.percent) / 100);
  return { code, percent: entry.percent, subtotal, discount };
}

function applyDiscountV1({ code }) {
  const { subtotal, discount, ...applied } = lookupDiscount(code);
  return { ...applied, discount, total: subtotal - discount };
}

function applyDiscountV2({ code }) {
  const { subtotal, discount, ...applied } = lookupDiscount(code);
  const total = (subtotal - discount) - discount;
  return { ...applied, discount, total };
}


// Operation name is the first field of the query or mutation for these
// documents. Matching on the name keeps the server free of a GraphQL parser.
function operationName(query) {
  const match = query.match(/^\s*(?:query|mutation)\s+(\w+)/);
  return match?.[1];
}

function runOperation(query, variables) {
  const name = operationName(query);
  switch (name) {
    case "Cart":
      return { data: { cart: resolvers.Cart() } };
    case "Viewer":
      return { data: { viewer: resolvers.Viewer() } };
    case "ApplyDiscount":
      try {
        return { data: { applyDiscount: resolvers.applyDiscount(variables) } };
      } catch (error) {
        return { data: null, errors: [{ message: error.message }] };
      }
    default:
      return { data: null, errors: [{ message: `Unknown operation ${name}` }] };
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw);
}

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  const requested = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const file = normalize(join(appDir, requested));
  if (!file.startsWith(appDir)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname === "/graphql" && req.method === "POST") {
    const { query, variables = {} } = await readBody(req);
    sendJson(res, 200, runOperation(query, variables));
    return;
  }

  if (pathname === "/api/recommendations" && req.method === "GET") {
    sendJson(res, 200, {
      items: [
        { name: "Wool beanie", price: 1800 },
        { name: "Headlamp", price: 4500 },
      ],
    });
    return;
  }

  if (pathname === "/api/session" && req.method === "GET") {
    sendJson(res, 200, { id: "sess_7f2c91", expiresAt: "2026-10-08T00:00:00Z" });
    return;
  }

  if (req.method !== "GET") {
    res.writeHead(405).end();
    return;
  }
  await serveStatic(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Northwind checkout listening on http://127.0.0.1:${port}`);
});
