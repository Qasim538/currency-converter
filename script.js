
// https://www.worldometers.info/geography/flags-of-the-world/


const cur1 = document.querySelector(".cur-1");
const cur2 = document.querySelector(".cur-2");
const cur1Input = document.querySelector(".cur-1-input");
const cur2Input = document.querySelector(".cur-2-input");

const baseRate = document.querySelector(".base");
const switchCur = document.querySelector(".switch-cur");

const countries = [
  {
    name: "AED",
    flagURL: "https://www.worldometers.info/img/flags/ae-flag.gif",
  },
  {
    name: "EUR",
    flagURL: "https://www.worldometers.info/img/flags/au-flag.gif",
  },
  {
    name: "GBP",
    flagURL: "https://www.worldometers.info/img/flags/uk-flag.gif",
  },
  {
    name: "USD",
    flagURL: "https://www.worldometers.info/img/flags/us-flag.gif",
  },
];

const apiURL = "https://v6.exchangerate-api.com/v6/";
const key = "5a4921d90e89ac8d21c7e9f7";

async function getExchangeRate() {
  const cur1Value = cur1.value;
  const cur2Value = cur2.value;

  const response = await fetch(`${apiURL}${key}/latest/${cur1Value}`);
  const data = await response.json();

  const rate = data.conversion_rates[cur2Value];

  baseRate.textContent = `1 ${cur1Value} = ${rate.toFixed(2)} ${cur2Value}`;

  cur2Input.value = (cur1Input.value * rate).toFixed(2);
}

getExchangeRate();

cur1.addEventListener("change", () => {
  getExchangeRate();
  getFlag();
});

cur2.addEventListener("change", () => {
  getExchangeRate();
  getFlag();
});

cur1Input.addEventListener("input", getExchangeRate);
cur2Input.addEventListener("input", getExchangeRate);

switchCur.addEventListener("click", () => {
  const cur1Val = cur1.value;
  cur1.value = cur2.value;
  cur2.value = cur1Val;
  switchCur.classList.toggle("rotate");
  getExchangeRate();
  getFlag();
});

function getFlag() {
  countries.forEach((country) => {
    if (cur1.value === country.name) {
      const imgSrc = document.querySelector(".from img");
      imgSrc.setAttribute("src", country.flagURL);
    }
    if (cur2.value === country.name) {
      const imgSrc = document.querySelector(".to img");
      imgSrc.setAttribute("src", country.flagURL);
    }
  });
}
