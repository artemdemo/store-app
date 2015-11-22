var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');

gulp.task('ts', function() {
    gulp.src('source/**/*.tsx')
        .pipe(ts({
            target: 'es5',
            module: 'commonjs',
            jsx: 'react'
        }))
        .js.pipe(gulp.dest('js/tmp'));
});

gulp.task('less', function () {
    return gulp.src('./source/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', function() {
    gulp.watch('./source/**/*.ts', ['ts']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build', ['ts', 'less']);

gulp.task('default', ['build', 'watch']);
