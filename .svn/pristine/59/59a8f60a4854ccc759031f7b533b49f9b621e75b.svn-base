"use strict";
angular.module('app').directive('navconMyreport', ['$rootScope', 'dataservice',
    function($rootScope, dataservice) {
        return {
            restrict: 'E',
            //templateUrl: 'app/dashboard/directives/myreportTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("myreportTemplate");
            },
            controller: function($scope) {
                $scope.navconData = $scope;
                $scope.report = $scope.item.report;
                $scope.title = $scope.item.title.toString()

                //    dataservice.getData($scope.reportCategory+"/GetAllReports").then(function (data) {
                //        $scope.reports = data;
                //    });
                //    $scope.report = {};

                $("#myFav ul").children().each(function() {
                    $(this).removeClass('highlight');
                });

                $("#allReports ul").children().each(function() {
                    $(this).removeClass('highlight');
                });

                //$(event.currentTarget).addClass('highlight');
                //$scope.report.title = $scope.title;
                //$scope.rportId = $scope.report.ReportDetailId;
                //$scope.report.source = "";
                //$scope.report.previewImage = "";

                navcon.callPrint($scope.report, $scope.report.ReportDetailId, function() {

                });

                //    $scope.generate = function(){
                //        navcon.callPrint($scope.report, $scope.rportId, function () {
                //        });
                //        $('#reportpreview').hide();
                //        $('#reportgenerate').show();
                //    };

                //    $scope.returntoreport = function(){
                //        $('#reportpreview').show();
                //        $('#reportgenerate').hide();

                //    };

                //    $scope.compare = function(){
                //        if(scope.isSplit)
                //            $scope.isSplit = false;
                //        else
                //            $scope.isSplit = true;

                //    }

                //    $("#myFav ul").children().each(function () {
                //        $(this).removeClass('highlight');
                //    });
                //    $("#allReports ul").children().each(function () {
                //        $(this).removeClass('highlight');
                //    });

                //    $scope.reportClick = function (event, report) {

                //        $("#myFav ul").children().each(function () {
                //            $(this).removeClass('highlight');
                //        });

                //        $("#allReports ul").children().each(function () {
                //            $(this).removeClass('highlight');
                //        });

                //        $(event.currentTarget).addClass('highlight');
                //        $scope.report.title = report.ReportName;
                //        $scope.rportId = report.ReportDetailId;
                //        $scope.report.source = "";
                //        $scope.report.previewImage = "";
                //    };
            },
            link: function(scope, el, attrs) {}
        };
    }
]);