const products = document.querySelectorAll(".slider .product");
const productWidth = document.getElementById("#product").clientWidth;
let counter = 0;
console.log(productWidth);
console.log(counter);

function left() {
  if (counter == 0) {
    counter = products.length - 1;
  } else {
    counter--;
    console.log(counter);
  }
  scroll();
}

function right() {
  if (counter == products.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  scroll();
}

function scroll() {
  products.forEach(function (item) {
    item.style.transform = `translateX(-${counter * (productWidth + 20)}px)`;
  });
}
