const SUBTOTAL_CENTS = 4200;
const money = (cents) => `£${(cents / 100).toFixed(2)}`;

const form = document.getElementById("address-form");
const ratesEl = document.getElementById("rates");
const errorEl = document.getElementById("address-error");
const button = document.getElementById("get-rates");
const continueButton = document.getElementById("continue");

function selectRate(rate) {
  document.getElementById("delivery").textContent = money(rate.cents);
  document.getElementById("total").textContent = money(
    SUBTOTAL_CENTS + rate.cents,
  );
  continueButton.disabled = false;
}

function showRates(rates) {
  ratesEl.innerHTML = "<h2>Delivery options</h2>";
  rates.forEach((rate, i) => {
    const label = document.createElement("label");
    label.className = "rate";
    label.innerHTML = `<input type="radio" name="rate" value="${rate.id}" ${
      i === 0 ? "checked" : ""
    }/><span><strong>${rate.label}</strong><small>${rate.days}</small></span><span>${money(
      rate.cents,
    )}</span>`;
    label.querySelector("input").addEventListener("change", () => selectRate(rate));
    ratesEl.append(label);
  });
  ratesEl.hidden = false;
  selectRate(rates[0]);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const address = Object.fromEntries(new FormData(form));
  errorEl.hidden = true;
  ratesEl.hidden = true;
  button.disabled = true;
  button.textContent = "Checking address…";

  const res = await fetch("/api/shipping-rates", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ country: address.country, postcode: address.postcode }),
  });
  const body = await res.json();

  button.disabled = false;
  button.textContent = "Show delivery options";

  if (!res.ok) {
    console.error("shipping-rates failed", res.status, body);
    errorEl.textContent =
      "Sorry, we can't deliver to this address. Check your postcode and try again.";
    errorEl.hidden = false;
    continueButton.disabled = true;
    return;
  }
  showRates(body.rates);
});
