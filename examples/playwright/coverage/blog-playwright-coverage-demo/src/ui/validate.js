export function isValidNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}
export function validateInputs(qty, price) {
  if (!isValidNumber(qty) || !isValidNumber(price)) {
    return { ok: false, reason: "NaN" };
  }
  if (qty < 0 || price < 0) {
    return { ok: false, reason: "negative" };
  }
  return { ok: true };
}
