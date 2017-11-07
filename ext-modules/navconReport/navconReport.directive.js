"use strict";
angular.module('app').directive('navconReport', ['dataservice', 'utilities', '$compile', '$window', '$timeout',
    function(dataservice, utilities, $compile, $window, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                navconData: '=',
                reportSource: '=',
                reportTitle: '=',
                reportId: '@',
                page: '@',
                export: '@',
                reportSetting: '='
            },
            //templateUrl: 'ext-modules/navconReport/navconReportTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconReport");
            },
            link: function(scope, el, attrs) {
                if (scope.reportId === undefined || scope.reportId === null || scope.reportId === "") scope.reportId = "model";
                if (scope.page === undefined || scope.page === null || scope.page === "") scope.page = "no";
                //$(el).find("navcon-modal").attr("id", "reports_" + attrs.type);

                if (scope.export === undefined)
                    scope.export = "false";


                /*scope.$watch('reportSetting.export', function (newValue, oldValue) {
                    if (newValue != undefined && newValue !== "") {
                        scope.export = newValue;
                    }
                }, true);*/


                //el.html('<navcon-modal navcon-data="vm" field-data="" title="" icon="fa fa-flask" footer="" id="reports_' + scope.reportId + '"><div><iframe style="border: transparent;"></iframe></div></navcon-modal>');
                //$compile(el.contents())(scope);

                scope.$watch('reportSource', function(newValue, oldValue) {
                    if (newValue != undefined && newValue !== "") {
                        var frame = el.find('iframe');
                        frame.attr('src', newValue);
                        resizeHtmlDialog(el);
                        navcon.openModal("reports_" + scope.reportId);
                    }
                });


                var resizeHtmlDialog = function(element) {
                    var height = angular.element($window).height() * 0.8;
                    var width = angular.element($window).width() * 0.8;
                    $(el).find('.modal-dialog').css('width', width.toString() + 'px');
                    $(el).find('.modal-dialog').css('height', height.toString() + 'px');
                    var dialog = angular.element('#globalMessageDialog .modal-dialog');
                    var margin = (angular.element($window).height() - dialog.height()) / 2 - parseInt(dialog.css('padding-top'));
                    console.log(margin);
                    var frame = el.find('iframe');
                    if (frame.length) {
                        frame.attr("width", "98%");
                        frame.attr("height", height /* - 100 - parseInt(angular.element('.modal-dialog').css('margin-top')) / 2*/ );

                        $timeout(function() {
                            $(frame[0].contentWindow.document).ready(function() {
                                $(frame[0]).contents().find('head').append('<link href="../Content/navcon-style.css" rel="stylesheet" type="text/css" />');
                            });
                        }, 1200)
                    }
                };

                scope.closeReport = function() {
                    navcon.closeModal("reports_" + scope.reportId);
                };
                scope.cancel = function() {
                    navcon.closeModal("reports_" + scope.reportId);
                }


            }
        };
    }
]);