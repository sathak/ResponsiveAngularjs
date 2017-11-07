"use strict";

angular.module('navconDashboard').directive('mainDashboard', ['$rootScope', 'logger', 'dataservice', function($rootScope, logger, dataservice) {
    return {
        restrict: 'AE',
        /*scope: {
            pageConfig: '='
        },*/
        //templateUrl: 'ext-modules/navconDashboard/navconDashboardTemplate.html',
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconDashboard");
        },
        link: function(scope, element, attrs) {
            element.bind('blur', function(e) {
                //do something
                //console.log(e);
            });

            //scope.$watch('projectId', function (newValue, oldValue) {
            //    if (newValue !== undefined && newValue !== oldValue) {
            //        //logger.warning(newValue);
            //    }
            //}, true);

            scope.addNewWidget = function(widget) {
                var newWidget = angular.copy(widget.settings);
                var found = navcon.getItemByKeyValue(scope.widgets, "widgetId", widget.settings.widgetId);
                if (found !== -1) {
                    logger.warning("It's already added!..");
                    return;
                }
                scope.widgets.push(newWidget);
                scope.$broadcast('DASHBOARD-WIDGET-ACTION', 'add');
            };

            scope.close = function() {
                $("#themeset").hide();
                $("#themeclose").hide();
            };

            scope.themeopen = function() {
                $("#themeset").show();
            };

            scope.themechange = function(theme) {
                $('link[href*="flynastheme"]').attr('href', 'content/flynastheme-' + theme + '.css');
                $('img[src*="logo_"]').attr('src', '../../Content/layout/img/logo_' + theme + '.png');
                $("#themeset").hide();
            };

            //Popover template
            scope.$watch('projectId', function(newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue) {
                    scope.popoverTemplate = '<div style="color: black"><select class="col-md-8 margin-bottom-10" ng-model="selectedProject" ng-click="onReportClick()" ng-options="x.ProjectName for x in items" ng-hide="items.length===0"></select></div>';
                    //scope.popoverTemplate = angular.copy(scope.item.popoverTemplate);
                    scope.templateSettings = {
                        placement: "bottom",
                        html: true,
                        title: scope.title,
                        templateHtml: scope.popoverTemplate
                    };
                }
            }, true);

            scope.onClick = function(key, selectedData, e) {
                if (key === "module" && selectedData !== undefined && selectedData !== null && scope.userModule !== selectedData) {
                    scope.userModule = selectedData;
                } else if (key === "project" && selectedData !== undefined && selectedData !== null && scope.userProject !== selectedData) {
                    scope.userProject = selectedData;
                }
            };
        }
    };
}]);