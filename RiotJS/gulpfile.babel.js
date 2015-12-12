import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import less from 'gulp-less';


gulp.task('default', () => {
    return gulp.src('source/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});