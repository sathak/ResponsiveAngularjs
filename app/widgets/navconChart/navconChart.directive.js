"use strict";
angular.module('app').directive('navconChart', ['$localStorage', 'dataservice', '$timeout', 'logger', '$compile',
    function($localStorage, dataservice, $timeout, logger, $compile) {
        return {
            restrict: 'AE',
            //templateUrl: 'app/widgets/navconChart/navconChartTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconChart");
            },
            controller: function($scope) {
                $scope.parentItem = $scope.item;
                $scope.title = $scope.item.title.toString();
                $scope.subTitle = $scope.item.subTitle.toString();
                $scope.moduleId = $scope.item.ModuleId;
                $scope.projectId = $scope.item.ProjectId;
                $scope.widgetId = $scope.item.widgetId.toString();
                $scope.reportType = $scope.item.reportType;
                $scope.chartData = $scope.item.data;

                $scope.options = $scope.item.options;

                $scope.reportId = $scope.item.FilterId;
                $scope.FilterKey = $scope.item.FilterKey;

                //$scope.filterStart = navcon.dateFormat("10/05/2012", "");
                //$scope.filterStart = moment().startOf('year');
                //$scope.filterEnd = moment();

                $scope.filterStart = $scope.item.filterStart;
                $scope.filterEnd = $scope.item.filterEnd;

                //$scope.$on('POPOVER-WIDGET-SETTING', function (ev, scope, data, callback) {
                //    if (data !== undefined && $scope.widgetId === scope.widgetId) {
                //        $scope.reportId = data[$scope.FilterKey];

                //        loadChartReport();

                //        $scope.item["FilterId"] = data[$scope.FilterKey];
                //        //$scope.saveWidget();
                //    }

                //    //if (callback !== undefined) callback();
                //});

                $scope.saveWidget = function() {
                    var widgets = [];
                    /*angular.forEach($scope.item, function (item, key) {
                        if (item["UserWidgetId"] === undefined) {
                            item["UserWidgetId"] = 0;
                            item["update"] = true;
                        }

                        item["FilterId"] = $scope.reportId;
                        
                    });*/
                    //$scope.item["FilterId"] = $scope.reportId;
                    widgets.push($scope.item);

                    if (widgets.length !== 0) {
                        dataservice.putServerData("mySpaceUpdate", widgets).then(function(data) {
                            //logger.warning("My space data Updated");
                            //$rootScope.dashboardWidgets = scope.widgets;
                        });
                    }
                }

                $scope.data = "";
                var returnData = chartData.getChartData($scope.reportType);
                //$scope.data = returnData;

                $scope.$watch('projectId', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "") {
                        if ($scope.chartData !== undefined && $scope.chartData !== "" && $scope.chartData.length !== 0)
                            loadChartDataReport($scope.reportType.toString(), $scope.chartData);
                        else
                            loadChartReport();
                    }
                }, true);

                function loadChartReport() {
                    if ($scope.reportId === undefined || $scope.reportId === null || $scope.reportId === "") return;
                    if ($scope.moduleId.toLowerCase() === "hazard" && $scope.reportId.toString().toLowerCase().indexOf("sort") > -1) return;
                    if ($scope.moduleId.toLowerCase() === "sort" && $scope.reportId.toString().toLowerCase().indexOf("hazard") > -1) return;

                    cb($scope.filterStart, $scope.filterEnd, "");

                    $scope.data = "";

                    var chartVariables = { "1": "mySpaceColumnReport", "2": "mySpaceDoughnutReport", "3": "mySpaceColumnReport" };
                    //var filterStart = navcon.dateFormat("10/05/2012", "");
                    ////var filterStart = moment();
                    //var filterEnd = moment();

                    var reportType = $scope.reportType.toString();
                    var apiName = chartVariables[reportType];

                    //if ($scope.reportId === undefined || $scope.reportId === null) $scope.reportId = "HazardSummary";
                    $scope.item["FilterId"] = $scope.reportId;

                    var parameterName = "";
                    if (reportType === "1" || reportType === "3")
                        parameterName = $scope.projectId + "/" + $scope.reportId + "/" + navcon.dateFromUTCToLocal($scope.filterStart, "MM-DD-YYYY") + "/" + navcon.dateFromUTCToLocal($scope.filterEnd, "MM-DD-YYYY");
                    else if (reportType === "2")
                        parameterName = $scope.projectId + "/" + $scope.moduleId;

                    //var collectionChartData = angular.copy(returnData);
                    getServerData(apiName, parameterName).then(function(data) {
                        if (data === undefined || data === null || data.length === 0) return;

                        loadChartDataReport(reportType, data);
                    });
                }

                function loadChartDataReport(reportType, data) {
                    if (data !== undefined && data !== null && data.length !== 0) {
                        if (data.title !== undefined && data.title !== null) $scope.title = data.title.toString();
                        if (data.subTitle !== undefined && data.subTitle !== null) $scope.subTitle = data.subTitle.toString();

                        var paletteColorsCollection = "";
                        var dataset = [];

                        if (reportType === "1") {
                            returnData.categories = data.categories;

                            var splColor = returnData.chart.paletteColors.split(",");
                            for (var iSet = 0, iLen = data.dataset.length; iSet < iLen; iSet++) {
                                //var seriesColor = data.dataset[iSet].Color;
                                //paletteColorsCollection += iSet < iLen ? seriesColor + "," : seriesColor;

                                for (var jCat = 0, jLen = data.categories[0].category.length; jCat < jLen; jCat++) {

                                    var toolText = "<div class='chartToolTip' style='text-align: center;vertical-align: middle;'>";
                                    toolText += "<div class='margin-bottom-10' style='font-weight: 600;'>" + data.categories[0].category[jCat].label + "</div>";

                                    for (var iTemp = 0, iTempLen = data.dataset.length; iTemp < iTempLen; iTemp++) {
                                        var seriesColor = splColor[iTemp];
                                        //var seriesColor = data.dataset[iTemp].Color;
                                        if (data.dataset[iTemp].data !== undefined && data.dataset[iTemp].data.length > jCat && data.dataset[iTemp].data[jCat].value !== undefined)
                                            toolText += "<div  class='margin-bottom-5' style='color:" + seriesColor + "'>" + data.dataset[iTemp].seriesname + ": " + data.dataset[iTemp].data[jCat].value + "</div>";
                                    }

                                    toolText += "</div>";
                                    if (data.dataset[iSet].data !== undefined && data.dataset[iSet].data.length > jCat)
                                        data.dataset[iSet].data[jCat].tooltext = toolText;
                                }

                                dataset.push(data.dataset[iSet]);
                            }

                            //returnData.chart.paletteColors = paletteColorsCollection;
                            returnData.dataset = dataset;
                        } else if (reportType === "2") {
                            //returnData.data = data.data;

                            for (var iSet = 0, iLen = data.data.length; iSet < iLen; iSet++) {
                                //data.data[iSet].value = data.data[iSet].Value === "0" ? "1" : data.data[iSet].Value;
                                dataset.push(data.data[iSet]);
                            }

                            if (data !== undefined && data.chart !== undefined && data.chart.paletteColors !== undefined && data.chart.paletteColors !== null)
                                returnData.chart.paletteColors = data.chart.paletteColors

                            returnData.data = dataset;
                        } else if (reportType === "3") {
                            //returnData = collectionChartData;
                        }

                        $scope.data = returnData;

                        if ($scope.options.filter !== undefined && $scope.options.filter) {
                            //filterStart = filterStart.startOf('month');
                            filterSetting();
                        }
                    }
                };

                function loadChartReport1() {
                    if ($scope.reportId === undefined || $scope.reportId === null || $scope.reportId === "") return;
                    if ($scope.moduleId.toLowerCase() === "hazard" && $scope.reportId.toString().toLowerCase().indexOf("sort") > -1) return;
                    if ($scope.moduleId.toLowerCase() === "sort" && $scope.reportId.toString().toLowerCase().indexOf("hazard") > -1) return;

                    cb($scope.filterStart, $scope.filterEnd, "");

                    $scope.data = "";

                    var chartVariables = { "1": "mySpaceColumnReport", "2": "mySpaceDoughnutReport", "3": "mySpaceColumnReport" };
                    //var filterStart = navcon.dateFormat("10/05/2012", "");
                    ////var filterStart = moment();
                    //var filterEnd = moment();

                    var reportType = $scope.reportType.toString();
                    var apiName = chartVariables[reportType];

                    //if ($scope.reportId === undefined || $scope.reportId === null) $scope.reportId = "HazardSummary";
                    $scope.item["FilterId"] = $scope.reportId;

                    var parameterName = "";
                    if (reportType === "1" || reportType === "3")
                        parameterName = $scope.projectId + "/" + $scope.reportId + "/" + navcon.dateFromUTCToLocal($scope.filterStart, "MM-DD-YYYY") + "/" + navcon.dateFromUTCToLocal($scope.filterEnd, "MM-DD-YYYY");
                    else if (reportType === "2")
                        parameterName = $scope.projectId + "/" + $scope.moduleId;

                    //var collectionChartData = angular.copy(returnData);
                    getServerData(apiName, parameterName).then(function(data) {
                        if (data === undefined || data === null || data.length === 0) return;

                        if (data.title !== undefined && data.title !== null) $scope.title = data.title.toString();
                        if (data.subTitle !== undefined && data.subTitle !== null) $scope.subTitle = data.subTitle.toString();

                        var paletteColorsCollection = "";
                        var dataset = [];

                        if (reportType === "1") {
                            returnData.categories = data.categories;

                            var splColor = returnData.chart.paletteColors.split(",");
                            for (var iSet = 0, iLen = data.dataset.length; iSet < iLen; iSet++) {
                                //var seriesColor = data.dataset[iSet].Color;
                                //paletteColorsCollection += iSet < iLen ? seriesColor + "," : seriesColor;

                                for (var jCat = 0, jLen = data.categories[0].category.length; jCat < jLen; jCat++) {

                                    var toolText = "<div class='chartToolTip' style='text-align: center;vertical-align: middle;'>";
                                    toolText += "<div class='margin-bottom-10' style='font-weight: 600;'>" + data.categories[0].category[jCat].label + "</div>";

                                    for (var iTemp = 0, iTempLen = data.dataset.length; iTemp < iTempLen; iTemp++) {
                                        var seriesColor = splColor[iTemp];
                                        //var seriesColor = data.dataset[iTemp].Color;
                                        if (data.dataset[iTemp].data !== undefined && data.dataset[iTemp].data.length > jCat && data.dataset[iTemp].data[jCat].value !== undefined)
                                            toolText += "<div  class='margin-bottom-5' style='color:" + seriesColor + "'>" + data.dataset[iTemp].seriesname + ": " + data.dataset[iTemp].data[jCat].value + "</div>";
                                    }

                                    toolText += "</div>";
                                    if (data.dataset[iSet].data !== undefined && data.dataset[iSet].data.length > jCat)
                                        data.dataset[iSet].data[jCat].tooltext = toolText;
                                }

                                dataset.push(data.dataset[iSet]);
                            }

                            //returnData.chart.paletteColors = paletteColorsCollection;
                            returnData.dataset = dataset;
                        } else if (reportType === "2") {
                            //returnData.data = data.data;

                            for (var iSet = 0, iLen = data.data.length; iSet < iLen; iSet++) {
                                //data.data[iSet].value = data.data[iSet].Value === "0" ? "1" : data.data[iSet].Value;
                                dataset.push(data.data[iSet]);
                            }

                            returnData.data = dataset;
                        } else if (reportType === "3") {
                            //returnData = collectionChartData;
                        }

                        $scope.data = returnData;

                        if ($scope.options.filter !== undefined && $scope.options.filter) {
                            //filterStart = filterStart.startOf('month');
                            filterSetting();
                        }
                    });
                };

                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };

                function filterSetting() {
                    //var filterStart = moment().startOf('year');
                    //var filterEnd = moment();
                    $timeout(function() {
                        //$(".chartToolTip").on("mousemove", function (object, evt) {
                        //    alert(object);
                        //});
                        $('#reportrange_' + $scope.widgetId).daterangepicker({
                            autoUpdateInput: true,
                            showDropdowns: true,
                            timePicker: false,
                            minDate: moment().subtract(280, 'months'),
                            maxDate: moment(),
                            startDate: $scope.filterStart,
                            endDate: $scope.filterEnd,
                            opens: 'left',
                            buttonClasses: ['btn btn-default'],
                            applyClass: 'btn-small btn-primary',
                            cancelClass: 'btn-small',
                            format: navcon.defaultFormat().datetime,
                            separator: ' to ',
                            /*dateLimit: {
                                days: 60
                            },*/
                            ranges: {},
                            locale: {
                                format: navcon.defaultFormat().datetime,
                                applyLabel: 'Submit',
                                cancelLabel: 'Clear',
                                fromLabel: 'From',
                                toLabel: 'To',
                                customRangeLabel: 'Custom',
                                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                firstDay: 1
                            }
                        }, function(start, end, label) {
                            cb(start, end, label);

                            $scope.filterStart = start;
                            $scope.filterEnd = end;
                            loadChartReport();
                        });
                    });
                };

                var cb = function(startDt, endDt, label) {
                    if (startDt !== undefined && endDt !== undefined) {
                        $timeout(function() {
                            $('#reportrange_' + $scope.widgetId + ' span').html(startDt.format(navcon.defaultFormat().dateDisplay) + ' - ' + endDt.format(navcon.defaultFormat().dateDisplay));
                            $scope.chartFilterData = startDt.format(navcon.defaultFormat().dateDisplay) + ' - ' + endDt.format(navcon.defaultFormat().dateDisplay);
                        });
                    }
                };
            },
            link: function($scope, el, attrs) {

                /*$scope.$on('POPOVER-WIDGET-SETTING', function (ev, scope, data, callback) {
                    if (data !== undefined && $scope.widgetId === scope.widgetId) {
                        //scope.item["FilterId"] = data[scope.FilterKey];
                        $scope.reportId = data[$scope.FilterKey];

                        $scope.item = $scope.parentItem;
                        $scope.item.template = "<navcon-myriskmatrix ></navcon-myriskmatrix>";

                        var newElement = angular.element($scope.item.template);
                        el.html(newElement);
                        $compile(newElement)($scope);

                        //loadChartReport();
                                                
                        //$scope.saveWidget();
                    }

                    //if (callback !== undefined) callback();
                });*/
            }
        };
    }
]);