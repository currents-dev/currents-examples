const POSTCODE_FORMATS = {
  GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,
  US: /^\d{5}(-\d{4})?$/,
  DE: /^\d{5}$/,
};

const RATES = {
  GB: [
    { id: "standard", label: "Royal Mail Tracked 48", days: "2–3 days", cents: 495 },
    { id: "express", label: "DPD Next Day", days: "1 day", cents: 1195 },
  ],
  US: [
    { id: "standard", label: "USPS Ground Advantage", days: "3–5 days", cents: 699 },
    { id: "express", label: "UPS 2nd Day Air", days: "2 days", cents: 1899 },
  ],
  DE: [
    { id: "standard", label: "DHL Paket", days: "2–4 days", cents: 549 },
    { id: "express", label: "DHL Express", days: "1 day", cents: 1490 },
  ],
};

export function quoteShipping({ country, postcode = "" }) {
  const format = POSTCODE_FORMATS[country];
  if (!format) return { error: "unsupported_country" };
  if (!format.test(postcode.trim().toUpperCase())) return { error: "invalid_postcode", postcode };
  return { rates: RATES[country] };
}
