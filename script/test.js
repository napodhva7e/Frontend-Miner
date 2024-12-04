$(function () {
  $(".prev").on("click", function (event) {
    event.preventDefault();
    prevSlide();
  });

  $(".next").on("click", function (event) {
    event.preventDefault();
    nextSlide();
  });

  if ($(".item").length <= 1) {
    $(".next").addClass("hide-nav");
  }

  $(".prev").addClass("hide-nav");

  function nextSlide() {
    var atual = $(".cd-slider").find(".current"),
      next = atual.next();

    next
      .addClass("current")
      .removeClass("prev_slide")
      .siblings()
      .removeClass("current");
    next.prevAll().addClass("prev_slide");

    if (next.index() > 0) {
      $(".prev").removeClass("hide-nav");
    }
    if (next.index() == $(".item").last().index()) {
      $(".next").addClass("hide-nav");
    }
  }

  function prevSlide() {
    var atual = $(".cd-slider").find(".current"),
      prev = atual.prev();

    prev
      .addClass("current")
      .removeClass("prev_slide")
      .siblings()
      .removeClass("current");

    if (prev.index() !== $(".item").last().index()) {
      $(".next").removeClass("hide-nav");
    }
    if (prev.index() == 0) {
      $(".prev").addClass("hide-nav");
    }
  }
});
