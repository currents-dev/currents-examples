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
const status = document.getElementById("discount-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = input.value.trim().toUpperCase();
  const discount = DISCOUNT_CODES[code];
  if (!discount) {
    render(0);
    status.className = "status bad";
    status.textContent = `${input.value.trim()} is not a valid code`;
    return;
  }

  const discountCents = Math.round((subtotalCents * discount.percent) / 100);
  render(discountCents);
  status.className = "status ok";
  status.textContent = `${code} applied: ${discount.percent}% off`;
});

const welcome = new URLSearchParams(location.search).get("welcome");
if (welcome) {
  const name = welcome.charAt(0).toUpperCase() + welcome.slice(1);
  document.querySelector(".step").textContent = `Checkout · Signed in as ${name}`;
}
