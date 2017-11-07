"use strict";
angular.module('app').directive('navconDropdown', [
function (dataService) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            selectOptions: '=',
            selected:'@',
            items:'@'
        },
        template: '<ui-select ng-model="selected" theme="selectize">' + 
            '<ui-select-match placeholder="{{selectOptions.placeholder}}">{{$select.selected.text}}</ui-select-match>' +
            '<ui-select-choices repeat="item in items ">' +
            '<div ng-bind-html="item.text | highlight: $select.search"></div>' +
            '</ui-select-choices></ui-select> ',
        link: function (scope, el, attrs) {
            scope.items = scope.selectOptions.items;
            //console.log(scope);    
        }
    };
}]);