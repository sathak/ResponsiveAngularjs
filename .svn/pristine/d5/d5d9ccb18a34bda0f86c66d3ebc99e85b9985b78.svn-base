'use strict';
angular.module('app').factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', 'logger', '$location', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, logger, $location, $rootScope) {

    var loginServiceUri = ngAuthSettings.loginServiceUri;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        userId: -1,
        useRefreshTokens: false,
        userRights: {},
        notification: {},
        Designation: "",
        Roles: {},
        version:""
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&timezone=" + navcon.defaultFormat().timeZone;
        // var data = "grant_type=password&username=" + "USR001" + "&password=" + "Safetal1!";
        /* if (loginData.useRefreshTokens) {
             data = data + "&client_id=" + ngAuthSettings.clientId;
         }*/

        var deferred = $q.defer();



        $http.post(loginServiceUri + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            var accessToken = response.access_token;
            _authentication.isAuth = true;

            if(response.userName !== undefined && response.userName !== "")
                _authentication.userName = response.userName;
            else
                _authentication.userName = loginData.userName;


            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            _authentication.userId = response.UserId;

            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', { token: accessToken, userName: _authentication.userName, userId: _authentication.userId, refreshToken: _authentication.useRefreshTokens, useRefreshTokens: true });
            }
            else {
                localStorageService.set('authorizationData', { token: accessToken, userName: _authentication.userName, userId: _authentication.userId, refreshToken: _authentication.useRefreshTokens, useRefreshTokens: false });
            }


                $rootScope.$broadcast('START-ALERT');
                // Get UserRights by Id //should be revoked
                $http.get(serviceBase + 'Security/GetUserAccess', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken } }).success(function (data) {
                    // $http.get('reference/dataSecurity.json').success(function (data) {
                    _authentication.userRights = data.SecurityAccess;
                    _authentication.notification = data.Notifications;                    
                    _authentication.FirstName = data.FirstName;
                    _authentication.LastName = data.LastName;
                    _authentication.Designation = data.Designation;
                    _authentication.Roles = data.Roles;
                    _authentication.version = data.SafetalVersion;
                    if (loginData.useRefreshTokens) {
                        localStorageService.set('authorizationData', {
                            token: accessToken, userName: _authentication.userName, userId: _authentication.userId,
                            userRights: data.SecurityAccess, refreshToken: _authentication.useRefreshTokens, useRefreshTokens: true,
                            notification: data.Notifications,                            
                            FirstName: data.FirstName,
                            LastName: data.LastName,
                            Designation: data.Designation,
                            Roles: data.Roles,
                            version: data.SafetalVersion
                        });
                    }
                    else {
                        localStorageService.set('authorizationData', {
                            token: accessToken, userName: _authentication.userName, userId: _authentication.userId, userRights: data.SecurityAccess,
                            refreshToken: _authentication.useRefreshTokens, useRefreshTokens: false, notification: data.Notifications,                            
                            FirstName: data.FirstName,
                            LastName: data.LastName,
                            Designation: data.Designation,
                            Roles: data.Roles,
                            version: data.SafetalVersion
                        });
                    }

                    deferred.resolve(data.SecurityAccess);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

            
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };


    var _logOut = function (callback) {
        if (!_authentication.isAuth) return;
        $http.get(serviceBase + 'MyProfile/Logout', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            _clearSession();
            //$location.path('/login');
            if (callback !== undefined) callback('logout');
        })
    };


    var _clearSession = function () {
        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.userId = -1;
        _authentication.useRefreshTokens = false;
        _authentication.userRights = {};
        _authentication.notification = {};
        _authentication.Designation = "";
        _authentication.Roles = {};
        _authentication.version = "";
        
    }


    var _windowsCloseLogOut = function () {
        var authData = localStorageService.get('authorizationData');
        if (!_authentication.isAuth) return;
        _clearSession();
        jQuery.ajax({
            url: serviceBase + 'MyProfile/Logout',
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + authData.token);
            },
            success: function (response) {
                console.log(response);
            }
        });
    };



    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.userId = authData.userId;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.userRights = authData.userRights;
            _authentication.notification = authData.notification;
            _authentication.Designation = authData.Designation;
            _authentication.Roles = authData.Roles;
            
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    $http.get(serviceBase + 'User/GetByName/' + response.userName, { headers: { 'Content-Type': 'application/json' } }).success(function (userId) {
                        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userId: userId, refreshToken: response.refresh_token, useRefreshTokens: true });
                    });

                    //localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            $http.get(serviceBase + 'User/GetByName/' + response.userName, { headers: { 'Content-Type': 'application/json' } }).success(function (userId) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userId: userId, refreshToken: "", useRefreshTokens: false });
            });

            //localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            $http.get(serviceBase + 'User/GetByName/' + response.userName, { headers: { 'Content-Type': 'application/json' } }).success(function (userId) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userId: userId, refreshToken: "", useRefreshTokens: false });
            });

            //localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.clearSession = _clearSession;
    authServiceFactory.windowsCloseLogOut = _windowsCloseLogOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);