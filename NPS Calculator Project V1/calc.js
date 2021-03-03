"use strict";

// global variables
const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const npsResult = document.getElementById("nps");
const errorMessage = document.getElementById("error-message");
let resetInd = 0;

// function to reset page
const resetPage = function () {
  amount.value = "";
  rate.value = "";
  amount.classList.remove("error-border");
  rate.classList.remove("error-border");
  npsResult.innerHTML = "";
  errorMessage.innerHTML = "";
};

// function to reset input boxes, error messages and NPS value during the calculation phase
const npsCalcReset = function (n) {
  npsResult.innerHTML = "";
  if (n === 1) {
    amount.value = "";
    rate.value = "";
    amount.classList.add("error-border");
    rate.classList.add("error-border");
  } else if (n === 2) {
    amount.value = "";
    amount.classList.add("error-border");
    rate.classList.remove("error-border");
  } else if (n === 3) {
    rate.value = "";
    amount.classList.remove("error-border");
    rate.classList.add("error-border");
  } else {
    errorMessage.innerHTML = "";
    amount.classList.remove("error-border");
    rate.classList.remove("error-border");
  }
};

// function (main) to calculate the NPS
const npsCalc = function () {
  const cAmount = Number(amount.value.replace(/,/g, ''));
  const cRate = Number(rate.value);
  if (!cAmount && !cRate) {
    npsCalcReset(1);
    errorMessage.innerHTML = "Enter amount and rate";
  } else if (!cAmount) {
    npsCalcReset(2);
    errorMessage.innerHTML = "Enter amount";
  } else if (!cRate) {
    npsCalcReset(3);
    errorMessage.innerHTML = "Enter rate";
  } else if (cRate > 100) {
    npsCalcReset(3);
    errorMessage.innerHTML = "Rate entered not a %";
  } else {
    npsCalcReset();
    const ourRate = (100 - cRate) / 100;
    // the below 'nps' variable is rounded up to 2 dc places (if necessary)
    const nps = Math.round((cAmount * ourRate) * 100 + Number.EPSILON) / 100;
    npsResult.innerHTML = `NPS = $${nps}`;
  }
};

// the 'Calculate' button event listener
const calculate = document.getElementById("btn1");
calculate.addEventListener("click", npsCalc);

// the 'Reset' button event listener
const reset = document.getElementById("btn2");
reset.addEventListener("click", resetPage);