"use strict";
angular.module('app').directive('navconMysummary', ['$rootScope', 'dataservice', '$timeout', 'ngAuthSettings',
    function($rootScope, dataservice, $timeout, ngAuthSettings) {
        return {
            restrict: 'AE',
            //templateUrl: 'app/dashboard/directives/mysummaryTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("mysummaryTemplate");
            },
            controller: function($scope) {
                $scope.uploadBase = ngAuthSettings.uploadPath;
                $scope.summaryId = $scope.item.widgetId;
                $scope.title = $scope.item.title.toString()
                $scope.subTitle = $scope.item.title.toString()
                $scope.data = $scope.item.data;

                //$scope.data = [];
                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };

                activate();

                function activate() {
                    if ($scope.data.length === 0) {
                        getServerData("mySpaceNews").then(function(data) {
                            if (data === undefined || data.length === 0) return;
                            $scope.data = data;
                        });
                    }
                }
            },
            link: function($scope, el, attrs) {

                $scope.openImage = function(obj) {
                    $scope.NewsTitle = obj.NewsTitle;
                    $scope.CreateDate = obj.CreateDate;
                    $scope.UpdatedByName = obj.UpdatedByName;
                    $scope.Summary = obj.Summary.replace(/\b(https?:\/\/[^\s\(\)\'\"\<\>]+)/ig, "<a ref='nofollow' href='$1' target='_blank'>$1</a>");
                    $scope.Summary = $scope.Summary.replace(/(?:\r\n|\r|\n)/g, '<br />');;
                    $scope.ContentType = obj.ContentType;
                    $scope.documentId = obj.documentId;
                    if ($scope.documentId != "" && $scope.documentId != null) {
                        dataservice.getData('MySpace/GetImageforBulletin/' + obj.documentId).then(function(data) {
                            $scope.Img = $scope.ContentType + data;
                            $('#modalImg').modal('show');
                        });
                    } else {
                        $scope.Img = "";
                        $('#modalImg').modal('show');
                    }


                }


                $scope.$watch('data', function(newValue, oldValue) {
                    if (newValue !== undefined) { //&& newValue !== oldValue) {
                        $timeout(function() {
                            if ($(".dashboardWidget_" + $scope.summaryId + "").length !== 0 && $("[type=mySpaceSummary_" + $scope.summaryId + "]").length !== 0) {
                                var widgetHeight = $(".dashboardWidget_" + $scope.summaryId + "").height();
                                $("[type=mySpaceSummary_" + $scope.summaryId + "]").find(".portlet-body").css({ "overflow": "auto", "height": (widgetHeight - 50) + "px" });
                            }

                            //$.map(newValue, function (item, index) {
                            //    if ($(".summaryRow_" + index + "").length !== 0) {
                            //        if (item.documents !== undefined && item.documents !== null && item.documents.length !== 0) {
                            //            var imageHeight = $(".summaryTemplate-image").width();

                            //            $(".summaryRow_" + index + "").css({ "height": (imageHeight - 30) + "px" });
                            //        }
                            //        else {
                            //            $(".summaryRow_" + index + "").css({ "height": "" });
                            //        }
                            //    }
                            //});

                            $("[type=mySpaceSummary_" + $scope.summaryId + "]").find(".portlet-body").mCustomScrollbar({
                                autoHideScrollbar: true,
                                theme: "3d-dark",
                                scrollInertia: 0,
                                scrollbarPosition: "outside"
                            });
                        });
                    }
                }, true);
            }
        };
    }
]);