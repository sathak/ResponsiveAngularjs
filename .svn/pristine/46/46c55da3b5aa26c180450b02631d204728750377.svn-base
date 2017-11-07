"use strict";
angular.module('app').directive('navconOrgchart', [
function (dataService) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            chartSetting: '=',
            navconData: '=',
            type: '@'
        },
        template: '<div id="orgChartContainer"><div id="orgChart" type="orgChart"></div></div>',
        link: function (scope, el, attrs) {
            //$($(el).find("div[type='chart']")[0]);

            scope.$watch('chartSetting', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== "") {
                    navcon.chartSetting(el, scope.chartSetting, scope);
                }
            }, true);

            scope.$watch('chartSetting.data', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== "") {
                    scope.chartSetting.data = newValue;
                }
            }, true);
        }
    };
}]);