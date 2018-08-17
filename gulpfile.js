const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rs = require('run-sequence');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const tsProject = ts.createProject('tsconfig.json');
const DIR_CSS = './css/';
const DIR_SCSS_WATCH = './scss/**/*.scss';
const DIR_TS_WATCH = './ts/**/*.ts';
const DIR_JS_SRC = './js/src/';
const SASS_FILES = [
    './scss/base/*.scss',
    './scss/components/*.scss',
    './scss/layout/*.scss'
];

/**Default task (runs when executing `gulp` comand in the console)*/

gulp.task('default', () => {
    gulp.watch(DIR_TS_WATCH, ['compile:ts']);
    gulp.watch(DIR_SCSS_WATCH, ['sass']);
});

// the watch for sass files

gulp.task('sass:watch', () => {
    gulp.watch(DIR_SCSS_WATCH, ['sass']);
});

// the task for sass compiler

gulp.task('sass', () => {
    rs('create:components', 'compile:level', 'minify:level');
});

gulp.task('create:components', () => {
    return gulp.src(SASS_FILES)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: false
        }).on('error', sass.logError))
        .pipe(gulp.dest(DIR_CSS));
});

gulp.task('compile:level', () => {
    return gulp.src('./scss/level.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(DIR_CSS));
});

gulp.task('minify:level', () => {
    return gulp.src(DIR_CSS + 'level.css')
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: false
        }).on('error', sass.logError))
        .pipe(rename('level.min.css'))
        .pipe(gulp.dest(DIR_CSS));
});

// the task compile sequence to typescript

gulp.task('compile:ts', () => {
    rs('compiled', 'concat', 'minify');
});

/** compile all files.ts  */

gulp.task('compiled', function() {
    let tsResult = gulp.src(DIR_TS_WATCH)
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(DIR_JS_SRC));
});

/** the concatenation files in level.js */

gulp.task('concat', () => {
    return gulp.src(DIR_JS_SRC + '*.js')
        .pipe(concat('level.js'))
        .pipe(gulp.dest('./js/'));
});

/**Minifies level.js*/
gulp.task('minify', () => {
    return gulp.src('./js/level.js')
        .pipe(uglify({ compress: { drop_console: true }, mangle: false }).on('error', function(e) {
            console.log('Error uglify: ' + e);
        }))
        .pipe(rename('level.min.js'))
        .pipe(gulp.dest('./js/'));
});