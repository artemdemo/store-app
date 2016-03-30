import gulp from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename';
import gutil from 'gulp-util';
import browserify from 'browserify';
import source from 'vinyl-source-stream';


gulp.task('browserify', () => {
    return browserify({
        entries: './source/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties', 'transform-object-rest-spread']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./js'));
});


gulp.task('less', () => {
    return gulp.src('source/less/main.less')
        .pipe(less())
        .on('error', function(err){
            // Handle less errors, but do not stop watch task
            gutil.log(gutil.colors.red.bold('[Less error]'));
            gutil.log(gutil.colors.bgRed('filename:') +' '+ err.filename);
            gutil.log(gutil.colors.bgRed('lineNumber:') +' '+ err.lineNumber);
            gutil.log(gutil.colors.bgRed('extract:') +' '+ err.extract.join(' '));
            this.emit('end');
        })
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('./css'))
});


gulp.task('watch', () => {
    gulp.watch('./source/**/**/*.jsx', ['browserify']);
    gulp.watch('./source/less/**/*.less', ['less']);
});


gulp.task('build', ['browserify', 'less']);