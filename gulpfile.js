var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect');

var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';


gulp.task('log', function () {
    gutil.log('== My First Task ==')
});

gulp.task('copy', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function () {
    gulp.src(sassSources)
        .pipe(sass({
            style: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('assets'))
        .pipe(connect.reload())
});

gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

//gulp.task('default', ['html', 'sass', 'connect', 'watch']);
gulp.task('default', ['connect']);