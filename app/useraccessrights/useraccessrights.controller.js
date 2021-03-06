(function () {
    'use strict';
    angular
        .module('app.useraccessrights')
        .controller('useraccessrights', useraccessrights);

    /*@ngInject*/
    //function useraccessrights($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, localStorageService, $http, authService, ngAuthSettings, menuSettings) {
    function useraccessrights($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, menuSettings) {
        /*Page Declaration*/
        var vm = this;


        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }

        /* History Fields */
        $scope.isHistory = false;
        $scope.historyState = "Save";
        $scope.HistoryTitle = "Review Changes";
        $scope.hideHistory = false;

        $scope.IsSubsection = 'yes';
        $scope.SubsectionHeading = "Menu";

        vm.rights = navcon.getUserRights(menuSettings, "padministration", "useraccessrights");

        /*Settings*/
        vm.pageConfig = pageConfig;

        //vm.userAccessRightsFields = angular.copy(vm.pageConfig.fields.userAccessRightsFields);
        //vm.userAccessRightsHistoryFields = angular.copy(vm.pageConfig.fields.userAccessRightsHistoryFields);
        //vm.userAccessRightsTree = angular.copy(vm.pageConfig.trees.userAccessRightsTree);

        /*Page Config Common Varriable Assign */
        navcon.getPageConfig(vm, vm.pageConfig);

        //defaultData(vm.pageConfig.data);

        activate();

        watchAttributes();

        /*Variable Declaration*/
        vm.accessHeaders = [
            { "id": "1", "text": "Tab1", "order":1, "enbled": true },
            { "id": "2", "text": "Tab2", "order": 2, "enbled": true },
            { "id": "3", "text": "Tab3", "order": 3, "enbled": true },
            { "id": "4", "text": "Tab4", "order": 4, "enbled": true },
            { "id": "5", "text": "Tab5", "order": 5, "enbled": true },
            { "id": "6", "text": "Tab6", "order": 6, "enbled": true },
        ];

        vm.reportHeaders = [
            { "id": "1", "text": "My New Tab1 with Kendo object", "order": 1, "enbled": true },
            { "id": "2", "text": "My New Tab2 with Kendo object", "order": 2, "enbled": true },
            { "id": "3", "text": "My New Tab3 with Kendo object", "order": 3, "enbled": true },
            { "id": "4", "text": "My New Tab4 with Kendo object", "order": 4, "enbled": true },
            { "id": "5", "text": "My New Tab with Kendo object", "order": 5, "enbled": true },
            { "id": "6", "text": "My New Tab with Kendo object", "order": 6, "enbled": true },
            { "id": "7", "text": "My New Tab1", "order": 7, "enbled": true },
            { "id": "8", "text": "My New Tab2", "order": 8, "enbled": true },
            { "id": "9", "text": "My New Tab1", "order": 9, "enbled": true },
            { "id": "10", "text": "My New Tab2", "order": 10, "enbled": true }
        ];

        vm.primaryKey = "RightsId";
        vm.isSave = true;
        vm.isUpdate = true;
        vm.saveTitle = "";
        vm.selectedDropDown = "";
        vm.newId = -1;
        vm.mode = "Save";
        vm.formManage = {};
        vm.showHistory = false;
        var denyColumnId = "col6";
        vm.showReset = false;

        vm.check = function () {
            var userAccessRightsIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "userAccessRights");
            console.log(vm.userAccessRightsFields[userAccessRightsIndex].oldData);
            console.log(vm.userAccessRightsFields[userAccessRightsIndex].data);
        }
        /*Save*/
        vm.save = function (mode, callback) {
            var RightsIdIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RightsId");
            if (vm.userAccessRightsTree.core.data === undefined || vm.userAccessRightsTree.core.data.length === 0) {
                logger.warning("Menu - sub menu items should be listed..");
                return;
            }
            else {
                //vm.ProceedToSave();
                var RightsDetailsIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RightsDetails");
                vm.userAccessRightsTree.oldData = angular.copy(vm.userAccessRightsTree.core.oldData);

                var tree = $("navcon-tree[type='userAccessRights']").find('.jstree').find("div[role='tree']").jstree(false);
                vm.userAccessRightsTree.core.data = tree.settings.core.data;
                var treeNewData = navcon.getDataFromTree(vm.userAccessRightsTree.core.data, '', 0);
                vm.userAccessRightsTree.data = treeNewData; //navcon.getFieldsDataToSave(vm.userAccessRightsFields, mode, "RightsId")

                $scope.Historydata = navcon.comparedata(vm.userAccessRightsFields, 'Security', "", "RightsId", vm.userAccessRightsFields[RightsIdIndex].data);
                var HistoryIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, 'History');
                vm.userAccessRightsFields[HistoryIndex].data = $scope.Historydata;
                vm.HistoryTitle = 'Review Changes';

                if ($scope.Historydata !== undefined && $scope.Historydata.length > 0) {
                    $scope.Historydata.splice(0, 1); //excluding Role Dropdownlist
                }

                if ($scope.Historydata !== undefined && $scope.Historydata.length > 0) {
                    for (var i = 0; i < $scope.Historydata.length; i++) {
                        if ($scope.Historydata[i].oldData === 0 || $scope.Historydata[i].oldData === false) $scope.Historydata[i].oldData = "No";
                        if ($scope.Historydata[i].oldData === 1 || $scope.Historydata[i].oldData === true) $scope.Historydata[i].oldData = "Yes";

                        if ($scope.Historydata[i].NewData === 0 || $scope.Historydata[i].NewData === false) $scope.Historydata[i].NewData = "No";
                        if ($scope.Historydata[i].NewData === 1 || $scope.Historydata[i].NewData === true) $scope.Historydata[i].NewData = "Yes";
                    }

                    $scope.hideHistory = false;
                    $scope.isHistory = true;
                    $scope.historyState = "Save";
                    navcon.openModal('review');
                }
                else {
                    $scope.hideHistory = true;
                    $scope.isHistory = false;
                    navcon.openModal('notFound');
                }
            }
        };

        $scope.saveChanges = function () {
            if (vm.formManage.formValid(vm.userAccessRightsHistoryFields)) {
                var HistoryRemarksIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "HistoryRemarks");
                var RemarksIndex = navcon.getItemIndexByProperty(vm.userAccessRightsHistoryFields, "HistoryRemarks");
                var objHistory = { Remarks: vm.userAccessRightsHistoryFields[RemarksIndex].data };
                console.log(objHistory);
                vm.userAccessRightsFields[HistoryRemarksIndex].data = objHistory;
                vm.ProceedToSave();
            }
        };

        vm.ProceedToSave = function () {
            var type = "userAccessRights";
            vm.saveTitle = navcon.save.treeAction(vm, dataservice, vm.mode, type, vm.userAccessRightsFields,
                null, null, vm.primaryKey, "", vm.userAccessRightsTree.core.data, "", function (data) {
                    vm.saveTitle = data;
                    //getRightsById();
                    $('#User').removeClass('in');
                    vm.showHistory = false;
                    vm.showReset = false;

                    if (data !== undefined && vm.mode == "Update")
                        logger.success("Entries are updated successfully...");
                    if (data !== undefined && vm.mode == "Save")
                        logger.success("Entries are saved successfully...");

                    $scope.cancel('review');
                    navcon.clearFieldsData(vm.userAccessRightsHistoryFields);
                });

            defaultData(vm.pageConfig.data);
            vm.userAccessRightsTree.core.data = [];
            vm.mode = "Save";
        }

        $scope.HistoryChanges = function () {
            $scope.hideHistory = false;
            var idNameIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RightsId");

            dataservice.getData("History/GetHistory/RightsId/" + vm.userAccessRightsFields[idNameIndex].data).then(function (data) {
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

        $scope.cancel = function (type) {
            $scope.isHistory = false;
            navcon.closeModal(type);
            navcon.clearFieldsData(vm.userAccessRightsHistoryFields);
            $scope.Historydata = [];
            $scope.historyState = "Save";
        }

        vm.cancel = function () {
            defaultData(vm.pageConfig.data);
            vm.userAccessRightsTree.core.data = [];
            vm.mode = "Save";
            $('#User').removeClass('in');
            vm.showHistory = false;

            $scope.isHistory = false;
            navcon.closeModal(type);
            navcon.clearFieldsData(vm.userAccessRightsHistoryFields);
            $scope.Historydata = [];
            $scope.historyState = "Save";
        };

        vm.showHide = function (id, mode) {
            if (!$('#' + id).hasClass('in')) {
                $('#' + id).toggleClass('in');
            }
        }

        vm.showRights = function () {
            vm.showReset = false;

            if (vm.formManage.formValid(vm.userAccessRightsFields)) {
                var checkNodes = 0;
                var roleIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RoleId");
                if (vm.userAccessRightsFields[roleIndex].data === undefined || vm.userAccessRightsFields[roleIndex].data === "" || vm.userAccessRightsFields[roleIndex].data.length === 0) {
                    logger.warning(vm.userAccessRightsFields[roleIndex].templateOptions.requiredMessage);
                    $('#User').removeClass('in');
                    vm.showHistory = false;
                    return;
                }
                if (vm.newId !== -1) {

                    vm.showHide('User');
                    vm.showReset = true;

                    if (vm.newId !== undefined) {
                        getServerData(vm.selectedDropDown, vm.newId).then(function (data) {
                            if (data === undefined || data === null || data.length === 0) return;
                            vm.userAccessRightsTree.core.data = data.Menu;
                            //vm.userAccessRightsTable.data = data.Menu;

                            vm.formManage.userAccessRightsTree = vm.userAccessRightsTree;
                            var RightsIdIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RightsId");
                            vm.userAccessRightsFields[RightsIdIndex].data = data.RightsId;

                            if (data.RightsId === 0) {
                                vm.mode = "Save";
                                vm.isSave = false;
                                vm.isUpdate = true;
                            }
                            else {
                                vm.mode = "Update";
                                vm.isSave = true;
                                vm.isUpdate = false;
                            }

                            $('.jstree-grid-midwrapper').find('input').removeAttr("disabled");

                            if (data.IsSystemRole) {
                                vm.isSave = true;
                                vm.isUpdate = true;
                                vm.showHistory = false;

                                $timeout(function () {
                                    $('.jstree-grid-midwrapper').find('input').attr("disabled", "disabled");
                                    //$('.jstree-ocl').removeClass('jstree-icon');
                                }, 800);
                            }
                            else {
                                vm.showHistory = true;
                                vm.userAccessRightsTree.core.oldData = angular.copy(navcon.getDataFromTree(vm.userAccessRightsTree.core.data, '', 0));
                            }

                            vm.userAccessRightsFields.mode = "View";
                            if (!data.IsSystemRole) vm.userAccessRightsFields.mode = "Save";
                        });
                    }
                }
            }
            else {
                logger.warning("Invalid entries...", "", "");
            }
        };

        vm.reset = function () {
            var RoleIdIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RoleId");
            vm.userAccessRightsFields[RoleIdIndex].data = [];
            $('#User').removeClass('in');
            vm.showReset = false;

            //$location.path('useraccessrights/');
            //$('#User').removeClass('in');
        }

        //vm.treeActionClick = function (action, type, text, data, oTree, target) {

        //};

        //vm.treeCellClick = function (id, field, value, node, oTree) {

        //    //var type = "userAccessRights";
        //    //var data = vm.userAccessRightsTree.core.data;
        //    //var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']").jstree(true);
        //    //if (tree.settings !== undefined && tree.settings.core.data.length !== 0) data = tree.settings.core.data;            

        //    //if (field === 'Deny' && value === true) {
        //    //    $("[data-jstreegrid=" + id + "]").find("INPUT").attr("checked", false);
        //    //    $("[id=jsgrid_" + id + "_" + denyColumnId + "]").find("INPUT").attr("checked", true);                

        //    //    if (data !== undefined && data.length !== 0) {
        //    //        var treeData = navcon.getDataFromTree(data, '', 0);
        //    //        var currentIndex = navcon.getItemIndexByKeyValue(treeData, "id", parseFloat(node.data.id));
        //    //        treeData[currentIndex].data.Add = 0;
        //    //        treeData[currentIndex].data.Edit = 0;
        //    //        treeData[currentIndex].data.Delete = 0;
        //    //        treeData[currentIndex].data.View = 0;
        //    //        treeData[currentIndex].data.PRINT = 0;
        //    //    }
        //    //    node.data.Add = false;
        //    //    node.data.Edit = false;
        //    //    node.data.Delete = false;
        //    //    node.data.View = false;
        //    //    node.data.PRINT = false;
        //    //}
        //    //else {
        //    //    $("[id=jsgrid_" + id + "_" + denyColumnId + "]").find("INPUT").attr("checked", false);

        //    //    if (data !== undefined && data.length !== 0) {
        //    //        var treeData = navcon.getDataFromTree(data, '', 0);
        //    //        var currentIndex = navcon.getItemIndexByKeyValue(treeData, "id", parseFloat(node.data.id));
        //    //        treeData[currentIndex].data.Deny = 0;
        //    //    }
        //    //    node.data.Deny = false;
        //    //}
        //};

        /*Private functions*/
        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function (data) {
                return data;
            });
        };

        function activate() {

        };

        function getRightsById() {
            var serviceBase = ngAuthSettings.apiServiceBaseUri;
            $http.get(serviceBase + 'home/Security/' + authService.authentication.userId, { headers: { 'Content-Type': 'application/json' } }).success(function (rights) {
                var authData = localStorageService.get('authorizationData');
                authData.userRights = rights;
                localStorageService.set('authorizationData', authData);
                authService.fillAuthData();
                menuSettings.data = rights;
                $rootScope.$broadcast('MENU-SETTING-DATA-REFRESH');
            }).error(function (err, status) {

            });
        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.userAccessRightsFields);
        }

        function watchAttributes() {
            var roleItemIndex = navcon.getItemIndexByProperty(vm.userAccessRightsFields, "RoleId");

            $scope.$watch("vm.userAccessRightsFields[" + roleItemIndex + "].data", function (newValue, oldValue) {
                if (newValue != undefined && newValue !== oldValue) {

                    vm.selectedDropDown = 'userAccessRightsRoleId';
                    vm.newId = newValue.RoleId;
                    vm.userAccessRightsTree.core.data = [];
                    vm.mode = "Save";
                    vm.userAccessRightsFields.mode = "Save";
                    vm.isSave = true;
                    vm.isUpdate = true;
                    $('#User').removeClass('in');
                    vm.showHistory = false;
                    vm.showReset = false;
                }
            }, true);

            $scope.$watch("vm.userAccessRightsTree.core.data", function (newValue, oldValue) {
                if (newValue === undefined || newValue === "" || newValue.length === 0) {
                    $rootScope.$broadcast('FOOTER-CHANGE', '');
                } else {
                    $rootScope.$broadcast('FOOTER-CHANGE', 'S');
                }
            });

            // History ITAR  Watch
            var HistoryITARWarningIndex = navcon.getItemIndexByProperty(vm.userAccessRightsHistoryFields, "ITARWarning");
            $scope.$watch("vm.userAccessRightsHistoryFields[" + HistoryITARWarningIndex + "].data", function (newValue, oldValue) {
                if (newValue != undefined && newValue != "") {
                    $scope.historyItarWarning = newValue;
                }
                else {
                    $scope.historyItarWarning = false;
                }
            }, true);
        };
    }
})();