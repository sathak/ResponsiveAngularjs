"use strict";
angular.module('app').directive('navconKendoTab', ['$timeout',
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
            return navcon.Menuroute.getTemplateUrl("navconKendoTab");
        },
        link: function (scope, el, attrs) {
            scope.$watch('headers', function (newValue, oldValue) {
                if (newValue !== undefined) {// && (newValue !== oldValue)) {
                    var tabCtrl = $(el.find(".kendoTab[type='" + scope.type + "']"));

                    var tTab = $(tabCtrl.find("ul")[0]);
                    var tContainer = tabCtrl.find(".kendotab_container");

                    if (tTab.length !== 0) {
                        $.each(newValue, function (i, item) {
                            tTab.append('<li>' + item.text + '</li>');

                            tContainer.find("div[content-order]").insertAfter(tTab);
                        });

                        var tabStrip = $(tabCtrl).kendoTabStrip({
                            collapsible: false,
                            tabPosition: "top",
                            //animation: false,
                            animation: {
                                open: {
                                    effects: "fadeIn"
                                }
                            },
                            activate: scope.onActivate,
                            contentLoad: scope.onContentLoad,
                            error: scope.onError,
                            select: scope.onSelect,
                            show: scope.onShow
                        }).data("kendoTabStrip");

                        tabStrip.select("li:first");  // Select by jQuery selector
                        //$(tabCtrl).on("click", ".k-button", function () {
                        //    tabStrip.select(1);   // Select by index

                        //    //if (scope.navconData.tabClick === undefined) return;
                        //    //scope.navconData.tabClick(this.index(), scope.type, activeTab, this);
                        //});
                    }
                }
            }, true);

            scope.onActivate = function (e) {
                //var tabCtrl = $(el.find(".kendoTab[type='" + scope.type + "']"));
                //var tTab = $(tabCtrl.find("ul")[0]);
                //var tabStrip = $(tabCtrl).data("kendoTabStrip");

                // access the activated item via e.item (Element)

                // detach activate event handler via unbind()
                //tabStrip.unbind("activate", onActivate);
            };

            scope.onContentLoad = function (e) {
                // access the selected item via e.item (Element)

                // detach contentLoad event handler via unbind()
                //tabStrip.unbind("contentLoad", onError);
            };

            scope.onError = function (e) {
                // access the selected item via e.item (Element)

                // detach error event handler via unbind()
                //tabStrip.unbind("error", onError);
            };

            scope.onSelect = function (e) {
                // access the selected item via e.item (Element)

                // detach select event handler via unbind()
                //tabStrip.unbind("select", onSelect);

                //if (scope.navconData.tabClick === undefined) return;
                //scope.navconData.tabClick(this.index(), scope.type, activeTab, this);
            };

            scope.onShow = function (e) {
                // access the shown item via e.item (Element)

                // detach show event handler via unbind()
                //tabStrip.unbind("show", onShow);
            };
        }
    };
}]);