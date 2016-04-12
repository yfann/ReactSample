"use strict";

var gulp=require('gulp');
var connect=require('gulp-connect'); //runs a local dev server
var open=require('gulp-open');//open a URL in a web browser
var browserify=require('browserify');//bundles js
var reactify=require('reactify');//Transforms React JSX ot JS
var source=require('vinyl-source-stream');//Use conventional text streams with gulp
var concat=require('gulp-concat');//Concatenates files
var lint=require('gulp-eslint');
var less=require('gulp-less');
var sass=require('gulp-sass');

var config={
    port:9005,
    devBaseUrl:'http:localhost',
    paths:{
        html:'./src/*.html',
        js:'./src/**/*.js',
        images:'./src/images/*',
        css:['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/toastr/toastr.css'],
        less:'./src/css/less/*.less',
        sass:'./src/css/sass/*.scss',
        dist:'./dist',
        mainJs:'./src/main.js'
    }
}

gulp.task('connect',function () {
    connect.server({
        root:['dist'],
        port:config.port,
        base:config.devBaseUrl,
        livereload:true
    });
});

gulp.task('open',['connect'],function () {
    gulp.src('dist/index.html').pipe(open({uri:config.devBaseUrl+':'+config.port+'/'}));
});

gulp.task('html',function () {
    gulp.src(config.paths.html).pipe(gulp.dest(config.paths.dist)).pipe(connect.reload());
});

gulp.task('js',function () {
    browserify(config.paths.mainJs).transform(reactify).bundle()
    .on('error',console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist+'/scripts'))
    .pipe(connect.reload());
})

gulp.task('css',function () {
    gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist+'/css'));
})

gulp.task('less',function () {
    gulp.src(config.paths.less)
        .pipe(less())
        .pipe(concat('bundle-less.css'))
        .pipe(gulp.dest(config.paths.dist+'/css'));
});

gulp.task('sass',function () {
    gulp.src(config.paths.sass)
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('bundle-sass.css'))
        .pipe(gulp.dest(config.paths.dist+'/css'))
});

gulp.task('images',function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist+'/images'))
        .pipe(connect.reload());
})


gulp.task('lint',function () {
    return gulp.src(config.paths.js).pipe(lint({config:'eslint.config.json'}))
    .pipe(lint.format());
})

gulp.task('watch',function () {
    gulp.watch(config.paths.html,['html']);
    gulp.watch(config.paths.js,['js','lint']);
    //gulp.watch(config.paths.less,['less']);
    gulp.watch(config.paths.sass,['sass']);
});

gulp.task('default',['html','js','css','sass','images','open','watch']);//less,lint

