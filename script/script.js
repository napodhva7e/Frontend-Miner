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

function menuPopUp() {
  document.getElementById("drop-menu").classList.toggle("show");
}

// language button

function languagePopUp() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами, сразу и кнопки языков и для кнопки меню.

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
  if (!event.target.matches(".btn-menu")) {
    var dropMenu = document.getElementsByClassName("dropdown-content-menu");
    var i;
    for (i = 0; i < dropMenu.length; i++) {
      var openDropMenu = dropMenu[i];
      if (openDropMenu.classList.contains("show")) {
        openDropMenu.classList.remove("show");
      }
    }
  }
};
