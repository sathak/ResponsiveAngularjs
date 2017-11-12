module.exports = function(config) {
    'use strict';
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
        './Assets/Scripts/kendo/pako_deflate.min.js',
        './node_modules/karma-read-json/karma-read-json.js'

    ];

    var appFiles = [
        './start/app.js',
        './common/*modules.js',
        './common/navcon*.js',
        './core/*controller.js',
        './core/*.js',
        './logger/*controller.js',
        './router/**/*controller.js',
        './exception/*provider.js',
        './exception/*controller.js',
        './services/**/*.js',
        './app/**/*controller.js', './ext-modules/**/*controller.js', './app/**/*directive.js', './app/**/*directives.js',
        './ext-modules/**/*directive.js', './app/multiselect/*.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './app/**/*spec.js',
        './start/settings.js'
    ];

    var fixtures = { pattern: 'clientFields/**/*.json', included: false };
    appFiles.push(fixtures);

    config.set({
        basePath: '.',
        reporters: ['progress', 'coverage', 'html'],
        frameworks: ['jasmine'],
        files: assetFiles.concat(appFiles),
        preprocessors: {
            '**/app/userprofile/*.js': ['coverage']
        },
        colors: true,
        htmlReporter: {
            outputDir: 'karma_html', // where to put the reports  
            templatePath: null, // set if you moved jasmine_template.html 
            focusOnFailures: true, // reports show failures on start 
            namedFiles: false, // name files instead of creating sub-directories 
            pageTitle: null, // page title for reports; browser info by default 
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
            reportName: 'report-summary-filename', // report summary filename; browser info by default 
            // experimental 
            preserveDescribeNesting: false, // folded suites stay folded  
            foldAll: false, // reports start folded (only with preserveDescribeNesting) 
        },
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    });
};