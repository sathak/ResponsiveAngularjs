"use strict";
angular.module('app').directive('compareTo', ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', '$parse',
function ($timeout, dataservice, $compile, $http, $rootScope, $parse) {
    return {
        require: ['^?navconForm', '^ngModel'],
        link: function (scope, element, attrs, ctrl) {
            var field = ctrl[1];
            var model = $parse(attrs.compareTo);

            var compareToField = scope.items[scope.fieldIndex].templateOptions.compareTo;
            if (compareToField === undefined) return;
            scope.compareToField = compareToField;
            var compareBy = scope.items[scope.fieldIndex].templateOptions.compareBy;
            if (compareBy === undefined || compareBy === "") compareBy = "=";

            var compareToFieldIndex = navcon.getItemIndexByProperty(scope.items, scope.compareToField);
            element.bind('blur', function (e) {
                var currentValue = element.val();
                var retValid = compareValidate(scope.items[compareToFieldIndex].data, currentValue, compareBy)
                field.$setValidity("compareTo", retValid);
            });

            scope.$watch("items[" + compareToFieldIndex + "].data", function (value) {
                if (scope.items[scope.fieldIndex].data === "") return;
                var from = value;
                var to = scope.items[scope.fieldIndex].data;
                var retValid = compareValidate(from, to, compareBy)
                field.$setValidity("compareTo", retValid);
            });

            function compareValidate(from, to, compareBy) {
                var validity = true;
                if (compareBy === "<") {
                    validity = (parseInt(to) < parseInt(from) ? false : true);
                } else if (compareBy === ">") {
                    validity = (parseInt(to) > parseInt(from) ? false : true);
                } else if (compareBy === ">=") {
                    validity = (parseInt(to) >= parseInt(from) ? false : true);
                } else if (compareBy === "<=") {
                    validity = (parseInt(to) <= parseInt(from) ? false : true);
                } else if (compareBy === "!=") {
                    validity = (to !== from ? false : true);
                }
                else {
                    validity = (to === from ? false : true);
                }
                return validity;
            }
        }
    };
}]).directive("compareDate", ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', '$parse', function ($timeout, dataservice, $compile, $http, $rootScope, $parse) {
    return {
        require: ['^navconForm', '^ngModel'],
        link: function (scope, element, attrs, ctrl) {
            var field = ctrl[1];
            scope.items = ctrl[0].getFieldItems();

            var model = $parse(attrs.compareDate);

            scope.compareDateTo = scope.items[scope.fieldIndex].templateOptions.compareDateTo;
            scope.compareDateBy = scope.items[scope.fieldIndex].templateOptions.compareDateBy;
            scope.compareDateToday = scope.items[scope.fieldIndex].templateOptions.compareDateToday;

            if (scope.compareDateBy !== undefined && Array.isArray(scope.compareDateBy)) {
                console.log("multiple");
            } else {
                if (scope.compareDateTo === undefined && (scope.compareDateToday === undefined && !scope.compareDateToday)) return;
                if (scope.compareDateBy === undefined) return;
                var compareDateToIndex = navcon.getItemIndexByProperty(scope.items, scope.compareDateTo);
                var compareDateByIndex = navcon.getItemIndexByProperty(scope.items, scope.compareDateBy);
            }

            var getTimeDate = function (value) {
                if (value === undefined) return;
                var today = navcon.dateFormat(moment().format("DD/MM/YYYY"));
                var hrs = value.trim().substr(0, 2);
                var mins = value.trim().substr(3, 2);
                var date = moment(today).add(hrs, 'hours');
                date = moment(date).add(mins, 'minutes');
                return date
            }


            scope.$watch(model, function (value) {
                field.$validate();
                field.$validators.compareDate = function (modelValue) {
                    var fromDate = navcon.dateFormat(modelValue);
                    var toDate;
                    if (scope.compareDateBy !== undefined && Array.isArray(scope.compareDateBy)) {
                        var retValue = true;
                        for (var i = 0, len = scope.compareDateBy.length; i < len; i++) {
                            var item = scope.compareDateBy[i];
                            if (scope.item !== undefined && item.condition !== undefined && item.to !== undefined && item.message !== undefined) {
                                var toIndex = navcon.getItemIndexByProperty(scope.items, item.to);
                                scope.item.templateOptions.compareDateMessage = item.message;
                                if (item.to === "today")
                                    toDate = navcon.dateFormat(moment().format("DD/MM/YYYY"));
                                else if (scope.item !== undefined && scope.item.type !== undefined && scope.item.type === "datetime") {
                                    toDate = getTimeDate(scope.items[toIndex].data);

                                }
                                else
                                    toDate = navcon.dateFormat(scope.items[toIndex].data);
                                fromDate = navcon.dateFormat(modelValue);
                                var retValue = dateValidate(fromDate, toDate, item.condition);
                                if (retValue === false) {
                                    break;
                                }
                            }
                        }
                        var fieldItem = scope.items[scope.fieldIndex];
                        if (fieldItem !== undefined && fieldItem.form !== undefined && fieldItem.form[fieldItem.key] !== undefined && fieldItem.form[fieldItem.key].$setValidity !== undefined && typeof fieldItem.form[fieldItem.key].$setValidity === "function") {
                            $timeout(function () {
                                fieldItem.form[fieldItem.key].$setValidity('compareDate', retValue);
                            })
                        }
                        return retValue;
                    } else {
                        if (scope.compareDateToday !== undefined && scope.compareDateToday)
                            toDate = navcon.dateFormat(moment().format("DD/MM/YYYY"));
                        else if (scope.item !== undefined && scope.item.type !== undefined && scope.item.type === "datetime") {
                            toDate = getTimeDate(scope.items[compareDateToIndex].data);
                            fromDate = getTimeDate(modelValue);
                        }
                        else
                            toDate = navcon.dateFormat(scope.items[compareDateToIndex].data);

                        var retVal = dateValidate(fromDate, toDate, scope.compareDateBy);
                        var fieldItem = scope.items[scope.fieldIndex];
                        if (fieldItem !== undefined && fieldItem.form !== undefined && fieldItem.form[fieldItem.key] !== undefined && fieldItem.form[fieldItem.key].$setValidity !== undefined && typeof fieldItem.form[fieldItem.key].$setValidity === "function") {
                            $timeout(function () {
                                if (fieldItem.form[fieldItem.key] != undefined)
                                    fieldItem.form[fieldItem.key].$setValidity('compareDate', retVal);
                            })
                        }
                        return retVal;
                    }
                }
            });

            scope.$watch("items[" + compareDateToIndex + "].data", function (value) {
                if (scope.items[scope.fieldIndex].data === undefined || scope.items[scope.fieldIndex].data === "") return;
                var fromDate = navcon.dateFormat(scope.items[scope.fieldIndex].data);
                var toDate = navcon.dateFormat(value);
                if (scope.item !== undefined && scope.item.type !== undefined && scope.item.type === "datetime") {
                    toDate = getTimeDate(value);
                    fromDate = getTimeDate(scope.items[scope.fieldIndex].data);
                }
                field.$setValidity("compareDate", dateValidate(fromDate, toDate, scope.compareDateBy));
            });

            function dateValidate(fromDate, toDate, compareDateBy) {
                var validity = true;
                if (fromDate._i !== undefined && fromDate._i === "") return validity;
                if (compareDateBy === "<") {
                    validity = (moment(fromDate).isBefore(toDate) ? false : true);
                } else if (compareDateBy === ">") {
                    validity = (moment(fromDate).isAfter(toDate) ? false : true);
                } else if (compareDateBy === "today") {
                    validity = (moment().diff(fromDate, 'day') > 0 ? false : true);
                } else if (compareDateBy === "<=") {
                    validity = (moment(fromDate).isSame(toDate) || moment(fromDate).isBefore(toDate)) ? false : true;
                } else if (compareDateBy === ">=") {
                    validity = (moment(fromDate).isSame(toDate) || moment(fromDate).isAfter(toDate)) ? false : true;
                }
                else {

                }
                return validity;
            }

        }
    };
}]).directive("isExist", ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', '$parse', function ($timeout, dataservice, $compile, $http, $rootScope, $parse) {
    return {
        require: ['^navconForm', '^ngModel'],
        link: function (scope, element, attrs, ctrl) {
            element.bind('blur', function (e) {
                var field = ctrl[1];

                if (ctrl[0] !== null) {
                    scope.items = ctrl[0].getFieldItems();
                } else {
                    if (scope.fieldData !== undefined)
                        scope.items = scope.fieldData;
                }

                var model = $parse(attrs.IsExist);
                var currentValue = element.val();
                scope.IsExistKey = scope.items[scope.fieldIndex].key;
                scope.IsExistData = scope.items[scope.fieldIndex].templateOptions.isExistData;
                scope.IsExistTreeId = scope.items[scope.fieldIndex].templateOptions.isExistTreeId;

                if (scope.items[scope.fieldIndex].templateOptions.dependFieldKey !== undefined && scope.items[scope.fieldIndex].templateOptions.dependFieldKey !== "")
                    scope.dependFieldKey = scope.items[scope.fieldIndex].templateOptions.dependFieldKey;

                if (scope.IsExistKey === undefined) return;
                if (scope.IsExistData === undefined) return;
                if (currentValue === undefined || currentValue === "") return true;

                scope.data = ctrl[0].getItem((scope.IsExistData));

                if (scope.items.getById !== undefined && scope.items.getById !== null && (scope.data === undefined || scope.data === null)) scope.data = scope.items.getById;
                if (scope.IsExistTreeId !== undefined) {
                    var parent = ctrl[0].getItem((scope.IsExistTreeId));
                    if (parent.parent !== undefined && parent.parent !== "" && parent.parent !== "0") {// && parent.parent !== "#")
                        if (parent.parent === "#")
                            var childData = scope.data;
                        else
                            //var childData = navcon.getTreeDataById(scope.data, parent.parent, "child");
                            var childData = navcon.getTreeDataById(scope.data, parent.id, "child");
                    }
                    if (childData !== undefined && childData !== null) scope.data = childData;
                }

                var retVal = true;
                var oldSDataValue = "";


                if (scope.items[scope.fieldIndex].type == "number") {
                    currentValue = parseInt(currentValue.toString().trim());
                    if (scope.items[scope.fieldIndex].oldData == undefined || scope.items[scope.fieldIndex].oldData == null || scope.items[scope.fieldIndex].oldData == "") {
                        oldSDataValue = 0;
                    }
                    else
                        oldSDataValue = parseInt(scope.items[scope.fieldIndex].oldData);
                }
                else {
                    currentValue = currentValue.toString().toLowerCase().trim();
                    if (scope.items[scope.fieldIndex].oldData == undefined || scope.items[scope.fieldIndex].oldData == null || scope.items[scope.fieldIndex].oldData == "")
                        oldSDataValue = "";
                    else
                        oldSDataValue = scope.items[scope.fieldIndex].oldData.toString().toLowerCase().trim();
                }


                if (scope.items.mode !== undefined && scope.items.mode.toLowerCase() !== 'save' && currentValue === oldSDataValue) {
                    retVal = true;
                } else {
                    if (scope.dependFieldKey !== undefined && scope.dependFieldKey !== "") {
                        var dependFieldKeyIndex = navcon.getItemIndexByProperty(scope.items, scope.dependFieldKey);
                        if (dependFieldKeyIndex !== -1) {
                            var dependItem = scope.items[dependFieldKeyIndex];
                            var dependData = dependItem.data;
                            if (dependItem.type === "select") {
                                var selectedData = (dependItem.data[dependItem.selectOptions.item.dataField] || dependItem.data.Id || dependItem.data.id);
                                dependData = (selectedData !== undefined && selectedData !== "" ? selectedData : null);
                            }
                            var obj = {}

                            if (scope.items[scope.fieldIndex].type == "number")
                                obj[scope.IsExistKey] = parseInt(currentValue.toString().trim());
                            else
                                obj[scope.IsExistKey] = currentValue.toString().trim();


                            obj[scope.dependFieldKey] = dependData;

                            retVal = navcon.getItemsFilterByObject(scope.data, obj);

                            if (retVal !== undefined && retVal.length > 0)
                                retVal = false;
                            else
                                retVal = true;
                        }
                    } else {
                        var _currentValue = '';

                        if (scope.items[scope.fieldIndex].type == "number") {
                            _currentValue = parseInt(currentValue.toString().trim());
                            retVal = navcon.getItemByKeyValue(scope.data, scope.IsExistKey, _currentValue);
                        }
                        else {
                            _currentValue = currentValue.toString().trim();
                            retVal = navcon.getItemByKeyValue(scope.data, scope.IsExistKey, _currentValue.toLowerCase(), true);
                        }


                        if (retVal !== -1)
                            retVal = false;
                        else
                            retVal = true;
                    }

                }
                field.$setValidity('isExist', retVal);
            })
        }
    };
}]).directive("checkRequired", ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', '$parse', function ($timeout, dataservice, $compile, $http, $rootScope, $parse) {
    return {
        require: ['^?navconForm', '^ngModel'],
        link: function (scope, element, attrs, ctrl) {
            var ngModel = ctrl[1];
            if (ctrl[0] !== null) {
                scope.items = ctrl[0].getFieldItems();
            } else {
                if (scope.fieldData !== undefined)
                    scope.items = scope.fieldData;
            }
            ngModel.$validators.checkRequired = function (modelValue, viewValue) {
                var required = scope.items[scope.fieldIndex].templateOptions.required || false;
                var value = modelValue || viewValue;
                var match = scope.$eval(attrs.ngTrueValue) || true;
                if (required === false || required === 'no' || value === match)
                    return true;
                else
                    return false;
            };
        }
    }
}]).directive("fieldRequired", ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', '$parse', function ($timeout, dataservice, $compile, $http, $rootScope, $parse) {
    return {
        require: ['^?navconForm', '^ngModel'],
        link: function (scope, element, attrs, ctrl) {
            var ngModel = ctrl[1];
            if (ctrl[0] !== null) {
                scope.items = ctrl[0].getFieldItems();
            } else {
                if (scope.fieldData !== undefined)
                    scope.items = scope.fieldData;
            }
            ngModel.$validators.fieldRequired = function (modelValue, viewValue) {
                var required = scope.items[scope.fieldIndex == undefined ? scope.$parent.fieldIndex : scope.fieldIndex].templateOptions.required || false;
                var value = modelValue || viewValue;
              //  if (scope.item !== undefined && scope.item.data !== undefined && scope.item.data !== null) value = scope.item.data;

                if ((required === true || required === 'yes') && (value === undefined || value.length === 0))
                    return false;
                else
                    return true;
            };
        }
    }
}]);