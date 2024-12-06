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

// Menu

// Language
function openLangModal() {
  document.getElementById("modal").style.top = "0px";
}

function closeLangModal() {
  document.getElementById("modal").style.top = "-400px";
}
