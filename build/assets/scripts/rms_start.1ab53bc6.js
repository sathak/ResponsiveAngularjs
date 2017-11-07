(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var modules = [
    "ngRoute",
   
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOlxcUk1TXFxzdGFydFxcYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxVQUFVO0lBQ1Y7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7O0FBR0osUUFBUSxPQUFPLE9BQU8sU0FBUyxPQUFPLENBQUMsa0JBQWtCLHFCQUFxQixnQkFBZ0Isa0JBQWtCLHFCQUFxQixTQUFTLGdCQUFnQixtQkFBbUIsY0FBYyxnQkFBZ0IsbUJBQW1COztJQUU5TixJQUFJLGNBQWMsZUFBZSxZQUFZOzs7SUFHN0MsSUFBSSxTQUFTLE9BQU8sVUFBVSxVQUFVOzs7SUFHeEMsa0JBQWtCLFVBQVU7UUFDeEIsU0FBUzs7O0lBR2IsT0FBTyxRQUFRLFNBQVMsT0FBTztRQUMzQixlQUFlLEtBQUssTUFBTSxLQUFLLE1BQU07OztJQUd6QyxlQUFlLFVBQVU7UUFDckIsWUFBWTtRQUNaLHNCQUFzQjs7O0lBRzFCLElBQUksaUJBQWlCO1FBQ2pCLHdCQUF3QjtJQUM1QixJQUFJLGVBQWUsbUJBQW1CLGFBQWEsZUFBZSxpQkFBaUI7UUFDL0UsaUJBQWlCLGVBQWU7O0lBRXBDLElBQUksZUFBZSwwQkFBMEIsYUFBYSxlQUFlLHdCQUF3QjtRQUM3Rix3QkFBd0IsZUFBZTs7SUFFM0MsSUFBSSxlQUFlLHlCQUF5QixhQUFhLGVBQWUsc0JBQXNCO1FBQzFGLElBQUksaUJBQWlCO1lBQ2pCLGlCQUFpQjs7UUFFckIsYUFBYSxLQUFLO1FBQ2xCLGFBQWEsUUFBUTtRQUNyQixrQkFBa0IsU0FBUzs7Ozs7O0FBTW5DLFFBQVEsT0FBTyxPQUFPLElBQUksQ0FBQyxlQUFlLGdCQUFnQixjQUFjLG1CQUFtQixrQkFBa0IsVUFBVSxRQUFRLFlBQVksaUJBQWlCLFNBQVMsYUFBYSxjQUFjLFlBQVksaUJBQWlCLGdCQUFnQixRQUFRLE1BQU0sVUFBVSxlQUFlOztJQUVoUixjQUFjLFlBQVk7SUFDMUIsY0FBYyxzQkFBc0I7SUFDcEMsY0FBYyx5QkFBeUI7SUFDdkMsY0FBYyxjQUFjOzs7SUFHNUIsWUFBWTtJQUNaLGFBQWEsT0FBTyxZQUFZLGVBQWU7SUFDL0MsV0FBVyxXQUFXOztJQUV0QixXQUFXLElBQUksZUFBZSxTQUFTLE9BQU8sUUFBUTs7OztJQUl0RCxPQUFPLE1BQU0sS0FBSyxpQkFBaUIsZ0JBQWdCLFFBQVEsYUFBYTs7SUFFeEUsSUFBSSxlQUFlLHlCQUF5QixhQUFhLGVBQWUsc0JBQXNCOztRQUUxRixXQUFXLElBQUksYUFBYSxXQUFXO1lBQ25DLElBQUksQ0FBQyxZQUFZLGVBQWUsUUFBUTtZQUN4QyxXQUFXLFdBQVcsZUFBZSxhQUFhLGVBQWUsZ0JBQWdCLGVBQWU7OztRQUdwRyxXQUFXLElBQUksV0FBVyxXQUFXO1lBQ2pDLFdBQVcsV0FBVyxlQUFlLFdBQVcsZUFBZSxnQkFBZ0IsZUFBZTs7O1FBR2xHLFdBQVcsSUFBSSxlQUFlLFdBQVc7WUFDckMsV0FBVyxXQUFXLGVBQWUsZUFBZSxlQUFlLGdCQUFnQixlQUFlOzs7UUFHdEcsV0FBVyxJQUFJLGlCQUFpQixXQUFXO1lBQ3ZDLEtBQUs7Ozs7SUFJYixPQUFPOztJQUVQLFdBQVcsV0FBVyxXQUFXO1FBQzdCLE9BQU8seUJBQXlCLFdBQVcsa0JBQWtCOztRQUU3RCxFQUFFLFVBQVUsTUFBTTs7O0lBR3RCLFdBQVcsSUFBSSxzQkFBc0IsU0FBUyxPQUFPO1FBQ2pELFNBQVMsV0FBVztZQUNoQixPQUFPLGtCQUFrQixXQUFXO1dBQ3JDOztJQUVQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vZHVsZXMgPSBbXG4gICAgXCJuZ1JvdXRlXCIsXG4gICBcbiAgICBcIm5nU3RvcmFnZVwiLFxuICAgIFwibmdJZGxlXCIsXG4gICAgXCJuZ0Nvb2tpZXNcIixcbiAgICBcIm5nU2FuaXRpemVcIixcbiAgICBcIm5nTWVzc2FnZXNcIixcbiAgICBcIm5nUmVzb3VyY2VcIixcbiAgICBcInVpLnNlbGVjdFwiLFxuICAgIFwiYnNMb2FkaW5nT3ZlcmxheVwiLFxuICAgIFwiYnNMb2FkaW5nT3ZlcmxheVNwaW5Kc1wiLFxuICAgIFwiZnJhcG9udGlsbG8uYm9vdHN0cmFwLXN3aXRjaFwiLFxuICAgIFwiTG9jYWxTdG9yYWdlTW9kdWxlXCIsXG4gICAgXCJmbG93XCIsXG4gICAgXCJ0aW1lclwiLFxuICAgIFwiYmxvY2tVSVwiLFxuICAgIFwidWkuYm9vdHN0cmFwXCIsXG4gICAgXCJhbmd1bGFyU3BlY3RydW1Db2xvcnBpY2tlclwiLFxuICAgIFwibmctZnVzaW9uY2hhcnRzXCIsXG4gICAgXCJibG9ja3MubG9nZ2VyXCIsXG4gICAgXCJhcHAuY29yZVwiLFxuICAgIFwibmF2Y29uRnJhbWV3b3JrXCIsXG4gICAgXCJuZ01lc3NhZ2VzXCIsXG4gICAgXCJhcHAuZGFzaGJvYXJkXCIsXG4gICAgXCJhcHAudGlsZXNcIixcbiAgICBcImFwcC51c2VybWFuYWdlbWVudFwiLFxuICAgIFwiYXBwLnJvbGVtYW5hZ2VtZW50XCIsXG4gICAgXCJhcHAudXNlcmFjY2Vzc3JpZ2h0c1wiLFxuICAgIFwiYXBwLnVzZXJpbXBvcnRcIixcbiAgICBcImFwcC5sb2dpblwiLFxuICAgIFwiYXBwLnVzZXJwcm9maWxlXCIsXG4gICAgXCJhcHAuY2hhbmdlcGFzc3dvcmRcIixcbiAgICBcImFwcC5sb2FkaW5nXCIsXG4gICAgXCJhcHAucGhvdG9cIlxuXVxuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgbW9kdWxlcykuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnS2VlcGFsaXZlUHJvdmlkZXInLCAnSWRsZVByb3ZpZGVyJywgJ25nQXV0aFNldHRpbmdzJywgJyRsb2NhdGlvblByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsIEtlZXBhbGl2ZVByb3ZpZGVyLCBJZGxlUHJvdmlkZXIsIG5nQXV0aFNldHRpbmdzLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgdmFyIGVudmlyb25tZW50ID0gbmdBdXRoU2V0dGluZ3MuZW52aXJvbm1lbnQudG9Mb3dlckNhc2UoKTtcbiAgICAvL2lmIChlbnZpcm9ubWVudCA9PT0gXCJwcm9kdWN0aW9uXCIpIGFuZ3VsYXIuaW5qZWN0b3IoWydybXNQYXJ0aWFscyddKTtcblxuICAgIHZhciByb3V0ZXMgPSBuYXZjb24uTWVudXJvdXRlLmdldFJvdXRlcyhuZ0F1dGhTZXR0aW5ncyk7XG5cbiAgICAvLyB1c2UgdGhlIEhUTUw1IEhpc3RvcnkgQVBJXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgcm91dGVzLmZvckVhY2goZnVuY3Rpb24ocm91dGUpIHtcbiAgICAgICAgJHJvdXRlUHJvdmlkZXIud2hlbihyb3V0ZS51cmwsIHJvdXRlLmNvbmZpZyk7XG4gICAgfSk7XG5cbiAgICAkcm91dGVQcm92aWRlci5vdGhlcndpc2Uoe1xuICAgICAgICByZWRpcmVjdFRvOiAnL2xvZ2luJyxcbiAgICAgICAgY2FzZUluc2Vuc2l0aXZlTWF0Y2g6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB2YXIgc2Vzc2lvblRpbWVPdXQgPSAxODAwLFxuICAgICAgICBzZXNzaW9uQ29uZmlybVRpbWVPdXQgPSA2MDtcbiAgICBpZiAobmdBdXRoU2V0dGluZ3Muc2Vzc2lvblRpbWVPdXQgIT09IHVuZGVmaW5lZCAmJiBuZ0F1dGhTZXR0aW5ncy5zZXNzaW9uVGltZU91dCA+IDApXG4gICAgICAgIHNlc3Npb25UaW1lT3V0ID0gbmdBdXRoU2V0dGluZ3Muc2Vzc2lvblRpbWVPdXQ7XG5cbiAgICBpZiAobmdBdXRoU2V0dGluZ3Muc2Vzc2lvbkNvbmZpcm1UaW1lT3V0ICE9PSB1bmRlZmluZWQgJiYgbmdBdXRoU2V0dGluZ3Muc2Vzc2lvbkNvbmZpcm1UaW1lT3V0ID4gMClcbiAgICAgICAgc2Vzc2lvbkNvbmZpcm1UaW1lT3V0ID0gbmdBdXRoU2V0dGluZ3Muc2Vzc2lvbkNvbmZpcm1UaW1lT3V0O1xuXG4gICAgaWYgKG5nQXV0aFNldHRpbmdzLmVuYWJsZVNlc3Npb25UaW1lT3V0ICE9PSB1bmRlZmluZWQgJiYgbmdBdXRoU2V0dGluZ3MuZW5hYmxlU2Vzc2lvblRpbWVPdXQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25UaW1lT3V0IDwgNjApXG4gICAgICAgICAgICBzZXNzaW9uVGltZU91dCA9IDYwO1xuXG4gICAgICAgIElkbGVQcm92aWRlci5pZGxlKHNlc3Npb25UaW1lT3V0KTtcbiAgICAgICAgSWRsZVByb3ZpZGVyLnRpbWVvdXQoc2Vzc2lvbkNvbmZpcm1UaW1lT3V0KTtcbiAgICAgICAgS2VlcGFsaXZlUHJvdmlkZXIuaW50ZXJ2YWwoMTApO1xuICAgIH1cblxufV0pO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5ydW4oWydhdXRoU2VydmljZScsICdtZW51U2V0dGluZ3MnLCAnJHJvb3RTY29wZScsICdzaWduYWxSSHViUHJveHknLCAnbmdBdXRoU2V0dGluZ3MnLCAnbG9nZ2VyJywgJ0lkbGUnLCAnJHRpbWVvdXQnLCAnYmxvY2tVSUNvbmZpZycsIGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCBtZW51U2V0dGluZ3MsICRyb290U2NvcGUsIHNpZ25hbFJIdWJQcm94eSwgbmdBdXRoU2V0dGluZ3MsIGxvZ2dlciwgSWRsZSwgJHRpbWVvdXQsIGJsb2NrVUlDb25maWcpIHtcblxuICAgIGJsb2NrVUlDb25maWcuYXV0b0Jsb2NrID0gdHJ1ZTtcbiAgICBibG9ja1VJQ29uZmlnLmF1dG9JbmplY3RCb2R5QmxvY2sgPSB0cnVlO1xuICAgIGJsb2NrVUlDb25maWcuYmxvY2tCcm93c2VyTmF2aWdhdGlvbiA9IHRydWU7XG4gICAgYmxvY2tVSUNvbmZpZy50ZW1wbGF0ZVVybCA9ICdzdGFydC9hbmd1bGFyLWJsb2NrLXVpLnRtcGwuaHRtbCc7XG4gICAgLy9ibG9ja1VJQ29uZmlnLm1lc3NhZ2UgPSBcIkxvYWRpbmcuLi4uLi5cIjtcblxuICAgIGF1dGhTZXJ2aWNlLmZpbGxBdXRoRGF0YSgpO1xuICAgIG1lbnVTZXR0aW5ncy5kYXRhID0gYXV0aFNlcnZpY2UuYXV0aGVudGljYXRpb24udXNlclJpZ2h0cztcbiAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ01FTlUtU0VUVElORy1EQVRBLVJFRlJFU0gnKTtcblxuICAgICRyb290U2NvcGUuJG9uKCdTVEFSVC1BTEVSVCcsIGZ1bmN0aW9uKGV2ZW50LCBtZXRob2QpIHtcblxuICAgIH0pO1xuXG4gICAgbmF2Y29uLmFsZXJ0LmxvYWQoc2lnbmFsUkh1YlByb3h5LCBuZ0F1dGhTZXR0aW5ncywgbG9nZ2VyLCBhdXRoU2VydmljZSwgJHJvb3RTY29wZSk7XG5cbiAgICBpZiAobmdBdXRoU2V0dGluZ3MuZW5hYmxlU2Vzc2lvblRpbWVPdXQgIT09IHVuZGVmaW5lZCAmJiBuZ0F1dGhTZXR0aW5ncy5lbmFibGVTZXNzaW9uVGltZU91dCkge1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdJZGxlU3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghYXV0aFNlcnZpY2UuYXV0aGVudGljYXRpb24uaXNBdXRoKSByZXR1cm47XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ1NDUkVFTi1JRExFJywgJ0lkbGVTdGFydCcsIG5nQXV0aFNldHRpbmdzLnNlc3Npb25UaW1lT3V0LCBuZ0F1dGhTZXR0aW5ncy5zZXNzaW9uQ29uZmlybVRpbWVPdXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignSWRsZUVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdTQ1JFRU4tSURMRScsICdJZGxlRW5kJywgbmdBdXRoU2V0dGluZ3Muc2Vzc2lvblRpbWVPdXQsIG5nQXV0aFNldHRpbmdzLnNlc3Npb25Db25maXJtVGltZU91dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdJZGxlVGltZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdTQ1JFRU4tSURMRScsICdJZGxlVGltZW91dCcsIG5nQXV0aFNldHRpbmdzLnNlc3Npb25UaW1lT3V0LCBuZ0F1dGhTZXR0aW5ncy5zZXNzaW9uQ29uZmlybVRpbWVPdXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignU1RBUlQtU0VTU0lPTicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgSWRsZS53YXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuYXZjb24udGFibGVTb3J0RERNTVlZWUVFeHQoKTtcblxuICAgICRyb290U2NvcGUuY2xpY2tFc2MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmF2Y29uLnJpc2tBZ2dyZXNzaW9uTW9kYWxDbG9zZSgkcm9vdFNjb3BlLmNvbmZpZ0hlYWRlck1lbnUsIGV2ZW50KVxuXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgJHJvb3RTY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmF2Y29uLnZpZXdDb250ZW50TG9hZGVkKCRyb290U2NvcGUuY29uZmlnSGVhZGVyTWVudSk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG59XSk7Il19
