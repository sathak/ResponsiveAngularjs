(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('login', login);

    /*@ngInject*/
    function login($scope, dataservice, logger, $compile, $timeout, $location, authService, ngAuthSettings, pageConfig, menuSettings, $rootScope, localStorageService, $cookieStore) {
        /*Page Declaration*/
        var vm = this;
        /* added for approuteconfig change */
        //pageConfig = pageConfig[0];
        if (pageConfig === undefined || pageConfig.fields === undefined) {
            window.appReload = true;
            if (ngAuthSettings.SSO !== undefined && !ngAuthSettings.SSO) {
                var authService = $injector.get('authService');
                authService.clearSession();
            }
            window.location.href = ngAuthSettings.appURL;
            //$location.url('/404');
            return false;
           // $location.url('/404');
           // return false;
        }

        vm.SSO = false;
        vm.SSOProgress = false;
        if (ngAuthSettings.SSO !== undefined && ngAuthSettings.SSO)
            vm.SSO = true;

        /*Settings*/
        vm.pageConfig = pageConfig;

        /*Fields*/
        vm.loginFields = angular.copy(vm.pageConfig.fields.loginFields);

        defaultData(vm.pageConfig.data);
        //loginPageSubscribe(vm, $scope);

        /*Settings*/

        /*Variable Declaration*/
        vm.title = 'loginPage';

        vm.showForgorPassword = false;
        vm.showLogin = true;
        vm.message = "";

        vm.primaryKey = "Id";
        vm.displayKey = "UserName";
        vm.loginFields.selectedRow = -1;
        vm.treeNode = {};

        vm.deleteModalTitle = "";
        vm.mainFormTitle = "";
        vm.subFormTitle = "";
        /*Variable Declaration*/

        vm.loginFields.mode = "Save";
        vm.loginFields.type = "forgotPassword";

        vm.loginData = {
            userName: "",
            password: function () {
                var passIndex = navcon.getItemIndexByProperty(vm.loginFields, "userpassword");
                return vm.loginFields[passIndex].data;
            },
            useRefreshTokens: false
        };
        vm.warningModal = function (type) {

            var userIndex = navcon.getItemIndexByProperty(vm.loginFields, "username");
            if (vm.loginFields[userIndex].data === "") {
                logger.warning("User Name shouldn't be empty....");
                return;
            }

            var passIndex = navcon.getItemIndexByProperty(vm.loginFields, "userpassword");
            if (vm.loginFields[passIndex].data === "") {
                logger.warning("Password shouldn't be empty....");
                return;
            }

            navcon.openModal(type);
        }
        vm.closeModal = function (type) {
            navcon.closeModal(type);
        }
        vm.login = function () {

            if (vm.SSO) {
                var authData = localStorageService.get('authorizationData');
                if(authData === null || authData === undefined)
                    ssoSignin();
                else {

                    $location.path('/dashboard');
                }
            } else {
                var userIndex = navcon.getItemIndexByProperty(vm.loginFields, "username");
                vm.loginData.userName = vm.loginFields[userIndex].data;

                var passIndex = navcon.getItemIndexByProperty(vm.loginFields, "userpassword");
                vm.loginData.password = vm.loginFields[passIndex].data;
                authentication();
                navcon.closeModal('warning');
            }

        };

        vm.logout = function () {
            if (ngAuthSettings.SSO !== undefined && ngAuthSettings.SSO) {
                if (ngAuthSettings.appURL !== undefined && ngAuthSettings.appURL !== "") {
                    window.location.href = ngAuthSettings.appURL + "logout.aspx";
                }
            }
        };

        function authentication(callback) {
            authService.login(vm.loginData).then(function (response) {
                menuSettings.data = authService.authentication.userRights;
                $rootScope.$broadcast('MENU-SETTING-DATA-REFRESH');
                $rootScope.$broadcast('ALERT-DATA-REFRESH', authService.authentication.notification, true);
                var authData = localStorageService.get('authorizationData');
                if (authService.authentication.notification != undefined && authService.authentication.notification.length > 0)
                    authData.notification.push(authService.authentication.notification);
                localStorageService.set('authorizationData', authData);

                $location.path('/dashboard');

                if (callback !== undefined)
                    callback('success');
            },
            function (err) {
                vm.message = "";
                navcon.closeModal('warning');
                if(err !== undefined &&  err !== null && err.error_description !== undefined && err.error_description !== "")
                    logger.warning(err.error_description, "", "");
                if (callback !== undefined)
                    callback(err);

            });
        }



        vm.authExternalProvider = function (provider) {
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = vm;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };

        vm.authCompletedCB = function (fragment) {

            $scope.$apply(function () {

                if (fragment.haslocalaccount == 'False') {

                    authService.logOut();
                    logger.success("You have successfully log out...", "", "");

                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };

                    $location.path('/associate');
                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authService.obtainAccessToken(externalData).then(function (response) {
                        $location.path('/orders');
                    },
                 function (err) {
                     vm.message = "";
                     //vm.message = err.error_description;
                     logger.warning(err.error_description, "", "");
                 });
                }

            });
        }

        vm.enterKey = function () {
            //$("navcon-button[text='login']").click();
            $timeout(function () {
                if (angular.element("navcon-button[class~='warningLogin']").length !== 0)
                    angular.element("navcon-button[class~='warningLogin']").triggerHandler('click');
                else
                    angular.element("navcon-button[text='login']").triggerHandler('click');
            });
            /*var userIndex = navcon.getItemIndexByProperty(vm.loginFields, "username");
            var userData = vm.loginFields[userIndex].data;

            var passIndex = navcon.getItemIndexByProperty(vm.loginFields, "userpassword");
            var passData = vm.loginFields[passIndex].data;

            if (userData === "" && passData === "") {
                var user = $('[type=text][name="username"]');
                $(user).focus();
            } else if (userData !== "" && passData === "") {
                var pass = $('[type=password][name="userpassword"]');
                $(pass).focus();
            } else if (userData !== "" && passData !== "") {
                if (event.which === 13) {
                    $("navcon-button[text='login']").click();
                    vm.login();
                }
            }*/
        }

        activate();

        /*Privat functions*/

        /*Save*/
        vm.save = function (type, mode, callback) {
            var SecurityQuestionIndex = navcon.getItemIndexByProperty(vm.loginFields, "SecurityQuestion");

            if (vm.loginFields[SecurityQuestionIndex].data !== "") {
                if (type === "forgotPassword") {
                    vm.deleteModalTitle = navcon.save.saveOption(vm, dataservice, vm.loginFields.mode, vm.loginFields.type, vm.loginTable, vm.loginFields, vm.loginFields.selectedRow,
                        vm.primaryKey, vm.displayKey, 0, false, false, "", function (data) {
                            if (data === undefined || data === null) return;
                            else {
                                logger.warning(data.Message);

                                if (data.Success) {
                                    var UserNameIndex = navcon.getItemIndexByProperty(vm.loginFields, "UserName");
                                    vm.loginFields[UserNameIndex].data = "";
                                    manageAllControls(true);
                                    navcon.closeModal(type);
                                }
                            }
                            //if (callback !== undefined)
                            //    callback(data === undefined ? false : true);
                        });
                }
            }
        };

        /*Cancel*/
        vm.cancel = function (type) {
            var UserNameIndex = navcon.getItemIndexByProperty(vm.loginFields, "UserName");
            vm.loginFields[UserNameIndex].data = "";
            manageAllControls(true);
            navcon.closeModal(type);
        };

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function (data) {
                return data;
            });
        };

        function activate() {
            var authData = localStorageService.get('authorizationData');
            manageAllControls(true);
            Layout.initSidebar();
            if(authData === null || authData === undefined) {
                if (vm.SSO) {
                    $timeout(function () {
                        navcon.openModal('warning');
                    })

                }
            } else {
                $location.path('/dashboard');
            }
        };


        function ssoSignin() {
            vm.SSOProgress = true;
            vm.loginData.userName = "******";
            vm.loginData.password = "******";
            authentication(function (res) {

                if (res === 'success') {
                    navcon.closeModal('warning');
                    return;
                }

                vm.SSOProgress = false;
                vm.ssoError = "";
                if (ngAuthSettings.SSOError !== undefined && ngAuthSettings.SSOError !== "")
                    vm.ssoError = ngAuthSettings.SSOError;

            });
        }

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.loginFields);
            manageAllControls(true);
        }

        function loginPageSubscribe(vm, $scope) {
            //template

        };

        vm.Ok = function () {
            var userNameIndex = navcon.getItemIndexByProperty(vm.loginFields, "UserName");
            var SecurityQuestionIndex = navcon.getItemIndexByProperty(vm.loginFields, "SecurityQuestion");

            vm.loginFields[SecurityQuestionIndex].disabled = true;
            var userNameData = vm.loginFields[userNameIndex].data;

            if (userNameData === undefined || userNameData === "") {
                logger.warning("User name required.");
                return;
            }
            else {
                getServerData("userRegistrationGetSecQn", userNameData).then(function (data) {
                    if (data === undefined || data === null || data.length === 0) {
                        vm.loginFields[SecurityQuestionIndex].data = "";
                        logger.warning("Invalid username.");
                        manageAllControls(true);
                        return;
                    }

                    if (data.Question.toUpperCase() === "NONE") {
                        //vm.loginFields[SecurityQuestionIndex].data = "";
                        logger.warning("No security question registered for the user.");
                        manageAllControls(true);
                    }
                    else {
                        vm.loginFields[SecurityQuestionIndex].data = data.Question;
                        manageAllControls(false);
                    }
                });
            }
        };

        function manageAllControls(status) {
            var securityQuesIndex = navcon.getItemIndexByProperty(vm.loginFields, "SecurityQuestion");
            var securityAnsIndex = navcon.getItemIndexByProperty(vm.loginFields, "SecurityAnswer");
            var passwordIndex = navcon.getItemIndexByProperty(vm.loginFields, "NewPassword");
            var confirmPasswordIndex = navcon.getItemIndexByProperty(vm.loginFields, "ConfirmPassword");

            vm.loginFields[securityAnsIndex].data = "";
            vm.loginFields[passwordIndex].data = "";
            vm.loginFields[confirmPasswordIndex].data = "";

            vm.loginFields[securityQuesIndex].disabled = true;
            vm.loginFields[securityAnsIndex].disabled = status;
            vm.loginFields[passwordIndex].disabled = status;
            vm.loginFields[confirmPasswordIndex].disabled = status;

            $rootScope.$broadcast('FIELD-VALID', status, securityAnsIndex);
            $rootScope.$broadcast('FIELD-VALID', status, passwordIndex);
            $rootScope.$broadcast('FIELD-VALID', status, confirmPasswordIndex);

            if (status === true) {
                vm.loginFields[securityQuesIndex].data = "";
            }
        };

        /*Private functions*/
    }
})();