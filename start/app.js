'use strict';

var modules = [
    "ngRoute",
    "rmsPartials",
    "ngStorage",
    "ngIdle",
    "ngCookies",
    "ngSanitize",
    "ngMessages",
    "ngResource",
    "ui.select",
    "bsLoadingOverlay",
    "bsLoadingOverlaySpinJs",
    "frapontillo.bootstrap-switch",
    "LocalStorageModule",
    "flow",
    "timer",
    "blockUI",
    "ui.bootstrap",
    "angularSpectrumColorpicker",
    "ng-fusioncharts",
    "blocks.logger",
    "app.core",
    "navconFramework",
    "ngMessages",
    "app.dashboard",
    "app.tiles",
    "app.usermanagement",
    "app.rolemanagement",
    "app.useraccessrights",
    "app.userimport",
    "app.login",
    "app.userprofile",
    "app.changepassword",
    "app.loading",
    "app.photo"
]

try {
    var chkMod = angular.module("rmsPartials");
} catch (err) {
    //if development environment
    modules.splice(1, 1);
}

//if development environment
//modules.splice(1, 1);

angular.module('app', modules).config(['$routeProvider', 'KeepaliveProvider', 'IdleProvider', 'ngAuthSettings', '$locationProvider', function($routeProvider, KeepaliveProvider, IdleProvider, ngAuthSettings, $locationProvider) {

    var environment = ngAuthSettings.environment.toLowerCase();
    //if (environment === "production") angular.injector(['rmsPartials']);

    var routes = navcon.Menuroute.getRoutes(ngAuthSettings);

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true
    });

    routes.forEach(function(route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({
        redirectTo: '/login',
        caseInsensitiveMatch: false
    });

    var sessionTimeOut = 1800,
        sessionConfirmTimeOut = 60;
    if (ngAuthSettings.sessionTimeOut !== undefined && ngAuthSettings.sessionTimeOut > 0)
        sessionTimeOut = ngAuthSettings.sessionTimeOut;

    if (ngAuthSettings.sessionConfirmTimeOut !== undefined && ngAuthSettings.sessionConfirmTimeOut > 0)
        sessionConfirmTimeOut = ngAuthSettings.sessionConfirmTimeOut;

    if (ngAuthSettings.enableSessionTimeOut !== undefined && ngAuthSettings.enableSessionTimeOut) {
        if (sessionTimeOut < 60)
            sessionTimeOut = 60;

        IdleProvider.idle(sessionTimeOut);
        IdleProvider.timeout(sessionConfirmTimeOut);
        KeepaliveProvider.interval(10);
    }

}]);


angular.module('app').run(['authService', 'menuSettings', '$rootScope', 'signalRHubProxy', 'ngAuthSettings', 'logger', 'Idle', '$timeout', 'blockUIConfig', function(authService, menuSettings, $rootScope, signalRHubProxy, ngAuthSettings, logger, Idle, $timeout, blockUIConfig) {

    blockUIConfig.autoBlock = true;
    blockUIConfig.autoInjectBodyBlock = true;
    blockUIConfig.blockBrowserNavigation = true;
    blockUIConfig.templateUrl = 'start/angular-block-ui.tmpl.html';
    //blockUIConfig.message = "Loading......";

    authService.fillAuthData();
    menuSettings.data = authService.authentication.userRights;
    $rootScope.$broadcast('MENU-SETTING-DATA-REFRESH');

    $rootScope.$on('START-ALERT', function(event, method) {

    });

    navcon.alert.load(signalRHubProxy, ngAuthSettings, logger, authService, $rootScope);

    if (ngAuthSettings.enableSessionTimeOut !== undefined && ngAuthSettings.enableSessionTimeOut) {

        $rootScope.$on('IdleStart', function() {
            if (!authService.authentication.isAuth) return;
            $rootScope.$broadcast('SCREEN-IDLE', 'IdleStart', ngAuthSettings.sessionTimeOut, ngAuthSettings.sessionConfirmTimeOut);
        });

        $rootScope.$on('IdleEnd', function() {
            $rootScope.$broadcast('SCREEN-IDLE', 'IdleEnd', ngAuthSettings.sessionTimeOut, ngAuthSettings.sessionConfirmTimeOut);
        });

        $rootScope.$on('IdleTimeout', function() {
            $rootScope.$broadcast('SCREEN-IDLE', 'IdleTimeout', ngAuthSettings.sessionTimeOut, ngAuthSettings.sessionConfirmTimeOut);
        });

        $rootScope.$on('START-SESSION', function() {
            Idle.watch();
        });
    }

    navcon.tableSortDDMMYYYEExt();

    $rootScope.clickEsc = function() {
        navcon.riskAggressionModalClose($rootScope.configHeaderMenu, event)

        $('.modal').modal('hide');
    }

    $rootScope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
            navcon.viewContentLoaded($rootScope.configHeaderMenu);
        }, 200);
    });
}]);