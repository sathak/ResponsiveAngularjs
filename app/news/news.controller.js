(function() {
    'use strict';
    angular
        .module('app.news')
        .controller('news', news);

    /* @ngInject */
    function news($scope, dataservice, logger, $compile, $timeout, $location, pageConfig, $rootScope, menuSettings) {
        var vm = this;


        if (pageConfig === undefined || pageConfig.fields === undefined) {
            $location.url('/');
            return false;
        }

        //vm.rights = navcon.getRoleRights(menuSettings, "Administration", "Bulletin Management");

        /*Settings*/
        vm.pageConfig = pageConfig;

        /*Page Config Common Varriable Assign */
        navcon.getPageConfig(vm, vm.pageConfig);
        //vm.newsFields = angular.copy(vm.pageConfig.fields.newsFields);
        activate();
        defaultData(vm.pageConfig.data);

        /*Variable Declaration*/
        vm.readOnly = true;
        vm.isViewMode = true;
        vm.isEdit = false;
        vm.isSaveHide = true;
        vm.isDeleteHide = true;

        vm.formManage = {};

        /*Page Actions*/
        vm.showHide = function(type, isShow) {
            if (isShow !== undefined && isShow)
                $('#' + type).addClass('in');
            else if (isShow !== undefined && !isShow)
                $('#' + type).removeClass('in');
            else if (!$('#' + type).hasClass('in')) {
                $('#' + type).toggleClass('in');
            } else {
                $('#' + type).removeClass('in');
            }

        };

        vm.enableFields = function(isEnabled) {
            vm.readOnly = !isEnabled;
        }

        /*Add New*/
        vm.addNew = function(type) {
            if (type === "NewsAnnouncements") {
                vm.newsFields.selectedRow = -1;
                vm.newsFields.mode = "Save";

                navcon.save.addNewOption($scope, vm.pageConfig.fields.newsFields, vm.newsFields, "News Announcement", "", function(data) {
                    vm.showHide(type, true);
                    vm.isSaveHide = false;
                    vm.isEdit = false;

                    vm.enableFields(true);
                }, false);
            }
        };

        /*Cancel*/
        vm.cancel = function(type) {
            if (type === 'newsDeleteModal') {
                navcon.closeModal(type);
            } else if (type === 'NewsAnnouncements') {

                vm.isSaveHide = true;

                vm.enableFields(false);

                if (vm.isEdit) {
                    getById();
                } else {
                    vm.showHide(type, false);
                }
            }
        };

        /*Edit*/
        vm.edit = function() {
            vm.enableFields(true);

            vm.isSaveHide = false;
            vm.isDeleteHide = false;
        };

        /*Save*/
        vm.save = function(type, mode, callback) {
            if (type === "NewsAnnouncements") {
                if (vm.formManage.formValid(vm.newsFields)) {
                    vm.deleteModalTitle = navcon.save.saveOption(vm, dataservice, vm.newsFields.mode, type, vm.newsTable, vm.newsFields, vm.newsFields.selectedRow, vm.newsFields.primaryKey, vm.newsFields.displayKey, "", true, "", "", function(data) {
                        navcon.clearFieldsData(vm.newsFields, $scope, false);
                        $('#' + type).removeClass('in');

                        if (callback !== undefined)
                            callback(data === undefined || data === null ? false : true);
                    });
                }
            }
        };

        /*Delete*/
        vm.delete = function(type, callback) {
            //navcon.openModal(type + 'DeleteModal');

            var action = "delete";
            vm.newsFields.mode = "Delete";
            var data = vm.newsFields.getById;

            vm.newsFields.selectedRow = navcon.save.selectedRowIndex(vm.newsTable, data, vm.newsFields.primaryKey);

            navcon.save.saveOption(vm, dataservice, vm.newsFields.mode, type, vm.newsTable, vm.newsFields, vm.newsFields.selectedRow, vm.newsFields.primaryKey, vm.newsFields.displayKey, "", false, "", "", function(data) {
                vm.newsFields.mode = "Update";
            });
        }


        /*Delete*/
        vm.tableRowDelete = function(type, modal, callback) {
            if (type === "NewsAnnouncements") {
                if (modal === "No") {
                    navcon.closeModal(type + 'delete');
                } else {
                    navcon.save.deleteOption(dataservice, type, vm.newsTable, vm.newsFields.selectedRow, vm.newsFields.primaryKey, "", function(data) {
                        vm.isEdit = false;
                        vm.isSaveHide = true;
                        vm.enableFields(false);
                        vm.showHide(type, false);

                        if (callback !== undefined)
                            callback(data === undefined || data === null ? false : true);
                    });
                }
            }
        };

        vm.tableCellClick = function(row, column, data, type, cellObj, oTable) {
            if (type === "NewsAnnouncements") {
                var action = "edit";
                vm.newsFields.mode = "Update";
                vm.newsFields.selectedRow = navcon.save.selectedRowIndex(vm.newsTable, data, vm.newsFields.primaryKey);

                vm.mainFormTitle = navcon.save.viewOption($scope, action, type, vm.newsTable, vm.newsFields, data, vm.newsFields.primaryKey, vm.newsFields.displayKey, dataservice, true, function(data) {
                    //vm.mainFormTitle = data;

                    vm.showHide(type, true);

                    vm.enableFields(false);

                    vm.isEdit = true;
                    vm.isSaveHide = true;
                }, "", false, "");
            }
        }

        /*Row Data change*/
        vm.tableRowUpdate = function(row, data, index, type, cellObj, oTable) {
            if (type === "NewsAnnouncements") {
                if (data.IsPublish != null && data.IsPublish !== undefined && data.IsPublish) {
                    $(row).children().eq(3).html("<a href='javascript:;'>Yes</a>");
                } else {
                    $(row).children().eq(3).html("<a href='javascript:;'>No</a>");
                }
                //if (data.DocumentPath !== null && data.DocumentPath !== "" && data.DocumentPath.length !== 0) {
                //    var applyData = "";
                //    $.map(data.DocumentPath, function (item, index) {
                //        if (item.DocumentPath !== null && item.DocumentPath !== "" && item.DocumentPath.length !== 0) {
                //            var url = uploadBase + item["DocumentPath"].toString();
                //            applyData += "<a href='javascript:;' onclick=\"window.open('" + url + "')\">" + item["DocumentName"].toString() + ";</a>&nbsp;&nbsp;";
                //        }
                //    });
                //    $(row).children().eq(0).html(applyData);
                //} else {
                //    var columnText = $(row).children().eq(0).text();
                //    $(row).children().eq(0).html("<a href='javascript:;'>" + columnText + "</a>");
                //}
            }
        };

        //vm.closePopup = function (modalType, action) {
        //    if (action === "No") {
        //        navcon.closeModal(modalType);
        //    }
        //    else
        //        if (action === "Yes") {
        //            navcon.save.deleteOption(dataservice, type, vm.newsTable, vm.selectedRow, vm.primaryKey, "", function (data) {
        //                //if (callback !== undefined)
        //                //    callback(data === undefined ? false : true);
        //                closeModal('delete');
        //                navcon.closeModal(modalType);
        //                if (data !== undefined)
        //                    logger.success("Entries are deleted successfully...");
        //            });
        //        }
        //}

        //function closeModal(mode) {
        //    if (mode === 'delete') {
        //        clearFields();
        //        $('#Role').removeClass('in');
        //    }
        //    else {
        //        vm.readOnly = true;
        //        vm.showHide('Role');
        //    }
        //}

        //function clearFields() {
        //    roleIdIndex = navcon.getItemIndexByProperty(vm.newsFields, "RoleId");
        //    roleNameIndex = navcon.getItemIndexByProperty(vm.newsFields, "RoleName");
        //    allRightsIndex = navcon.getItemIndexByProperty(vm.newsFields, "AllRights");
        //    projectRoleIndex = navcon.getItemIndexByProperty(vm.newsFields, "ProjectRole");
        //    roleStatusIndex = navcon.getItemIndexByProperty(vm.newsFields, "RoleStatus");
        //    remarksIndex = navcon.getItemIndexByProperty(vm.newsFields, "Remarks");
        //    roleStatusNameIndex = navcon.getItemIndexByProperty(vm.newsFields, "RoleStatusName");

        //    vm.newsFields[roleIdIndex].data = 0;
        //    vm.newsFields[roleNameIndex].data = "";
        //    vm.newsFields[allRightsIndex].data = false;
        //    vm.newsFields[projectRoleIndex].data = "";
        //    vm.newsFields[roleStatusIndex].data = true;
        //    vm.newsFields[remarksIndex].data = "";
        //    vm.newsFields[roleStatusNameIndex].data = "";
        //}


        function getById() {
            if (vm.newsFields.getById !== undefined && vm.newsFields.getById !== null && vm.newsFields.getById.length !== 0) {
                navcon.clearFieldsData(vm.newsFields);

                navcon.updateFieldsData(vm.newsFields, vm.newsFields.getById, vm, false);
            }
        }

        function getServerData(type, rowId) {
            return dataservice.getServerData(type, rowId).then(function(data) {
                return data;
            });
        };

        function activate() {
            getServerData('newsAnnouncementsAll').then(function(data) {
                //navcon.setDisabledEnabledByRights(vm.rights);
                if (data === undefined || data === null || data.length === 0) return;

                vm.newsTable.data = data;
                vm.newsTableData = data;
            });

            watchAttributes();
        };

        function defaultData(data) {
            navcon.save.loadListDefaultData(data, vm.newsFields);
        }

        function watchAttributes() {
            var ITARWarningIndex = navcon.getItemIndexByProperty(vm.newsFields, "ITARWarning");
            $scope.$watch("vm.newsFields[" + ITARWarningIndex + "].data", function(newValue, oldValue) {
                if (newValue) {
                    vm.itarwarning = newValue;
                } else {
                    vm.itarwarning = false;
                }
            }, true);
        }
    }
})();