"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var rename = require("gulp-rename");
var mqpacker = require("css-mqpacker");
var csso = require("gulp-csso");
var del = require("del");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var run = require("run-sequence");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("style:dev", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("style:production", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      mqpacker(),
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(csso())
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("img"));
});

gulp.task("symbols", function() {
  return gulp.src('img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("img"));
});

gulp.task("svg", function() {
  return gulp.src("img/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("img"));
});

gulp.task("js:scripts", function() {
  return gulp.src([
    "node_modules/picturefill/dist/picturefill.min.js",
    "node_modules/svg4everybody/dist/svg4everybody.min.js"
  ])
    .pipe(gulp.dest("js/vendor"));
});

gulp.task("js:production", function() {
  return gulp.src("js/script.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/*.{svg,png,jpg,gif}",
    "js/vendor/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("serve", ["js:scripts", "style:dev", "symbols"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style:dev"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("build", function(fn) {
  run(
    "clean",
    ["symbols", "style:production", "js:scripts", "js:production"],
    "copy",
    fn
  );
});
