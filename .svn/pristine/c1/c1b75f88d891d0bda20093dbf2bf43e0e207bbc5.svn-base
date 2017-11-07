"use strict";

angular.module('app').directive('navconDashboard', ['$localStorage', '$rootScope', 'localStorageService', 'dataservice', 'ngAuthSettings', 'logger', '$timeout', '$location', 'authService',
function ($localStorage, $rootScope, localStorageService, dataservice, ngAuthSettings, logger, $timeout, $location, authService) {
    return {
        restrict: 'AE',
        scope: {
            navconData: '=',
            pageConfig: '='
        },
        template: '<main-dashboard ></main-dashboard>',
        link: function (scope, el, attrs) {
            //el.text(scope.pageConfig);
            scope.isDelete = false;
            scope.isNew = false;

            scope.widgetDefinitions = [];
            scope.widgets = [];
            scope.userProject = [];

            scope.isModuleAvailable = false;
            scope.moduleData = ["Hazard"];
            scope.projectData = [{ "ProjectId": 0, "ProjectName": "" }];
            scope.reportData = [{ "ReportCode": "HazardSummary", "ReportName": "Hazard Summary" }];
            scope.moduleId = "";
            scope.projectId = "";

            var authData = localStorageService.get('authorizationData');
            if (authData != undefined && authData !== null && authData.userId !== null) {
                scope.userId = authData.userId;
                scope.userRights = authData.userRights;
            } else { //if (!_authentication.isAuth) {
                /*authService.authentication.isAuth = false;
                authService.logOut();*/
                $location.path('/login');
                return;
            }

            scope.filterStart = moment().startOf('year');
            scope.filterEnd = moment();

            scope.widgetMainConfig = [
                {
                    title: 'Dashboard Count',
                    settings: {
                        UserWidgetId: 0,
                        ModuleId: scope.moduleId,
                        ProjectId: scope.projectId,
                        widgetId: "1",
                        reportType: -1,
                        FilterId: "-1",
                        sizeX: 12,
                        sizeY: 1,
                        title: 'Dashboard Count',
                        subTitle: "",
                        width: window.screen.availWidth,
                        height: window.screen.availHeight,
                        data: [],
                        template: '<navcon-Mycount ></navcon-Mycount>',
                        configName: scope.moduleId,
                        //reportList: [],
                        options: { filter: false, reportSetting: false, close: false }
                    },
                    configName: "dashboardCount"
                },
                {
                    title: 'Hazard Management Summary',
                    settings: {
                        UserWidgetId: 0,
                        ModuleId: scope.moduleId,
                        ProjectId: scope.projectId,
                        widgetId: "2",
                        reportType: 1,
                        sizeX: 7,
                        sizeY: 4,
                        title: '',
                        subTitle: "Jan 2016 - Sep 2016",
                        width: window.screen.availWidth,
                        height: window.screen.availHeight,
                        //template: '<navcon-myriskmatrix ></navcon-myriskmatrix>',
                        //template: '<navcon-chart ></navcon-chart>',
                        template: '',
                        configName: scope.moduleId,
                        //popoverTemplate: "<select class='col-md-8 margin-bottom-10' ng-model='selectedReport'><option ng-selected='selectedReport.id == item.id' ng-repeat='item in items'>{{item.title}}</option></select>",
                        //popoverTemplate: "<select class='col-md-8 margin-bottom-10' style='width: 90%;' ng-model='selectedReport' ng-options='x.title for x in items'></select>",
                        popoverTemplate: "<select class='col-md-8 margin-bottom-10' style='width: 90%;' ng-model='selectedReport'><option ng-selected='selectedReport.ReportCode == item.ReportCode' ng-repeat='item in items' value={{item}}>{{item.ReportName}}</option></select>",
                        reportList: scope.reportData,
                        FilterKey: "ReportCode",
                        FilterId: "",
                        filterStart: scope.filterStart,
                        filterEnd: scope.filterEnd,
                        options: { filter: true, reportSetting: true, close: false }
                    },
                    configName: "mySapcetrainingsummary"
                },
                {
                    title: 'Risk Class Summary',
                    settings: {
                        UserWidgetId: 0,
                        ModuleId: scope.moduleId,
                        ProjectId: scope.projectId,
                        widgetId: "3",
                        reportType: 2,
                        FilterId: "-1",
                        sizeX: 5,
                        sizeY: 4,
                        title: 'Risk Class Summary',
                        subTitle: "Jan 2016 - Sep 2016",
                        //report: { ReportName: "Hazard Management Summary", source: "", ReportDetailId: "39" },
                        width: window.screen.availWidth,
                        height: window.screen.availHeight,
                        //template: '<navcon-myreport ></navcon-myreport>',
                        //widgetId: "1002",
                        template: '<navcon-chart ></navcon-chart>',
                        configName: scope.moduleId,
                        //reportList: [],
                        options: { filter: false, reportSetting: false, close: false }
                    },
                    configName: "mySapceRiskClassSummary",
                },
                {
                    title: 'Safety Bulletin',
                    settings: {
                        UserWidgetId: 0,
                        ModuleId: scope.moduleId,
                        ProjectId: scope.projectId,
                        widgetId: "5",
                        reportType: -1,
                        FilterId: "-1",
                        sizeX: 12,
                        sizeY: 4,
                        title: 'Safety Bulletin',
                        data: [],
                        width: window.screen.availWidth,
                        height: window.screen.availHeight,
                        template: '<navcon-mysummary ></navcon-mysummary>',
                        configName: scope.moduleId,
                        //reportList: [],
                        options: { filter: false, reportSetting: false, close: false }
                    },
                    configName: "NewsAnnouncements"
                }
            ];

            scope.widgetConfig = [];

            scope.gridsterOpts = {
                columns: 12,
                margins: [10, 10],
                rowHeight: 'match',
                outerMargin: false,
                pushing: true,
                floating: false,
                swapping: false,
                /*maxSizeX: 6, // maximum column width of an item
                maxSizeY: 4, // maximum row height of an item*/
                draggable: {
                    enabled: false,
                    drag: function (event, ui) {

                    },
                    stop: function (event, ui) {
                        if (!scope.isDelete) {
                            scope.saveWidget();
                        }
                        scope.isDelete = false;
                    }
                },
                serialize_params: function ($w, wgd) {
                    console.log('widget' + wgd);
                },
                resizable: {
                    enabled: false,
                    handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                    // optional callback fired when resize is started
                    start: function (event, $element, widget) { },

                    // optional callback fired when item is resized,
                    resize: function (event, $element, widget) {
                    },

                    // optional callback fired when item is finished resizing 
                    stop: function (event, $element, widget) {
                        //$($element).css("height","auto");
                        scope.resize($($element).width(), $($element).height(), widget.widgetId, $($element));

                        var found = navcon.getItemIndexByKeyValue(scope.widgets, "widgetId", widget.widgetId)
                        if (found !== -1) {
                            scope.widgets[found].width = $($element).width();
                            scope.widgets[found].height = $($element).height();

                        }
                        scope.saveWidget();
                    }
                },
            };

            function getServerData(type, rowId) {
                return dataservice.getServerData(type, rowId).then(function (data) {
                    return data;
                });
            };

            scope.myspaceData = [];
            scope.loadData = false;
            function loadAllData(project, module, startDate, endDate, callback) {
                getServerData("myspaceLoadAllReport", project + "/" + module).then(function (data) {

                    var moduleData = angular.copy(scope.moduleData[0]);
                    scope.loadData = true;

                    if (data !== undefined && data !== null && data.length != 0) {
                        //scope.isNew = false;
                        //scope.myspaceData = data;

                        //myprofile
                        try {
                            var userImage = "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";
                            if (data.myProfileGetById !== undefined && data.myProfileGetById !== null && data.myProfileGetById.length !== 0) {
                                if (data.myProfileGetById.img !== undefined && data.myProfileGetById.img !== null && data.myProfileGetById.img !== "")
                                    userImage = data.myProfileGetById.img;
                            }
                            $rootScope.userProfileImage = userImage;
                        } catch (e) { }

                        //Module
                        if (data.MySpaceReportList !== undefined && data.MySpaceReportList !== null && data.MySpaceReportList.length !== 0) {
                            if (module.toString() === "0") {
                                if (data.MySpaceReportList.Modules.length !== 0) {
                                    scope.isModuleAvailable = true;
                                    scope.moduleData = data.MySpaceReportList.Modules;
                                    moduleData = angular.copy(scope.moduleData[0]);
                                    scope.widgetConfig = angular.copy(scope.widgetMainConfig);
                                } else {
                                    scope.isModuleAvailable = false;
                                    scope.widgetConfig = angular.copy(scope.widgetMainConfig);
                                    scope.widgetConfig.splice(0, 3);
                                }
                            } else {
                                moduleData = module;
                            }

                            scope.projectData = data.MySpaceReportList.Projects;

                            if (module.toString() === "0" && data.MySpaceReportList.DefaultModule !== undefined && data.MySpaceReportList.DefaultModule !== null &&
                                data.MySpaceReportList.DefaultModule !== 0 && data.MySpaceReportList.DefaultModule.length !== 0)
                                moduleData = data.MySpaceReportList.DefaultModule;
                        }
                    }

                    scope.userModule = moduleData;
                    scope.moduleId = moduleData;

                    //Project
                    if (project !== undefined && project !== null && project.toString() === "0" && scope.projectData !== undefined && scope.projectData !== null && scope.projectData.length !== 0) {
                        scope.projectId = scope.projectData[0].ProjectId;
                    }

                    if (project !== undefined && project !== null && project.toString() === "0" && data !== undefined && data.MySpaceProjectList.DefaultProject !== undefined && data.MySpaceProjectList.DefaultProject !== null &&
                        data.MySpaceProjectList.DefaultProject !== 0 && data.MySpaceProjectList.DefaultProject !== "") {
                        scope.projectId = data.MySpaceProjectList.DefaultProject;
                        project = data.MySpaceProjectList.DefaultProject;
                    }

                    if (project !== undefined && project !== null && project.toString() !== "0") {//scope.projectId !== 0) {
                        var itemList = navcon.getItemByKeyValue(scope.projectData, "ProjectId", project);// scope.projectId);
                        if (itemList !== undefined && itemList !== null && itemList !== -1)
                            scope.userProject = itemList;
                        else
                            scope.userProject = scope.projectData[0];
                    } else {
                        scope.userProject = scope.projectData[0];
                    }

                    //Load Chart
                    if (data !== undefined && data !== null && data.MySpaceReportListByModule !== undefined && data.MySpaceReportListByModule !== null && data.MySpaceReportListByModule.length !== 0) {
                        scope.reportData = navcon.getItemsFilterByKeyValue(data.MySpaceReportListByModule, "ReportType", scope.moduleId);

                        if (data.MySpaceProjectList !== undefined && data.MySpaceProjectList !== null && data.MySpaceProjectList.length != 0) {
                            if (data.MySpaceProjectList.Widgets !== null && data.MySpaceProjectList.Widgets.length !== 0) {
                                scope.isNew = false;
                                scope.widgetData = data.MySpaceProjectList.Widgets;

                                $.map(data.MySpaceProjectList.Widgets, function (item, index) {
                                    var widgetIndex = -1;

                                    $.grep(scope.widgetConfig, function (e, i) {
                                        if (e.settings.widgetId !== undefined && e.settings.widgetId !== null && item.widgetId !== undefined && item.widgetId !== null) {
                                            if (e.settings.widgetId.toString() === item.widgetId.toString()) {
                                                widgetIndex = i;
                                                return;
                                            }
                                        }
                                    });

                                    if (widgetIndex !== undefined && widgetIndex !== -1 && widgetIndex.length !== 0) {
                                        scope.widgetConfig[widgetIndex].settings.UserWidgetId = item.UserWidgetId;
                                        if (item.template !== undefined && item.template !== null) {
                                            scope.widgetConfig[widgetIndex].settings.template = item.template;
                                            scope.widgetConfig[widgetIndex].settings.title = item.title;
                                        }

                                        if (item.FilterId !== undefined && item.FilterId !== null && scope.widgetConfig[widgetIndex].settings.FilterId !== -1)
                                            scope.widgetConfig[widgetIndex].settings.FilterId = item.FilterId;

                                        scope.widgetConfig[widgetIndex].settings.ModuleId = scope.moduleId;
                                        //scope.widgetConfig[widgetIndex].settings.ModuleId = moduleData;

                                        //scope.widgetConfig[widgetIndex].settings.configName = scope.moduleId;
                                        scope.widgetConfig[widgetIndex].settings.configName = scope.widgetConfig[widgetIndex].configName;

                                        if (scope.projectId !== 0) scope.widgetConfig[widgetIndex].settings.ProjectId = angular.copy(scope.projectId);
                                        //if (project.toString() !== "0") scope.widgetConfig[widgetIndex].settings.ProjectId = angular.copy(project);

                                        if (scope.widgetConfig[widgetIndex].settings.reportList !== undefined && scope.widgetConfig[widgetIndex].settings.reportList !== null
                                            && scope.widgetConfig[widgetIndex].settings.reportList !== "" && scope.widgetConfig[widgetIndex].settings.reportList.length !== 0)
                                            scope.widgetConfig[widgetIndex].settings.reportList = scope.reportData;

                                        if (scope.widgetConfig[widgetIndex].configName === "dashboardCount") {
                                            if (data.MySpaceReportCount.CausesInnerList !== undefined && data.MySpaceReportCount.CausesInnerList.length !== 0)
                                                scope.widgetConfig[widgetIndex].settings.data = data.MySpaceReportCount.CausesInnerList;
                                        } else if (scope.widgetConfig[widgetIndex].configName === "NewsAnnouncements") {
                                            if (data.NewsAnnouncementsEffective !== undefined && data.NewsAnnouncementsEffective.length !== 0)
                                                scope.widgetConfig[widgetIndex].settings.data = data.NewsAnnouncementsEffective;
                                        } else if (scope.widgetConfig[widgetIndex].configName === "mySapcetrainingsummary") {

                                            if (data.MySpaceSummaryReport !== undefined && data.MySpaceSummaryReport.length !== 0) {
                                                scope.widgetConfig[widgetIndex].settings.data = data.MySpaceSummaryReport.data;
                                            } else
                                                scope.widgetConfig[widgetIndex].settings.data = "";

                                            //if (scope.widgetConfig[widgetIndex].settings.template === "") {
                                            if (scope.moduleId.toLowerCase() === "hazard" && (scope.widgetConfig[widgetIndex].settings.FilterId === "" || scope.widgetConfig[widgetIndex].settings.FilterId.toString().toLowerCase().indexOf("sort") > -1)) {
                                                scope.widgetConfig[widgetIndex].settings.FilterId = "HazardSummary";
                                                scope.widgetConfig[widgetIndex].settings.template = "<navcon-chart ></navcon-chart>";
                                                scope.widgetConfig[widgetIndex].settings.title = "SORT Management Summary";
                                            } else if (scope.moduleId.toLowerCase() === "sort" && (scope.widgetConfig[widgetIndex].settings.FilterId === "" || scope.widgetConfig[widgetIndex].settings.FilterId.toString().toLowerCase().indexOf("hazard") > -1)) {
                                                scope.widgetConfig[widgetIndex].settings.FilterId = "SORTSummary";
                                                scope.widgetConfig[widgetIndex].settings.template = "<navcon-chart ></navcon-chart>";
                                                scope.widgetConfig[widgetIndex].settings.title = "SORT Management Summary";
                                            }
                                            //}
                                        } else if (scope.widgetConfig[widgetIndex].configName === "mySapceRiskClassSummary") {
                                            if (data.MySpaceRiskClassSummary !== undefined && data.MySpaceRiskClassSummary.length !== 0) {
                                                //scope.widgetConfig[widgetIndex].settings.data = data.MySpaceRiskClassSummary.data;
                                                scope.widgetConfig[widgetIndex].settings.data = data.MySpaceRiskClassSummary;
                                                scope.widgetConfig[widgetIndex].settings.title = data.MySpaceRiskClassSummary.title;
                                            } else
                                                scope.widgetConfig[widgetIndex].settings.data = "";
                                        }
                                    }

                                });
                            } else if (scope.widgetConfig !== null && scope.widgetConfig.length !== 0) {
                                scope.isNew = true;

                                $.map(scope.widgetConfig, function (item, index) {
                                    item.settings.UserWidgetId = item.UserWidgetId;

                                    if (item.template !== undefined && item.template !== null) {
                                        item.settings.template = item.template;
                                        item.settings.title = item.title;
                                    }

                                    if (item.FilterId !== undefined && item.FilterId !== null && item.FilterId !== -1)
                                        item.settings.FilterId = item.FilterId;
                                    else if (item.settings.FilterId !== -1) {
                                        if (item.settings.FilterId !== undefined && scope.moduleId.toLowerCase() === "hazard" && (item.settings.FilterId === "" || item.settings.FilterId === "SortSummary")) {
                                            item.settings.FilterId = "HazardSummary";
                                            item.settings.template = "<navcon-chart ></navcon-chart>";
                                            item.settings.title = "SORT Management Summary";
                                        } else if (item.settings.FilterId !== undefined && scope.moduleId.toLowerCase() === "sort" && (item.settings.FilterId === "" || item.settings.FilterId === "HazardSummary")) {
                                            item.settings.FilterId = "SORTSummary";
                                            item.settings.template = "<navcon-chart ></navcon-chart>";
                                            item.settings.title = "SORT Management Summary";
                                        }
                                    }

                                    item.settings.ModuleId = scope.moduleId;
                                    //item.settings.ModuleId = moduleData;

                                    //item.settings.configName = scope.moduleId;
                                    item.settings.configName = item.configName;

                                    if (scope.projectId !== 0) item.settings.ProjectId = angular.copy(scope.projectId);
                                    //if (project.toString() !== "0") item.settings.ProjectId = angular.copy(project);
                                });
                            }
                        }
                    }
                    if (callback !== undefined && data !== undefined && data !== null && data.MySpaceProjectList !== undefined && data.MySpaceProjectList !== null)
                        callback(data.MySpaceProjectList.Widgets);

                    widgetSettings();
                });
            }

            function loadModule() {
                getServerData("mySpaceModules").then(function (data) {
                    var moduleData = angular.copy(scope.moduleData[0]);

                    if (data !== undefined && data !== null && data.length != 0) {
                        if (data.Modules.length !== 0) {
                            scope.isModuleAvailable = true;
                            scope.moduleData = data.Modules;
                            moduleData = angular.copy(scope.moduleData[0]);
                            scope.widgetConfig = angular.copy(scope.widgetMainConfig);
                        } else {
                            scope.isModuleAvailable = false;
                            scope.widgetConfig = angular.copy(scope.widgetMainConfig);
                            scope.widgetConfig.splice(0, 3);
                        }

                        scope.projectData = data.Projects;

                        if (data.DefaultModule !== undefined && data.DefaultModule !== null && data.DefaultModule !== 0 && data.DefaultModule.length !== 0)
                            moduleData = data.DefaultModule;
                    }

                    scope.userModule = moduleData;
                });
            }

            scope.$watch('userModule', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue && oldValue !== undefined) {// !scope.loadData) {
                    var scopeUserProject = scope.userProject;
                    scope.userProject = [];
                    scope.projectId = "";
                    scope.moduleId = newValue;

                    $timeout(function () {
                        if (scopeUserProject === undefined && scopeUserProject === null || scopeUserProject === "" || scopeUserProject.length === 0) {
                            scope.userProject = angular.copy(scope.projectData[0]);
                        } else {
                            scope.userProject = scopeUserProject;
                        }
                    });
                }
            }, true);

            scope.$watch('userProject', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue && newValue.length !== 0 && scope.projectId !== newValue.ProjectId && oldValue !== undefined) {// && !scope.loadData) {
                    scope.projectId = newValue.ProjectId;

                    loadAllData(newValue.ProjectId, scope.moduleId, navcon.dateFromUTCToLocal(scope.filterStart, "MM-DD-YYYY"), navcon.dateFromUTCToLocal(scope.filterEnd, "MM-DD-YYYY"),
                        function (data) {
                            scope.isNew = true;
                        });
                }
            }, true);

            scope.$watch('userProject1', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue && newValue.length !== 0 && scope.projectId !== newValue.ProjectId && !scope.loadData) {
                    scope.isNew = true;

                    scope.loadProject(scope.moduleId, newValue.ProjectId, function (projectId, data) {
                        scope.projectId = projectId;

                        scope.moduleId = scope.userModule;
                    });
                }
            }, true);

            //scope.$watch('projectId', function (newValue, oldValue) {
            //    if (newValue !== undefined && newValue !== "" && newValue !== oldValue && !scope.loadData) {
            //        widgetSettings();
            //        //getDashboardReports(data, function (data) {
            //        //    scope.widgetDefinitions = data;
            //        //    widgetSettings();
            //        //})
            //    }
            //}, true);

            scope.loadProject = function (moduleId, projectId, callback) {
                scope.widgetData = [];

                if (projectId === "") projectId = "0";
                if (moduleId === "") moduleId = scope.userModule === "" ? "Hazard" : scope.userModule;

                getServerData("mySpaceProjectList").then(function (data) {
                    if (data !== undefined && data !== null && data.length != 0) {
                        //if (data.Projects !== undefined && data.Projects !== null && data.Projects.length !== 0)
                        //    scope.projectData = data.Projects;

                        if (scope.projectData !== undefined && scope.projectData !== null && scope.projectData.length !== 0 && projectId === "0")
                            projectId = scope.projectData[0].ProjectId;

                        if (data.DefaultProject !== undefined && data.DefaultProject !== null && data.DefaultProject !== 0 && scope.projectId === "")
                            projectId = data.DefaultProject;

                        if (data.DefaultModule !== undefined && data.DefaultModule !== null && data.DefaultModule !== 0 && scope.moduleId === "")
                            moduleId = data.DefaultModule;

                        if (data.Widgets !== null && data.Widgets.length !== 0) {
                            scope.isNew = false;
                            scope.widgetData = data.Widgets;

                            $.map(data.Widgets, function (item, index) {
                                var widgetIndex = -1;

                                $.grep(scope.widgetConfig, function (e, i) {
                                    if (e.settings.widgetId !== undefined && e.settings.widgetId !== null && item.widgetId !== undefined && item.widgetId !== null) {
                                        if (e.settings.widgetId.toString() === item.widgetId.toString()) {
                                            widgetIndex = i;
                                            return;
                                        }
                                    }
                                });

                                if (widgetIndex !== undefined && widgetIndex !== -1 && widgetIndex.length !== 0) {
                                    scope.widgetConfig[widgetIndex].settings.UserWidgetId = item.UserWidgetId;
                                    if (item.template !== undefined && item.template !== null) {
                                        scope.widgetConfig[widgetIndex].settings.template = item.template;
                                        scope.widgetConfig[widgetIndex].settings.title = item.title;
                                    }

                                    if (item.FilterId !== undefined && item.FilterId !== null && scope.widgetConfig[widgetIndex].settings.FilterId !== -1)
                                        scope.widgetConfig[widgetIndex].settings.FilterId = item.FilterId;

                                    //if (scope.widgetConfig[widgetIndex].settings.FilterId !== undefined && moduleId.toLowerCase() === "hazard" && (scope.widgetConfig[widgetIndex].settings.FilterId === "" || scope.widgetConfig[widgetIndex].settings.FilterId === "SortSummary"))
                                    //    scope.widgetConfig[widgetIndex].settings.FilterId = "HazardSummary";
                                    //else if (scope.widgetConfig[widgetIndex].settings.FilterId !== undefined && moduleId.toLowerCase() === "sort" && (scope.widgetConfig[widgetIndex].settings.FilterId === "" || scope.widgetConfig[widgetIndex].settings.FilterId === "HazardSummary"))
                                    //    scope.widgetConfig[widgetIndex].settings.FilterId = "SORTSummary";

                                    scope.widgetConfig[widgetIndex].settings.ModuleId = moduleId;
                                    scope.widgetConfig[widgetIndex].settings.configName = moduleId;

                                    if (projectId !== 0) scope.widgetConfig[widgetIndex].settings.ProjectId = angular.copy(projectId);
                                }

                            });
                        } else if (scope.widgetConfig !== null && scope.widgetConfig.length !== 0) {
                            scope.isNew = true;

                            $.map(scope.widgetConfig, function (item, index) {
                                item.settings.UserWidgetId = item.UserWidgetId;

                                if (item.template !== undefined && item.template !== null) {
                                    item.settings.template = item.template;
                                    item.settings.title = item.title;
                                }

                                if (item.FilterId !== undefined && item.FilterId !== null && item.FilterId !== -1)
                                    item.settings.FilterId = item.FilterId;
                                else if (item.settings.FilterId !== -1) {
                                    if (item.settings.FilterId !== undefined && moduleId.toLowerCase() === "hazard" && (item.settings.FilterId === "" || item.settings.FilterId === "SortSummary")) {
                                        item.settings.FilterId = "HazardSummary";
                                        item.settings.template = "<navcon-chart ></navcon-chart>";
                                        item.settings.title = "SORT Management Summary";
                                    } else if (item.settings.FilterId !== undefined && moduleId.toLowerCase() === "sort" && (item.settings.FilterId === "" || item.settings.FilterId === "HazardSummary")) {
                                        item.settings.FilterId = "SORTSummary";
                                        item.settings.template = "<navcon-chart ></navcon-chart>";
                                        item.settings.title = "SORT Management Summary";
                                    }
                                }

                                item.settings.ModuleId = moduleId;
                                item.settings.configName = moduleId;

                                if (projectId !== 0) item.settings.ProjectId = angular.copy(projectId);
                            });
                        }

                        if (projectId !== 0) {
                            var itemList = navcon.getItemByKeyValue(scope.projectData, "ProjectId", projectId);
                            scope.userProject = itemList;
                        } else {
                            scope.userProject = scope.projectData[0];
                        }

                        if (callback !== undefined) callback(projectId, data);
                    }
                });
            }

            //getDashboardReports(widgetdef, function (data) {
            //    scope.widgetDefinitions = data;
            //})

            function widgetSettings() {
                scope.widgets = [];
                //logger.warning(newValue);

                var widgetSet = [];
                angular.forEach(scope.widgetConfig, function (item, key) {
                    var newWidget = angular.copy(item.settings);
                    widgetSet.push(newWidget);
                    //scope.$broadcast('DASHBOARD-WIDGET-ACTION', 'add');
                });
                scope.widgets = widgetSet;
            }

            scope.saveWidget = function () {
                var widgets = [];

                var scopeWidgets = angular.copy(scope.widgets);
                angular.forEach(scopeWidgets, function (item, key) {
                    if (item.row !== undefined && item.col !== undefined) {
                        if (item["UserWidgetId"] === undefined)
                            item["UserWidgetId"] = 0;
                        item["update"] = true;

                        //item["FilterId"] = scope.defaultReport;

                        widgets.push(item);
                    }
                });

                //$rootScope.dashboardWidgets = widgets;

                if (widgets.length !== 0) {
                    dataservice.putServerData("mySpaceUpdate", widgets).then(function (data) {
                        //$rootScope.dashboardWidgets = scope.widgets;
                        //logger.warning("My space data Updated");
                    });
                }
            }

            scope.$watch('widgets', function (newWidget, oldWidget) {
                if (newWidget !== undefined && newWidget !== oldWidget) {
                    if (scope.isNew && newWidget[0].row !== undefined && newWidget[0].col !== undefined) {
                        scope.saveWidget();
                        scope.isNew = false;
                    } else if (oldWidget !== undefined && newWidget.length > 1 && oldWidget.length > 1 && newWidget[1].FilterId !== undefined && newWidget[1].FilterId !== oldWidget[1].FilterId) { // Second Widget
                        scope.saveWidget();
                    }
                }
            }, true);

            scope.$on('DASHBOARD-WIDGET-ACTION', function (ev, action, callback) {
                if (action !== undefined && action.toLowerCase() === "add") {
                    scope.isNew = true;
                    //scope.saveWidget();
                } else if (action !== undefined && action.toLowerCase() === "delete") {
                    scope.isDelete = true;
                    $rootScope.dashboardDel = true;
                }

                if (callback !== undefined)
                    callback();
            });

            scope.$watch('fetching', function () {
                if (!scope.fetching) {

                }
            });

            scope.resize = function (width, height, id, itemObj) {
                $rootScope.$broadcast('DASHBOARD-RESIZE', width, height, id, itemObj);
            }

            // We want to manually handle `window.resize` event in each directive.
            // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
            // Define event handler
            scope.events = {
                beforeResize: function (e, scope) {
                    setTimeout(function () {
                        scope.api.update()
                    }, 200)
                }
            };

            angular.element(window).on('resize', function (e) {

            });

            // We want to hide the charts until the grid will be created and all widths and heights will be defined.
            // So that use `visible` property in config attribute
            scope.config = {
                visible: false
            };

            function getUserProfile() {
                try {
                    var dataUser = getServerData('userProfileId').then(function (dataUser) {
                        if (dataUser !== undefined && dataUser !== null) {
                            var userImage = dataUser.img;

                            if (dataUser.img === undefined || dataUser.img === null || dataUser.img === "")
                                userImage = "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";

                            $rootScope.userProfileImage = userImage;
                        }
                    });
                } catch (e) { }
            }

            function mScrollbar() {
                if ($(".page-sidebar").hasClass('mCustomScrollbar')) {
                    if ($(".main_menu_side .menuScrollbar").mCustomScrollbar.length !== 0) {
                        //$(".main_menu_side .menuScrollbar").mCustomScrollbar('stop');
                        $(".main_menu_side .menuScrollbar").mCustomScrollbar('destroy');
                    }

                    $(".page-sidebar").mCustomScrollbar({
                        autoHideScrollbar: true,
                        scrollInertia: 0,
                        scrollbarPosition: "outside"
                    });
                }
            }

            setTimeout(function () {
                mScrollbar();

                if ($rootScope.configHeaderMenu !== undefined && $rootScope.configHeaderMenu !== null && $rootScope.configHeaderMenu !== "login") {
                    //getUserProfile();

                    var currentUrl = "";
                    if ($location.$$path !== undefined)
                        currentUrl = $location.$$path.substring(1, $location.$$path.length).toLowerCase();


                    if (scope.$parent !== undefined && scope.$parent !== null
                        && scope.$parent.$parent !== undefined && scope.$parent.$parent !== null
                        && scope.$parent.$parent.menus !== undefined && scope.$parent.$parent.menus !== null) {
                        var allMenus = navcon.getDataFromTree(scope.$parent.$parent.menus, '', 0);
                        var filterMenus = $.grep(allMenus, function (e) {
                            return e.ConfigName !== undefined && e.ConfigName !== null && e.ConfigName !== "";
                        });
                        if (filterMenus.length > 0 && filterMenus[0].ConfigName.toLowerCase() !== "dashboard") {
                            var locationPath = filterMenus[0].ConfigName.toString();
                            $location.path('/' + locationPath);
                            return;
                        } else {
                            loadAllData("0", "0", navcon.dateFromUTCToLocal(scope.filterStart, "MM-DD-YYYY"), navcon.dateFromUTCToLocal(scope.filterEnd, "MM-DD-YYYY"));
                            //loadModule();
                        }
                    } else if (currentUrl.toLowerCase() === "dashboard") {
                        loadAllData("0", "0", navcon.dateFromUTCToLocal(scope.filterStart, "MM-DD-YYYY"), navcon.dateFromUTCToLocal(scope.filterEnd, "MM-DD-YYYY"));
                        //loadModule();
                    }
                }

                scope.config.visible = true;
                if (window.dispatchEvent.length > 0)
                    window.dispatchEvent(new Event('resize'));
            }, 200);

            /*activate(function (widgets) {
                //scope.loadProject();
            });*/

            function getDashboardReports(widgets, callback) {
                var dashboardRights;
                var value = navcon.getItemByKeyValue(scope.userRights, "ConfigName", "dashboard");
                if (value !== -1)
                    dashboardRights = value;
                if (dashboardRights !== undefined && dashboardRights.children.length === 0) return
                var widgetLst = [];
                angular.forEach(dashboardRights.children, function (item, key) {
                    if (item.ConfigName !== undefined) {
                        var widget = widgets.inArray("configName", item.ConfigName);
                        if (widget !== -1) {
                            widgetLst.push(widget);
                        }
                    }
                });
                callback(widgetLst);
            }

            function activate(callback) {
                if (ngAuthSettings.widgetSetting !== undefined && ngAuthSettings.widgetSetting.length !== undefined) {
                    //scope.widgets = ngAuthSettings.widgetSetting;
                    callback(ngAuthSettings.widgetSetting);
                } else {
                    if ($rootScope.dashboardWidgets !== undefined) {
                        //scope.widgets = $rootScope.dashboardWidgets;
                        callback($rootScope.dashboardWidgets);
                        //return;
                    }/*dataservice.getData("Home/Widgets/GetAll").then(function (data) {
                            if (data !== undefined && data.length > 0) {
                                //scope.widgets = data;
                                $rootScope.dashboardWidgets = data;
                                callback(data);
                            } else {
                                callback([]);
                            }
                        });*/
                }
            };
        }
    }
}]);