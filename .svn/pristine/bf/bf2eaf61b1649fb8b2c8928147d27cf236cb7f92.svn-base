"use strict";

angular.module('app').directive('navconDelete', ['dataservice', 'logger',
    function(dataservice, logger) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            replace: true,
            transclude: 'true',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@',
                type: '@',
                id: '@',
                navconData: '=',
                footer: '@',
                icon: '@',
                size: '@',
                delete: '@'
            },
            //templateUrl: 'ext-modules/navconDelete/navconDeleteTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconDelete");
            },
            link: function(scope, el, attrs) {
                $(el).draggable({
                    handle: ".modal-header",
                });

                $(el).attr("id", attrs.type + "delete");

                $(el).addClass(scope.size);

                scope.delete = function(type, typedel) {
                    scope.navconData.tableRowDelete(type, type + 'delete', function(data) {
                        if (data)
                            logger.success("Entries are deleted successfully...", "", "");
                    });
                };
            }
        };
    }
]);