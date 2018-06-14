const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rs = require('run-sequence');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const tsProject = ts.createProject('tsconfig.json');

/**Default task (runs when executing `gulp` comand in the console)*/
gulp.task('default', () => {
    gulp.watch('./ts/**/*.ts', ['build']);
});

// the task compile sequence

gulp.task('build', () => {
    rs('compiled', 'concat', 'minify');
});

// the task for sass compiler

gulp.task('sass', () => {
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

/**Task that compiles typescript code.*/
gulp.task('compiled', function() {
    let tsResult = gulp.src('./ts/**/*.ts')
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./js/src/'));
});

/* the concatenation tasking */

gulp.task('concat', () => {
    return gulp.src('./js/src/*.js')
        .pipe(concat('kimera.js'))
        .pipe(gulp.dest('./js/'));
});

/**Minifies kimera.js*/
gulp.task('minify', () => {
    return gulp.src('./js/kimera.js')
        .pipe(uglify({ compress: { drop_console: true }, mangle: false }).on('error', function(e) {
            console.log('Error uglify: ' + e);
        }))
        .pipe(rename('kimera.min.js'))
        .pipe(gulp.dest('./js/'));
});