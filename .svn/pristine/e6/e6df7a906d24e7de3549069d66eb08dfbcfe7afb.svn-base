"use strict";
angular.module('app').directive('navconTab', ['$timeout',
function ($timeout) {
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
            navconData: '=',
            type: '@',
            headers: '='
        },
        templateUrl: function () {
            return navcon.Menuroute.getTemplateUrl("navconTab");
        },
        link: function (scope, el, attrs) {            
            scope.$watch('headers', function (newValue, oldValue) {
                if (newValue !== undefined) {// && (newValue !== oldValue)) {
                    var tabCtrl = $(el.find(".navconTab[type='" + scope.type + "']"));
                    var tTab = tabCtrl.find(".rtabs");
                    var tContainer = tabCtrl.find(".rtab_container");
                    
                    if (tTab.length !== 0) {
                        $.each(newValue, function (i, item) {
                            tTab.append('<li rel="' + scope.type + "_" + item.id + '">' + item.text + '</li>');
                            tContainer.append('<h3 class="rtab_drawer_heading" rel="' + scope.type + "_" + item.id + '">' + item.text + '</h3>');

                            tContainer.find("[content-order='" + item.id + "']")
                                .addClass("rtab_content")
                                .attr("id", scope.type + "_" + item.id)
                                //.attr("type", scope.type)
                                .insertAfter($(tContainer.find("[rel='" + scope.type + "_" + item.id + "']")));
                        });

                        var tContent =tabCtrl.find(".rtab_content");

                        if (tTab.children().length !== 0) {
                            tTab.children().first().addClass("active");

                            tContent.hide();
                            tContent.first().show();

                            /* Extra class "tab_last" to add border to right side of last tab */
                            tTab.children().last().addClass("rtab_last");

                            /* if in tab mode */
                            tabCtrl.find(".rtabs").find("li").click(function () {
                                tContent.hide();
                                var activeTab = $(this).attr("rel");
                                $("#" + activeTab).fadeIn();

                                tTab.find("li").removeClass("active");
                                $(this).addClass("active");

                                tContainer.find(".rtab_drawer_heading").removeClass("d_active");
                                tContainer.find(".rtab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

                                if (scope.navconData.tabClick === undefined) return;
                                scope.navconData.tabClick(this.index(), scope.type, activeTab, this);
                            });

                            /* if in drawer mode */
                            tabCtrl.find(".rtab_container").find(".rtab_drawer_heading").click(function () {
                                tContent.hide();
                                var d_activeTab = $(this).attr("rel");
                                $("#" + d_activeTab).fadeIn();

                                tabCtrl.find(".rtab_container").find(".rtab_drawer_heading").removeClass("d_active");
                                $(this).addClass("d_active");

                                tTab.find("li").removeClass("active");
                                tTab.find("li[rel^='" + d_activeTab + "']").addClass("active");

                                if (scope.navconData.tabClick === undefined) return;
                                scope.navconData.tabClick(this.index(), scope.type, activeTab, this);
                            });
                        }
                    }
                }
            }, true);
        }/*,
        compile: function (element, attrs) {
            $(element).find(".navconTab").attr("type",  attrs.type);
        }*/
    };
}]);