"use strict";

var gulp=require('gulp');
var connect=require('gulp-connect'); //runs a local dev server
var open=require('gulp-open');//open a URL in a web browser
var browserify=require('browserify');//bundles js
var babelify=require('babelify');
var source=require('vinyl-source-stream');//Use conventional text streams with gulp
var concat=require('gulp-concat');//Concatenates files
var less=require('gulp-less');
var sass=require('gulp-sass');
var sourcemaps=require('gulp-sourcemaps');
var buffer=require('vinyl-buffer');
var lint=require('gulp-eslint');
var jshint=require('gulp-jshint');
var jscs=require('gulp-jscs');

var util=require('gulp-util');
var gulpprint=require('gulp-print');
var gulpif=require('gulp-if');
var args=require('yargs').argv;

var config=require('./gulpfile.config')();

log('gulp started');

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
    browserify(config.paths.mainJs)
            .transform("babelify",{presets:["es2015","react"]})
            .bundle()
            .on('error',console.error.bind(console))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.paths.dist+'/scripts'))
            .pipe(connect.reload());
})

gulp.task('css',function () {
    gulp.src(config.paths.css)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
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
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('bundle-sass.css'))
        .pipe(sourcemaps.write())
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


gulp.task('vet',function () {
    log('Analyzing source with JSHint and JSCS');
    
    return gulp.src(config.paths.js)
        .pipe(gulpif(args.verbose,gulpprint())) //gulp --verbose
        // .pipe(jscs()) //has error
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{verbose:true}))
        .pipe(jshint.reporter('fail'));
})

gulp.task('watch',function () {
    gulp.watch(config.paths.html,['html']);
    gulp.watch(config.paths.js,['js','lint']);
    //gulp.watch(config.paths.less,['less']);
    gulp.watch(config.paths.sass,['sass']);
});

function log(msg) {
    if(typeof(msg)==='object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                util.log(util.color.yellow(msg[item]));
            }
        }
    }else{
        util.log(util.colors.yellow(msg));
    }
}

gulp.task('default',['html','js','css','sass','images','open','watch']);//less,lint

