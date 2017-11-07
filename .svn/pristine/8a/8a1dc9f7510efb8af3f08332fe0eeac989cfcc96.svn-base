"use strict";
angular.module('app').directive('navconKendoTable', ['$timeout',
function ($timeout) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            tableSettings: '=',
            navconData: '=',
            fields: '=',
            type: '@'
        },
        templateUrl: function () {
            return navcon.Menuroute.getTemplateUrl("navconKendoTable");
        },
        link: function (scope, el, attrs) {
            //if (scope.tableSettings.columns.length !== 0)
            //    navcon.kendo.table.setting(el, scope.tableSettings, scope);

            scope.$watch('tableSettings.data', function (newValue, oldValue) {
                if (newValue !== undefined && (newValue !== oldValue || newValue.length === 0)) {
                    if (scope.tableSettings.columns.length !== 0) {
                        //var items = navcon.table.kendo.manageData(scope.tableSettings.columns, scope.tableSettings.data);
                        //navcon.kendo.table.refresh(el, scope.tableSettings, scope);
                        navcon.kendo.table.setting(el, scope.tableSettings, scope);
                    }
                }
            }, true);

            //scope.$watch('tableSettings.columns', function (newValue, oldValue) {
            //    if (newValue !== undefined && newValue !== oldValue) {
            //        if (scope.tableSettings.columns.length !== 0)
            //            navcon.kendo.table.setting(el, scope.tableSettings, scope);
            //    }
            //}, true);            
            
            //$timeout(function () {
            //    el.find(".k-grid-toolbar").insertAfter(el.find(".k-grid-pager").length === 1 ? el.find(".k-grid-pager") : el.find(".k-grid-content"));
            //});
        }
    };
}]);