const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const minify = require("gulp-minifier");

gulp.task("default", ["html", "css", "js", "browserSync"]);

const handleError = error => {
  console.log(error.toString());
  this.emit("end");
};
gulp.task("browserSync", () => {
  browserSync.init({
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task("html", () => {
  gulp
    .src("index.html")
    .pipe(
      minify({
        minify: true,
        minifyHTML: true
      })
    )
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("css", () => {
  gulp
    .src("style.scss")
    .on("error", handleError)
    .pipe(sass())
    .pipe(
      minify({
        minify: true,
        minifyCSS: true
      })
    )
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", () => {
  gulp
    .src("app.js")
    .pipe(
      minify({
        minify: true,
        minifyJS: true
      })
    )
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["default"], () => {
  gulp.watch("*.html", ["html"]);
  gulp.watch("*.scss", ["css"]);
  gulp.watch("*.js", ["js"]);
});
