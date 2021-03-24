const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const csslint = require("gulp-csslint");

const { series } = require("gulp");

function css(cb) {
  return gulp
    .src("public/assets/css/style.css")
    .pipe(csslint())
    .pipe(csslint.formatter("compact"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("build"));
  cb();
}

gulp.task("watch", () => {
  gulp.watch("src/*.css", gulp.series("css"));
});

exports.default = series(css);
exports.css = css;
