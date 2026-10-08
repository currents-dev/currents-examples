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

const saveCartButton = document.getElementById("save-cart");
const planPanel = document.getElementById("plan-panel");
const planDialog = planPanel.querySelector(".plan-dialog");
const planBody = document.getElementById("plan-body");

function openPlanPanel() {
  planPanel.hidden = false;
  planDialog.focus();
}

function closePlanPanel() {
  planPanel.hidden = true;
  saveCartButton.focus();
}

saveCartButton.addEventListener("click", openPlanPanel);

planPanel.addEventListener("click", (event) => {
  if (event.target === planPanel) closePlanPanel();
});

planDialog
  .querySelector(".plan-dismiss")
  .addEventListener("click", closePlanPanel);

planDialog.querySelector(".plan-upgrade").addEventListener("click", () => {
  const thanks = document.createElement("p");
  thanks.textContent = "Thanks! We'll email you an upgrade link.";
  planBody.replaceChildren(thanks);
  planDialog.focus();
});

document.addEventListener("keydown", (event) => {
  if (planPanel.hidden) return;

  if (event.key === "Escape") {
    closePlanPanel();
  } else if (event.key === "Tab") {
    const buttons = planDialog.querySelectorAll("button");
    const index = [...buttons].indexOf(document.activeElement);
    const next = event.shiftKey ? index - 1 : index + 1;
    event.preventDefault();
    buttons[(next + buttons.length) % buttons.length]?.focus();
  }
});
