const scrollController2 = {
  scrollTPosition: 0,
  disabledScroll() {
    scrollController2.scrollTPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController2.scrollTPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px;
      `;
  },
  enabledScroll() {
    document.body.style.cssText = ``;
    window.scroll({ top: scrollController2.scrollTPosition });
  },
};

const modalController2 = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: opacity ${time}ms ease-in-out;
    `;

  const closeModal = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === "Escape"
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
        scrollController2.enabledScroll();
      }, time);
      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
    scrollController2.disabledScroll();
  };

  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  modalElem.addEventListener("click", closeModal);
};

modalController2({
  modal: ".modalCalc",
  btnOpen: ".modalOpen__button",
  btnClose: ".modal__close",
});

// getCalculate

const DC = 3 * Math.pow(10, 7);
const ER = 12.5;
const PR = 70;

const minerSystemObj = {
  AntminerS19Pro: {
    hr: 11 * Math.pow(10, 5),
    power: 3250,
    cost: 2500,
    id: "AntminerS19Pro",
  },
  WhatsminerM30S: {
    hr: 10 * Math.pow(10, 5),
    power: 3400,
    cost: 2300,
    id: "WhatsminerM30S",
  },
  ElphapexDG1144G: {
    hr: 144 * Math.pow(10, 4),
    power: 3920,
    cost: 8450,
    id: "ElphapexDG1+14.4G",
  },
  ElphapexDG1136G: {
    hr: 136 * Math.pow(10, 4),
    power: 3400,
    cost: 8800,
    id: "ElphapexDG113.6G",
  },
  ElphapexDG111G: {
    hr: 11 * Math.pow(10, 5),
    power: 3420,
    cost: 6999,
    id: "ElphapexDG111G",
  },
  AntminerL7: {
    hr: 91.6 * Math.pow(10, 4),
    power: 3425,
    cost: 5700,
    id: "AntminerL7",
  },
  BitmainAntminerL9: {
    hr: 165 * Math.pow(10, 4),
    power: 3250,
    cost: 12800,
    id: "BitmainAntminerL9",
  },
};

const countryObj = {
  Bulgaria: {
    id: "Bulgaria",
    CE: 0.08,
  },
  Estonia: {
    id: "Estonia",
    CE: 0.1,
  },
  Latvia: {
    id: "Latvia",
    CE: 0.1,
  },
};

// получение id инпута системы при нажатии
const inputSystems = document.querySelectorAll(".input-system");

for (const inputSystem of inputSystems) {
  inputSystem.addEventListener("click", giveActiveSystem);
}

function giveActiveSystem() {
  document
    .getElementById(this.getAttribute("id"))
    .classList.toggle("activeSystem");
}

// получение id инпута страны при нажатии

const countrys = document.querySelectorAll(".input-country");

for (const country of countrys) {
  country.addEventListener("click", giveActiveCountry);
}

function giveActiveCountry() {
  document
    .getElementById(this.getAttribute("id"))
    .classList.add("activeCountry");
}

function deleteClass(system, country) {
  for (const inputSystem of inputSystems) {
    inputSystem.checked = false;
  }
  for (const country of countrys) {
    country.checked = false;
  }
  system.classList.remove("activeSystem");
  country.classList.remove("activeCountry");
}
function getCharacter(idS, idC) {
  let hr = minerSystemObj[idS].hr;
  let power = minerSystemObj[idS].power;
  let cost = minerSystemObj[idS].cost;
  let ce = countryObj[idC].CE;
  getCalc(hr, power, cost, ce);
}

// функция всех рассчетов

function getCalc(hr, power, cost, ce) {
  let reven = revenue(hr);
  let ecost = electricity(power, ce).toFixed(2);
  let nprofit = profit(reven, ecost).toFixed(3);
  let roi = ROI(cost, nprofit);
  showResult(reven, ecost, nprofit, roi);
}

// функция общего дохода

function revenue(hr) {
  let reven = (((hr * ER) / DC) * PR).toFixed(2);
  return reven;
}

// функция расчета оплаты электроэнергии

function electricity(power, ce) {
  let ec = power * 24 * (ce / 1000);
  return ec;
}

// функция расчета чистого дохода

function profit(reven, ecost) {
  let nprofit = reven - ecost;
  return nprofit;
}

// функция расчета рои
function ROI(cost, nprofit) {
  let roi = Math.floor(cost / nprofit);
  return roi;
}

function showResult(reven, ecost, nprofit, ROI) {
  const incomeItem = document.querySelector(".Income");
  const profitItem = document.querySelector(".Profit");
  const roiItem = document.querySelector(".ROI");
  const electricityItem = document.querySelector(".Electricity");
  incomeItem.innerHTML = `${reven} USD`;
  profitItem.innerHTML = `${nprofit} USD`;
  roiItem.innerHTML = `${ROI} дней`;
  electricityItem.innerHTML = `${ecost} USD`;
}

function calculated() {
  const inputSystem = document.querySelector(".activeSystem");
  const inputCountry = document.querySelector(".activeCountry");
  const idSystem = inputSystem.getAttribute("id");
  const idCountry = inputCountry.getAttribute("id");
  getCharacter(idSystem, idCountry);
  deleteClass(inputSystem, inputCountry);
}

const msBoxBtn = document.querySelector(".ms-box-btn");
msBoxBtn.addEventListener("click", calculated);
