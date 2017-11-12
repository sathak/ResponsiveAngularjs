"use strict";
angular.module('app').directive('navconTree', ['dataservice', '$timeout',
    function(dataservice, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                treeSettings: '=',
                navconData: '=',
                type: '@',
                fieldSet: '@',
                isExpand: '@'
            },
            //templateUrl: 'ext-modules/navconTree/navconTreeTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconTree");
            },
            link: function(scope, el, attrs) {
                var objEl = $(el);
                var tree = objEl.find('div[type="tree"]').first();
                if (scope.isExpand === undefined) {
                    scope.isExpand = false;
                }
                scope.typeText = 'Collapsed'

                scope.$watch('treeSettings', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "") {
                        var keyIndex = navcon.getItemIndexByProperty(scope.navconData[scope.fieldSet], scope.type);
                        navcon.setTreeSetting(el, scope.treeSettings, scope, scope.navconData[scope.fieldSet][keyIndex], scope.isExpand);
                        scope.$watch('treeSettings.core.data', function(newValue, oldValue) {
                            if (newValue !== undefined && newValue !== "" && newValue.length > 0) {
                                if (newValue !== oldValue) {
                                    var treeType = scope.type;
                                    if (scope.treeSettings.core.treeType !== undefined && scope.treeSettings.core.treeType !== "")
                                        treeType = scope.treeSettings.core.treeType;

                                    navcon.treeDataRefresh(newValue, treeType, function(data) {
                                        /*if(scope.$applay === undefined) return;
                                         scope.$applay(function(){
                                           scope.isExpand = false; 
                                        }); */
                                    });
                                }
                            }
                        })
                    }
                }, true)

                scope.$watch('isExpand', function(newValue, oldValue) {
                    var objEl = $(el);
                    var tree = objEl.find('div[type="tree"]').first();
                    if (newValue !== undefined && newValue !== "") {
                        var search = objEl.find('#tree_filter').first().find('input');
                        search.val("");
                        search.keyup();
                        if (newValue === true || newValue === "true") {
                            tree.jstree('open_all');
                            scope.typeText = 'Expanded';
                            scope.isExpand = true;
                        } else {
                            tree.jstree('close_all');
                            scope.typeText = 'Collapsed';
                            scope.isExpand = false;
                        }

                    }
                }, true);

                var treeSearch = function(el) {
                    var to = false;
                    var search = objEl.find('#tree_filter').first().find('input');

                    search.click(function(el) {
                        var collapse = $($(el.target).parents('.portlet').first().find('input[type="checkbox"]'));
                        if (collapse.attr("checked") === undefined) {
                            tree.jstree('open_all');
                            $timeout(function() {
                                scope.$apply(function() {
                                    scope.typeText = 'Expanded';
                                    scope.isExpand = true;
                                });
                            });
                        }
                    });

                    search.keyup(function(el) {
                        if (to) { clearTimeout(to); }
                        to = setTimeout(function(el) {
                            var treeObj = $(el).parent().parent().parent().next();
                            var v = search.val();
                            tree.jstree(true).search(v);

                            //hide/show grid values for nodes affected by searching
                            var hidden = treeObj.find('ul li:hidden');
                            var visible = treeObj.find('ul li:visible');

                            $.each(hidden, function(i) {
                                if (!checkId(visible, hidden[i].id))
                                    treeObj.find('div[id*=' + hidden[i].id + ']').hide();
                            });

                            var finalVisible = treeObj.find('ul li:visible');
                            $.each(finalVisible, function(i) {
                                treeObj.find('div[id^=jsgrid_' + visible[i].id + '_col]').show();
                            });

                        }, 500, this);
                    });
                }

                var checkId = function(visible, id) {
                    for (var i = 0, len = visible.length; i < len; i++) {
                        var item = visible[i];
                        if (item.id === id) return true;
                    }
                    return false;
                }

                treeSearch(el);
            }
        };
    }
]);


var manageData = function(columns, items) {
    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        if (item.data !== undefined) {
            for (var p in item.data) {
                if (item.data.hasOwnProperty(p)) {
                    var propVal = item.data[p];
                    var options = getColumnOptions(columns, p);
                    if (options !== -1) {
                        if (options.type !== undefined) {
                            var retVal = navcon.insertControl(options.type, propVal);
                            item.data[p] = retVal;
                        }
                    }
                }
            }
            if (item.children !== undefined && item.children.length > 0) {
                var found = manageData(columns, item.children);
            }
        }
    }

    function getColumnOptions(columns, prop) {
        for (var index in columns) {
            var col = columns[index];
            if (col.value !== undefined) {
                if (col.value === prop) {
                    return col.options || -1;
                }
            }
        }
        return -1;
    }

    return items;
};