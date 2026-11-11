// Re-runs the shipping quote for checkout attempts that failed with
// invalid_postcode, and lists the carts that would get delivery options now.
//
//   node scripts/requote-failed.mjs [--since 2026-11-07] [--out requote]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { parseArgs } from "node:util";
import { quoteShipping } from "../shipping.mjs";

const { values } = parseArgs({
  options: {
    since: { type: "string", default: "1970-01-01" },
    out: { type: "string", default: "requote" },
  },
});

const attempts = JSON.parse(
  await readFile(new URL("../data/checkout-attempts.json", import.meta.url)),
);
const failed = attempts.filter(
  (a) => a.result === "invalid_postcode" && a.at >= values.since,
);

await mkdir(values.out, { recursive: true });
const log = [];
const recovered = [];
const stillFailing = [];
const line = (msg) => {
  const entry = `${new Date().toISOString()} ${msg}`;
  log.push(entry);
  console.log(entry);
};

line(`checkout attempts: ${attempts.length}, failed with invalid_postcode since ${values.since}: ${failed.length}`);
for (const attempt of failed) {
  const quote = quoteShipping({ country: attempt.country, postcode: attempt.postcode });
  if (quote.error) {
    stillFailing.push(attempt);
    line(`${attempt.id} ${attempt.country} "${attempt.postcode}" still ${quote.error}`);
    continue;
  }
  const cheapest = quote.rates.reduce((a, b) => (a.cents <= b.cents ? a : b));
  recovered.push({ ...attempt, rate: cheapest.label, rateCents: cheapest.cents });
  line(`${attempt.id} ${attempt.country} "${attempt.postcode}" ok: ${quote.rates.length} rates, cheapest ${cheapest.label}`);
}

const csv = [
  "checkout_id,failed_at,email,postcode,cart_gbp,cheapest_rate",
  ...recovered.map((r) =>
    [r.id, r.at, r.email, `"${r.postcode}"`, (r.cartCents / 100).toFixed(2), `"${r.rate}"`].join(","),
  ),
].join("\n");

const cartTotal = recovered.reduce((sum, r) => sum + r.cartCents, 0);
const counts = {
  since: values.since,
  failedAttempts: failed.length,
  recovered: recovered.length,
  stillFailing: stillFailing.length,
  uniqueCustomers: new Set(recovered.map((r) => r.email)).size,
  recoveredCartGbp: Number((cartTotal / 100).toFixed(2)),
};
line(`recovered ${counts.recovered}, still failing ${counts.stillFailing}, carts worth £${counts.recoveredCartGbp}`);

await writeFile(`${values.out}/requote.log`, log.join("\n") + "\n");
await writeFile(`${values.out}/recovered-carts.csv`, csv + "\n");
await writeFile(`${values.out}/counts.json`, JSON.stringify(counts, null, 2) + "\n");
