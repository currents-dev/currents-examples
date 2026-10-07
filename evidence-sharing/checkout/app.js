const DISCOUNT_CODES = {
  SAVE10: { percent: 10 },
  WELCOME15: { percent: 15 },
};

const QUANTITIES = [1, 2, 1];

const money = (cents) => `$${(cents / 100).toFixed(2)}`;

const subtotalCents = [...document.querySelectorAll(".price")].reduce(
  (sum, el, i) => sum + Number(el.dataset.cents) * QUANTITIES[i],
  0,
);

function render(discountCents) {
  document.getElementById("subtotal").textContent = money(subtotalCents);
  document.getElementById("discount").textContent = discountCents
    ? `−${money(discountCents)}`
    : "—";
  document.getElementById("total").textContent = money(
    subtotalCents - discountCents,
  );
}

render(0);

const form = document.getElementById("discount-form");
const input = document.getElementById("discount-code");
const button = document.getElementById("apply");
const status = document.getElementById("discount-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  button.disabled = true;
  button.textContent = "Applying…";
  status.textContent = "";

  const code = input.value;
  const { percent } = DISCOUNT_CODES[code];
  const discountCents = Math.round((subtotalCents * percent) / 100);

  render(discountCents);
  status.className = "status ok";
  status.textContent = `${code} applied: ${percent}% off`;
  button.disabled = false;
  button.textContent = "Apply";
});
