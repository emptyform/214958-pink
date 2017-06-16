"use strict";

var hamburger = document.querySelector(".page-header__button");
var header = document.querySelector(".page-header");
var planPagination = document.querySelectorAll(".plan__pagination .pagination__item");
var feedbackPagination = document.querySelectorAll(".feedback__pagination .pagination__item");
var table = document.querySelector(".prices");
var review = document.querySelectorAll(".review");
var arrow = document.querySelectorAll(".control__arrow");
var arrowLeft = document.querySelector(".control__arrow--left");
var arrowRight = document.querySelector(".control__arrow--right");
var formButton = document.querySelector(".form__button");
var popupButton = document.querySelectorAll(".popup__btn");
var popupFailure = document.querySelector(".popup--failure");
var popupSuccess = document.querySelector(".popup--success");

header.classList.remove("page-header--nojs");

hamburger.addEventListener("click", function() {
  header.classList.toggle("page-header--visible");
  hamburger.classList.toggle("page-header__button--close");
});

function removeActive(elems) {
  for (var i = 0; i < elems.length; i++) {
    if(elems[i].classList.contains("pagination__item--active"))
      elems[i].classList.remove("pagination__item--active");
  }
}

for (var i = 0; i < planPagination.length; i++)(function(i) {
  var slides = ["first", "second", "third"];
  planPagination[i].addEventListener("click", function(event) {
    event.preventDefault();
    removeActive(planPagination);
    this.classList.add("pagination__item--active");
    for (var j = 0; j < slides.length; j++) {
      if(table.classList.contains("prices--" + slides[j] + "-slide"))
        table.classList.remove("prices--" + slides[j] + "-slide");
    }
    table.classList.add("prices--" + slides[i] + "-slide");
  });
})(i);

for (var i = 0; i < feedbackPagination.length; i++)(function(i) {
  feedbackPagination[i].addEventListener("click", function(event) {
    event.preventDefault();
    removeActive(feedbackPagination);
    this.classList.add("pagination__item--active");
    for (var j = 0; j < review.length; j++) {
      if(review[j].classList.contains("review--active"))
        review[j].classList.remove("review--active");
    }
    review[i].classList.add("review--active");
  });
})(i);

for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", function(event) {
    event.preventDefault();
    var curr = 0;
    for (var j = 0; j < review.length; j++) {
      if(review[j].classList.contains("review--active")) {
        review[j].classList.remove("review--active");
        curr = j;
      }
    }
    if(this.classList.contains("control__arrow--left")) {
      curr = --curr;
      if(curr < 0) curr = review.length - 1;
      review[curr].classList.add("review--active");
      removeActive(feedbackPagination);
      feedbackPagination[curr].classList.add("pagination__item--active");
    } else if (this.classList.contains("control__arrow--right")) {
      curr = ++curr;
      if(curr > review.length - 1) curr = 0;
      review[curr].classList.add("review--active");
      removeActive(feedbackPagination);
      feedbackPagination[curr].classList.add("pagination__item--active");
    }
  });
}

formButton.addEventListener("click", function(event) {
  event.preventDefault();
  if(!document.getElementsByName("firstname")[0].value
    && !document.getElementsByName("lastname")[0].value
    && !document.getElementsByName("email")[0].value) {
      popupFailure.classList.add("popup--show");
  } else {
    popupSuccess.classList.add("popup--show");
  }
});

for (var i = 0; i < popupButton.length; i++) {
  popupButton[i].addEventListener("click", function(event) {
    if (popupSuccess.classList.contains("popup--show")) {
      popupSuccess.classList.remove("popup--show");
    } else if (popupFailure.classList.contains("popup--show")) {
      popupFailure.classList.remove("popup--show");
    }
  });
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popupSuccess.classList.contains("popup--show")) {
      popupSuccess.classList.remove("popup--show");
    } else if (popupFailure.classList.contains("popup--show")) {
      popupFailure.classList.remove("popup--show");
    }
  }
});
