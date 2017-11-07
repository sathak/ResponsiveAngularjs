"use strict";
angular.module('app').directive('navconReportPage', ['dataservice', 'utilities', '$compile', '$window', 'authService', 'ngAuthSettings', '$timeout',
    function(dataservice, utilities, $compile, $window, authService, ngAuthSettings, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                navconData: '=',
                reportCategory: '@'
            },
            //templateUrl: 'ext-modules/navconReport/navconReportPageTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconReportPage");
            },
            link: function(scope, el, attrs) {
                var reportBase = ngAuthSettings.reportBaseUri;
                var defaultImage = "report-preview.png";
                var noRecordImage = "report-preview.png";

                scope.userId = authService.authentication.userId;

                function loadFavorites() {
                    scope.favorites = [];
                    dataservice.getData(scope.reportCategory + "/GetAllReportFavorites/" + scope.userId.toString()).then(function(data) {
                        scope.favorites = data;
                    });
                }

                dataservice.getData(scope.reportCategory + "/GetAllReports").then(function(data) {
                    scope.reports = data;
                });

                scope.favorites = [];
                scope.isSplit = false;
                scope.report = {};
                scope.report.previewImage = reportBase + defaultImage;

                loadFavorites();

                scope.expandCollapse = function(id1, id2, id3) {
                    $timeout(function() {
                        if ($('#' + id1).hasClass("collapsed") && !$('#' + id3).hasClass("in")) {
                            $('#' + id2).addClass("collapsed")
                        } else {
                            $('#' + id2).removeClass("collapsed")
                        }
                    }, 430);
                };

                scope.generate = function() {
                    scope.report.reportFrom = "report";
                    navcon.callPrint(scope.report, scope.rportId, function() {});
                    $('#reportpreview').hide();
                    $('#reportgenerate').show();
                };

                scope.returntoreport = function() {
                    $('#reportpreview').show();
                    $('#reportgenerate').hide();

                };

                scope.compare = function() {
                    if (scope.isSplit)
                        scope.isSplit = false;
                    else
                        scope.isSplit = true;
                }

                $("#myFav ul").children().each(function() {
                    $(this).removeClass('highlight');
                });

                $("#allReports ul").children().each(function() {
                    $(this).removeClass('highlight');
                });


                scope.favoriteClick = function(event) {
                    $(event.currentTarget).toggleClass("glyphicon-star glyphicon-star-empty");
                    if ($(event.currentTarget).hasClass('glyphicon-star-empty'))
                        scope.isFavorite = false;
                    else
                        scope.isFavorite = true;
                    favoriteSave();
                }


                function favoriteSave() {

                    var findObj = navcon.getItemByKeyValue(scope.favorites, "ReportDetailId", scope.rportId);


                    var objectState = 1;
                    var reportFavoriteId = 0;

                    if (findObj !== -1) {
                        objectState = 3;
                        reportFavoriteId = findObj["ReportFavoriteId"];
                    }

                    var saveObj = {
                        "ReportFavoriteId": reportFavoriteId,
                        "ReportCategoryId": scope.reportCategoryId,
                        "ReportDetailId": scope.rportId,
                        "UserId": scope.userId,
                        "ObjectState": objectState
                    };

                    if (objectState == 1) {
                        dataservice.postServerData("", saveObj, false, '', scope.reportCategory + "/CreateReportFavorites/").then(function(data) {
                            loadFavorites();
                        })
                    } else {
                        dataservice.putData("", saveObj, scope.reportCategory + "/UpdateReportFavorites/").then(function(data) {
                            loadFavorites();
                        })
                    }

                }


                scope.reportClick = function(event, report) {

                    var findIndex = navcon.getItemIndexByKeyValue(scope.favorites, "ReportDetailId", report.ReportDetailId);
                    if (findIndex !== -1)
                        scope.isFavorite = true
                    else
                        scope.isFavorite = false;

                    $("#myFav ul").children().each(function() {
                        $(this).removeClass('highlight');
                    });

                    $("#allReports ul").children().each(function() {
                        $(this).removeClass('highlight');
                    });

                    $(event.currentTarget).addClass('highlight');
                    scope.report.export = "false";
                    scope.report.title = report.ReportName;
                    scope.rportId = report.ReportDetailId;
                    scope.reportCategoryId = report.ReportCategoryId;
                    scope.report.source = "";
                    //scope.report.previewImage = "";

                    if (report.PageView !== undefined && report.PageView !== null && report.PageView !== "")
                        scope.report.previewImage = reportBase + report.PageView;
                    else
                        scope.report.previewImage = reportBase + noRecordImage;
                };
            }
        };
    }
]);