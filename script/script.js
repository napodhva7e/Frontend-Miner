// Button Up

window.onscroll = function () {
  scrollFunction();
};

const upbuttons = document.querySelectorAll(".button-up");

for (const upbutton of upbuttons) {
  upbutton.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");

  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
}

function scrollFunction() {
  if (
    document.body.scrollTop > 1200 ||
    document.documentElement.scrollTop > 1200
  ) {
    document.getElementById("btnUp").className = "button-up visible";
  } else {
    document.getElementById("btnUp").className = "button-up hidden";
  }
}

// Smooth Scroll

const links = document.querySelectorAll(".hero-btn");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");

  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
}

// Menu button
function toggleFaidInLeft() {
  document.getElementById("drop-menu").classList.toggle("animate__fadeInLeft");
}
function toggleFaidOutLeft() {
  document.getElementById("drop-menu").classList.remove("animate__fadeOutLeft");
}
function toggleShow() {
  document.getElementById("drop-menu").classList.toggle("show");
}

function menuOpen() {
  document.getElementById("drop-menu").classList.toggle("show");
  document.getElementById("drop-menu").classList.toggle("animate__fadeInLeft");
  setTimeout(toggleFaidInLeft, 1000);
}

function menuClose() {
  document.getElementById("drop-menu").classList.add("animate__fadeOutLeft");
  setTimeout(toggleFaidOutLeft, 1000);
  setTimeout(toggleShow, 1000);
}

// language button
function toggleLangShow() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function toggleFaidIn() {
  document.getElementById("myDropdown").classList.toggle("animate__fadeIn");
}
function toggleFaidOut() {
  document.getElementById("myDropdown").classList.remove("animate__fadeOut");
}
function languagePopUp() {
  if (document.getElementById("myDropdown").classList.contains("show")) {
    document.getElementById("myDropdown").classList.add("animate__fadeOut");
    setTimeout(toggleFaidOut, 1000);
    setTimeout(toggleLangShow, 1000);
  } else {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown").classList.toggle("animate__fadeIn");
    setTimeout(toggleFaidIn, 1000);
  }
}
// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами, сразу и кнопки языков и для кнопки меню.
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        languagePopUp();
      }
    }
  }
  if (!event.target.matches(".btn-menu")) {
    var dropMenu = document.getElementsByClassName("dropdown-content-menu");
    var i;
    for (i = 0; i < dropMenu.length; i++) {
      var openDropMenu = dropMenu[i];
      if (openDropMenu.classList.contains("show")) {
        menuClose();
      }
    }
  }
};
x``;
// popUp
const scrollController = {
  scrollTPosition: 0,
  disabledScroll() {
    scrollController.scrollTPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${scrollController.scrollTPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
  },
  enabledScroll() {
    document.body.style.cssText = ``;
    window.scroll({ top: scrollController.scrollTPosition });
  },
};

const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
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
        scrollController.enabledScroll();
      }, time);
      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  modalElem.addEventListener("click", closeModal);
};

modalController({
  modal: ".modal",
  btnOpen: ".section__button",
  btnClose: ".modal__close",
});

//value Counter
