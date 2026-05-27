
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Fetch exchange rate
const updateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || amount <= 0) {
    amount = 1;
    amountInput.value = 1;
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    const finalAmount = (amount * rate).toFixed(2);

    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "❌ Failed to fetch exchange rate";
    console.error(error);
  }
};

// Update flag
const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Load default
window.addEventListener("load", () => {
  updateExchangeRate();
});

