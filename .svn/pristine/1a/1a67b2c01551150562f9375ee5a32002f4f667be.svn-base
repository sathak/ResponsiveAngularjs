"use strict";

angular.module('app').directive('navconPagebar', [
    function(dataService) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                breadcrumbs: '='
            },
            //templateUrl: 'ext-modules/navconPagebar/navconPagebarTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconPagebar");
            },
            link: function(scope, el, attrs) {
                //console.log(scope);    
            }
        };
    }
]);