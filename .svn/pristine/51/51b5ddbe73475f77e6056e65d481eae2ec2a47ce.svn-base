(function () {
    'use strict';

    angular
        .module('app.userimport')
        .controller('userimport', userimport);

    /* @ngInject */
    function userimport($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, menuSettings, ngAuthSettings) {
        var vm = this;

        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }

        vm.rights = navcon.getUserRights(menuSettings, "padministration", "userimport");

        /*Settings*/
        vm.pageConfig = pageConfig;
        vm.userImportFields = angular.copy(vm.pageConfig.fields.userImportFields);
        vm.userImportTable = angular.copy(vm.pageConfig.tables.userImportTable);
        defaultData(vm.pageConfig.data);

        /*Variable Declaration*/
        vm.primaryKey = "Id";
        var type = "userImport";
        vm.formManage = {};

        /*Close*/
        vm.close = function (type) {
            $('#ResultsTable').removeClass('in');
        };

        vm.process = function () {
            //if (vm.formManage.formValid(vm.userImportFields)) {
            var importFields = navcon.getFieldsDataToSave(vm.userImportFields, 'Save', '', true);
            vm.userImportTable.data = [];
            $('#ResultsTable').removeClass('in');

            if (importFields.fuattachments === "" || importFields.fuattachments.length === 0)
                logger.warning("Please choose a File.");
            else {
                var formData = importFields["filesUpload"];
                if (formData != undefined && formData != null) {
                    var dataInfo = {
                        folder: "Excel",
                        id: 1
                    };
                    formData.append("data", JSON.stringify(dataInfo));

                    dataservice.excelFileUpload(formData).then(function (uploadData) {
                        if (uploadData !== undefined) {
                            vm.userImportTable.data = uploadData;
                            vm.showHide('ResultsTable');
                        }
                    });
                }
            }
            //}
        }

        vm.download = function () {
            var link = document.createElement("a");
            link.download = name;
            link.href = getServerURL("userImportFile");

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.open(link.href, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
            } else {
                link.click();
            }
        }

        function getServerURL(type, rowId) {
            var returnData = '';
            returnData = navcon.route.UI(ngAuthSettings.loginServiceUri, type, rowId);
            return returnData;
        }

        vm.showHide = function (id, mode) {
            if (!$('#' + id).hasClass('in')) {
                $('#' + id).toggleClass('in');
            }
        }

        function clearFields() {
            navcon.clearFieldsData(vm.userImportFields);
        }

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function (data) {
                return data;
            });
        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.userImportFields);
        }
    }
})();