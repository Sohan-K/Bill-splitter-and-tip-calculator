
    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const customTipInput = document.getElementById("customTip");

    const billError = document.getElementById("billError");
    const peopleError = document.getElementById("peopleError");
    const tipError = document.getElementById("tipError");

    const tipAmountEl = document.getElementById("tipAmount");
    const grandTotalEl = document.getElementById("grandTotal");
    const perPersonEl = document.getElementById("perPerson");

    const tipButtons = document.querySelectorAll(".tip-btn");
    const resetBtn = document.getElementById("resetBtn");

    let selectedTip = 15;

    const MAX_TIP = 1000;
    const MAX_BILL = 1000000000;

    function sanitizeNumber(value) {
      return value.replace(/[^0-9.]/g, "");
    }

    function sanitizeInteger(value) {
      return value.replace(/[^0-9]/g, "");
    }

    function setError(element, input, message) {
      element.textContent = message;
      input.classList.add("error-input");
    }

    function clearError(element, input) {
      element.textContent = "";
      input.classList.remove("error-input");
    }

    function formatCurrency(num) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }

    function validateBill(value) {
      if (value.trim() === "") {
        return "Please enter a bill amount.";
      }

      const num = Number(value);

      if (Number.isNaN(num)) {
        return "Bill amount must be a valid number.";
      }

      if (num <= 0) {
        return "Bill amount must be greater than 0.";
      }

      if (num > MAX_BILL) {
        return "Bill amount is unrealistically large.";
      }

      return "";
    }

    function validateTip(value) {
      if (Number.isNaN(value)) {
        return "Tip percentage must be a valid number.";
      }

      if (value < 0) {
        return "Tip percentage cannot be negative.";
      }

      if (value > MAX_TIP) {
        return `Tip percentage cannot exceed ${MAX_TIP}%.`;
      }

      return "";
    }

    function validatePeople(value) {
      if (value.trim() === "") {
        return "Please enter number of people.";
      }

      const num = Number(value);

      if (!Number.isInteger(num)) {
        return "Number of people must be a whole number.";
      }

      if (num < 1) {
        return "There must be at least 1 person.";
      }

      return "";
    }

    function updateTipButtons() {
      tipButtons.forEach(btn => {
        const value = Number(btn.dataset.tip);

        btn.classList.toggle("active", value === selectedTip);
      });
    }

    function calculate() {
      const billValue = sanitizeNumber(billInput.value);
      const peopleValue = sanitizeInteger(peopleInput.value);

      billInput.value = billValue;
      peopleInput.value = peopleValue;

      const billValidation = validateBill(billValue);
      const peopleValidation = validatePeople(peopleValue);
      const tipValidation = validateTip(selectedTip);

      if (billValidation) {
        setError(billError, billInput, billValidation);
      } else {
        clearError(billError, billInput);
      }

      if (peopleValidation) {
        setError(peopleError, peopleInput, peopleValidation);
      } else {
        clearError(peopleError, peopleInput);
      }

      if (tipValidation) {
        setError(tipError, customTipInput, tipValidation);
      } else {
        clearError(tipError, customTipInput);
      }

      if (billValidation || peopleValidation || tipValidation) {
        tipAmountEl.textContent = "—";
        grandTotalEl.textContent = "—";
        perPersonEl.textContent = "—";
        return;
      }

      const bill = Number(billValue);
      const people = Number(peopleValue);

      const tipAmount = bill * (selectedTip / 100);
      const grandTotal = bill + tipAmount;

      // Standard financial rounding to nearest cent/paise
      const perPerson = grandTotal / people;

      tipAmountEl.textContent = formatCurrency(tipAmount);
      grandTotalEl.textContent = formatCurrency(grandTotal);
      perPersonEl.textContent = formatCurrency(perPerson);
    }

    tipButtons.forEach(button => {
      button.addEventListener("click", () => {
        selectedTip = Number(button.dataset.tip);

        customTipInput.value = "";

        updateTipButtons();
        calculate();
      });
    });

    customTipInput.addEventListener("input", () => {
      customTipInput.value = sanitizeNumber(customTipInput.value);

      if (customTipInput.value.trim() === "") {
        selectedTip = 15;
      } else {
        selectedTip = Number(customTipInput.value);
      }

      tipButtons.forEach(btn => btn.classList.remove("active"));

      calculate();
    });

    billInput.addEventListener("input", calculate);
    peopleInput.addEventListener("input", calculate);

    resetBtn.addEventListener("click", () => {
      billInput.value = "";
      peopleInput.value = "1";
      customTipInput.value = "";

      selectedTip = 15;

      clearError(billError, billInput);
      clearError(peopleError, peopleInput);
      clearError(tipError, customTipInput);

      updateTipButtons();
      calculate();

      billInput.focus();
    });

    // Prevent accidental form submit / Enter weirdness
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });

    updateTipButtons();
    calculate();
