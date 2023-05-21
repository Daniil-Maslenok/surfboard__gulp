const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require('gulp-autoprefixer');
// const pxToRem = require('gulp-px2rem-converter');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require("gulp-svg-sprite");
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, JS_LIBS } = require('./gulp.config')


task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

const styles = [
  'src/styles/layout/normalize.scss',
  'src/styles/layout/reset_style.scss',
  'src/styles/layout/media.scss',
  'src/styles/layout/base.scss',
  'src/styles/blocks/advantages.scss',
  'src/styles/blocks/burger.scss',
  'src/styles/blocks/button.scss',
  'src/styles/blocks/dropdown.scss',
  'src/styles/blocks/features.scss',
  'src/styles/blocks/fixed-menu.scss',
  'src/styles/blocks/form.scss',
  'src/styles/blocks/header.scss',
  'src/styles/blocks/hero.scss',
  'src/styles/blocks/map-footer.scss',
  'src/styles/blocks/menu.scss',
  'src/styles/blocks/modal-form.scss',
  'src/styles/blocks/overlay.scss',
  'src/styles/blocks/parameters.scss',
  'src/styles/blocks/participant.scss',
  'src/styles/blocks/player.scss',
  'src/styles/blocks/product-menu.scss',
  'src/styles/blocks/product.scss',
  'src/styles/blocks/radio.scss',
  'src/styles/blocks/reviews.scss',
  'src/styles/blocks/section.scss',
  'src/styles/blocks/slider.scss',
  'src/styles/blocks/socials.scss',
  'src/styles/blocks/team.scss',
  'src/styles/blocks/title-info.scss'
]

task("styles", () => {
  return src(styles)
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('style.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    // .pipe(pxToRem())
    .pipe(gulpif(env == "dev",
      autoprefixer({
        cascade: false
      })))
    // .pipe(gulpif(env == "prod",gcmq())) группировка медиа-запросов
    .pipe(gulpif(env == "prod", cleanCSS()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task("scripts", () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ";" }))
    .pipe(gulpif(env == "dev", babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env == "dev", uglify()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task("images", () => {
  return src(`${SRC_PATH}/img/**/*.png`)
    .pipe(dest(`${DIST_PATH}/img`));
})

task("sprite", () => {
  return src(`${SRC_PATH}/img/sprite.svg`)
    .pipe(dest(`${DIST_PATH}/img/`));
})

// task("icons", () => {
//   return src(`${SRC_PATH}/img/icons/*.svg`)
//     .pipe(svgo({
//       plugins: [
//         {
//           removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
//         }
//       ]
//     }))
//     .pipe(svgSprite({
//       mode: {
//         symbol: {
//           sprite: "../sprite.svg"
//         }
//       }
//     }))
//     .pipe(dest(`${DIST_PATH}/img/icons`));
// })

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});

task('watch', () => {
  watch(`./${SRC_PATH}/styles/**/*.scss`, series("styles"));
  watch(`./${SRC_PATH}/*.html`, series("copy:html"));
  watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
  watch(`./${SRC_PATH}/img/*.svg`, series("sprite"));
})


task("default", series("clean", parallel("copy:html", "styles", "scripts", "images", "sprite"), parallel("server", "watch")));

task("build", series("clean", parallel("copy:html", "styles", "scripts", "images", "sprite")));
