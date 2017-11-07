"use strict";

angular.module('app').directive('navconPopover', ['dataservice', '$compile', 'logger', '$rootScope', '$timeout',
function (dataservice, $compile, logger, $rootScope, $timeout) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'A',
        transclude: true,
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            widgetId: '=',
            title: '@',
            templateSettings: '=',
            reportData: '=',
            defaultReport: '='
        },
        template: '<span ng-transclude></span>',
        link: function (scope, element, attrs) {
            //scope.selectedReport = scope.defaultReport;

            element.bind('focus', function (e) {
                var popupId = $(element).attr("aria-describedby");
                $('#' + popupId).css('left', '-251px');
                $('#' + popupId).find(".arrow").css('left', '95%');
                $('#' + popupId).show();
            });

            scope.items = [];
            scope.$watch('reportData', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue && newValue.length !== 0) {
                    scope.items = newValue;

                    if (scope.defaultReport == undefined || scope.defaultReport == null || scope.defaultReport === -1) {
                        scope.selectedReport = scope.items[0];
                    } else {
                        scope.selectedReport = scope.defaultReport;
                    }
                }
            }, true);

            var popOverContent;

            scope.$watch('templateSettings', function (newValue, oldValue) {
                if (newValue !== undefined) {

                    if (scope.items) {
                        var html = newValue.templateHtml;
                        popOverContent = $compile(html)(scope);
                    }
                    newValue.content = popOverContent;
                    $(element).popover(newValue);
                }
            });

            scope.$watch('selectedReport', function (newValue, oldValue) {
                if (newValue !== undefined && oldValue !== undefined && newValue.length !== 0 && newValue !== oldValue) {
                    $rootScope.$broadcast('POPOVER-WIDGET-SETTING', scope, angular.fromJson(newValue), function () { });

                    var attr = $(element).attr('aria-describedby');
                    if (typeof attr !== typeof undefined && attr !== "") {
                        $(element).popover("hide");
                    }
                }
            });
        }
    };
}]);