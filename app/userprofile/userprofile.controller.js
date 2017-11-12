(function() {
    'use strict';

    angular
        .module('app.userprofile')
        .controller('userprofile', userprofile);

    /* @ngInject */
    function userprofile($scope, dataservice, logger, $compile, $timeout, $location, authService, pageConfig, $rootScope, menuSettings, ngAuthSettings) {
        var vm = this;
        var type = "userProfile";

        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }



        function settings() {
            /*Variables Declaration and Assign */
           // vm.userId = authService.authentication.userId;
            vm.userName = authService.authentication.userName;
            vm.SSOStatus = ngAuthSettings.SSO;
            vm.primaryKey = "Id";
            vm.readOnly = true;
            vm.formManage = {};
            //vm.rights = navcon.getUserRights(menuSettings, "padministration", "userprofile");

            /*Page configuration*/
            vm.pageConfig = pageConfig;
            vm.userProfileFields = angular.copy(vm.pageConfig.fields.userProfileFields);
            vm.changePasswordFields = angular.copy(vm.pageConfig.fields.changePasswordFields);
        }


        vm.cancel = function(type) {
            if (type === 'userprofile') {
                clearFields();
                getUserById();

                vm.enableFields(false);
                vm.isUpdate = true;
                vm.readOnly = true;
            } else if (type === 'changePassword') {
                $('#' + 'ChangePassword').toggleClass('in');
                $('#' + 'ChangePassword').parent('.panel').find('.panel-heading .panel-title:first').addClass('collapsed');
                $('#ChangePassword').removeClass('in');
            }
        };

        /*Edit*/
        vm.edit = function() {
            vm.enableFields(true);
            vm.isEdit = true;
            vm.isUpdate = false;
            vm.isCancel = false;
        };

        vm.save = function(type, callback) {
            vm.mode = "Update";
            if (type === 'userprofile') {
                if (vm.formManage.formValid(vm.userProfileFields)) {
                    navcon.save.saveOption(vm, dataservice, vm.mode, type, vm.userProfileTable, vm.userProfileFields, vm.selectedRow, vm.primaryKey, "", "", "", true, "", function(data) {
                        //if (callback !== undefined)
                        //    callback(data === undefined ? false : true);

                        if (data !== undefined) {
                            clearFields();
                            getUserById();
                            logger.success("Entries are updated successfully...");
                        }
                        vm.readOnly = true;
                        vm.isEdit = false;
                        vm.isUpdate = true;
                        vm.isCancel = false;
                    });
                }
            } else if (type === 'changePassword') {
                if (vm.formManage.formValid(vm.changePasswordFields)) {
                    var userIdIndex = navcon.getItemIndexByProperty(vm.changePasswordFields, "Id");
                    var userNameIndex = navcon.getItemIndexByProperty(vm.changePasswordFields, "UserName");

                    vm.changePasswordFields[userIdIndex].data = parseInt(vm.userId);
                    vm.changePasswordFields[userNameIndex].data = vm.userName;

                    navcon.save.saveOption(vm, dataservice, vm.mode, type, "", vm.changePasswordFields, vm.changePasswordFields.selectedRow, vm.primaryKey, vm.displayKey, 0, false, false, "", function(data) {
                        if (data !== undefined) {
                            clearPasswordFields();
                            logger.success("Password changed successfully...");
                            $('#' + 'ChangePassword').toggleClass('in');
                            $('#' + 'ChangePassword').parent('.panel').find('.panel-heading .panel-title:first').addClass('collapsed');
                            $('#ChangePassword').removeClass('in');
                        }
                        //else {
                        //    logger.warning("Old Password is incorrect.")
                        //}
                    });
                }
            }
        };

        vm.showPassword = function() {
            clearPasswordFields();
            vm.showHide('ChangePassword');
        }

        vm.showHide = function(id, mode) {
            if (!$('#' + id).hasClass('in')) {
                $('#' + id).toggleClass('in');
            }
        }

        function clearFields() {
            navcon.clearFieldsData(vm.userProfileFields);
            //userImageIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "UserImage");
            //vm.userProfileFields[userImageIndex].data = "";
        }

        function clearPasswordFields() {
            navcon.clearFieldsData(vm.changePasswordFields);
        }

        vm.enableFields = function(isEnabled) {
            vm.readOnly = !isEnabled;
        }

        vm.togglePanel = function(id) {
            $('#' + id).toggleClass('in');

            if ($('#' + id).hasClass('in')) {

                $('#' + id).parent('.panel').find('.panel-heading .panel-title:first').removeClass('collapsed');
            } else {
                $('#' + id).parent('.panel').find('.panel-heading .panel-title:first').addClass('collapsed');
            }
        }

        function getUserById() {
            clearFields();

            var dataUser = getServerData('userProfileId').then(function(dataUser) {
                if (dataUser !== undefined && dataUser !== null) {
                    navcon.updateFieldsData(vm.userProfileFields, dataUser, vm, false, vm.navconData);
                    vm.isEdit = false;
                    vm.isUpdate = true;
                    vm.isCancel = false;

                    var IdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "Id");
                    var documentIdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "documentId");
                    if (dataUser.documentId === undefined || dataUser.documentId === null || dataUser.documentId === "")
                        vm.userProfileFields[documentIdIndex].data = vm.userProfileFields[IdIndex].data;

                    if (dataUser.documents !== undefined && dataUser.documents !== null && dataUser.documents.DocumentName !== undefined && dataUser.documents.DocumentName !== null) {
                        var documentNameIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "DocumentName");
                        vm.userProfileFields[documentNameIndex].data = dataUser.documents.DocumentName;
                    }

                    if (dataUser.img !== undefined && dataUser.img !== null && dataUser.img !== "") {
                        //var userImageIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "img");
                        //vm.userProfileFields[userImageIndex].data = dataUser.img;
                        $rootScope.userProfileImage = dataUser.img;
                    }
                }
            });
        }

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function(data) {
                return data;
            });
        };

        function activate() {
            settings();
            defaultData(vm.pageConfig.data);
            if (ngAuthSettings.unitTest === undefined || !ngAuthSettings)
                getUserById();
            watchAttributes();
        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.userProfileFields);
        }

        function watchAttributes() {
            var userImageIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "img");
            $scope.$watch("vm.userProfileFields[" + userImageIndex + "].templateOptions.keyReturn", function(newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue) {
                    if (newValue.error !== undefined && newValue.error.length > 0) {} else if (newValue.removed !== undefined) {
                        var IdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "Id");
                        var documentIdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "documentId");
                        vm.userProfileFields[documentIdIndex].data = vm.userProfileFields[IdIndex].data;
                        $rootScope.userProfileImage = "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";
                    } else if (newValue.uploaded !== undefined && newValue.uploaded.length > 0) {
                        $timeout(function() {
                            var dataUser = getServerData('userProfileId').then(function(dataUser) {
                                if (dataUser !== undefined && dataUser !== null) {
                                    navcon.updateFieldsData(vm.userProfileFields, dataUser, vm, false, vm.navconData);

                                    var IdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "Id");
                                    var documentIdIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "documentId");
                                    if (dataUser.documentId === undefined || dataUser.documentId === null || dataUser.documentId === "")
                                        vm.userProfileFields[documentIdIndex].data = vm.userProfileFields[IdIndex].data;

                                    if (dataUser.documents !== undefined && dataUser.documents !== null && dataUser.documents.DocumentName !== undefined && dataUser.documents.DocumentName !== null) {
                                        var documentNameIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "DocumentName");
                                        vm.userProfileFields[documentNameIndex].data = dataUser.documents.DocumentName;
                                    }

                                    if (dataUser.img !== undefined && dataUser.img !== null && dataUser.img !== "") {
                                        //var userImageIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "img");
                                        //vm.userProfileFields[userImageIndex].data = dataUser.img;
                                        $rootScope.userProfileImage = dataUser.img;
                                    }
                                }
                            });
                        });
                    }
                }
            });

            var ITARWarningIndex = navcon.getItemIndexByProperty(vm.userProfileFields, "ITARWarning");
            $scope.$watch("vm.userProfileFields[" + ITARWarningIndex + "].data", function(newValue, oldValue) {
                if (newValue) {
                    vm.itarwarning = newValue;
                } else {
                    vm.itarwarning = false;
                }
            }, true);
        }

        activate();
    }
})();