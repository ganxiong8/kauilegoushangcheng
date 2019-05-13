const gulp = require('gulp'); //加载gulp插件
const gulpsass = require('gulp-sass'); //编译sass
const html = require('gulp-minify-html'); //压缩html
const concat = require('gulp-concat'); //合并
const uglify = require('gulp-uglify'); //压缩
const rename = require('gulp-rename'); //重命名
const watch = require('gulp-watch'); //添加此插件进行监听
const imagemin = require('gulp-imagemin'); //图片压缩插件



gulp.task('uglifyhtml', function() {
    return gulp.src('src/*.html')
        .pipe(html()) //执行压缩
        .pipe(gulp.dest('dist/'));
});


gulp.task('minhtml', function() {
    return gulp.src('src/public_html/*.html')
        .pipe(html()) //执行压缩
        .pipe(gulp.dest('dist/public_html/'));
});


gulp.task('runsass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(gulpsass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('uglifyjs', function() {
    return gulp.src('src/script/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/js'));
});


gulp.task('runimg', function() {
    return gulp.src('src/img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});


gulp.task('default', function() {
    watch(['src/*.html', 'src/public_html/*html', 'src/sass/*.scss', 'src/js/*.js'], gulp.parallel('uglifyhtml', 'minhtml', 'runsass', 'uglifyjs'));
});