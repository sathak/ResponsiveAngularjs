(function() {
    'use strict';
    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'ngplus'
    ]);

    angular.module('blocks.logger', []);
    angular.module('blocks.router', [
        'ngRoute',
        'blocks.logger'
    ]);
    angular.module('blocks.exception', ['blocks.logger']);

    angular.module("navconDashboard", ["gridster", "ui.bootstrap", "ng-fusioncharts"]);
    angular.module("navconFramework", ["navconMenu", "navconDashboard"]);
    angular.module("navconMenu", ["ngAnimate"]);

    angular.module('app.changepassword', []);
    angular.module('app.dashboard', []);
    angular.module('app.login', []);
    angular.module('app.userprofile', []);
    angular.module('app.rolemanagement', []);
    angular.module('app.tiles', []);
    angular.module('app.useraccessrights', []);
    angular.module('app.usermanagement', []);
    angular.module('app.photo', []);
    angular.module('app.news', []);
    angular.module('app.userimport', []);
})();