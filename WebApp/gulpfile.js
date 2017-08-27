
var gulp = require('gulp');
var less = require('gulp-less');
var runSequence = require('run-sequence');

gulp.task('build-release', function () {

    console.log('Building release');

    runSequence(
        'transpile-less'
    );
});

gulp.task('transpile-less', function () {
    console.log('Transpiling LESS to CSS');

    return gulp.src(['styles/main.less', 'styles/pages.less'])
        .pipe(less())
        .pipe(gulp.dest('styles'));
});