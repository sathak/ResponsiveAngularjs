"use strict";
angular.module('app').directive('navconEvaluation', ['dataservice', 'logger', '$timeout', '$compile',
    function(dataservice, logger, $timeout, $compile) {
        return {
            restrict: 'E',
            scope: {
                optionSettings: '=',
                navconData: '=',
                type: '@',
                templateUrl: '@',
                isExpand: '@'
            },
            //templateUrl: 'ext-modules/navconEvaluation/navconEvaluationTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconEvaluation");
            },
            controller: function($scope) {
                $scope.items = [];
                $scope.textFields = "text";
                $scope.gradeFields = "EfromRatingId";
                $scope.remarksFields = "Remarks";

                $scope.optionData = [];
                $scope.optionId = "id";
                $scope.optionText = "text";

                $scope.toggleCollapse = toggleCollapse;

                $scope.$watch('isExpand', function(newValue, oldValue) {
                    $scope.toggleCollapse($scope.items)
                });

                $scope.$watch('optionSettings', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "") {
                        $scope.textFields = newValue.fieldKey.textField;
                        $scope.gradeFields = newValue.fieldKey.gradeField;
                        $scope.remarksFields = newValue.fieldKey.remarksField;

                        $scope.optionId = newValue.fieldKey.optionField.id;
                        $scope.optionText = newValue.fieldKey.optionField.text;
                        $scope.optionRequired = newValue.fieldKey.optionField.required;
                    }
                });

                $scope.$watch('optionSettings.core.optionData', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "" && newValue.length > 0) {
                        if ($scope.optionSettings !== undefined && $scope.optionSettings !== null)
                            $scope.optionData = newValue;
                    }
                });

                $scope.$watch('optionSettings.core.data', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "" && newValue.length > 0) {
                        $scope.items = addDepthToTree(newValue, 1, $scope.collapsed, $scope);
                    }
                });

                $scope.gradeChange = function(data, item, ctrl) {
                    var ctrlId = item.id;
                    $("#" + ctrlId + "_grade").removeClass("evaluation-mandatory");

                    var remarks = $("#" + ctrlId + "_remarks");
                    if (data.Failure) {
                        item.data.Failure = true;
                        $("#" + ctrlId + "_spnremarks").addClass("evaluation-Remarks-Failure");
                        if (remarks !== undefined && remarks[0].value === "") {
                            logger.warning("Please enter remarks");
                            remarks.addClass("evaluation-Remarks-Failure");
                            remarks.focus();
                        }
                    } else {
                        item.data.Failure = false;
                        $("#" + ctrlId + "_spnremarks").removeClass("evaluation-Remarks-Failure");
                        remarks.removeClass("evaluation-Remarks-Failure");
                    }
                };

                $scope.RemarkChange = function(data, ctrl, ctrlId) {
                    var remarks = $("#" + ctrlId + "_remarks");
                    if (data !== undefined && data != "") {
                        remarks.removeClass("evaluation-Remarks-Failure");
                    } else if (data !== undefined && data == "") {
                        remarks.addClass($("#" + ctrlId + "_spnremarks")[0].className);
                    }
                };

                function toggleCollapse(obj) {
                    for (var key in obj) {
                        if (obj[key] && typeof(obj[key]) == 'object') {
                            obj[key].collapsed = !obj[key].collapsed;
                            toggleCollapse(obj[key])
                        }
                    }
                    return obj
                };

                function addDepthToTree(obj, depth, collapsed, $scope) {
                    for (var key in obj) {
                        if (obj[key] && key === "data" && typeof(obj[key]) == 'object') {
                            var itemList = navcon.getItemByKeyValue($scope.optionData, $scope.optionId, obj[key][$scope.gradeFields]);
                            if (obj.children !== undefined && obj.children !== null)
                                obj[key][$scope.gradeFields] = itemList !== -1 ? itemList : 0;
                            else
                                obj[key][$scope.gradeFields] = itemList !== -1 ? itemList : [];
                        }
                        if (obj[key] && typeof(obj[key]) == 'object') {
                            obj[key].depth = depth;
                            obj[key].collapsed = collapsed;
                            obj[key].Failure = navcon.getItemByKeyValue($scope.optionData, $scope.gradeFields, obj.EFormRatingId).Failure;

                            addDepthToTree(obj[key], key === 'children' ? ++depth : depth, collapsed, $scope)
                        }
                    }
                    return obj
                };
            },
            link: function($scope, el, attrs) {

            },
            compile: function(element, attrs) {
                attrs.templateUrl = attrs.templateUrl ? attrs.templateUrl : 'navconNodeData';
            }
        };
    }
]);