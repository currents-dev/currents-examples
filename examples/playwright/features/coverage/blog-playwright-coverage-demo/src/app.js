import { calculateTotal } from "./utils/math.js";
import { validateInputs } from "./ui/validate.js";
import { fetchItems } from "./services/api.js";

const qtyEl = document.getElementById("qty");
const priceEl = document.getElementById("price");
const calcBtn = document.getElementById("calc");
const totalEl = document.getElementById("total");
const errEl = document.getElementById("error");

calcBtn.addEventListener("click", () => {
  const qty = Number(qtyEl.value);
  const price = Number(priceEl.value);
  const { ok } = validateInputs(qty, price);
  if (!ok) {
    errEl.classList.remove("hidden");
    errEl.classList.add("error");
    return;
  }
  errEl.classList.add("hidden");
  const total = calculateTotal(qty, price);
  totalEl.textContent = String(total);
});

document.getElementById("load-items").addEventListener("click", async () => {
  const list = document.getElementById("items");
  list.innerHTML = "";
  const items = await fetchItems();
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item.name;
    list.appendChild(li);
  }
});
