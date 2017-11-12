"use strict";
angular.module('app').directive('navconTable', ['dataservice', '$timeout',
    function(dataservice, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                tableSettings: '=',
                navconData: '=',
                type: '@',
                readOnly: '=',
                cssClass: '@'
            },
            //templateUrl: 'ext-modules/navconTable/navconTableTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconTable");
            },
            link: function(scope, el, attrs) {
                if (scope.cssClass == undefined) {
                    scope.cssClass = "";
                }
                if (scope.tableSettings.columns.length !== 0)
                    navcon.setTableSetting(el, scope.tableSettings, scope);
                scope.$watch('tableSettings.data', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue) {
                        if (scope.tableSettings.columns.length !== 0) {
                            var items = tableManageData(scope.tableSettings.columns, scope.tableSettings.data);
                            navcon.tableRefresh(el, scope.tableSettings, scope);
                            if (scope.readOnly !== undefined && scope.tableSettings.data.length > 0) {
                                $timeout(function() {
                                    hideShowColumnInReadonly(scope.readOnly, el);
                                }, 250)
                            }
                        }
                    }
                }, true)

                scope.$watch("readOnly", function(newValue, oldValue) {
                    if (newValue !== undefined && scope.tableSettings.data.length > 0) {
                        $timeout(function() {
                            hideShowColumnInReadonly(newValue, el);
                        }, 250)
                    }
                }, true);

                scope.$watch("$parent.readOnly", function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        $('.table.dataTable thead .sorting').css("background-image", "");
                        if (newValue)
                            $('.table.dataTable thead .sorting').css("background-image", "none")
                    }
                }, true);


                function hideShowColumnInReadonly(value, el) {
                    var columnNames = ['Add', 'Edit', 'Delete'];
                    for (var i = 0, len = columnNames.length; i < len; i++) {
                        var header = columnNames[i];
                        var colIndex = $(el).find("th:contains('" + header + "')").index() + 1;
                        if (value)
                            $(el).find("td:nth-child(" + colIndex.toString() + "),th:nth-child(" + colIndex.toString() + ")").hide();
                        else
                            $(el).find("td:nth-child(" + colIndex.toString() + "),th:nth-child(" + colIndex.toString() + ")").show();
                    }
                }

                function tableManageData(columns, items) {

                    for (var index in items) {
                        var item = items[index];
                        for (var p in item) {
                            if (item.hasOwnProperty(p)) {
                                var propVal = item[p];
                                var options = getColumnOptions(columns, p);
                                if (options !== -1) {
                                    if (options.type !== undefined) {
                                        var retVal = navcon.insertControl(options.type, propVal);
                                        item[p] = retVal;
                                    }
                                }
                            }
                        }
                    }

                    function getColumnOptions(columns, prop) {
                        for (index in columns) {
                            var col = columns[index];
                            if (col.data !== undefined) {
                                if (col.data === prop) {
                                    return col.options || -1;
                                }
                            }
                        }
                        return -1;
                    }

                    return items;
                }

            }
        };
    }
]);