"use strict";
angular.module('app').directive('navconKendoSchedule', ['$timeout',
function ($timeout) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            calendarSetting: '=',
            navconData: '=',
            fields: '=',
            type: '@'
        },
        templateUrl: function () {
            return navcon.Menuroute.getTemplateUrl("navconKendoSchedule");
        },
        link: function (scope, el, attrs) {
            scope.legendView = (scope.calendarSetting.legendView !== undefined ? scope.calendarSetting.legendView : false);

            scope.schedulerPage = {};
            scope.schedulerGroup = {};

            scope.current_page = 1;
            scope.objJson = angular.copy(scope.calendarSetting.resources[0].dataSource);
            //scope.objJson = angular.copy(scope.calendarSetting.events);
            scope.records_per_page = angular.copy(scope.calendarSetting.pageLength !== undefined && scope.calendarSetting.pageLength !== "All" ? scope.calendarSetting.pageLength : scope.objJson.length);

            var objResources = angular.copy(scope.calendarSetting.resources);
            //var objResources = angular.copy(scope.calendarSetting.events);

            $timeout(function () {
                var schedulerPage = $($(el).find('.schedulerPage')[0]);
                $(schedulerPage).kendoDropDownList({
                    //dataTextField: "value",
                    //dataValueField: "value",
                    //filter: "contains",
                    //suggest: true,
                    delay: 8000,
                    dataSource: {
                        type: "odata",
                        data: scope.calendarSetting.lengthMenu
                    },
                    index: $.inArray(scope.calendarSetting.pageLength, scope.calendarSetting.lengthMenu),
                    //change: navcon.kendo.schedule.itemPageChange(el, scope, schedulerPage)
                });

                var schedulerMS = $($(el).find('.schedulerMS')[0]);
                schedulerMS.kendoMultiSelect({
                    delay: 1000, // wait 1 second before clearing the user input
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: {
                        type: "odata",
                        data: scope.calendarSetting.resources[0].dataSource
                    },
                    //value: [$(scheduler).getKendoScheduler().resources[0].dataSource.at(0).value],
                    //change: navcon.kendo.schedule.multiselectChange(el, scheduler, this.value()),
                });

                if (scope.calendarSetting.views.length !== 0)
                    scope.initFunction();
            });

            scope.$watch('schedulerPage.data', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue) {
                    navcon.kendo.schedule.itemPageChange(el, scope, newValue);
                }
            }, true);

            scope.$watch('schedulerGroup.data', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue) {
                    var scheduler = $($(el).find('.kendoSchedule')[0]);
                    navcon.kendo.schedule.multiselectChange(el, scope,scheduler, newValue);
                }
            }, true);

            scope.getPDF = function (selector) {
                kendo.drawing.drawDOM($(selector)).then(function (group) {
                    kendo.drawing.pdf.saveAs(group, scope.type +".pdf");
                });
            }

            scope.multiselectGroup = function () {
                navcon.kendo.schedule.multiselectGroup(el, scope);
            }
            //scope.$watch('calendarSetting', function (newValue, oldValue) {
            //    if (newValue !== undefined && newValue !== oldValue) {
            //        scope.initFunction();
            //    }
            //}, true);

            scope.$watch('calendarSetting.data', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== "") {
                    if (newValue.resources !== undefined) scope.calendarSetting.resources = newValue.resources;
                    if (newValue.events !== undefined) scope.calendarSetting.events = newValue.events;
                }
            }, true);

            // calculate number of pages 
            function numPages() {
                return Math.ceil(scope.objJson.length / scope.records_per_page);
            }

            // go to previous page
            scope.prevPage = function () {
                if (scope.current_page > 1) {
                    scope.current_page--;
                    var x = scope.changePage(scope.current_page);

                    objResources[0].dataSource = [];

                    for (var i = 0; i < x.length; i++) {
                        objResources[0].dataSource.push(x[i]);
                    };

                    navcon.kendo.schedule.setting(el, scope.calendarSetting, scope, { resources: objResources });
                }
            }

            // go to next page
            scope.nextPage = function () {
                if (scope.current_page < numPages()) {
                    scope.current_page++;
                    var x = scope.changePage(scope.current_page);

                    objResources[0].dataSource = [];
                    for (var i = 0; i < x.length; i++) {
                        objResources[0].dataSource.push(x[i]);
                    };

                    navcon.kendo.schedule.setting(el, scope.calendarSetting, scope, { resources: objResources });
                }
            }

            // on click either next/prev what happend to change page
            scope.changePage = function (page) {
                var btn_next = $(".btnNext");
                var btn_prev = $(".btnPrev");
                // var listing_table = document.getElementById("listingTable");
                // var page_span = document.getElementById("page");
                // alert(numPages());
                // Validate page
                if (page < 1) page = 1;
                if (page > numPages()) page = numPages();

                // listing_table.innerHTML = "";

                scope.txt2 = [];
                for (var i = (page - 1) * scope.records_per_page; i < (page * scope.records_per_page) ; i++) {
                    // listing_table.innerHTML += scope.objJson[i].text + "<br>";
                    scope.txt2.push(scope.objJson[i]);
                    // alert(scope.objJson[i]);
                }
                // page_span.innerHTML = page;

                if (page == 1) {
                    $(btn_prev).css({ "visibility": "hidden" });
                } else {
                    $(btn_prev).css({ "visibility": "visible" });
                }

                if (page == numPages()) {
                    $(btn_next).css({ "visibility": "hidden" });
                } else {
                    $(btn_next).css({ "visibility": "visible" });
                }
                return scope.txt2;
            }

            scope.initFunction = function () {
                // console.log($scope.schedulerOptions.dataSource.data);
                // kendo.bind(angular.element("#testItems"), testVM);
                var x = scope.changePage(1);

                objResources[0].dataSource = [];


                for (var i = 0; i < x.length; i++) {
                    objResources[0].dataSource.push(x[i]);
                };
                navcon.kendo.schedule.setting(el, scope.calendarSetting, scope, { resources: objResources });

                //$timeout(function () { scope.$apply(); }, 500);
            }
        }
    };
}]);