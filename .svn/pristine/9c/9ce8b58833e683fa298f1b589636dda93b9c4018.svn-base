"use strict";
angular.module('app').directive('navconTableEditor', ['dataservice', '$compile', '$window',
    function(dataservice, $compile, $window) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                navconData: '=',
                settings: '=',
                data: '=',
                showDel: '=',
                showAdd: '=',
                showUpdate: '=',
                showoverAllsave: '=',
                showItar: '=',
                showSlno: '=',
                saveButtontext: '='
            },
            //templateUrl: 'ext-modules/navconTableEditor/navconTableEditorTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconTableEditor");
            },
            link: function(scope, el, attrs) {
                if (scope.showSlno === undefined || scope.showSlno === null) scope.showSlno = true;
                scope.row = 1;
                scope.readOnly = false;
                if (scope.navconData != undefined) {
                    if (scope.navconData.readOnly != undefined) {

                        scope.$watch("navconData.readOnly", function(newvalue, oldvalue) {
                            scope.readOnly = newvalue;
                        });

                        scope.readOnly = scope.navconData.readOnly;
                    } else {
                        if (scope.navconData.readonly != undefined) {

                            scope.$watch("navconData.readonly", function(newvalue, oldvalue) {
                                scope.readOnly = newvalue;
                            });
                            scope.readOnly = scope.navconData.readonly;
                        } else {
                            scope.readOnly = false;
                        }
                    }

                }

                if (scope.showDel === undefined)
                    scope.showDel = true;

                if (scope.showAdd === undefined)
                    scope.showAdd = true;

                if (scope.showUpdate === undefined)
                    scope.showUpdate = false;
                if (scope.showoverAllsave === undefined)
                    scope.showoverAllsave = false;
                if (scope.showItar === undefined)
                    scope.showItar = false;
                if (scope.saveButtontext === undefined)
                    scope.saveButtontext = "";

                scope.$watch('settings.fields', function(newValue, oldValue) {

                });

                //scope.$watch('settings.data', function (newValue, oldValue) {
                //    if (newValue !== undefined && newValue !== null && newValue !== "" && newValue.length !== 0) {
                //        scope.data = [];
                //        var obj = {};

                //        obj.fields = angular.copy(scope.settings.fields);

                //        $.map(obj.fields, function (item, index) {
                //            if (newValue[item.key] !== undefined) {
                //                item.data = newValue[item.key];
                //            }
                //        })

                //        obj.fields.sno = 1;

                //        scope.data.push(obj);
                //    }
                //},false);

                var loadExistingData = function() {
                    var row = 1;
                    $.map(scope.settings.data, function(dataItem, index) {
                        var obj = {};
                        obj.fields = angular.copy(scope.settings.fields);

                        $.map(obj.fields, function(item, index) {
                            if (dataItem[item.key] !== undefined) {
                                item.data = dataItem[item.key];
                            }
                        })
                        obj.fields.sno = scope.data.length + 1;
                        scope.data.push(obj);
                        row++;

                    })

                };

                /*Cancel*/
                scope.cancel = function(type) {};

                scope.closeReport = function() {};

                scope.getFieldsData = function(data) {
                    var obj = {};
                    $.map(scope.settings.fields, function(item, index) {
                        if (data[item.key] !== undefined) {
                            item.data = data[item.key];
                        }
                    })
                    return scope.settings.fields;
                }

                scope.assignSno = function() {
                    var sno = 1;
                    $.map(scope.data, function(item, index) {
                        item.fields.sno = sno;
                        sno++;
                    })
                };
                scope.action = {};
                scope.action.addNew = function() {
                    var obj = {};
                    obj.fields = angular.copy(scope.settings.fields);
                    obj.fields.sno = (scope.data.length + 1);
                    scope.data.push(obj);
                    scope.row++;
                    $('[data-toggle="tooltip"]').tooltip();
                };

                scope.action.clear = function() {
                    scope.data = [];
                }

                scope.delete = function(index) {
                    if (scope.data.length > 1) {
                        scope.data.splice(index, 1);
                        scope.assignSno();

                        if (scope.settings.templateOptions !== undefined && scope.settings.templateOptions.type !== undefined && scope.navconData.$parent.tableRowDelete !== undefined)
                            scope.navconData.$parent.tableRowDelete(scope.settings.templateOptions.type);
                    }
                }

                loadExistingData();
                if (scope.data.length < 1)
                    scope.action.addNew();

                if (scope.settings.tableAction !== undefined)
                    scope.settings.tableAction = scope.action;

                scope.save = function(index) {
                    if (scope.settings.templateOptions !== undefined && scope.settings.templateOptions.type !== undefined && scope.navconData.$parent.save !== undefined && scope.navconData.$parent.formManage !== undefined)
                        scope.navconData.$parent.formManage.save(scope.settings.templateOptions.type);

                    //if (scope.formValid()) {
                    //    if (scope.settings.templateOptions !== undefined && scope.settings.templateOptions.type !== undefined && scope.navconData.$parent.save !== undefined)
                    //        scope.navconData.$parent.save(scope.settings.templateOptions.type);
                    //}
                }

                scope.formValid = function() {
                    scope.validate = true;
                    scope.items = scope.settings.fields;

                    if (scope.items === undefined || scope.items.length === undefined || !scope.validate) return true;
                    var retVal = true;
                    for (var i = 0, len = scope.items.length; i < len; i++) {
                        if (scope.items[i].type !== undefined && scope.items[i].type === "tableeditor") continue;
                        if (scope.items[i].form !== undefined && typeof scope.items[i].form === "object") {
                            if (scope.items[i].form.$invalid && !scope.items[i].valid) {
                                scope.items[i].setFocus = false;
                                angular.forEach(scope.items[i].form.$error, function(field) {
                                    angular.forEach(field, function(errorField) {
                                        if (errorField.$name === "form") {} else {
                                            errorField.$setTouched();
                                        }
                                    })
                                });
                                retVal = false;
                                if (scope.items[i].showMessage !== undefined) {
                                    scope.items[i].showMessage = true;
                                    setTimeout(function(n) {
                                        if (scope.items[n].showMessage !== undefined)
                                            scope.items[n].showMessage = false;
                                    }, 6000, i);
                                }
                            }
                        }
                    }
                    return retVal;
                };

            }
        };
    }
]);