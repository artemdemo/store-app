var gulp = require('gulp'),
    less = require('gulp-less'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function(){
    return gulp.src('./less/**/*.less')
        .pipe(less({}))
        .pipe(gulp.dest('./css'));
});

gulp.task('ts', function(){
    var tsResult = gulp.src('source/init.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput: true
        }));
    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function(){
    gulp.watch('./less/**/*.less',['less']);
    gulp.watch('./source/**/*.ts',['ts']);
});

gulp.task('default', ['less', 'ts', 'watch']);