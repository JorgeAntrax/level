const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', {
    outFile: 'kimera.js'
});

/**Default task (runs when executing `gulp` comand in the console)*/
gulp.task('default', () => {
    gulp.watch('ts/*.ts', ['compile:ts', 'minify']);
});

/**Task that compiles typescript code.*/
gulp.task('compile:ts', function() {
    var tsResult = gulp.src("ts/*.ts")
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('js/'));
});


/**Minifies kimera.js*/
gulp.task('minify', () => {
    return gulp.src('js/kimera.js')
        .pipe(uglify({ compress: { drop_console: true }, mangle: false }).on('error', function(e) {
            console.log('Error uglify: ' + e);
        }))
        .pipe(rename('kimera.min.js'))
        .pipe(gulp.dest('js/'));
});