// Drives the checkout page the way a customer would and saves what it saw:
// a Playwright trace, a video, a screenshot and the page's accessibility tree.
// An agent with the Playwright MCP server captures the same files.
//
//   node capture.mjs <name> [url]
//
// Files go to ./evidence/<name>/.
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const name = process.argv[2];
const url = process.argv[3] ?? "http://localhost:4173/";
if (!name) throw new Error("usage: node capture.mjs <name> [url]");

const dir = path.resolve("evidence", name);
await rm(dir, { recursive: true, force: true });
await mkdir(dir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir, size: { width: 1280, height: 720 } },
});
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();

await page.goto(url);
await page.getByLabel("Discount code").fill("save10");
await page.getByRole("button", { name: "Apply" }).click();
await page.waitForTimeout(1500);

await page.screenshot({ path: path.join(dir, `${name}.png`) });
await writeFile(
  path.join(dir, `${name}-a11y.txt`),
  await page.locator("main").ariaSnapshot(),
);

await context.tracing.stop({ path: path.join(dir, `${name}-trace.zip`) });
const video = page.video();
await context.close();
await rename(await video.path(), path.join(dir, `${name}.webm`));
await browser.close();

console.log(`Saved to ${path.relative(process.cwd(), dir)}/`);
