"use strict";

var hamburger = document.querySelector(".page-header__button");
var header = document.querySelector(".page-header");

header.classList.remove("page-header--nojs");

hamburger.addEventListener("click", function() {
  header.classList.toggle("page-header--visible");
  hamburger.classList.toggle("page-header__button--close");
});
