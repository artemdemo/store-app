import gulp from 'gulp';
import riot from 'gulp-riot';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import browserify from 'gulp-browserify';
import less from 'gulp-less';

gulp.task('js', () => {
    return gulp.src('source/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js/tmp'));
});

gulp.task('riot', () => {
    return gulp.src('source/**/*.riot')
        .pipe(riot({
            expr: true,
            type: 'es6',
            modular: true
        }))
        .pipe(gulp.dest('js/tmp'));
});

gulp.task('browserify', ['js', 'riot'], () => {
    return gulp.src('js/tmp/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('js/'))
        //.pipe(shell([
        //    'rm -rf js/tmp'
        //]));
});

gulp.task('less', () => {
    return gulp.src('./source/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', () => {
    gulp.watch('./source/**/*.riot', ['riot', 'browserify']);
    gulp.watch('./source/**/*.js', ['js', 'browserify']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build-js', ['js', 'riot', 'browserify']);
gulp.task('build', ['build-js', 'less']);
