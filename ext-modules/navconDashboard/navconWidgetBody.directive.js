"use strict";

angular.module('navconDashboard').directive('navconWidgetBody', ['$compile', '$modal', 'dataservice', '$rootScope', '$timeout', 'logger',
    function($compile, $modal, dataservice, $rootScope, $timeout, logger) {
        return {
            restrict: 'AE',
            scope: {
                pageConfig: '=',
                item: '=',
                widgets: '='
            },
            //templateUrl: 'ext-modules/navconDashboard/navconWidgetBodyTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconWidgetBody");
            },
            link: function(scope, element, attrs) {
                scope.widgetId = angular.copy(scope.item.widgetId);
                scope.moduleId = angular.copy(scope.item.ModuleId);
                scope.popoverTemplate = angular.copy(scope.item.popoverTemplate);
                scope.options = angular.copy(scope.item.options);

                if (scope.item !== undefined && scope.item.reportSetting !== undefined)
                    scope.reportSetting = angular.copy(scope.item.reportSetting);

                //scope.reportList = [];
                scope.defaultReport = [];

                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };

                if (scope.item !== undefined && scope.item.options !== undefined && scope.item.options.filter) {
                    if (scope.item.reportList !== undefined && scope.item.reportList.length === 0) {
                        getServerData("mySpaceReportList", scope.moduleId).then(function(data) {
                            var reportList = scope.item.reportList;
                            if (data !== undefined && data !== null && data.length != 0) {
                                reportList = data;
                            }
                            scope.reportList = reportList;

                            var defaultReport = scope.reportList[0];
                            if (scope.item.FilterId !== undefined && scope.item.FilterId !== null && scope.item.FilterId !== "") {
                                var keyId = scope.item.FilterKey;
                                var checkValue = scope.item.FilterId.toString();
                                var itemList = navcon.getItemByKeyValue(scope.reportList, keyId, checkValue);
                                defaultReport = itemList;
                            }
                            scope.defaultReport = defaultReport;
                        });
                    } else if (scope.item.reportList !== undefined) {
                        $timeout(function() {
                            scope.reportList = angular.copy(scope.item.reportList);

                            var defaultReport = scope.reportList[0];
                            if (scope.item.FilterId !== undefined && scope.item.FilterId !== null && scope.item.FilterId !== "") {
                                var keyId = scope.item.FilterKey;
                                var checkValue = scope.item.FilterId.toString();
                                var itemList = navcon.getItemByKeyValue(scope.reportList, keyId, checkValue);
                                defaultReport = itemList;
                            }
                            scope.defaultReport = defaultReport;
                        });
                    }
                }

                //var templateData = '"<select class="col-md-8 margin-bottom-10" ng-model="selectedReport" ng-click="onReportClick()" ng-options="x.title for x in items" ng-hide="reportList.length===0"></select>';

                scope.templateSettings = {
                    placement: "left",
                    html: true,
                    title: scope.title,
                    templateHtml: scope.popoverTemplate
                };

                //scope.onReportClick = function (item) {
                //    logger.warning(item);
                //};

                var templage = "<div></div>";
                if (scope.item.template !== undefined && scope.item.template !== "")
                    templage = scope.item.template;
                var newElement = angular.element(templage);
                element.append(newElement);
                $compile(newElement)(scope);

                scope.$on('POPOVER-WIDGET-SETTING', function(ev, popOverScope, data, callback) {
                    if (data !== undefined && scope.widgetId === popOverScope.widgetId) {
                        if (scope.item.FilterKey === undefined || scope.item.FilterKey === null || scope.item.FilterKey === "")
                            scope.item.FilterKey = "ReportCode";

                        scope.item["FilterId"] = data[scope.item.FilterKey];
                        //scope.reportId = data[scope.item.FilterKey];

                        //if (parseInt(data.MySpaceReportId) > 1) {
                        scope.item.title = data.ReportName;
                        scope.item.template = data.Template;
                        //}

                        var newElement = angular.element(scope.item.template);
                        //element.append(newElement);
                        $(element.children()[1]).html(newElement);
                        $compile(newElement)(scope);
                    }

                    //if (callback !== undefined) callback();
                });

                scope.close = function() {
                    $rootScope.$broadcast('DASHBOARD-WIDGET-ACTION', 'delete', function() {
                        var deletedIndex = scope.widgets.indexOf(scope.item);
                        var previousId = scope.item.widgetId;
                        var previousLeft = $(".dashboardWidget_" + scope.item.widgetId).css("left").replace("px", "");
                        var previousTop = $(".dashboardWidget_" + scope.item.widgetId).css("top").replace("px", "");

                        scope.widgets.splice(deletedIndex, 1);

                        //var widgets = [];
                        //angular.forEach(scope.widgets, function (item, key) {
                        //    if (item["userWidgetId"] === undefined) {
                        //        item["userWidgetId"] = 0;
                        //        item["update"] = true;
                        //    }
                        //    widgets.push(item);
                        //});

                        //dataservice.putServerData("Home/Widgets/Update", widgets, "Home/Widgets/Update").then(function (data) {
                        //    $rootScope.dashboardWidgets = scope.widgets;
                        //});

                        scope.saveWidget();

                        $.map(scope.widgets, function(item, index) {
                            if (deletedIndex <= index) {
                                var currentLeft = $(".dashboardWidget_" + item.widgetId).css("left").replace("px", "");
                                var currentTop = $(".dashboardWidget_" + item.widgetId).css("top").replace("px", "");

                                previousId = item.widgetId;

                                if (item.sizeX !== 12 && parseInt(currentLeft) > 0) {
                                    $(".dashboardWidget_" + item.widgetId).css("left", previousLeft + "px");
                                    $(".dashboardWidget_" + item.widgetId).css("top", previousTop + "px");

                                    previousLeft = "";
                                    previousTop = "";
                                } else if (previousTop !== "") {
                                    $(".dashboardWidget_" + item.widgetId).css("top", previousTop + "px");
                                    previousTop = currentTop;
                                } else {
                                    previousLeft = "";
                                    previousTop = "";
                                }
                            }
                        });
                    });
                };

                scope.settings = function() {
                    /*var options = {
                        templateUrl: scope.item.template,
                        controller: scope.item.widgetSettings.controller,
                        resolve: scope.item.widgetSettings.resolve,
                        scope: scope
                    };
                    $modal.open(options);*/
                };
                //scope.settings();
                scope.iconClicked = function() {
                    // empty body.
                    // this function is used by ng-click in the template
                    // so that icon clicks aren't intercepted by widgets
                };

                scope.openSettings = function() {
                    $(".widgetSettings").css("display", "block");
                };

                scope.saveWidget = function() {
                    var widgets = [];
                    angular.forEach(scope.widgets, function(item, key) {
                        if (item["UserWidgetId"] === undefined) {
                            item["UserWidgetId"] = 0;
                            item["update"] = true;
                        }

                        widgets.push(item);
                    });

                    if (widgets.length !== 0) {
                        dataservice.putServerData("mySpaceUpdate", widgets).then(function(data) {
                            //logger.warning("My space data Updated");
                            //$rootScope.dashboardWidgets = scope.widgets;
                        });
                    }
                }
            }
        };
    }
]);