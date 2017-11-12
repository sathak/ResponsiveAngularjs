(function () {
    'use strict';

    angular
        .module('app.changepassword')
        .controller('changepassword', changepassword);

    /* @ngInject */
    function changepassword($scope, dataservice, logger, $compile, $timeout, $location, authService, pageConfig, menuSettings) {
        var vm = this;

        vm.rights = navcon.getUserRights(menuSettings, "", "Change Password");

        /*Settings*/
        vm.pageConfig = pageConfig[0];
        vm.getUserData = pageConfig[1];

        /*Fields*/
        vm.changePasswordFields = angular.copy(vm.pageConfig.fields.changePasswordFields);
        navcon.updateFieldsData(vm.changePasswordFields, vm.getUserData, $scope, false, vm);
                
        /*breadcrumbs*/
        if (vm.pageConfig.breadcrumbs !== undefined) vm.breadcrumbs = vm.pageConfig.breadcrumbs;
        
        /*Variable Declaration*/
        vm.title = 'Change Password';
        vm.primaryKey = "Id";
        vm.displayKey = "Password";
        vm.changePasswordFields.selectedRow = -1;
        vm.treeNode = {};

        vm.deleteModalTitle = "";
        vm.mainFormTitle = "";
        vm.subFormTitle = "";
        /*Variable Declaration*/

        vm.changePasswordFields.mode = "Update";
        vm.changePasswordFields.type = "changePassword";

        navcon.setDisabledEnabledByRights(vm.rights);

        /*Save*/
        vm.save = function (type, mode, callback) {
            if (type === "changePassword") {
                vm.deleteModalTitle = navcon.save.saveOption(vm, dataservice, vm.changePasswordFields.mode, vm.changePasswordFields.type, vm.changePasswordTable, vm.changePasswordFields,
                    vm.changePasswordFields.selectedRow, vm.primaryKey, vm.displayKey, 0, false, false, "",
                    function (data) {
                        if (callback !== undefined)
                            callback(data === undefined ? false : true);
                        $location.path('/');
                    });
            }
        };
    }
})();