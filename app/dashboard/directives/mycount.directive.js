"use strict";
angular.module('app').directive('navconMycount', ['$rootScope', 'dataservice', '$timeout',
    function($rootScope, dataservice, $timeout) {
        return {
            restrict: 'AE',
            //templateUrl: 'app/dashboard/directives/mycountTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("mycountTemplate");
            },
            controller: function($scope) {
                $scope.navconData = $scope;
                $scope.moduleId = $scope.item.ModuleId;
                $scope.projectId = $scope.item.ProjectId;
                $scope.report = $scope.item.report;
                $scope.title = $scope.item.title.toString();
                $scope.causesData = $scope.item.data;

                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };

                //$scope.causesData = [];

                $scope.$watch('projectId', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "" && $scope.causesData.length === 0) {
                        getServerData("mySpaceCountReport", newValue + "/" + $scope.moduleId).then(function(data) {
                            if (data !== undefined && data !== null && data.CausesInnerList !== undefined) {
                                $scope.causesData = data.CausesInnerList;

                                //$timeout(function () {
                                //    $('.navcon-dashboard-tile').tooltip();
                                //});
                            }
                        });
                    }
                }, true);

                //getServerData("mySpaceCountReport", $scope.projectId + "/" + $scope.moduleId).then(function (data) {
                //    if (data !== undefined && data !== null && data.CausesInnerList !== undefined) {
                //        $scope.causesData = data.CausesInnerList;
                //    }
                //});
            },
            link: function(scope, el, attrs) {}
        };
    }
]);