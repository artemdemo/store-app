import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import shell from 'gulp-shell';
import browserify from 'gulp-browserify';
import less from 'gulp-less';

gulp.task('js', () => {
    return gulp.src('source/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            const message = err.message || '';
            const errName = err.name || '';
            const codeFrame = err.codeFrame || '';
            gutil.log(gutil.colors.red.bold('[JS babel error]') +' '+ gutil.colors.bgRed(errName));
            gutil.log(gutil.colors.bold('message:') +' '+ message);
            gutil.log(gutil.colors.bold('code frame:') +'\n'+ codeFrame);
            this.emit('end');
        })
        .pipe(gulp.dest('public/js/tmp'));
});

gulp.task('browserify', ['js'], () => {
    return gulp.src('public/js/tmp/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .on('error', function(err) {
            const message = err.message || '';
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(gutil.colors.bold('message:') +' '+ message);
            this.emit('end');
        })
        .pipe(gulp.dest('public/js/'))
        //.pipe(shell([
        //    'rm -rf public/js/tmp'
        //]));
});

gulp.task('less', () => {
    return gulp.src('./source/less/style.less')
        .pipe(less())
        .on('error', function(err) {
            const type = err.type || '';
            const message = err.message || '';
            const extract = err.extract || [];
            const line = err.line || '';
            const column = err.column || '';
            gutil.log(gutil.colors.red.bold('[Less error]') +' '+ gutil.colors.bgRed(type) +' ('+ line +':'+ column +')');
            gutil.log(gutil.colors.bold('message:') +' '+ message);
            gutil.log(gutil.colors.bold('codeframe:') +'\n'+ extract.join('\n'));
            this.emit('end');
        })
        .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', () => {
    gulp.watch('./source/**/*.js', ['js', 'browserify']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build', ['js', 'browserify', 'less']);
