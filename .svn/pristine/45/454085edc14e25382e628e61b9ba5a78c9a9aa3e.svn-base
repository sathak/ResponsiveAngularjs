'use strict';
angular.module('app').factory('authInterceptorService', ['$rootScope', '$q', '$injector', '$location', 'localStorageService', 'logger', 'ngAuthSettings', function ($rootScope, $q, $injector, $location, localStorageService, logger, ngAuthSettings) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        var authData = localStorageService.get('authorizationData');
        if (ngAuthSettings.SSO !== undefined && ngAuthSettings.SSO && !authData && $location.$$url.toLowerCase() !== '/login') {
            window.appReload = true;
            if (ngAuthSettings.SSO !== undefined && !ngAuthSettings.SSO) {
                var authService = $injector.get('authService');
                authService.clearSession();
            }
            window.sessionAlert = false;
            $location.path('login');
           
            return;
        }

        config.headers = config.headers || {};


        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
            if ($rootScope.configHeaderMenu !== undefined && $rootScope.configHeaderMenu !== null)
                config.headers.Menu = $rootScope.configHeaderMenu;
            else
                config.headers.Menu = "";
            if ($rootScope.configSection !== undefined && $rootScope.configSection !== null)
                config.headers.Section = $rootScope.configSection;
            else
                config.headers.Section = "";
        }
        return config;
    }


    var _responseError = function (rejection) {
        var authData = localStorageService.get('authorizationData');
        if (rejection.status === 0) {
            window.appReload = true;
            if (ngAuthSettings.SSO !== undefined && !ngAuthSettings.SSO) {
                var authService = $injector.get('authService');
                authService.clearSession();
            }
            if (!window.sessionAlert) {
                window.sessionAlert = true;
                alert("Your session has expired. Please click OK to start a new session.");
                $location.path('login');
            }
           
           
            return;
        }

        if (rejection.status === 500 || rejection.status === 415 || rejection.status === 405) {//InternalServerError or UnsupportedMediaType or MethodNotAllowed
            logger.error(rejection.data.Message, rejection);
            //return $q.reject(rejection);
        }
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            authService.clearSession();
            $location.path('/login');
            return { "data": [] };
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);

angular.module('app').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});