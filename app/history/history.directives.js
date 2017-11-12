/// <reference path="../page1/page1.html" />
"use strict";
angular.module('app').directive('myDirective', function ($parse) {
    return function (scope, element, attr) {
        var arr = JSON.parse(attr.myDirective);
        var count = scope.getCount(arr[0]);
        if (scope.navconData.historyState != 'Save') {
            if (count > 0) {
                element.attr('rowspan', count);
                element.html(arr[1]);
            } else {
                element.remove();
            }
        }
        else {
            element.remove();
        }
    };
}).directive('navconHistory', ['$rootScope', 'dataservice', '$timeout',
function ($rootScope, dataservice, $timeout) {
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
        controller: function ($scope, $rootScope) {
            $scope.formActions = {};
            $scope.CreatedHistoryPanel = false;

            var tableData = $scope.navconData.Historydata;
            $.map(tableData, function (item, index) {
                $.map(item, function (itemData, dataIndex) {
                    if (itemData === undefined) {
                        $scope.navconData.Historydata[index][dataIndex] = "";
                    }
                });
            });

            $scope.navconData.detailHistoryConfig = {
                "order": [[6, "desc"]],
                "lengthMenu": [
                  [5, 15, 20, -1],
                  [5, 15, 20, "All"]
                ],
                "pageLength": 10,
                "dateFields": [6],
                "data": $scope.navconData.Historydata,
                "aoColumnDefs": [
                  {
                      "bSortable": false,
                      "aTargets": []
                  },
                  {
                      "className": "tableColumnStyle",
                      "aTargets": [8]
                  }
                ],
                "filterBar": {
                    "paginate": true,
                    "filter": true,
                    "info": true
                },
                "autoWidth": false,
                "rowsGroup": [8],
                "columns": [
                  {
                      "title": "Page",
                      "data": "Page",
                      "width": "10%"
                  },
                  {
                      "title": "Section",
                      "data": "Section",
                      "width": "10%"
                  },
                  {
                      "title": "SubSection",
                      "data": "SubSection",
                      "width": "10%"
                  },
                  {
                      "title": "Fields",
                      "data": "Field",
                      "width": "10%"
                  },
                  {
                      "title": "Old Data",
                      "data": "oldData",
                      "width": "10%"
                  },
                  {
                      "title": "Changed Data",
                      "data": "NewData",
                      "width": "10%"
                  },
                  {
                      "title": "Updated On",
                      "data": "updatedon",
                      "width": "100px",
                      "time": true
                  },
                  {
                      "title": "Updated By",
                      "data": "updatedby",
                      "width": "80px"
                  },
                  {
                      "title": "Rationale",
                      "data": "remarks"
                  }
                ]
            };

            $scope.navconData.historyConfig = {
                "order": [[3, "desc"]],
                "lengthMenu": [
                  [5, 15, 20, -1],
                  [5, 15, 20, "All"]
                ],
                "pageLength": 10,
                "dateFields": [3],
                "data": $scope.navconData.Historydata,
                "aoColumnDefs": [
                  {
                      "bSortable": false,
                      "aTargets": []
                  },
                  {
                      "className": "tableColumnStyle",
                      "aTargets": [3, 4, 5]
                  }
                ],
                "filterBar": {
                    "paginate": true,
                    "filter": true,
                    "info": true
                },
                "autoWidth": false,
                "rowsGroup": [3, 4, 5],
                "columns": [
                  {
                      "title": "Fields",
                      "data": "Field",
                      "width": "10%"
                  },
                  {
                      "title": "Old Data",
                      "data": "oldData",
                      "width": "10%"
                  },
                  {
                      "title": "Changed Data",
                      "data": "NewData",
                      "width": "10%"
                  },
                  {
                      "title": "Updated On",
                      "data": "updatedon",
                      "width": "80px",
                      "time": true
                  },
                  {
                      "title": "Updated By",
                      "data": "updatedby",
                      "width": "80px"
                  },
                  {
                      "title": "Rationale",
                      "data": "remarks"
                  }
                ]
            };

            $scope.navconData.reviewConfig = {
                "order": [],
                "lengthMenu": [
                  [5, 15, 20, -1],
                  [5, 15, 20, "All"]
                ],
                "pageLength": 10,
                "dateFields": [],
                "data": $scope.navconData.Historydata,
                "aoColumnDefs": [
                  {
                      "bSortable": false,
                      "aTargets": []
                  },
                  {
                      "className": "tableColumnStyle",
                      "aTargets": []
                  }
                ],
                "filterBar": {
                    "paginate": true,
                    "filter": true,
                    "info": true
                },
                "autoWidth": false,
                "columns": [
                  {
                      "title": "Page",
                      "data": "Page",
                      "width": "10%"
                  },
                  {
                      "title": "Section",
                      "data": "Section",
                      "width": "10%"
                  },
                  {
                      "title": "SubSection",
                      "data": "SubSection",
                      "width": "10%"
                  },
                  {
                      "title": "Fields",
                      "data": "Field"
                  },
                  {
                      "title": "Old Data",
                      "data": "oldData",
                      "width": "30%"
                  },
                  {
                      "title": "Changed Data",
                      "data": "NewData",
                      "width": "30%"
                  }
                ]
            };

            function columnConfig(pageField, config) {
                if ($scope.navconData.IsSection !== undefined && $scope.navconData.IsSection === 'yes') {
                    if (pageField)
                        config.columns[0].title = ($scope.navconData.SectionHeading != undefined ? $scope.navconData.SectionHeading : 'Section');
                    else
                        config.columns[1].title = ($scope.navconData.SectionHeading != undefined ? $scope.navconData.SectionHeading : 'Section');
                } else {
                    sectionField = true;

                    if (pageField) {
                        config.columns.splice(0, 1);

                        if ($scope.navconData.historyState !== 'Save') {
                            config.dateFields = [4];
                            config.order = [[4, "desc"]];
                            config.aoColumnDefs[1].aTargets = [6];
                            config.rowsGroup = [6];
                        }
                    } else {
                        config.columns.splice(1, 1);
                        if ($scope.navconData.historyState !== 'Save') {
                            config.dateFields = [5];
                            config.order = [[5, "desc"]];
                            config.aoColumnDefs[1].aTargets = [7];
                            config.rowsGroup = [7];
                        }
                    }
                }

                if ($scope.navconData.IsSubsection !== undefined && $scope.navconData.IsSubsection === 'yes') {
                    if (pageField && sectionField)
                        config.columns[0].title = ($scope.navconData.SubsectionHeading != undefined ? $scope.navconData.SubsectionHeading : 'Sub Section');
                    else if (pageField || sectionField)
                        config.columns[1].title = ($scope.navconData.SubsectionHeading != undefined ? $scope.navconData.SubsectionHeading : 'Sub Section');
                    else
                        config.columns[2].title = ($scope.navconData.SubsectionHeading != undefined ? $scope.navconData.SubsectionHeading : 'Sub Section');
                } else {
                    subsectionField = true;

                    if (pageField && sectionField) {
                        config.columns.splice(0, 1);
                        if ($scope.navconData.historyState !== 'Save') {
                            config.dateFields = [3];
                            config.order = [[3, "desc"]];
                            config.aoColumnDefs[1].aTargets = [5];
                            config.rowsGroup = [5];
                        }
                    } else if (pageField || sectionField) {
                        config.columns.splice(1, 1);
                        if ($scope.navconData.historyState !== 'Save') {
                            config.dateFields = [4];
                            config.order = [[4, "desc"]];
                            config.aoColumnDefs[1].aTargets = [6];
                            config.rowsGroup = [6];
                        }
                    } else {
                        config.columns.splice(2, 1);
                        if ($scope.navconData.historyState !== 'Save') {
                            config.dateFields = [5];
                            config.order = [[5, "desc"]];
                            config.aoColumnDefs[1].aTargets = [7];
                            config.rowsGroup = [7];
                        }
                    }
                }
            };

            var pageField = false, sectionField = false, subsectionField = false;
            var config = angular.copy($scope.navconData.reviewConfig);
            if ($scope.navconData.historyState === 'Save') {
                config = angular.copy($scope.navconData.reviewConfig);

                pageField = true;
                config.columns.splice(0, 1);

                columnConfig(pageField, config)
            } else if ($scope.navconData.historyState === 'Detailhistory' || $scope.navconData.IsSection === 'yes' || $scope.navconData.IsSubsection === 'yes') {
                config = angular.copy($scope.navconData.detailHistoryConfig);

                if ($scope.navconData.historyState !== undefined && $scope.navconData.historyState !== 'Detailhistory') {
                    pageField = true;

                    config.columns.splice(0, 1);
                    config.dateFields = [5];
                    config.order = [[5, "desc"]];
                    config.aoColumnDefs[1].aTargets = [7];
                    config.rowsGroup = [7];
                }

                columnConfig(pageField, config)

            } else {
                config = angular.copy($scope.navconData.historyConfig);
            }

            $scope.navconData.historyTable = angular.copy(config);


            $scope.navconData.tableRowUpdate = function (row, data, rowNo, type, cellObj, oTable, columnData) {
                if (type === "History") {
                    var newDataColumnIndex = -1;

                    if (columnData !== undefined && columnData.length > 0) {
                        $.map(columnData, function (item, colIndex) {
                            if (item.data !== undefined && item.data != null && item.data.toString().toLowerCase() === "newdata") {
                                newDataColumnIndex = colIndex;
                            }
                            if (item.title == "Rationale") {
                                $(row).children().eq(colIndex).html(data[item.data]);
                            }
                        });
                    }

                    if (newDataColumnIndex !== -1 && data.NewData !== undefined && data.NewData !== null
                        && !$.isNumeric(data.NewData.toString()) && navcon.dateFromUTCToLocal(data.NewData.toString().replace(" ", "")) !== "") {
                        var dateValue = data.NewData.toString();
                        var splData = dateValue.split("/");
                        if (splData.length > 0 && splData.length === 2)
                            dateValue = navcon.dateFromUTCToLocal(data.NewData.toString(), navcon.defaultFormat().datetime);
                        $(row).children().eq(newDataColumnIndex).html(dateValue);
                    }

                    if (data.Field !== undefined && data.Field !== null
                        && (data.Field.toString().toLowerCase() === "quarantine started" || data.Field.toString().toLowerCase() === "quarantine ended")) {
                        $.map($(row).children(), function (item, index) {
                            $(item).css({ "background-color": "#ECF0F1" });
                        });
                    }



                }
            }

            //navcon.clearTableData("History", $scope.navconData.Historydata);
            /*Page Actions*/
            // activate();

            /*Fields*/
            if ($scope.navconData.historyState == 'Save') {
                $scope.sortType = '';
            } else {
                $scope.sortType = ''; // set the default sort type
            }

            if ($scope.navconData.CreatedHistory !== undefined && $scope.navconData.CreatedHistory.length > 0) {
                $scope.CreatedHistoryPanel = true;
            }
            else {
                $scope.CreatedHistoryPanel = false;
            }
            $scope.hideHistory = false;
            if ($scope.navconData.hideHistory !== undefined && $scope.navconData.hideHistory) {
                $scope.hideHistory = $scope.navconData.hideHistory;
            }

            $scope.sortReverse = false;  // set the default sort order
            $scope.searchItems = '';
            $scope.historyFields = $scope.navconData.Historydata;
            /*Tables*/

            var batchSet = [];
            /*breadcrumbs*/

            /*Variable Declaration*/


            /*Variable Declaration*/

            /*Page Actions*/
            /*Add New*/
            $scope.formActions.addNew = function (type) {

            };
            $scope.fnDate = function (dateString) {

                var mydate = new Date(dateString);
                return mydate.toUTCString();
            }
            /*Ok*/
            $scope.formActions.ok = function (type) {
                navcon.closeModal(type);
            };
            /*Cancel*/
            $scope.formActions.cancel = function (type) {
                navcon.closeModal(type);
            };
            /*Save*/
            $scope.formActions.save = function (type, mode, callback) {

            };
            $scope.$watch('sortReverse', function (newValue, oldValue, $scope) {
                $scope.sorting = newValue;
            });

            /*Table Action Click*/

            /*Delete*/

            /*Table Actions*/
            $scope.dateConvert = function (dateString) {
                return navcon.dateFromUTCToLocal(dateString, 'DD/MM/YYYY h:mm:ss a');
            }
            $scope.getCount = function (BatchId) {
                if (batchSet.indexOf(BatchId) == -1) {
                    var count = 0;
                    for (var i = 0; i < $scope.historyFields.length; i++) {
                        if ($scope.historyFields[i].BatchId == BatchId) {
                            count++;
                        }
                    }
                    batchSet.push(BatchId);
                    return count;
                }

                return 0;
            }

            /*Privat functions*/
            function getData(type, page) {
                return dataservice.getData(type, page).then(function (data) {
                    return data;
                });
            };

            function getServerData(type, rowId) {
                return dataservice.getServerData(type, rowId).then(function (data) {
                    return data;
                });
            };

            $scope.formManage = {};

            function getFields() {
            }

            function activate(callback) {
            };


            function watchAttributes() {
            }

            $timeout(function () {
                $(".historyScroll").mCustomScrollbar({
                    autoHideScrollbar: false,
                    theme: "3d-dark",
                    scrollInertia: 0,
                    scrollbarPosition: "outside"
                });
            });
        },
        //templateUrl: 'app/history/history.html',
        templateUrl: function () {
            return navcon.getTemplateUrl("history");
        },
        link: function (scope, el, attrs) {
            console.log(scope);
        }
    };
}]);