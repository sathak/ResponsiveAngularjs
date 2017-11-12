"use strict";
angular.module('app').directive('navconCalendar', [
function (dataService) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            calendarSetting: '=',
            navconData: '='
        },
        template: '<div type="calendar"></div>',
        link: function (scope, el, attrs) {
            //navcon.calendarSetting(el, scope.calendarSetting);

            scope.$watch('calendarSetting', function (newValue, oldValue) {
                navcon.calendarSetting(el, scope.calendarSetting, scope);
            }, true);

            scope.$watch('calendarSetting.data', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== "") {
                    //if (newValue !== oldValue) {
                    if (newValue.resources !== undefined) scope.calendarSetting.resources = newValue.resources;
                    if (newValue.events !== undefined) scope.calendarSetting.events = newValue.events;
                    //}
                }
            }, true);
        }
    };
}]);