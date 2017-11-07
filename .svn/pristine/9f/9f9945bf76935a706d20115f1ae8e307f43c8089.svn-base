/// <reference path="../page1/page1.html" />
"use strict";
angular.module('app').directive('navconDeleteRemarks', ['$rootScope', 'dataservice',
    function($rootScope, dataservice) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
             A: Directive applied as an attribute on existing element. <div navcon-table></div>
             C: Directive applied as a css class to existing element <div class="navcon-table"></div>
             M: Directive applied as comment.*/
            restrict: 'E',
            transclude: true,
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                navconData: '='
            },
            controller: function($scope, $rootScope) {
                $scope.formManage = {};
                $scope.pageConfig = {};

                var ITARWarningIndex;

                $scope.itarwarning = false;
                /*Page Actions*/
                activate();

                /*Fields*/
                // $scope.deleteRemarksSubmitFields = $scope.navconData.deleteRemarksSubmitFields;
                /*Tables*/


                /*breadcrumbs*/
                /*Variable Declaration*/
                /*Variable Declaration*/
                /*Page Actions*/
                /*Add New*/
                /*Table Action Click*/
                /*Delete*/
                /*Table Actions*/

                /*Privat functions*/
                function getData(type, page) {
                    return dataservice.getData(type, page).then(function(data) {
                        return data;
                    });
                };

                function getServerData(type, rowId) {
                    return dataservice.getServerData(type, rowId).then(function(data) {
                        return data;
                    });
                };


                $scope.save = function(type, fields) {
                    var fieldCondition = $scope.formManage.formValid(fields);
                    if (fieldCondition != undefined && fieldCondition == true) {
                        $scope.navconData.deleteWithRemarks(fields);
                        navcon.clearFieldsData($scope.deleteRemarksSubmitFields);
                    }
                };

                $scope.cancel = function(type) {
                    //$scope.navconData.cancel(type);
                    navcon.clearFieldsData($scope.deleteRemarksSubmitFields);
                    navcon.closeModal(type);
                };

                function getFields() {


                }

                function activate(callback) {

                    dataservice.getServerData("deleteConfig").then(function(data) {
                        $scope.pageConfig = data;
                        $scope.deleteRemarksSubmitFields = angular.copy(data.fields.deleteRemarksSubmitFields);
                        ITARWarningIndex = navcon.getItemIndexByProperty($scope.deleteRemarksSubmitFields, "ITARWarning");

                        watchAttributes();
                    });

                };


                function watchAttributes() {
                    $scope.$watch("deleteRemarksSubmitFields[" + ITARWarningIndex + "].data", function(newValue, oldValue) {
                        if (newValue != undefined && newValue != '') {
                            $scope.itarwarning = newValue;
                        } else {
                            $scope.itarwarning = false;
                        }
                    }, true);

                }


            },
            //templateUrl: 'app/delete/delete.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("delete");
            },
            link: function(scope, el, attrs) {
                //console.log(scope);
            }
        };
    }
]);