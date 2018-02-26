var connect = require('gulp-connect');
var extend = require('util')._extend;
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var uglify = require('pipeline-minify-js');
var watch = require('gulp-watch');
var autoprefix = require('gulp-autoprefixer');
var del = require('del');
var imagemin = require('gulp-imagemin');
var ngAnnotate = require('gulp-ng-annotate');

var config = extend({
    serverPort: 7070,
    inputFile: 'index.html',
    angularInputFile: '/js/archApp.js',
    modulesBundleName: 'third_party_bundle.js',
    codeDirectory: {
        root: './code',
        js: './code/js/*.js',
        scss: './code/style/sass/application.scss',
        css: './code/style/*.css',
        html: './code/html/*.html'
    },
    destDirectory: {
        root: './app',
        htmlRoot: './app/html',
        jsFile: 'application.js',
        cssFile: 'application.css'
    },
    assetDirectory: {
        root: './assets/**/*',
        dir: './app/assets'
    },
    tmpDir: './.tmp',
    liveReloadPort: 35729,
    liveReloadClientPort: 35729,
    browsersCompatibility: ['Firefox 20', 'Safari 8', 'IE 10', 'Chrome 20', 'Edge 12']
});

/*----------------------------------------------------------------------------------------*/

function optimizeImages() {
    var notSvgFilter = filter(['*/**', '!**/*.svg'], {restore: true});

    return gulp.src(config.assetDirectory.root + '/images/**/*')
        .pipe(notSvgFilter)
        .pipe(imagemin())
        .pipe(notSvgFilter.restore);
}
function bringServerUp(livereload) {
  connect.server({
    root: './app',
    port: config.serverPort,
    livereload: livereload ? livereload : true
  });
}
function copyStaticAssets() {
    //optimizeImages();

    return gulp.src(config.assetDirectory.root)
        .pipe(gulp.dest(config.assetDirectory.dir));
}
function copyHtmlAssets() {
    return gulp.src([config.codeDirectory.html])
        .pipe(gulp.dest(config.destDirectory.htmlRoot));
}

/*----------------------------- HELPER TASKS ----------------------------------*/

gulp.task('bundleThirdPartyJsFiles', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-ui-router/build/angular-ui-router.min.js',
        './node_modules/lodash/index.js'])
        .pipe(concat(config.modulesBundleName))
        .pipe(gulp.dest(config.tmpDir));
});
gulp.task('bundleAppJsFiles', ['bundleThirdPartyJsFiles'], function() {
    return gulp.src([
        config.codeDirectory.root + config.angularInputFile,
        config.codeDirectory.js])
        .pipe(concat(config.destDirectory.jsFile))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.tmpDir));
});
gulp.task('compileSass', function () {
    return gulp.src([config.codeDirectory.scss])
        .pipe(sass())
        .pipe(concat('concatinatedSass.css'))
        .pipe(gulp.dest(config.tmpDir));
});
gulp.task('concatCssToTemp', function () {
    return gulp.src([config.codeDirectory.css])
        .pipe(concat('concatinatedCss.css'))
        .pipe(gulp.dest(config.tmpDir));
});

gulp.task('buildHtml', function () {
    copyHtmlAssets();

    return gulp.src([config.inputFile])
        .pipe(gulp.dest(config.destDirectory.root));
});
gulp.task('buildJs', ['bundleAppJsFiles'], function () {
    return gulp.src([
        config.tmpDir + '/' + config.modulesBundleName,
        config.tmpDir + '/' + config.destDirectory.jsFile
        ])
        .pipe(uglify.minifyJS({
            addSourceMaps: false,
            concat: true,
            concatFilename: config.destDirectory.jsFile,
            concatOutput: config.destDirectory.root,
        }))
        .pipe(concat(config.destDirectory.jsFile))
        .pipe(gulp.dest(config.destDirectory.root));
});
gulp.task('buildCss', ['compileSass', 'concatCssToTemp'], function () {
    return gulp.src([config.tmpDir + '/*.css'])
        .pipe(concat(config.destDirectory.cssFile))
        .pipe(autoprefix({
            browsers: config.browsersCompatibility
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.destDirectory.root));
});

gulp.task('watchCodeFiles', function() {
    return watch(config.codeDirectory.root + "/**/*", "bundleCodeFiles")
    .pipe(connect.reload());
});
gulp.task('cleanDestFiles', function(){
    return del(['./app/**', './.tmp'], {
        force: true
    });
});

gulp.task('bringServerUp', bringServerUp);
gulp.task('loadProjectAssets', copyStaticAssets);
gulp.task('bundleCodeFiles', ["buildCss", "buildJs", "buildHtml"]);

/*-------------------------------- MAIN COMMANDS ----------------------------------*/

gulp.task('default', ["bringServerUp", "loadProjectAssets", "bundleCodeFiles"]);
gulp.task('project', ["cleanDestFiles", "bringServerUp", "loadProjectAssets", "bundleCodeFiles", "watchCodeFiles"]);

