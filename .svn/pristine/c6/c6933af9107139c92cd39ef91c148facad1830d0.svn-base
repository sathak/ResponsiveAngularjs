"use strict";

angular.module('app').directive('navconForm', ['dataservice', 'logger', '$timeout', '$compile', '$rootScope',
    function(dataservice, logger, $timeout, $compile, $rootScope) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            replace: true,
            transclude: 'element',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                navconData: '=',
                navconModel: '@',
                items: '=fieldData',
                title: '@',
                icon: '@',
                footer: '@',
                type: '@',
                save: '@',
                cancel: '@',
                approvalKey: '@',
                approvalConfig: '@',
                approvalTitle: '=',
                formName: '@',
                formManage: '=',
                readOnly: '=',
                validate: '@'
            },
            controller: function($scope) {

                this.getFieldItems = function() {
                    return $scope.items;
                }
                this.getFormType = function() {
                    return $scope.type;
                }
                this.getItem = function(item) {
                    return $scope.navconData[item];
                }
                this.getFormName = function(item) {
                    return $scope.form;
                }
                this.getNavconData = function(item) {
                    return $scope.navconData;
                }
                this.getValidate = function() {
                    return $scope.validate;
                }
                this.getFormReadOnly = function() {
                    return $scope.readOnly;
                }
            },
            //templateUrl: 'ext-modules/navconForm/navconFormTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconForm");
            },
            link: function(scope, el, attrs) {
                scope.form = "page";

                if (scope.formManage !== undefined && scope.formManage !== null)
                    scope.manage = scope.formManage
                else
                    scope.manage = {};

                if (scope.validate === undefined)
                    scope.validate = true;

                scope.$watch("readOnly", function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue) {
                        scope.$broadcast('FORM-READONLY', newValue);
                    }
                }, this);

                if (scope.approvalKey !== undefined && scope.approvalKey !== "") {
                    var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.approvalKey);
                    if (keyIndex !== undefined && keyIndex !== -1) {
                        scope.approvalPage = scope.items[keyIndex].page;
                        scope.modalId = scope.items[keyIndex].modalId;
                        scope.itemId = scope.items[keyIndex].itemId;
                        scope.approvalId = scope.items[keyIndex].approvalId;
                        scope.source = scope.items[keyIndex].source;

                        if (scope.items[keyIndex].pageConfig !== undefined && scope.items[keyIndex].pageConfig !== "") {
                            if (scope.approvalConfig !== undefined && scope.approvalConfig !== null && scope.approvalConfig[scope.items[keyIndex].pageConfig] !== undefined && scope.approvalConfig[scope.items[keyIndex].pageConfig] !== null)
                                scope.approvalConfig = scope.approvalConfig[scope.items[keyIndex].pageConfig];
                            else if (scope.navconData !== undefined && scope.navconData !== null && scope.navconData[scope.items[keyIndex].pageConfig] !== undefined && scope.navconData[scope.items[keyIndex].pageConfig] !== null)
                                scope.approvalConfig = scope.navconData[scope.items[keyIndex].pageConfig];
                            else if (scope.$parent.$parent !== undefined && scope.$parent.$parent.navconData !== undefined && scope.$parent.$parent.navconData[scope.items[keyIndex].pageConfig] !== undefined && scope.$parent.$parent.navconData[scope.items[keyIndex].pageConfig] !== null)
                                scope.approvalConfig = scope.$parent.$parent.navconData[scope.items[keyIndex].pageConfig];
                        }

                        var templateData = $($(el).find("script[id ='Approval']")).text();
                        $($(el).find("span[id='Approval']")).html(templateData);
                        $compile($($(el).find("span[id='Approval']")).contents())(scope);
                    }
                }
                scope.manage.cancel = function(type) {
                    /* if(scope.navconData.directive.cancel !== undefined)
                        scope.navconData.directive.cancel(type);
                     else*/

                    //scope.approvalTitle = "";
                    navcon.setViewContentDisabled("");

                    scope.navconData.cancel(type);
                    scope.formReset();
                }

                scope.formReset = function() {
                    if (scope.items === undefined || scope.items.length === undefined) return true;
                    var retVal = true;
                    for (var i = 0, len = scope.items.length; i < len; i++) {
                        if (scope.items[i].form !== undefined) {
                            if (scope.items[i].form.$setPristine !== undefined && typeof scope.items[i].form.$setPristine === "function")
                                scope.items[i].form.$setPristine();

                            if (scope.items[i].form.$setUntouched !== undefined && typeof scope.items[i].form.$setUntouched === "function")
                                scope.items[i].form.$setUntouched();
                        }
                    }
                };

                scope.manage.continue = function(type, page, modal, fieldset) {

                    if (scope.manage.formValid(fieldset)) {
                        scope.navconData.formActions.continue(type, page, modal, fieldset);
                        //  scope.navconData.continue(type, page, modal, fieldset);//, saveCallBack
                    } else {
                        logger.warning("Invalid entries...", "", "");
                    }
                };

                scope.manage.save = function(type, category) {
                    //if (scope.formValid() && tableEditorValid()) {
                    if (category == undefined) {
                        category = scope.items;
                    }
                    if (scope.manage.formValid(category)) {
                        scope.navconData.save(type, category, saveCallBack);

                        function saveCallBack(data) {
                            if (data) {
                                var msg = "Entries are saved successfully...";
                                if (scope.navconData !== undefined && scope.items.mode !== undefined && scope.items.mode === "Update")
                                    msg = "Entries are updated successfully...";
                                if (scope.navconData !== undefined && scope.items.mode !== undefined && scope.items.mode !== "Delete")
                                    logger.success(msg, "", "");
                                // scope.formReset();
                            }
                        }
                    } else {
                        logger.warning("Invalid entries...", "", "");
                    }
                };

                //scope.formValid = function () {
                //    if (scope.items === undefined || scope.items.length === undefined || !scope.validate) return true;
                //    var retVal = true;
                //    for (var i = 0, len = scope.items.length; i < len; i++) {
                //        if (scope.items[i].type !== undefined && scope.items[i].type === "tableeditor") tableEditorValid();
                //        if (scope.items[i].form !== undefined && typeof scope.items[i].form === "object") {
                //            if (scope.items[i].form.$invalid) { //&& !scope.items[i].valid
                //                scope.items[i].setFocus = false;
                //                angular.forEach(scope.items[i].form.$error, function (field) {
                //                    angular.forEach(field, function (errorField) {
                //                        if (errorField.$name === "form") {
                //                        } else {
                //                            errorField.$setTouched();
                //                        }
                //                    })
                //                });
                //                retVal = false;
                //                if (scope.items[i].showMessage !== undefined) {
                //                    scope.items[i].showMessage = true;
                //                    setTimeout(function (n) {
                //                        if (scope.items[n].showMessage !== undefined)
                //                            scope.items[n].showMessage = false;
                //                    }, 6000, i);
                //                }
                //            }
                //        }
                //    }
                //    return retVal;
                //};

                scope.manage.formValid = function(items) {
                    if (items === undefined || items.length === undefined || !scope.validate) return true;
                    var retVal = true;
                    for (var i = 0, len = items.length; i < len; i++) {
                        if (items[i].type !== undefined && items[i].type === "tableeditor") tableEditorValid(items[i]);
                        if (items[i].form !== undefined && typeof items[i].form === "object") {
                            if (items[i].form.$invalid && (items[i].validate === undefined || items[i].validate)) { //&& !items[i].valid
                                var isDraftValidate = false;
                                var isDraft = false;
                                if (scope.navconData !== undefined && scope.navconData.saveStatus !== undefined && scope.navconData.saveStatus === "draft") {
                                    isDraft = true;
                                    if (items[i].templateOptions !== undefined && items[i].templateOptions.draftValidate !== undefined && items[i].templateOptions.draftValidate === true && !items[i].form[items[i].key].$valid) {
                                        retVal = false;
                                        isDraftValidate = true;
                                    }
                                } else {
                                    if (items[i].form[items[i].key] !== undefined && items[i].form[items[i].key].$valid !== undefined) {
                                        if (!items[i].form[items[i].key].$valid)
                                            retVal = false;
                                    } else {
                                        retVal = false;
                                    }
                                }
                                if (isDraft && !isDraftValidate) continue;
                                items[i].setFocus = false;
                                angular.forEach(items[i].form.$error, function(field) {
                                    angular.forEach(field, function(errorField) {
                                        if (errorField.$name === "form") {} else {
                                            errorField.$setTouched();
                                        }
                                    })
                                });
                                if (items[i].showMessage !== undefined) {
                                    items[i].showMessage = true;
                                    setTimeout(function(n) {
                                        if (items[n].showMessage !== undefined)
                                            items[n].showMessage = false;
                                    }, 6000, i);
                                }
                            }
                        }
                    }
                    return retVal;
                };

                //function tableEditorValid() {
                //    if (scope.items === undefined || scope.items.length === undefined) return true;
                //    var retVal = true;
                //    for (var l = 0, len = scope.items.length; l < len; l++) {
                //        if (scope.items[l].type !== undefined && scope.items[l].type === "tableeditor") {
                //            if (scope.items[l].data.length > 0) {
                //                var items = scope.items[l].data[0].fields;
                //                for (var i = 0, len = items.length; i < len; i++) {
                //                    if (items[i].form !== undefined && typeof items[i].form === "object") {
                //                        if (items[i].form.$invalid) {//&& !items[i].valid
                //                            items[i].setFocus = false;
                //                            angular.forEach(items[i].form.$error, function (field) {
                //                                angular.forEach(field, function (errorField) {
                //                                    if (errorField.$name === "form") {
                //                                        //console.log(scope.items[i]);
                //                                    } else {
                //                                        errorField.$setTouched();
                //                                    }
                //                                })
                //                            });
                //                            retVal = false;
                //                            if (items[i].showMessage !== undefined) {
                //                                items[i].showMessage = true;
                //                                setTimeout(function (n) {
                //                                    if (items[n].showMessage !== undefined)
                //                                        items[n].showMessage = false;
                //                                }, 6000, i);
                //                            }
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //    }
                //    return retVal;
                //};


                function tableEditorValid(items) {
                    if (items === undefined) return true;
                    var retVal = true;
                    $.each(items.data, function(index, value) {
                        retVal = scope.manage.formValid(value.fields)
                    })
                    return retVal;
                };
            }
        };
    }
]);