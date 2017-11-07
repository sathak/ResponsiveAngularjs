"use strict";

angular.module('app').directive('navconModal', ['dataservice', 'logger',
    function(dataservice, logger) {
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
                title: '@',
                icon: '@',
                footer: '@',
                type: '@id',
                size: '@',
                save: '@',
                formValid: '@',
                fieldData: '=',
                cancel: '@',
                overflow: '@'
            },
            //templateUrl: 'ext-modules/navconModal/navconModalTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconModal");
            },
            link: function(scope, el, attrs) {


                scope.fields = {};

                scope.cancel = function(type) {
                    navcon.setViewContentDisabled("");

                    if (scope.navconData !== undefined && scope.navconData.cancel !== undefined)
                        scope.navconData.cancel(type);

                    scope.formReset();
                }

                scope.formReset = function() {
                    if (scope.fieldData === undefined || scope.fieldData.length === undefined) return true;
                    var retVal = true;
                    for (var i = 0, len = scope.fieldData.length; i < len; i++) {
                        if (scope.fieldData[i].form !== undefined) {
                            if (scope.fieldData[i].form.$setPristine !== undefined && typeof scope.fieldData[i].form.$setPristine === "function")
                                scope.fieldData[i].form.$setPristine();

                            if (scope.fieldData[i].form.$setUntouched !== undefined && typeof scope.fieldData[i].form.$setUntouched === "function")
                                scope.fieldData[i].form.$setUntouched();
                        }
                    }
                };


                scope.save = function(type) {
                    if (scope.formValid()) {
                        scope.navconData.save(type);
                        var msg = "Entries are saved successfully...";
                        if (scope.navconData !== undefined && scope.navconData.mode !== undefined && scope.navconData.mode === "Update")
                            msg = "Entries are updated successfully...";

                        if (scope.navconData !== undefined && scope.navconData.mode !== undefined && scope.navconData.mode !== "Delete")
                            logger.success(msg, "", "");
                    } else {
                        logger.warning("Invalid entries...", "", "");
                    }
                };

                scope.formValid = function() {
                    if (scope.fieldData === undefined || scope.fieldData.length === undefined) return true;
                    var retVal = true;
                    for (var i = 0, len = scope.fieldData.length; i < len; i++) {
                        if (scope.fieldData[i].valid !== undefined && scope.fieldData[i].valid === false) {
                            return false;
                            break;
                        }
                    }
                    return retVal;
                };

                $(el).draggable({
                    handle: ".content",
                    cancel: ".modal-body"
                });

                $(el).addClass(scope.size);

                $(el).on('shown.bs.modal', function(event) {
                    if (scope.overflow !== undefined && scope.overflow === 'hide') {
                        $($(event.target).find('div')[0]).css("overflow", "hidden");
                    }
                    //$($(event.target).find("div[type='calendar']")).fullCalendar('render');
                });
            }
        };
    }
]);