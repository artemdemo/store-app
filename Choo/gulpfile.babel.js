import gulp from 'gulp';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import browserify from 'gulp-browserify';
import less from 'gulp-less';

gulp.task('js', () => {
    return gulp.src('source/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/js/tmp'));
});

gulp.task('browserify', ['js'], () => {
    return gulp.src('public/js/tmp/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('public/js/'))
        //.pipe(shell([
        //    'rm -rf public/js/tmp'
        //]));
});

gulp.task('less', () => {
    return gulp.src('./source/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', () => {
    gulp.watch('./source/**/*.js', ['js', 'browserify']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build', ['js', 'browserify', 'less']);
