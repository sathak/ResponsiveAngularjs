(function () {
    'use strict';

    angular
        .module('app.usermanagement')
        .controller('usermanagement', usermanagement);

    function usermanagement($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, menuSettings, authService) {
        var vm = this;

        vm.readOnly = false;

        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }
        vm.rights = navcon.getUserRights(menuSettings, "padministration", "usermanagement");
        vm.formManage = {};

        /*Settings*/
        vm.pageConfig = pageConfig;
        vm.selecteduser = false;
        /*Report Configuration */
        vm.report = {};
        //vm.report.title = "List of SORT";
        //vm.rportId = 19;
        //vm.report.source = "";
        vm.print = function () {
            vm.report = {};
            vm.report.title = "List of Causes";
            vm.rportId = 1;
            vm.report.export = "true";
            vm.report.source = "";

            navcon.callPrint(vm.report, vm.rportId, function () {
            });

        }

        //vm.userManagementFields = angular.copy(vm.pageConfig.fields.userManagementFields);
        //vm.userManagementTable = angular.copy(vm.pageConfig.tables.userManagementTable);

        /*Page Config Common Varriable Assign */
        navcon.getPageConfig(vm, vm.pageConfig);
        // tabbed content
        // http://www.entheosweb.com/tutorials/css/tabs.asp
        $(".rtab_content").hide();
        $(".rtab_content:first").show();

        /* if in tab mode */
        $("ul.rtabs li").click(function () {

            $(".rtab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();

            $("ul.rtabs li").removeClass("active");
            $(this).addClass("active");

            $(".rtab_drawer_heading").removeClass("d_active");
            $(".rtab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

        });
        /* if in drawer mode */
        $(".rtab_drawer_heading").click(function () {

            $(".rtab_content").hide();
            var d_activeTab = $(this).attr("rel");
            $("#" + d_activeTab).fadeIn();

            $(".rtab_drawer_heading").removeClass("d_active");
            $(this).addClass("d_active");

            $("ul.rtabs li").removeClass("active");
            $("ul.rtabs li[rel^='" + d_activeTab + "']").addClass("active");
        });


        /* Extra class "tab_last" 
           to add border to right side
           of last tab */
        $('ul.rtabs li').last().addClass("rtab_last");
        /*Variable Declaration*/
        vm.primaryKey = "Id";
        var type = "userManagement";
        var clockNumberIndex;
        var userNameIndex;
        var userStatusIdIndex;
        var rolesIndex;
        var projectsIndex;
        var locationIndex;
        var departmentIndex;
        var phoneNumberIndex;
        //var ITARWarningIndex;
        vm.readOnly = false;
        //vm.readOnlyUserName = true;
        vm.showClockNumber = true;
        vm.showUserStatus = true;
        vm.allowEditUserName = false;
        vm.formManage = {};
        vm.showHistory = false;
        vm.filterLoad = false;

        var clockNumberIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "ClockNumber");
        var userNameIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "UserName");
        var locationIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "BaseId");
        var departmentIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "DepartmentId");
        var userStatusIdIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "UserStatusId");
        //var phoneNumberIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "PhoneNumber");
        //vm.userManagementFields[phoneNumberIndex].templateOptions.pattern = '^((\\+)?\\d{1,3}[- ]?)?\\d{10}$';

        activate();

        defaultData(vm.pageConfig.data);

        function activate() {
            //getServerData('userManagementAll').then(function (data) {
            //    if (data === undefined || data.length === 0) return;
            //    vm.userManagementTable.data = data;
            //    vm.userManagementTableData = data;

            //    watchAttributes();
            //});

            var filterFields = navcon.getFieldsDataToSave(vm.filterFields, 'Save', '', false);
            filterFields.userStatus = -1;

            dataservice.postServerData("", filterFields, false, "", "UserManagement/GetAllUsers").then(function (data) {
                vm.userManagementTable.data = data;
                vm.userManagementTableData = data;

                watchAttributes();
            });

        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.userManagementFields);
            navcon.kendo.loadListDefaultData(data, vm.userManagementFields);
        }

        vm.addNew = function (type, mode) {
            $timeout(function () {
                vm.UserId = 0;
                vm.selecteduser = true;
                vm.isSave = false;
                vm.isUpdate = true;
                vm.readOnly = false;
                clearFields();
            })

        }

        vm.tableCellClick = function (row, column, data, type, cellObj, oTable) {
            vm.selecteduser = true;
            vm.UserId = data.Id;
            vm.selectedRow = navcon.save.selectedRowIndex(vm.userManagementTable, data, vm.userManagementFields.primaryKey);

            getUserById(vm.UserId);

            vm.enableFields(false);
            vm.isSave = true;
            vm.isUpdate = true;
            vm.showHistory = true;
            vm.userManagementFields.mode = 'view';
        }
        vm.edit = function () {
            vm.readOnly = false;
            vm.isSave = true;
            vm.isUpdate = false;



        }

        vm.showHide = function (id, mode) {
            if (!$('#' + id).hasClass('in')) {
                $('#' + id).toggleClass('in');
            }

            if (mode !== undefined && (mode.toString().toLowerCase() === 'add' || mode.toString().toLowerCase() === 'save')) {
                clearFields();
                vm.UserId = 0;
                vm.isSave = false;
                vm.isUpdate = true;
                vm.enableFields(true);
                //vm.isITAR = false;
                disableUsername(false);
                vm.showClockNumber = false;
                vm.showUserStatus = true;
                vm.showHistory = false;
                vm.userManagementFields.mode = 'Save';
                $('table.dataTable tbody tr').removeClass('selected');
                $('table.dataTable tbody tr').css("background-color", "");
            }
        }

        function getUserById(userId) {
            if (userId !== 0) {
                var dataUser = getServerData('userManagementId', userId).then(function (dataUser) {
                    if (dataUser !== undefined && dataUser !== null) {
                        if (userId !== 0) {
                            if (dataUser.UserStatusId === 1) dataUser.UserStatusId = true;
                            else if (dataUser.UserStatusId === 0) dataUser.UserStatusId = false;
                            clearFields();
                            navcon.updateFieldsData(vm.userManagementFields, dataUser, vm, false, vm);

                            if (dataUser.IsSystemUser)
                                vm.showUserStatus = false;
                            else
                                vm.showUserStatus = true;
                        }
                        vm.isEdit = false;
                        vm.isDelete = false;
                        vm.isCancel = false;
                        vm.showClockNumber = true;
                        //vm.isITAR = true;
                        vm.allowEditUserName = dataUser.UserNameEditable;
                        disableUsername(true);
                    }
                });
            }
        }

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function (data) {
                return data;
            });
        };

        function clearFields() {
            navcon.clearFieldsData(vm.userManagementFields);
            vm.userManagementFields[userStatusIdIndex].data = true;
            //navcon.clearFieldsData(vm.userManagementHistoryFields);            
        }

        vm.enableFields = function (isEnabled) {
            vm.readOnly = !isEnabled;
        }

        function disableUsername(isDisabled) {
            vm.userManagementFields[clockNumberIndex].disabled = isDisabled;
            vm.userManagementFields[clockNumberIndex].readonly = isDisabled;

            vm.userManagementFields[userNameIndex].disabled = isDisabled;
            vm.userManagementFields[userNameIndex].readonly = isDisabled;
        }

        vm.cancel = function (type) {
            if (type === 'UserDeleteModal') {
                navcon.closeModal(type);
            }
            else {
                clearFields();
                getUserById(vm.UserId);

                vm.enableFields(false);
                vm.isSave = true;
                vm.isEdit = true;
                vm.isUpdate = true;
                vm.readOnly = true;
                //vm.readOnlyUserName = true;
                vm.showClockNumber = true;

                if (vm.UserId === 0)
                    vm.showHistory = false;
                else
                    vm.showHistory = true;

                if (vm.UserId === 0) {
                    vm.selecteduser = false;
                    $('#User').removeClass('in');
                }
            }

            $scope.isHistory = false;
            navcon.closeModal(type);
            navcon.clearFieldsData(vm.userManagementHistoryFields);
        };

        vm.save = function (mode, callback) {
            $scope.hideHistory = false;
            vm.isSuperUser = false;

            if (vm.UserId === 0)
                vm.mode = "Save";
            else
                vm.mode = "Update";

            if (authService != undefined && authService.authentication != undefined && authService.authentication.Roles != undefined) {
                if (authService.authentication.Roles.length > 0) {
                    for (var roleIndex = 0; roleIndex < authService.authentication.Roles.length; roleIndex++) {
                        if (authService.authentication.Roles[roleIndex].RoleSystemCode === "SuperUser") {
                            vm.isSuperUser = true;
                            break;
                        }
                    }
                }
            }

            var allowSave = false;
            rolesIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "Roles");
            var oldRolesList = vm.userManagementFields[rolesIndex].oldData;
            var newRolesList = vm.userManagementFields[rolesIndex].data;

            var systemRoleData = $.grep(newRolesList, function (e) {
                return e.IsSystemRole;
            });

            var safetyManagerHODData = $.grep(newRolesList, function (e) {
                if (e.RoleSystemCode === "SafetyManager" || e.RoleSystemCode === "HeadOfDepartment")
                    return true;
            });

            if (systemRoleData.length === 0) {
                logger.warning("Atleast one System Role is required.");
            }
            else if (safetyManagerHODData.length > 1) {
                var sortedSafetyManagerHODData = safetyManagerHODData.slice().sort();

                for (var i = 0; i < safetyManagerHODData.length - 1; i++) {
                    if (sortedSafetyManagerHODData[i + 1].RoleSystemCode !== sortedSafetyManagerHODData[i].RoleSystemCode) {
                        logger.warning("Safety Manager and Head of Department Roles should not be chosen together.");
                        allowSave = false;
                        break;
                    }
                    else allowSave = true;
                }
            }
            else if (!vm.isSuperUser) {
                for (var i = 0; i < newRolesList.length; i++) {
                    if (newRolesList[i].RoleSystemCode === "SuperUser") {
                        logger.warning("Super User Role cannot be assigned.");
                        allowSave = false;
                        break;
                    }
                    else allowSave = true;
                }
            }
            else
                allowSave = true;

            if (allowSave) {
                var idName = "Id";
                var idNameIndex = navcon.getItemIndexByProperty(vm.userManagementFields, idName);

                if (vm.userManagementFields[idNameIndex].data != 0) {

                    $scope.Historydata = navcon.comparedata(vm.userManagementFields, 'Administration User Management', "", "UserId", vm.userManagementFields[idNameIndex].data);
                    var HistoryIndex = navcon.getItemIndexByProperty(vm.userManagementFields, 'History');
                    vm.userManagementFields[HistoryIndex].data = $scope.Historydata;

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
            }
        };

        $scope.saveChanges = function () {
            if (vm.formManage.formValid(vm.userManagementHistoryFields)) {
                var HistoryRemarksIndex = navcon.getItemIndexByProperty(vm.userManagementFields, "HistoryRemarks");
                var RemarksIndex = navcon.getItemIndexByProperty(vm.userManagementHistoryFields, "HistoryRemarks");
                var objHistory = { Remarks: vm.userManagementHistoryFields[RemarksIndex].data };
                console.log(objHistory);
                vm.userManagementFields[HistoryRemarksIndex].data = objHistory;
                $scope.ProceedToSave();
            }
        };

        $scope.ProceedToSave = function () {
            navcon.save.saveOption(vm, dataservice, vm.mode, type, vm.userManagementTable, vm.userManagementFields, vm.selectedRow, vm.primaryKey, "", "", "", true, "", function (data) {
                clearFields();
                $('#User').removeClass('in');
                $scope.cancel('review');
                navcon.clearFieldsData(vm.userManagementHistoryFields);

                if (data !== undefined && vm.mode == "Update")
                    logger.success("Entries are updated successfully...");
                if (data !== undefined && vm.mode == "Save")
                    logger.success("Entries are saved successfully...");
            });
            vm.readOnly = true;
        };

        function watchAttributes() {
            $scope.$watch("vm.userManagementFields[" + userNameIndex + "].data", function (newValue, oldValue) {
                if (newValue) {
                    if (newValue.indexOf(' ') >= 0) {
                        newValue = newValue.replace(/\s/g, "")
                        vm.userManagementFields[userNameIndex].data = newValue;
                    }
                }
            });

            $scope.$watch("vm.userManagementFields[" + locationIndex + "].data", function (newValue, oldValue) {
                if (newValue != undefined && newValue != "") {

                    var dataDepartments = getServerData('userManagementGetDeptByLocationId', newValue.BaseId).then(function (dataDepartments) {

                        //vm.userManagementFields[departmentIndex].data = "";
                        vm.userManagementFields[departmentIndex].selectOptions.items = dataDepartments;

                        if (vm.userManagementFields[locationIndex].selectOptions.item["isSelect"]) {
                            vm.userManagementFields[departmentIndex].data = "";
                        }
                    })
                }
            },true);

            // History ITAR  Watch
            var HistoryITARWarningIndex = navcon.getItemIndexByProperty(vm.userManagementHistoryFields, "ITARWarning");
            $scope.$watch("vm.userManagementHistoryFields[" + HistoryITARWarningIndex + "].data", function (newValue, oldValue) {
                if (newValue != undefined && newValue != "") {
                    $scope.historyItarWarning = newValue;
                }
                else {
                    $scope.historyItarWarning = false;
                }
            }, true);

        }
    }
})();