"use strict";
angular.module('app').directive('navconLogin', ['$rootScope', 'dataservice', '$location', 'authService', 'ngAuthSettings',
        function($rootScope, dataservice, $location, authService, ngAuthSettings) {

            vm = this;

            return {
                /*E: Directive defined as an element. <navcon-table></navcon-table>
                A: Directive applied as an attribute on existing element. <div navcon-table></div>
                C: Directive applied as a css class to existing element <div class="navcon-table"></div>
                M: Directive applied as comment.*/
                restrict: 'E',
                transclude: true,
                scope: {
                    //@ reads the attribute value, = provides two-way binding, & works with functions
                    navconData: '=',
                    items: '=fieldData'
                },
                //templateUrl: 'app/login/directives/loginTemplate.html',
                templateUrl: function() {
                    return navcon.Menuroute.getTemplateUrl("login");
                },

                link: function(scope, el, attrs) {


                    scope.loginData = {
                        userName: "",
                        password: function() { return scope.loginfields[2].data; },
                        useRefreshTokens: false
                    };

                    function getData(type) {
                        return dataservice.getData(type).then(function(data) {
                            return data;
                        });
                    };

                    function activate() {
                        scope.showForgorPassword = false;
                        scope.showLogin = true;

                        getData('loginfields').then(function(data) {
                            if (data === undefined || data.length === 0) return;
                            scope.loginfields = data;

                        });

                        scope.message = "";

                        scope.login = function() {
                            scope.loginData.userName = scope.loginfields[1].data;
                            scope.loginData.password = scope.loginfields[2].data;
                            authService.login(scope.loginData).then(function(response) {

                                    $location.path('/dashboard');

                                },
                                function(err) {
                                    scope.message = err.error_description;
                                });
                        };



                        scope.authExternalProvider = function(provider) {

                            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

                            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider +
                                "&response_type=token&client_id=" + ngAuthSettings.clientId +
                                "&redirect_uri=" + redirectUri;
                            window.$windowScope = scope;

                            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
                        };

                        scope.authCompletedCB = function(fragment) {

                            scope.$apply(function() {

                                if (fragment.haslocalaccount == 'False') {

                                    authService.logOut();
                                    logger.success("You have successfully log out...", "", "");

                                    authService.externalAuthData = {
                                        provider: fragment.provider,
                                        userName: fragment.external_user_name,
                                        externalAccessToken: fragment.external_access_token
                                    };

                                    $location.path('/associate');

                                } else {
                                    //Obtain access token and redirect to orders
                                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                                    authService.obtainAccessToken(externalData).then(function(response) {

                                            $location.path('/orders');

                                        },
                                        function(err) {
                                            scope.message = err.error_description;
                                        });
                                }

                            });
                        }


                    };


                    activate();

                    console.log(scope);
                }
            };
        }
    ])
    .directive('loginEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.loginEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });