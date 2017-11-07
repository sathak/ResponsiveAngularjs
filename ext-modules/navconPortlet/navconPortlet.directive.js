"use strict";

angular.module('app').directive('navconPortlet', [
    function(dataService) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            replace: true,
            transclude: 'element',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@',
                class: '@',
                navconData: '=',
                toolsDisp: '@',
                icon: '@',
                toolCollapse: '=',
                refresh: '@',
                isTitle: '@',
                subTitle: '@',
                showCaption: '@'
            },
            //templateUrl: 'ext-modules/navconPortlet/navconPortletTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconPortlet");
            },
            link: function(scope, el, attrs) {
                if (scope.showCaption === undefined || scope.showCaption === "") scope.showCaption = 'false';

                if (scope.isTitle === undefined) scope.isTitle = 'true';

                if (scope.toolCollapse !== undefined && scope.toolCollapse === true) {
                    $(el).find(".portlet-body").first().css("display", "none");
                } else {
                    $(el).find(".portlet-body").first().css("display", "block");
                }

                scope.refresh = function(event) {
                    var tableType = $(event.srcElement).parents(".portlet:first").find("table:first").parents('navcon-table:first').attr("type");
                    if (tableType !== undefined && scope.navconData.tableRefresh !== undefined) {
                        scope.navconData.tableRefresh(tableType);
                    }

                    var treeType = $(event.srcElement).parents(".portlet:first").find("div[type='tree']:first").parents('navcon-tree:first').attr("type");

                    if (treeType !== undefined && scope.navconData.treeRefresh !== undefined) {
                        scope.navconData.treeRefresh(treeType);
                    }


                }
                scope.print = function() {
                    if (scope.navconData.print !== undefined)
                        scope.navconData.print();
                }
            }
        };
    }
]);