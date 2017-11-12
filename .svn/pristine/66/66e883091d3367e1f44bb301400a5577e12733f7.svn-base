"use strict";
angular.module('app').directive('navconMyriskmatrix', ['$rootScope', 'dataservice', '$timeout',
    function($rootScope, dataservice, $timeout) {
        return {
            restrict: 'AE',
            //templateUrl: 'app/dashboard/directives/myriskmatrixTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("myriskmatrixTemplate");
            },
            controller: function($scope) {
                $scope.readOnly = true;
                $scope.navconData = $scope;
                $scope.riskMatrixData = [];

                $scope.title = $scope.item.title.toString();
                $scope.subTitle = $scope.item.subTitle.toString();
                $scope.moduleId = $scope.item.ModuleId;
                $scope.projectId = $scope.item.ProjectId;
                $scope.widgetId = $scope.item.widgetId.toString();
                $scope.reportType = $scope.item.reportType;

                $scope.options = $scope.item.options;

                $scope.reportId = $scope.item.FilterId;
                $scope.FilterKey = $scope.item.FilterKey;

                $scope.filterStart = $scope.item.filterStart;
                $scope.filterEnd = $scope.item.filterEnd;

                $scope.filterParameter = "";
                if ($scope.title.toLowerCase() === "hazard pre-mitigation risk class")
                    $scope.filterParameter = "CauseAnalysis/GetRiskMatrixPrePost/" + $scope.projectId + "/1";
                else if ($scope.title.toLowerCase() === "hazard post mitigation risk class")
                    $scope.filterParameter = "CauseAnalysis/GetRiskMatrixPrePost/" + $scope.projectId + "/2";
                else if ($scope.title.toLowerCase() === "hazard risk matrix aggregation")
                    $scope.filterParameter = "CauseAnalysis/GetRiskMatrixForAggregation/" + $scope.projectId;

                //$scope.report = $scope.item.report;
                //$scope.title = $scope.item.title.toString();
                //$scope.causesCount = $scope.item.data;

                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };

                $scope.$watch('projectId', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "" && $scope.filterParameter !== "") {
                        getRiskMatrix(newValue);
                    }
                }, true);

                //dataservice.getData("RiskMatrix/GetRiskMatrixALL").then(function (data) {
                //    if (data !== undefined && data !== null) {
                //        $scope.riskmatrixTable.data = data;
                //        $scope.readonly = true;
                //    }
                //});

                function getRiskMatrix(projectId) {
                    var severityData = [];
                    var probalilityData = [];
                    // Check whether project has secerity then only risk matrix to be formed

                    //dataservice.getData("CauseAnalysis/GetRiskMatrixPrePost/" + projectId + "/1").then(function (data) {
                    //    var currentData = data;
                    //});

                    dataservice.getData("Severity/GetSeverityByProjectId/" + projectId).then(function(data) {
                        if (data !== undefined && data.length !== 0 && data !== null) {
                            severityData = data;
                            dataservice.getData("CauseDetail/GetProbabilityByProjectId/" + projectId).then(function(data) {
                                if (data === undefined || data.length === 0) {
                                    //logger.warning("Probability Not Yet Assigned to this project !", "", "");
                                    $scope.showRiskMatrixTable = false;
                                    return;
                                } else {
                                    probalilityData = data;
                                    dataservice.getData("RiskClass/GetRiskClassByProjectId/" + projectId).then(function(data) {
                                        if (data !== undefined && data !== null && data.length !== 0) {
                                            $scope.riskClasses = data;
                                        } else {
                                            //logger.warning("Risk Class Not Yet Assigned to this project !", "", "");
                                            $scope.showRiskMatrixTable = false;
                                            return;
                                        }
                                    });
                                }

                                $scope.riskMatrixData = [];
                                //dataservice.getData("CauseAnalysis/GetMappingRiskRegister/" + projectId).then(function (data) {
                                dataservice.getData($scope.filterParameter).then(function(data) {
                                    if (data !== undefined && data !== null && data.length !== 0) {
                                        $scope.riskMatrixData = data;
                                        if (data !== undefined && data[0] !== undefined && data[0].list !== undefined && data[0].list !== null && data[0].list.length !== 0) {
                                            $scope.mode = "update";
                                            $scope.SeverityTable = data[0].list;
                                            $scope.showRiskMatrixTable = true;
                                        } else if (data[0].list !== undefined && data[0].list !== null && data[0].list.length == 0) {
                                            $scope.mode = "save";
                                            var obj = {
                                                "RisClassId": 0,
                                                "RiskMatrixId": 0,
                                                "background": "#ffffff",
                                                "color": "#000000",
                                                "level": "",
                                                "severity": "",
                                                "sid": 0
                                            }

                                            $scope.SeverityTable = [];

                                            $.each($scope.riskMatrixData, function(index, value) {
                                                $.each(severityData, function(key, item) {
                                                    //   console.log(severityData);
                                                    //     obj.severity = item.SeverityName;
                                                    //   obj.sid = item.SeverityId;
                                                    if (index == 0) {
                                                        $scope.SeverityTable.push({
                                                            "RisClassId": 0,
                                                            "RiskMatrixId": 0,
                                                            "background": "#ffffff",
                                                            "color": "#000000",
                                                            "level": "",
                                                            "severity": item.SeverityName,
                                                            "sid": item.SeverityId
                                                        });
                                                    }
                                                    value.list.push({
                                                        "RisClassId": 0,
                                                        "RiskMatrixId": 0,
                                                        "background": "#ffffff",
                                                        "color": "#000000",
                                                        "level": "",
                                                        "severity": item.SeverityName,
                                                        "sid": item.SeverityId
                                                    });

                                                })

                                                $scope.mode = "save";
                                                $scope.showRiskMatrixTable = true;
                                            })

                                        } else {
                                            $scope.mode = "save";

                                            var obj = {
                                                "RisClassId": 0,
                                                "RiskMatrixId": 0,
                                                "background": "#ffffff",
                                                "color": "#000000",
                                                "level": "",
                                                "severity": "",
                                                "sid": 0
                                            }

                                            //severityData
                                            $.map(severityData, function(e) {
                                                if (e["SeverityName"] !== undefined && e["SeverityName"] !== null && e["SeverityName"] !== '') {
                                                    obj.severity = e["SeverityName"];
                                                }

                                                if (e["SeverityId"] !== undefined && e["SeverityId"] !== null && e["SeverityId"] !== '') {
                                                    obj.sid = e["SeverityId"];

                                                    data[0].list.push(obj);
                                                }
                                            });

                                            $scope.SeverityTable = data[0].list;
                                            $scope.showRiskMatrixTable = true;
                                        }
                                    }

                                });
                            });

                            //if ($scope.options.filter !== undefined && $scope.options.filter) {
                            //    //filterStart = filterStart.startOf('month');
                            //    filterSetting();
                            //}
                        }
                    });
                }

                function filterSetting() {
                    //var filterStart = moment().startOf('year');
                    //var filterEnd = moment();
                    $timeout(function() {
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
            link: function(scope, el, attrs) {}
        };
    }
]);