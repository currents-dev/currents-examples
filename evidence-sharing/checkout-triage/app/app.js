const money = (cents) => `$${(cents / 100).toFixed(2)}`;

let subtotalCents = 0;
let lineCount = 0;

const form = document.getElementById("discount-form");
const input = document.getElementById("discount-code");
const status = document.getElementById("discount-status");
const badge = document.getElementById("cart-badge");
const giftWrap = document.getElementById("gift-wrap");

async function graphql(query, variables = {}) {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

function renderItems(items) {
  document.getElementById("items").innerHTML = items
    .map(
      (item) => `
          <li class="item">
            <span class="name">${item.name}</span>
            <span class="qty">${item.qty} ×</span>
            <span class="price">${money(item.price)}</span>
          </li>`,
    )
    .join("");
}

function renderTotals({ subtotal, discount, total }) {
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("discount").textContent = discount
    ? `−${money(discount)}`
    : "—";
  document.getElementById("total").textContent = money(total);
}

graphql(`query Cart { cart { items { name qty price } subtotal } }`).then(
  ({ data }) => {
    subtotalCents = data.cart.subtotal;
    lineCount = data.cart.items.length;
    badge.textContent = lineCount;
    renderItems(data.cart.items);
    renderTotals({ subtotal: subtotalCents, discount: 0, total: subtotalCents });
  },
);

giftWrap.addEventListener("click", () => {
  document.getElementById("items").insertAdjacentHTML(
    "beforeend",
    `<li class="item">
            <span class="name">Gift wrap</span>
            <span class="qty">1 ×</span>
            <span class="price">${money(0)}</span>
          </li>`,
  );
  setTimeout(() => {
    lineCount += 1;
    badge.textContent = lineCount;
  }, 50 + Math.random() * 850);
});

graphql(`query Viewer { viewer { name plan } }`).then(({ data }) => {
  document.getElementById("viewer").textContent = `Signed in as ${data.viewer.name}`;
});

fetch("/api/recommendations");
fetch("/api/session");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const code = input.value.trim();
  const { data, errors } = await graphql(
    `mutation ApplyDiscount($code: String!) {
      applyDiscount(code: $code) { code percent discount total }
    }`,
    { code },
  );
  if (errors) {
    status.className = "status bad";
    status.textContent = errors[0].message;
    return;
  }

  const { discount, total, percent, code: applied } = data.applyDiscount;
  renderTotals({
    subtotal: subtotalCents,
    discount,
    total,
  });
  status.className = "status ok";
  status.textContent = `${applied} applied: ${percent}% off`;
});
