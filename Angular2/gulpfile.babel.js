import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import less from 'gulp-less';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';

gulp.task('browserify', () => {
    return browserify({
        entries: 'source/bootstrap.ts',
        debug: true
    })
        .plugin(tsify, {
            target: 'es5',
            experimentalDecorators: true
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('uglify', ['browserify'], function() {
    return gulp.src('js/bundle.js')
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('less', function () {
    return gulp.src('./less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', () => {
    gulp.watch('./source/**/*.ts', ['build']);
    gulp.watch('./less/*.less', ['less']);
});

gulp.task('build', ['browserify', 'uglify', 'less']);
gulp.task('default', ['build', 'watch']);
