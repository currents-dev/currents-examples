export function calculateTotal(qty, price) {
  if (qty < 0 || price < 0) return 0; // simple guard
  if (qty === 0) return 0; // edge case we will NOT cover
  return qty * price;
}
// Unused on purpose to show uncovered code
export function legacyDiscount(total) {
  return total * 0.9;
}
