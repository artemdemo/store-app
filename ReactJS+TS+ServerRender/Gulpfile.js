var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');

gulp.task('ts', function() {
    return gulp.src('source/**/*.tsx')
        .pipe(ts({
            target: 'es5',
            module: 'commonjs',
            jsx: 'react'
        }))
        .js.pipe(gulp.dest('js/tmp'));
});

gulp.task('browserify', ['ts'], function() {
    return gulp.src('js/tmp/app.js')
        .pipe(browserify({}))
        .pipe(gulp.dest('js'))
        .pipe(shell([
            //'rm -rf js/tmp'
        ]));
});

gulp.task('less', function () {
    return gulp.src('./source/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', function() {
    gulp.watch('./source/**/*.tsx', ['ts', 'browserify']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build', ['ts', 'browserify', 'less']);

gulp.task('default', ['build', 'watch']);
