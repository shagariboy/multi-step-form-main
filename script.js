"use strict";

const form = document.querySelector(".your-info-form");
const formOne = document.querySelector(".form-1");
const formTwo = document.querySelector(".form-2");
const formThree = document.querySelector(".form-3");
const formFour = document.querySelector(".form-4");
const formFive = document.querySelector(".form-5");
const formOneInputs = document.querySelectorAll(".input-text");
const formOneInputsWrapper = document.querySelectorAll(".input-text__wrapper");
const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");
const confrimBtn = document.querySelector(".confrim-btn");
const changeBtn = document.querySelector(".change-btn");
const stepInfoNumberOne = document.querySelector(".step-info__number-1");
const stepInfoNumberTwo = document.querySelector(".step-info__number-2");
const stepInfoNumberThree = document.querySelector(".step-info__number-3");
const stepInfoNumberFour = document.querySelector(".step-info__number-4");
const formTwoOptions = document.querySelectorAll(".option");
const formTwoOptionsWrapper = document.querySelectorAll(".plan-options");
const billingOptionsBtn = document.querySelector(".billing-options-btn");
const OptionFreeTrial = document.querySelectorAll(".option-free-trial");
const addOnOptions = document.querySelectorAll(".add-on-price");
const addOn = document.querySelectorAll(".add-on");
const endPlanPrice = document.querySelector(".plan-price");
const billTotalFrequency = document.querySelector(".bill-total-frequency");
const billTotalPrice = document.querySelector(".bill-total-price");
const billFrequency = document.querySelector(".bill-frequency");
const optionAddedOnOnline = document.querySelector(".option-added-on-online");
const optionAddedOnLarger = document.querySelector(".option-added-on-larger");
const optionAddedOnCustomize = document.querySelector(
  ".option-added-on-customize"
);
const optionAddedOn = document.querySelectorAll(".option-added-on");
const optionAddedOnPrice = document.querySelectorAll(".option-added-on-price");

let counter = 0;
let btnPressedFlag = false;
let isChecked = false;
let planPrice = 9;
let addOnPrice = 0;
let isSelected = false;
let plan = "Arcade";
let totalPlanPrice = 0;

const pricePlanChanges = function () {
  endPlanPrice.textContent = isChecked
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`;

  billFrequency.textContent = isChecked
    ? `${plan} (Yearly)`
    : `${plan} (Monthly)`;

  totalPlanPrice = 0;
  totalPlanPrice = planPrice + addOnPrice;

  billTotalPrice.textContent = isChecked
    ? `+$${totalPlanPrice}/yr`
    : `+${totalPlanPrice}/mo`;
};

// Below code checks if an input field is empty, (on form 1) if it is it displays the error otherwise it reverts it back to it's original state If there are no erros it goes to the next form

const formOneFunction = function () {
  formOneInputs.forEach((input) => {
    if (!input.value) {
      input.parentNode.classList.add("error-border");
      input.parentNode.previousElementSibling.children[1].classList.remove(
        "hidden"
      );
      counter = 0;
    }
    if (input.value) {
      input.parentNode.classList.remove("error-border");
      input.parentNode.previousElementSibling.children[1].classList.add(
        "hidden"
      );
      counter++;
    }

    if (counter >= 3) {
      counter = 0;
      formOne.style.display = "none";
      formTwo.style.display = "inline";
      backBtn.style.display = "inline";
      stepInfoNumberOne.classList.toggle("progress-active");
      stepInfoNumberTwo.classList.toggle("progress-active");
    }
  });

  btnPressedFlag = true;
};

const formTwoFunction = function () {
  formThree.style.display = "inline";
  formTwo.style.display = "none";
  stepInfoNumberThree.classList.toggle("progress-active");
  stepInfoNumberTwo.classList.toggle("progress-active");
};

formTwoOptions.forEach((option) => {
  option.addEventListener("click", () => {
    plan = option.children[1].textContent;
    const strPrice = option.children[2].textContent;
    planPrice = Number(strPrice.replace(/\D/g, ""));
    formTwoOptions.forEach((secondOption) => {
      secondOption.classList.remove("form-2-option-active");
    });
    option.classList.toggle("form-2-option-active");

    pricePlanChanges();
  });
});

billingOptionsBtn.addEventListener("click", () => {
  OptionFreeTrial.forEach((option) => {
    option.classList.toggle("hidden");
  });

  const billingChangeForm2 = function (cycle, theOption) {
    const strPrice = theOption.children[2].textContent;
    const price = Number(strPrice.replace(/\D/g, ""));
    theOption.children[2].textContent = cycle
      ? `$${price * 10}/yr`
      : `$${price / 10}/mo`;

    formTwoOptions.forEach((option) => {
      if (option.classList.contains("form-2-option-active")) {
        const temp = option.children[2].textContent;
        planPrice = Number(temp.replace(/\D/g, ""));
      }
    });

    pricePlanChanges();
  };

  const billingChangeForm3 = function (cycle, theOption) {
    const strPrice = theOption.textContent;
    const price = Number(strPrice.replace(/\D/g, ""));
    theOption.textContent = cycle ? `$${price * 10}/yr` : `$${price / 10}/mo`;
  };

  const billingChangeForm4 = function (cycle, theOption) {
    const strPrice = theOption.children[1].textContent;
    const price = Number(strPrice.replace(/\D/g, ""));
    theOption.children[1].textContent = cycle
      ? `$${price * 10}/yr`
      : `$${price / 10}/mo`;
  };

  if (!isChecked) {
    isChecked = true;
    addOnPrice *= 10;
    formTwoOptions.forEach((option) => {
      billingChangeForm2(isChecked, option);
    });

    addOnOptions.forEach((option) => {
      billingChangeForm3(isChecked, option);
    });

    optionAddedOn.forEach((option) => {
      billingChangeForm4(isChecked, option);
    });

    billTotalFrequency.textContent = "Total (per year)";
  } else {
    isChecked = false;
    addOnPrice /= 10;
    formTwoOptions.forEach((option) => {
      billingChangeForm2(isChecked, option);
    });

    addOnOptions.forEach((option) => {
      billingChangeForm3(isChecked, option);
    });

    optionAddedOn.forEach((option) => {
      billingChangeForm4(isChecked, option);
    });

    billTotalFrequency.textContent = "Total (per month)";
  }
});

const formThreeFunction = function () {
  formFour.style.display = "inline";
  formThree.style.display = "none";
  stepInfoNumberThree.classList.toggle("progress-active");
  stepInfoNumberFour.classList.toggle("progress-active");
  nextBtn.style.display = "none";
  confrimBtn.style.display = "inline";
};

const addOnOptionsCalculator = function (theOption, subtract) {
  const strPrice = theOption.children[2].textContent;
  const price = Number(strPrice.replace(/\D/g, ""));
  subtract ? (addOnPrice -= price) : (addOnPrice += price);
};

addOn.forEach((option) => {
  option.addEventListener("click", () => {
    option.classList.toggle("is-checked");
    option.children[0].checked = option.children[0].checked ? false : true;
    if (option.children[0].checked) {
      if (option.classList.contains("add-on-online-service")) {
        optionAddedOnOnline.classList.remove("hidden");
        addOnOptionsCalculator(option, false);
      } else if (option.classList.contains("add-on-larger-storage")) {
        optionAddedOnLarger.classList.remove("hidden");
        addOnOptionsCalculator(option, false);
      } else if (option.classList.contains("add-on-cutsomize")) {
        optionAddedOnCustomize.classList.remove("hidden");
        addOnOptionsCalculator(option, false);
      }
    } else {
      if (option.classList.contains("add-on-online-service")) {
        optionAddedOnOnline.classList.add("hidden");
        addOnOptionsCalculator(option, true);
      } else if (option.classList.contains("add-on-larger-storage")) {
        optionAddedOnLarger.classList.add("hidden");
        addOnOptionsCalculator(option, true);
      } else if (option.classList.contains("add-on-cutsomize")) {
        optionAddedOnCustomize.classList.add("hidden");
        addOnOptionsCalculator(option, true);
      }
    }

    pricePlanChanges();
  });
});

const formFourFunction = function () {
  formFour.style.display = "none";
  formFive.style.display = "flex";
  backBtn.style.display = "none";
  confrimBtn.style.display = "none";
  form.style.display = "none";
};

const backFormTwoFunction = function () {
  formOne.style.display = "inline";
  formTwo.style.display = "none";
  backBtn.style.display = "none";
  stepInfoNumberOne.classList.toggle("progress-active");
  stepInfoNumberTwo.classList.toggle("progress-active");
  counter = 0;
};

const backFormThreeFunction = function () {
  formThree.style.display = "none";
  formTwo.style.display = "inline";
  stepInfoNumberThree.classList.toggle("progress-active");
  stepInfoNumberTwo.classList.toggle("progress-active");
};

const backFormFourFunction = function () {
  formFour.style.display = "none";
  formThree.style.display = "inline";
  stepInfoNumberThree.classList.toggle("progress-active");
  stepInfoNumberFour.classList.toggle("progress-active");
  nextBtn.style.display = "inline";
  confrimBtn.style.display = "none";
};

const changeBtnFunction = function () {
  formFour.style.display = "none";
  formTwo.style.display = "inline";
  stepInfoNumberTwo.classList.toggle("progress-active");
  stepInfoNumberFour.classList.toggle("progress-active");
  nextBtn.style.display = "inline";
  confrimBtn.style.display = "none";
};

nextBtn.addEventListener("click", () => {
  if (window.getComputedStyle(formOne, null).display !== "none") {
    formOneFunction();
  } else if (window.getComputedStyle(formTwo, null).display !== "none") {
    formTwoFunction();
  } else if (window.getComputedStyle(formThree, null).display !== "none") {
    formThreeFunction();
  }
});

backBtn.addEventListener("click", () => {
  if (window.getComputedStyle(formTwo, null).display === "inline") {
    backFormTwoFunction();
  } else if (window.getComputedStyle(formThree, null).display === "inline") {
    backFormThreeFunction();
  } else if (window.getComputedStyle(formFour, null).display === "inline") {
    backFormFourFunction();
  }
});

confrimBtn.addEventListener("click", () => {
  formFourFunction();
});

changeBtn.addEventListener("click", () => {
  changeBtnFunction();
});

// Below code checks if the input field is empty (on form 1) if it is it persists the error message, if it doesn't it reverts it back to normal

formOneInputsWrapper.forEach((wrapper) => {
  wrapper.addEventListener("focusout", () => {
    if (btnPressedFlag) {
      wrapper.classList.toggle("error-border");
      formOneInputs.forEach((input) => {
        if (!input.value) {
          input.parentNode.classList.add("error-border");
          input.parentNode.previousElementSibling.children[1].classList.remove(
            "hidden"
          );
        } else {
          input.parentNode.classList.remove("error-border");
          input.parentNode.previousElementSibling.children[1].classList.add(
            "hidden"
          );
        }
      });
    }
  });
});

// Below code prevents the form from submitting

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
