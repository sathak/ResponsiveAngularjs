"use strict;"
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');
cleanCSS = require('gulp-clean-css');
concat = require("gulp-concat");
ngHtml2Js = require("gulp-ng-html2js");
inject = require('gulp-inject');
rename = require("gulp-rename");
karma = require('karma');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function(cb) {
    del([
        'build'
    ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

var cssFiles = [
    './Assets/Styles/others/bootstrap.css',
    './Assets/Styles/others/font-awesome.min.css',
    './Assets/Styles/others/angular-gridster.min.css',
    './ext-modules/navconFramework/navconFramework.css',
    './ext-modules/navconMenu/navconMenu.css',
    './ext-modules/navconDashboard/navconDashboard.css',
    './Assets/Styles/layout/css/layout.css',
    './Assets/Styles/others/components.css',
    './Assets/Styles/others/plugins.css',
    './Assets/Styles/others/navcon-style.css',
    './Assets/Styles/simple-line-icons/simple-line-icons.min.css',
    './Assets/Styles/layout/css/themes/darkblue.css',
    './Assets/Styles/layout/css/custom.css',
    './app/widgets/navconChart/navconChart.css',
    './Assets/Styles/ui-select/select.css',
    './Assets/Styles/ui-select/selectize.default.css',
    './Assets/Styles/ui-select/select2_new.css',
    './Assets/Styles/toastr/toastr.css',
    './Assets/Styles/fullcalendar/lib/fullcalendar.min.css',
    './Assets/Styles/fullcalendar/lib/fullcalendar.print.css',
    './Assets/Styles/fullcalendar/lib/scheduler.min.css',
    './Assets/Styles/owl-carousel/owl.carousel.css',
    './Assets/Styles/owl-carousel/owl.theme.css',
    './Assets/Styles/owl-carousel/owl.transitions.css',
    './Assets/Styles/jquery-orgChart/jquery.orgchart.css',
    './Assets/Styles/typeahead/typeahead.css',
    './Assets/Styles/bootstrap-switch/css/bootstrap-switch.min.css',
    './Assets/Styles/clockface/css/clockface.css',
    './Assets/Styles/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
    './Assets/Styles/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
    './Assets/Styles/bootstrap-colorpicker/css/colorpicker.css',
    './Assets/Styles/bootstrap-daterangepicker/daterangepicker-bs3.css',
    './Assets/Styles/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
    './Assets/Styles/spectrum-colorpicker/spectrum.css',
    './Assets/Styles/bootstrap-dialog/bootstrap-dialog.min.css',
    './Assets/Styles/jquery-multi-select/css/multi-select.css',
    './Assets/Styles/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
    './Assets/Styles/bootstrap-modal/css/bootstrap-modal.css',
    './Assets/Styles/select2/select2.css',
    './Assets/Styles/datatables/media/css/jquery.dataTables.min_new.css',
    './Assets/Styles/jstree/dist/themes/default/style.min.css',
    './Assets/Styles/angular-block-ui/angular-block-ui.min.css',
    './ext-modules/navconField/navconField.css',
    './ext-modules/navconEvaluation/navconEvaluation.css',
    './ext-modules/navconUpload/navconUpload.css',
    './ext-modules/navconReport/navconReport.css',
    './Assets/Styles/jquery-slimscroll/jquery.mCustomScrollbar.css',
    './Assets/Styles/ui-select/select2.css',
    './Assets/Styles/kendo/kendo.common.min.css',
    './Assets/Styles/kendo/kendo.default.min.css',
    './ext-modules/navconKendo/navconKendo.css'
];

gulp.task('build-css', ['clean'], function() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(cachebust.resources())
        .pipe(concat('rms_styles.css'))
        .pipe(gulp.dest('./build/assets/styles'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////


gulp.task('build-template-cache', ['clean'], function() {
    var ngHtml2Js = require("gulp-ng-html2js")
    return gulp.src(['./app/**/*.html', './ext-modules/**/*.html'], { base: "." })
        .pipe(ngHtml2Js({
            moduleName: "rmsPartials",
            prefix: "/templates/"
        }))
        .pipe(concat("rms_template.js"))
        .pipe(cachebust.resources())
        // .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest("./build/assets/templates"));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    gulp.src('./userprofile/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

var assetFiles = [
    './Assets/Scripts/jquery-2.1.3.min.js',
    './Assets/Scripts/jquery-ui.min.js',
    './Assets/Scripts/angular.js',
    './Assets/Scripts/others/angular-cookies.js',
    './Assets/Scripts/others/angular-animate.min.js',
    './Assets/Scripts/angular-route.min.js',
    './Assets/Scripts/others/angular-gridster.min.js',
    './Assets/Scripts/bootstrap.min.js',
    './Assets/Scripts/angular-ui/ui-bootstrap-tpls.min.js',
    './Assets/Scripts/others/ngStorage.min.js',
    './Assets/Scripts/angular-sanitize/angular-sanitize.js',
    './Assets/Scripts/angularjs/plugins/ocLazyLoad.min.js',
    './Assets/Scripts/angular-message/angular-messages.js',
    './Assets/Scripts/angularjs/plugins/ui-select/dist/select.js',
    './Assets/Scripts/toastr/toastr.js',
    './Assets/Scripts/moment.js',
    './Assets/Scripts/angularjs/plugins/extras.angular.plus/ngplus-overlay.js',
    './Assets/Scripts/owl-carousel/js/bootstrap-collapse.js',
    './Assets/Scripts/owl-carousel/js/bootstrap-transition.js',
    './Assets/Scripts/owl-carousel/js/bootstrap-tab.js',
    './Assets/Scripts/owl-carousel/js/google-code-prettify/prettify.js',
    './Assets/Scripts/owl-carousel/js/application.js',
    './Assets/Scripts/owl-carousel/owl.carousel.js',
    './Assets/Scripts/fusioncharts/fusioncharts.js',
    './Assets/Scripts/fusioncharts/fusioncharts.theme.fint.js',
    './Assets/Scripts/fusioncharts/angular-fusioncharts.min.js',
    './Assets/Scripts/fusioncharts/fusioncharts.charts.js',
    './Assets/scripts/typeahead/typeahead.js',
    './Assets/scripts/angular-loading/angular-loading-overlay.js',
    './Assets/scripts/angular-loading/angular-loading-overlay-spinjs.js',
    './Assets/Scripts/flow/dist/ng-flow-standalone.js',
    './Assets/Scripts/idle/angular-idle.js',
    './Assets/Scripts/idle/angular-timer-all.min.js',
    './Assets/Scripts/others/jquery-migrate.min.js',
    './Assets/Scripts/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
    './Assets/Scripts/jquery-slimscroll/jquery.slimscroll.min.js',
    './Assets/Scripts/others/jquery.blockui.min.js',
    './Assets/Scripts/others/jquery.cokie.min.js',
    './Assets/Scripts/uniform/jquery.uniform.min.js',
    './Assets/Scripts/bootstrap-switch/bootstrap-switch.min.js',
    './Assets/Scripts/angular-bootstrap-switch/angular-bootstrap-switch.js',
    './Assets/Scripts/bootstrap-datepicker/bootstrap-datepicker.min.js',
    './Assets/Scripts/bootstrap-timepicker/bootstrap-timepicker.min.js',
    './Assets/Scripts/clockface/js/clockface.js',
    './Assets/Scripts/moment.min.js',
    './Assets/Scripts/bootstrap-daterangepicker/daterangepicker.js',
    './Assets/Scripts/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
    './Assets/Scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js',
    './Assets/Scripts/others/components-pickers.js',
    './Assets/Scripts/spectrum-colorpicker/spectrum.js',
    './Assets/Scripts/spectrum-colorpicker/angular-spectrum-colorpicker.min.js',
    './Assets/Scripts/bootstrap-dialog/bootstrap-dialog.min.js',
    './Assets/Scripts/others/components-dropdowns.js',
    './Assets/Scripts/signalr/jquery.signalR-2.1.2.js',
    './Assets/Scripts/jquery-multi-select/js/jquery.multi-select.js',
    './Assets/Scripts/bootstrap-modal/js/bootstrap-modalmanager.js',
    './Assets/Scripts/bootstrap-modal/js/bootstrap-modal.js',
    './Assets/Scripts/others/metronic.js',
    './Assets/Scripts/layout/scripts/layout.js',
    './Assets/Scripts/select2/select2.min.js',
    './Assets/Scripts/datatables/datatables.js',
    './Assets/Scripts/datatables/jquery.dataTables.columnFilter.js',
    './Assets/Scripts/datatables/dataTables.rowsGroup.js',
    //'./Assets/Scripts/jstree/jstree.js',
    //'./Assets/Scripts/jstree/jstreegrid.js',
    './Assets/Scripts/angular-block-ui/angular-block-ui.min.js',
    './Assets/Scripts/authentication/angular-local-storage.min.js',
    './Assets/Scripts/authentication/loading-bar.min.js',
    './Assets/Scripts/jquery-slimscroll/jquery.mCustomScrollbar.concat.min.js',
    './Assets/Scripts/angular-resource/angular-resource.js',
    './Assets/Scripts/kendo/kendo.all.min.js',
    './Assets/Scripts/kendo/kendo.customView.js',
    './Assets/Scripts/kendo/kendo.timezones.min.js',
    './Assets/Scripts/kendo/pako_deflate.min.js'

];

gulp.task('build-assets-js', ['clean'], function() {
    return gulp.src(assetFiles)
        .pipe(buffer())
        .pipe(concat('rms_assets.js'))
        .pipe(sourcemaps.write())
        .pipe(cachebust.resources())
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('./build/assets/scripts'));
});


var appFiles = [
    './common/*modules.js',
    './common/navcon*.js',
    './core/*controller.js',
    './core/*.js',
    './logger/*controller.js',
    './router/**/*controller.js',
    './exception/*provider.js',
    './exception/*controller.js',
     './services/*.js',
    './services/**/*.js',
    './app/**/*controller.js', './ext-modules/**/*controller.js', './app/**/*directive.js', './app/**/*directives.js',
    './ext-modules/**/*directive.js', './app/multiselect/*.js'
];

gulp.task('build-rms', ['clean'], function() {
    return gulp.src(appFiles, { base: "." })
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(concat('rms_app.js'))
        .pipe(cachebust.resources())
        //.pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/scripts'));
});

gulp.task('build-app-js', ['clean'], function() {
    var b = browserify({
        entries: './start/app.js',
        debug: true,
        paths: [],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('rms_start.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        //.pipe(uglify({ mangle: false }))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/assets/scripts'));
});

gulp.task('copyfonts', ['clean'], function() {
    return gulp.src(['./assets/fonts/**/*.*'])
        .pipe(gulp.dest("./build/assets/fonts"));
});


gulp.task('copyimg', ['clean'], function() {
    return gulp.src(['./assets/images/**/*.*'])
        .pipe(gulp.dest("./build/assets/images"));
});


gulp.task('copystart', ['clean'], function() {
    return gulp.src(['./start/angular-block-ui.tmpl.html',
            './start/navconFieldTemplate.html',
            './start/serverexpiration.html',
            './start/settings.js'
        ])
        .pipe(gulp.dest("./build/start"));
});

/*gulp.task('copystyleimg', function() {
    return gulp.src(['./assets/styles/jstree/dist/themes/default/*.png',
            './assets/styles/jstree/dist/themes/default/*.gif'
        ])
        .pipe(gulp.dest("./build/assets/styles"));
});*/


/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['clean', 'bower', 'build-css', 'build-template-cache', 'build-rms', 'build-app-js', 'build-assets-js', 'copyfonts', 'copyimg', 'copystart' /*, 'copystyleimg'*/ ], function() {
    return gulp.src('./start/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('build'));
});

gulp.task('reload', ['clean', 'bower', 'build-template-cache'], function() {

});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
    return gulp.watch([], ['build']);
});

gulp.task('webserver', ['build'], function() {
    gulp.src('build')
        .pipe(webserver({
            fallback: 'index.html',
            port: 9001,
            host: 'localhost',
            livereload: false,
            open: true,
        }));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('prod', ['webserver']);

gulp.task('delindexhtml', function(cb) {
    del([
        './index.html'
    ], { dryRun: true }, cb);
});

gulp.task('inject', function() {
    return gulp.src('./start/devindex.html')
        .pipe(inject(gulp.src(assetFiles, { read: false }), { name: 'asset' }))
        .pipe(inject(gulp.src(appFiles, { read: false }), { name: 'app' }))
        .pipe(inject(gulp.src(cssFiles, { read: false })))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

gulp.task('devwebserver', function() {
    gulp.src('.')
        .pipe(webserver({
            fallback: 'index.html',
            port: 9002,
            host: 'localhost',
            livereload: true,
            open: true,
        }));
});

gulp.task('dev', ['jshint', 'delindexhtml', 'inject', 'devwebserver']);

/* Run tests in chrome browser*/
gulp.task('test', ['delindexhtml', 'inject'], function(done) {
    var karmaServer = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['Chrome']
    }, function(exitCode) {
        done();
        process.exit(exitCode);
    }).start();
});