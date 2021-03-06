(function () {
    'use strict';

    angular
        .module('app.rolemanagement')
        .controller('rolemanagement', rolemanagement);
    /* @ngInject */
    function rolemanagement($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, menuSettings) {
        var vm = this;
        $('.nav-tabs').scrollingTabs();
       
        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }

        /* History Fields */
        $scope.isHistory = false;
        $scope.historyState = "Save";
        $scope.HistoryTitle = "Review Changes";
        $scope.hideHistory = false;

        vm.rights = navcon.getUserRights(menuSettings, "padministration", "rolemanagement");

        /*Settings*/
        vm.pageConfig = pageConfig;
        //vm.roleManagementFields = angular.copy(vm.pageConfig.fields.roleManagementFields);
        //vm.roleManagementHistoryFields = angular.copy(vm.pageConfig.fields.roleManagementHistoryFields);
        //vm.roleManagementTable = angular.copy(vm.pageConfig.tables.roleManagementTable);

        /*Page Config Common Varriable Assign */
        navcon.getPageConfig(vm, vm.pageConfig);

        defaultData(vm.pageConfig.data);

        activate();
        $(".nav-tabs a").click(function (e) {
            e.preventDefault();
            $(".tab-pane").removeClass("active");

            var tabName = $(e.currentTarget).attr('val-attr');
            $("#" + tabName).addClass("active");
        });

        /*Variable Declaration*/
        vm.primaryKey = "RoleId";
        var type = "roleManagement";
        var roleStatusIndex;
        var addExistingSystemRoleIndex;
        var existingSystemRoleIdIndex;
        //var ITARWarningIndex;
        vm.readOnly = false;
        vm.formManage = {};
        vm.showHistory = false;
        function setScrolltab() {
            setTimeout(function () {
                $(".scrtabs-tabs-fixed-container").width($(".scrtabs-tabs-fixed-container").width() - 20);
                $(".scrtabs-tabs-movable-container").width($(".scrtabs-tabs-movable-container").width() + 50);
            }, 2000)
        }
        setScrolltab();

        $(window).on("resize", function () {
            setScrolltab();
        });
        /*Cancel*/
        vm.cancel = function (type) {
            if (type === 'RoleDeleteModal') {
                navcon.closeModal(type);
            }
            else {
                clearFields();
                getRoleById(vm.RoleId);

                vm.enableFields(false);
                vm.isSave = true;
                vm.isEdit = true;
                vm.isUpdate = true;
                vm.readOnly = true;

                if (vm.RoleId === 0)
                    vm.showHistory = false;
                else
                    vm.showHistory = true;

                if (vm.RoleId === 0)
                    $('#Role').removeClass('in');
            }

            $scope.isHistory = false;
            navcon.closeModal(type);
            navcon.clearFieldsData(vm.roleManagementHistoryFields);
        };

        $scope.cancel = function (type) {
            $scope.isHistory = false;
            navcon.closeModal(type);
            navcon.clearFieldsData(vm.roleManagementHistoryFields);
        }

        /*Edit*/
        vm.edit = function () {
            vm.enableFields(true);
            vm.isSave = true;
            vm.isUpdate = false;
            vm.isDelete = false;
            vm.isCancel = false;
            vm.isITAR = false;
        };

        /*Save*/
        vm.save = function (mode, callback) {
            $scope.hideHistory = false;

            if (vm.RoleId === 0)
                vm.mode = "Save";
            else
                vm.mode = "Update";

            var idName = "RoleId";
            var idNameIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, idName);

            if (vm.roleManagementFields[idNameIndex].data != 0) {

                $scope.Historydata = navcon.comparedata(vm.roleManagementFields, 'Administration Role Management', "", idName, vm.roleManagementFields[idNameIndex].data);
                var HistoryIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, 'History');
                vm.roleManagementFields[HistoryIndex].data = $scope.Historydata;

                $scope.HistoryTitle = 'Review Changes';

                if ($scope.Historydata.length > 0) {
                    $scope.isHistory = true;
                    $scope.historyState = "Save";
                    navcon.openModal('review');
                }
                else {
                    $scope.isHistory = false;
                    navcon.openModal('notFound');
                }
            } else {
                $scope.ProceedToSave();
            }
        };

        $scope.saveChanges = function () {
            if (vm.formManage.formValid(vm.roleManagementHistoryFields)) {
                var HistoryRemarksIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "HistoryRemarks");
                var RemarksIndex = navcon.getItemIndexByProperty(vm.roleManagementHistoryFields, "HistoryRemarks");
                var objHistory = { Remarks: vm.roleManagementHistoryFields[RemarksIndex].data };
                console.log(objHistory);
                vm.roleManagementFields[HistoryRemarksIndex].data = objHistory;
                $scope.ProceedToSave();
            }
        };

        $scope.ProceedToSave = function () {
            navcon.save.saveOption(vm, dataservice, vm.mode, type, vm.roleManagementTable, vm.roleManagementFields, vm.selectedRow, vm.primaryKey, "", "", "", true, "", function (data) {
                clearFields();
                $('#Role').removeClass('in');
                $scope.cancel('review');
                navcon.clearFieldsData(vm.roleManagementHistoryFields);

                if (data !== undefined && vm.mode == "Update")
                    logger.success("Entries are updated successfully...");
                if (data !== undefined && vm.mode == "Save")
                    logger.success("Entries are saved successfully...");
            });
        };

        $scope.HistoryChanges = function (type) {
            $scope.hideHistory = false;
            var idNameIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "RoleId");

            dataservice.getData("History/GetHistory/RoleId/" + vm.roleManagementFields[idNameIndex].data).then(function (data) {
                $scope.HistoryTitle = "History";

                if (data != undefined && data != null && data.length > 0) {
                    $scope.Historydata = data;
                    $scope.hideHistory = false;
                } else {
                    $scope.Historydata = data;
                    $scope.hideHistory = true;
                }

                $scope.isHistory = true;
                $scope.historyState = "View";
                navcon.openModal('review');
            });
        };

        /*Delete*/
        vm.delete = function (callback) {
            navcon.openModal('RoleDeleteModal');
        }

        vm.showHide = function (id, mode) {
            if (!$('#' + id).hasClass('in')) {
                $('#' + id).toggleClass('in');
            }

            if (mode === 'add') {
                clearFields();
                vm.RoleId = 0;
                vm.isSave = false;
                vm.isCancel = false;
                vm.isUpdate = true;
                vm.isDelete = true;
                vm.enableFields(true);
                vm.isITAR = false;
                vm.showHistory = false;
                vm.roleManagementFields.mode = 'save';
                $('table.dataTable tbody tr').removeClass('selected');
                $('table.dataTable tbody tr').css("background-color", "");
            }
        }

        vm.closePopup = function (modalType, action) {
            if (action === "No") {
                navcon.closeModal(modalType);
            }
            else
                if (action === "Yes") {
                    navcon.save.deleteOption(dataservice, type, vm.roleManagementTable, vm.selectedRow, vm.primaryKey, "", function (data) {
                        //if (callback !== undefined)
                        //    callback(data === undefined ? false : true);
                        closeModal('delete');
                        navcon.closeModal(modalType);
                        vm.isEdit = true;
                        if (data !== undefined)
                            logger.success("Entries are deleted successfully...");
                    });
                }
        }

        function closeModal(mode) {
            if (mode === 'delete') {
                clearFields();
                $('#Role').removeClass('in');
                vm.showHistory = false;
            }
            else {
                vm.readOnly = true;
                vm.showHide('Role');
                vm.showHistory = true;
            }
        }

        function clearFields() {
            navcon.clearFieldsData(vm.roleManagementFields);
            roleStatusIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "RoleStatus");
            vm.roleManagementFields[roleStatusIndex].data = true;
            navcon.clearFieldsData(vm.roleManagementHistoryFields);
        }

        vm.enableFields = function (isEnabled) {
            vm.readOnly = !isEnabled;
        }

        vm.tableCellClick = function (row, column, data, type, cellObj, oTable) {
            vm.showHide('Role');
            vm.RoleId = data.RoleId;
            vm.selectedRow = navcon.save.selectedRowIndex(vm.roleManagementTable, data, vm.primaryKey);

            getRoleById(vm.RoleId);

            vm.enableFields(false);
            vm.isSave = true;
            vm.isUpdate = true;
            vm.showHistory = true;
            vm.roleManagementFields.mode = 'view';
        }

        function getRoleById(roleId) {
            var dataRole = getServerData('roleManagementId', roleId).then(function (dataRole) {
                if (dataRole !== undefined && dataRole !== null) {
                    if (roleId !== 0) {
                        clearFields();
                        navcon.updateFieldsData(vm.roleManagementFields, dataRole[0], vm, false, vm.navconData);

                        if (dataRole[0].IsSystemRole) {
                            vm.isEdit = true;
                            vm.isDelete = true;
                            vm.isCancel = true;
                            vm.isITAR = false;
                        }
                        else {
                            vm.isEdit = false;
                            vm.isDelete = false;
                            vm.isCancel = false;
                            vm.isITAR = true;
                        }
                    }
                }
            });
        }

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function (data) {
                return data;
            });
        };

        function activate() {
            getServerData('roleManagementAll').then(function (data) {
                //navcon.setDisabledEnabledByRights(vm.rights);
                if (data === undefined || data.length === 0) return;

                vm.roleManagementTable.data = data;
                vm.roleManagementTableData = data;

                //ITARWarningIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "ITARWarning");
                addExistingSystemRoleIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "AddExistingSystemRole");
                existingSystemRoleIdIndex = navcon.getItemIndexByProperty(vm.roleManagementFields, "ExistingSystemRoleId");
                $scope.itarwarning = true;
                vm.showExistingRoles = false;
                watchAttributes();
            });
        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.roleManagementFields);
        }

        function watchAttributes() {
            $scope.$watch("vm.roleManagementFields[" + addExistingSystemRoleIndex + "].data", function (newValue, oldValue) {
                if (newValue) {
                    vm.showExistingRoles = true;
                }
                else {
                    vm.showExistingRoles = false;
                    vm.roleManagementFields[existingSystemRoleIdIndex].data = "";
                }
            });

            // History ITAR  Watch
            var HistoryITARWarningIndex = navcon.getItemIndexByProperty(vm.roleManagementHistoryFields, "ITARWarning");
            $scope.$watch("vm.roleManagementHistoryFields[" + HistoryITARWarningIndex + "].data", function (newValue, oldValue) {
                if (newValue != undefined && newValue != "") {
                    $scope.historyItarWarning = newValue;
                }
                else {
                    $scope.historyItarWarning = false;
                }
            }, true);

            //$scope.$watch("vm.roleManagementFields[" + ITARWarningIndex + "].data", function (newValue, oldValue) {
            //    if (newValue) {
            //        $scope.itarwarning = newValue;
            //    }
            //    else {
            //        $scope.itarwarning = false;
            //    }
            //}, true);
        }
    }
})();