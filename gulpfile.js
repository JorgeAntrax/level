var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {
    outFile: 'kimera.js'
});
// La tarea por defecto (cuando ejecutas `gulp` desde la consola)
gulp.task('default', [
    'compile:ts',
    'minify',
    'watch'
]);

// Tarea que compila el typescript

gulp.task('compile:ts', function() {
    var tsResult = gulp.src("ts/*.ts")
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('js/'));
});

gulp.task('watch', ['compile:ts'], function() {
    gulp.watch('ts/*.ts', ['compile:ts', 'minify']);
});

// Minifica y combina todos los archivos JavaScript indicados en el array 'files'.
gulp.task('minify', function() {
    return gulp.src('js/kimera.js')
        .pipe(concat('kimera.min.js'))
        .pipe(uglify({ compress: { drop_console: true }, mangle: false }).on('error', function(e) {
            console.log('Error uglify: ' + e);
        }))
        .pipe(gulp.dest('js/'));
});