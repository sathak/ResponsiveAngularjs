"use strict";
angular.module('app').directive('navconKendoTree', ['$timeout',
function ($timeout) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            treeSettings: '=',
            navconData: '=',
            fields: '=',
            type: '@'
        },
        templateUrl: function () {
            return navcon.Menuroute.getTemplateUrl("navconKendoTree");
        },
        link: function (scope, el, attrs) {
            //var objEl = $(el);

            //if (scope.isExpand === undefined) {
            //    scope.isExpand = false;
            //}
            //scope.typeText = 'Collapsed'

            scope.$watch('treeSettings.data', function (newValue, oldValue) {
                if (newValue !== undefined && (newValue !== oldValue)){// || newValue.length === 0)) {
                    if (scope.treeSettings.columns.length !== 0) {
                        navcon.kendo.tree.setting(el, scope.treeSettings, scope);
                    }
                }
            }, true);
        }
    };
}]);