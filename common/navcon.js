var navcon = (function () {

    var webUrl = function () {
        return window.document.URL;
    };

    var getAppScope = function () {
        var appElement = document.querySelector('[ng-app=app]');
        var appScope = angular.element(appElement).scope();
        return getAppScope;
    }
    var defaultFormat = function () {
        var formatData = {
            "date": "DD/MM/YYYY",
            "datetime": "DD/MM/YYYY hh:mm:ss A",
            "utc": "YYYY-MM-DD HH:mm:ss",
            "timeZone": ((-1) * (new Date().getTimezoneOffset())),
            "datetype": "date-uk",
            "dateDisplay": "MMMM D, YYYY",
            "kdate": "dd/MM/yyyy",
        };
        return formatData;
    };
    var getDistinctfromJSON = function (obj, key) {
        var distinctIds = [];
        var distinctArray = [];
        obj.filter(function (v, i) {
            if (distinctIds.indexOf(v[key]) == -1) {
                distinctIds.push(v[key]);
                distinctArray.push(v);
            }
        });
        obj = distinctArray;
        return obj;
    };

    var getFilterobjectfromJSON = function (obj, key1, value) {

        var MatchedArray = [];
        $.each(obj, function (v, i) {
            if (i[key1] == value) {
                MatchedArray.push(i);
            }
        });
        return MatchedArray;
    };

    var getMatchedobjectfromJSON = function (obj, key1, key2, value) {

        var distinctMatchedArray = [];
        var distinctIds = [];
        $.each(obj, function (v, i) {
            if (i[key1] == value && distinctIds.indexOf(i[key2]) == -1) {
                distinctIds.push(i[key2]);
                distinctMatchedArray.push(i);
            }
        });
        return distinctMatchedArray;
    };

    var tableSortDDMMYYYEExt = function () {
        jQuery.extend(jQuery.fn.dataTableExt.oSort, {
            "date-uk-pre": function (a) {
                var ukDatetimea = a.split(" ");

                var ukDatea = ukDatetimea[0].split('/');
                if (ukDatea.length === 1 && ukDatea[0] === "")
                    return 1;
                else {
                    if (ukDatetimea.length > 1) {
                        var uktimea = ukDatetimea[1].split(":");
                        var ukam = 1;
                        if (ukDatetimea.length > 2) ukam = ukDatetimea[2].toString() === "PM" ? 2 : 1;

                        return (ukDatea[2] + ukDatea[1] + ukDatea[0] + ukam + uktimea[0] + uktimea[1] + uktimea[2]) * 1;
                    } else {
                        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
                    }
                }
            },

            "date-uk-asc": function (a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            },

            "date-uk-desc": function (a, b) {

                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            }
        });
    }

    var tableSetting = function (el, options, scope) {

        var table = $($(el).find('table')[0]);

        var self = this;

        var filterBar = {};
        if (options != undefined && options.filterBar !== undefined) filterBar = options.filterBar;

        if (options.aoColumnDefs !== undefined) {
            options.aoColumnDefs.push({
                "render": function (data, type, row, pos) {
                    if (pos.settings.aoColumns[pos.col].time !== undefined && pos.settings.aoColumns[pos.col].time === true)
                        return dateFromUTCToLocal(data, (defaultFormat().datetime || 'DD/MM/YYYY HH:mm:ss'));
                    else
                        return dateFromUTCToLocal(data, (defaultFormat().date || "DD/MM/YYYY"));
                },
                "targets": options.dateFields
            });
        }

        var datatableDateColumType = function (options, colums) {
            if (options.dateFields !== undefined && options.dateFields !== null && options.dateFields.length !== 0) {
                $.map(colums, function (item, index) {
                    $.map(options.dateFields, function (data, i) {
                        if (data === index) {
                            item["type"] = defaultFormat().datetype;
                            item["sType"] = defaultFormat().datetype;
                        }
                    });
                });
            }
            return colums;
        };

        var oTable = table.DataTable({
            "oLanguage": {
                "sSearch": "<span class='input-inline dtFilterSearch'><i class='fa fa-search'></i></span>"
            },
            select: true,
            /*select: {
                style: 'single'
            },*/
            buttons: options.buttons,
            "bDestroy": true,
            "bPaginate": filterBar.paginate !== undefined ? filterBar.paginate : true, //hide pagination
            "bFilter": filterBar.filter !== undefined ? filterBar.filter : true, //hide Search bar
            "bInfo": filterBar.info !== undefined ? filterBar.info : true, // hide showing entries
            "bAutoWidth": options.autoWidth,
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },
            "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "aoColumnDefs": options.aoColumnDefs,
            "order": options.order,
            "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],// change per page values here
            "iDisplayLength": options.iDisplayLength,
            // set the initial value
            "pageLength": options.pageLength,
            data: options.data,
            columns: datatableDateColumType(options, options.columns),
            createdRow: function (row, data, index) {
                //setApprvoedTableColumnOptions(row, data, options);
                if (options.columns !== undefined && options.columns.length > 0) {
                    $.map(options.columns, function (item, colIndex) {
                        if (item.serialNoColumn !== undefined && item.serialNoColumn != null) {
                            $(row).children().eq(item.serialNoColumn).html((index + 1));
                        }
                    });
                }
                if (scope.navconData.tableRowUpdate !== undefined)
                    scope.navconData.tableRowUpdate(row, data, index, scope.type, this, oTable, options.columns);
            },
            initComplete: function (settings, json) {

                $(".dataTables_filter").find("input").addClass("form-control input-medium input-inline");
                var iTable = this.DataTable();

                if (options.buttons !== undefined) {
                    if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0) {
                        var printObj = this.parents('.portlet').first().find(".tools:first");
                        iTable.buttons().container().appendTo(printObj);
                        printObj.find(".dt-buttons").children().unwrap();
                        var printBut = printObj.find('.dt-button');
                        printBut.css("background", "none");
                        printBut.css("background-image", "none");
                        printBut.css("border", "0px");
                        printBut.css("padding", "0px");
                        printBut.css("padding-top", "3px");
                        printBut.css("top", "-3px");
                        printBut.css("position", "relative");
                        printBut.addClass("fa fa-print");
                        printBut.find("span").text("");
                        var tableId = $(".tools:first").parents(".portlet:first").find("table:first").attr("id");
                    }

                    iTable.on('buttons-action', function (e, buttonApi, dataTable, node, config) {
                        //console.log('Button ' + buttonApi.text() + ' was activated');
                    });

                    if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0)
                        iTable.buttons().container().appendTo($("#DataTables_Table_0_filter"))
                }

                if (options.columnFilter !== undefined) {
                    this.columnFilter({
                        sPlaceHolder: "head:after",
                        aoColumns: options.columnFilter.aoColumns
                    });
                }

                if (options.rowsGroup !== undefined) {
                    new $.fn.dataTable.RowsGroup(iTable, options.rowsGroup);
                }

                navcon.viewContentLoaded();


            },
            headerCallback: function () {
                //var ss = $(table).find('tbody');
            },
            drawCallback: function () {
                if (scope.navconData.rights !== undefined)
                    setDisabledEnabledByRights(scope.navconData.rights);

                //Empty row colspan and text assign
                //if ($(this).attr("aria-describedby") !== undefined && $(this).find("tbody tr td[class=dataTables_empty]").length == 0) {
                //    setApprvoedTableCollection($(this), options);
                //}
                var iTable = this.DataTable();
                $(".dataTables_filter").find("input").addClass("form-control input-medium input-inline");
                //  var iTable = this.DataTable();

                if (options.buttons !== undefined) {
                    if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0) {
                        var printObj = this.parents('.portlet').first().find(".tools:first");
                        iTable.buttons().container().appendTo(printObj);
                        printObj.find(".dt-buttons").children().unwrap();
                        var printBut = printObj.find('.dt-button');
                        printBut.css("background", "none");
                        printBut.css("background-image", "none");
                        printBut.css("border", "0px");
                        printBut.css("padding", "0px");
                        printBut.css("padding-top", "3px");
                        printBut.css("top", "-3px");
                        printBut.css("position", "relative");
                        printBut.addClass("fa fa-print");
                        printBut.find("span").text("");
                        var tableId = $(".tools:first").parents(".portlet:first").find("table:first").attr("id");
                    }

                    iTable.on('buttons-action', function (e, buttonApi, dataTable, node, config) {
                        //console.log('Button ' + buttonApi.text() + ' was activated');
                    });

                    if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0)
                        iTable.buttons().container().appendTo($("#DataTables_Table_0_filter"))
                }

                if (options.columnFilter !== undefined) {
                    this.columnFilter({
                        sPlaceHolder: "head:after",
                        aoColumns: options.columnFilter.aoColumns
                    });
                }



                navcon.viewContentLoaded();


                //Empty row colspan and text assign
                if ($(this).find("tbody tr td[class=dataTables_empty]").length == 1) {

                    var totalColumn = $(this).find("thead tr th").length;
                    $(this).find("tbody tr td[class=dataTables_empty]").attr("colspan", totalColumn);

                    var displayText = "No records found"; //"No data available in table";
                    if ($(this).parent() !== undefined
                        && $(this).parent().parent() !== undefined
                        && $(this).parent().parent().parent() !== undefined
                        && $(this).parent().parent().parent().parent() !== undefined) {
                        var settings = $(this).parent().parent().parent().parent().attr("table-settings");
                        if (settings.toString().lastIndexOf(".") > 0) {
                            var navdata = scope.navconData[settings.toString().substring(settings.toString().lastIndexOf(".") + 1)];
                            if (navdata !== undefined && navdata.emptyText !== undefined)
                                displayText = navdata.emptyText;
                        } else {
                            var navdata = scope.navconData[settings.toString()];
                            if (navdata !== undefined && navdata.emptyText !== undefined)
                                displayText = navdata.emptyText;
                        }
                    }

                    $(this).find("tbody tr td[class=dataTables_empty]").text(displayText);
                }

                // setTimeout(function(){
                $('.dataTables_paginate.paging_simple_numbers').first().parent().css("margin-left", "-15px");
                //$('.paginate_button.next').first().css("margin-left","3px");
                //},50)

            }
        });

        //focusout click
        $(table).find('tbody').on('change', 'td', function (el) {
            var tr = $(this).closest("tr");
            var row = tr.index();
            var index = oTable.cell(this).index();
            var column = index.column;
            var rowData = oTable.row(tr).data();
            var cellData = oTable.cell(this).data();
            var colHeader = $(oTable.column(column).header()).html();

            if (el.srcElement.type == "checkbox") {
                if (el.srcElement.checked === true) {
                    if (oTable.row(tr).data()[colHeader] !== undefined)
                        oTable.row(tr).data()[colHeader] = 1;
                    else
                        oTable.row(tr).data()[colHeader.toLowerCase()] = 1;
                }
                else {
                    if (oTable.row(tr).data()[colHeader] !== undefined)
                        oTable.row(tr).data()[colHeader] = 0;
                    else
                        oTable.row(tr).data()[colHeader.toLowerCase()] = 0;
                }


            } else if (el.srcElement.type == "text") {
                oTable.cell(this).data(setTableCellValue(cellData, el.srcElement));
                setTableTotalCellValue(oTable, this, options, column, colHeader);

            } else {
                oTable.cell(this).data(setTableCellValue(cellData, el.srcElement));
            }
        });
        //cell click
        $(table).find('tbody').on('click', 'td', function (el, tt) {

            $(".selected").removeClass("selected");
            $(el.currentTarget).parent().addClass("selected");
            var column, colHeader, data, headerTitle;
            $($(el.currentTarget).parents('table')[0]).find('tr:not(:first-child)').css("background-color", "transparent");
            var tr = $(this).closest("tr");
            var row = tr.index();

            //need to change static color
            setTimeout(function () {
                $(tr[0]).css("background-color", "#B0BED9");
            }, 200);

            if (tr === undefined || oTable.row(tr).data() === undefined) {
                data = oTable.row($(this).parent().prev()).data();
            } else {
                data = oTable.row(tr).data();
            }

            if (oTable.cell(this).index() === undefined && $(el.target).closest('li').length !== 0) {
                column = parseFloat($(el.target).closest('li').attr("data-dt-column"));
                colHeader = $(el.target).closest('li').find('span[class="dtr-title"]').text();
                headerTitle = $(el.target).closest('li').find('span[class="dtr-title"]').text().toLowerCase();
            } else {
                column = oTable.cell(this).index().column;
                colHeader = oTable.column(column).header();
                headerTitle = $(colHeader).html().toLowerCase();
            }

            if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && headerTitle === "add") || (!scope.navconData.rights.Edit && headerTitle === "edit") || ((!scope.navconData.rights.View && !scope.navconData.rights.Approve) && headerTitle === "view") || (!scope.navconData.rights.Delete && headerTitle === "delete"))) return false;

            /* if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && headerTitle === "add") || (!scope.navconData.rights.Edit && headerTitle === "edit") || (!scope.navconData.rights.Delete && headerTitle === "delete"))) return false;*/



            if (headerTitle === "add" || headerTitle === "edit" || headerTitle === "delete" || headerTitle === "view" || headerTitle === "manage" || headerTitle === "customer forms") {
                if ($(el.target.children).css("display") === "none" || $(el.target.children).attr("readOnly") === true || $(el.target.children).attr("disabled") === "disabled") return;

                if (scope.tableSettings.tableAction !== undefined) {
                    if (scope.tableSettings.tableAction === undefined) return;
                    scope.tableSettings.tableAction(headerTitle, row, column, data, scope.type, this, oTable);
                } else {
                    if (scope.navconData.tableAction === undefined) return;
                    scope.navconData.tableAction(headerTitle, row, column, data, scope.type, this, oTable);
                }
            } else {
                if (scope.tableSettings.tableCellClick !== undefined) {
                    if (scope.tableSettings.tableCellClick === undefined) return;
                    scope.tableSettings.tableCellClick(row, column, data, scope.type, this, oTable);
                } else {
                    if (scope.navconData.tableCellClick === undefined) return;
                    scope.navconData.tableCellClick(row, column, data, scope.type, this, oTable);
                }
            }
        });

        $(table).find('tbody').on('click', 'th', function () {
            var row = oTable.cell(this).index().row;
            var column = oTable.cell(this).index().column;
            var data = oTable.cell(this).data();

        });

        oTable.on('click', 'th', function () {
            var column = oTable.column(this).index();

            var colHeader = oTable.column(column).header();
            var data = $(colHeader).html().toLowerCase();


            if ($(oTable).context !== undefined && $(oTable).context.length > 0) {
                var tableData = $(oTable).context[0];
                if (tableData.aoColumns !== undefined && tableData.aoColumns.length > 0) {
                    $.map(tableData.aoColumns, function (columnData, colIndex) {
                        if (columnData.serialNoColumn !== undefined && columnData.serialNoColumn != null) {
                            var iLoop = 1;
                            $.map($(tableData.nTable).find("tr"), function (item, index) {
                                if (index > 0) {
                                    var row = $(item);
                                    $(row.find("td")[columnData.serialNoColumn]).text(iLoop)
                                    iLoop++;
                                }
                            });
                        }
                    });
                }
            }

            if (scope.navconData.tableHeaderCellClick === undefined) return;
            scope.navconData.tableHeaderCellClick(column, data, scope.type, this, oTable);
        });

        oTable.on('click', 'input[type="checkbox"]', function (e) {
            var $row = $(this).closest('tr');

            // Get row data
            var data = oTable.row($row).data();

            //if (this.checked && oTable.cell($(this).parent()).index().column === 0)
            if (oTable.cell($(this).parent()).index().column === 0)
                oTable.row($row).data()["Row_Checked"] = this.checked;

            if (oTable.row($row).data()["Check_Field"] !== undefined && oTable.row($row).data()["Check_Field"] !== null && oTable.row($row).data()["Check_Field"] !== "") {
                var field = oTable.row($row).data()["Check_Field"];
                oTable.row($row).data()[field] = this.checked
            }
            // Get row ID
            var rowId = data[0];
        });

        oTable.on('click', 'input[type="text"]', function (e) {
            //console.log($(this).value());
        });

        var tabWrapper = $(table).parent().parent();
        if ($(tabWrapper).find(".dataTables_filter").length === 0) {
            $(tabWrapper).css("margin-top", "-12px");
        }

        scope.navconData.oTable = oTable;
    };

    var PrintFunction = function (iTable, options) {

        $(".dataTables_filter").find("input").addClass("form-control input-medium input-inline");
        //  var iTable = this.DataTable();

        if (options.buttons !== undefined) {
            if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0) {
                var printObj = this.parents('.portlet').first().find(".tools:first");
                iTable.buttons().container().appendTo(printObj);
                printObj.find(".dt-buttons").children().unwrap();
                var printBut = printObj.find('.dt-button');
                printBut.css("background", "none");
                printBut.css("background-image", "none");
                printBut.css("border", "0px");
                printBut.css("padding", "0px");
                printBut.css("padding-top", "3px");
                printBut.css("top", "-3px");
                printBut.css("position", "relative");
                printBut.addClass("fa fa-print");
                printBut.find("span").text("");
                var tableId = $(".tools:first").parents(".portlet:first").find("table:first").attr("id");
            }

            iTable.on('buttons-action', function (e, buttonApi, dataTable, node, config) {
                //console.log('Button ' + buttonApi.text() + ' was activated');
            });

            if ($("#DataTables_Table_0_filter").find('.dt-buttons').length === 0)
                iTable.buttons().container().appendTo($("#DataTables_Table_0_filter"))
        }

        if (options.columnFilter !== undefined) {
            this.columnFilter({
                sPlaceHolder: "head:after",
                aoColumns: options.columnFilter.aoColumns
            });
        }

        if (options.rowsGroup !== undefined) {
            new $.fn.dataTable.RowsGroup(iTable, options.rowsGroup);
        }

        navcon.viewContentLoaded();
    }

    var setTableTotalCellValue = function (oTable, ctrl, options, column, colHeader) {
        var columnTitle = "";

        //Total Calculation
        if (options.lastRowAsTotal !== undefined && options.lastRowAsTotal) {
            var lastTr = $(ctrl).parent().parent().children().last().closest("tr");
            var lastTrIndex = lastTr.index();

            var totalValue = 0;
            var trCollection = $(ctrl).parent().parent().find("tr");
            for (var iRow = 0; iRow < trCollection.length - 1; iRow++) {
                //var colValue = parseInt(oTable.row(trCollection[iRow]).data()[colHeader]);
                var colValue = parseFloat($($($(ctrl).parent().parent().children()[iRow]).children()[column]).children()[0].value);
                totalValue += isNaN(colValue) ? 0 : colValue;
            }

            //oTable.row(lastTrIndex).data()[columnTitle] = totalValue;
            var loopColumn = 0;
            for (var key in oTable.row(lastTrIndex).data()) {
                if (loopColumn === column) {
                    columnTitle = key;
                    $(oTable.row(lastTrIndex).data()[columnTitle]).val(totalValue);
                    $(oTable.row(lastTrIndex).data()[columnTitle]).text(totalValue);

                    oTable.row(lastTrIndex).data()[columnTitle] = "<input type='text' value='" + totalValue + "'>";
                    break;
                }
                loopColumn += 1;
            }


            $($(lastTr[0]).children()[column]).children()[0].value = totalValue;
            $($(lastTr[0]).children()[column]).children().text(totalValue);
            //$($(lastTr[0]).children()[column]).children()[0].readOnly = true;
            $($(lastTr[0]).children()[column]).children()[0].disabled = true;
        }
    };

    var setTableCellValue = function (value, targetVal) {
        var retVal = value;
        if (value.indexOf === undefined) return value;
        if (value.indexOf('<input') !== -1 || value.indexOf('<textarea') !== -1) {
            var valueObj = $(value);
            if (targetVal.type === "checkbox") {
                if (targetVal.checked)
                    $(valueObj).attr("checked", "checked");
                else
                    $(valueObj).removeAttr("checked");
            } else {
                $(valueObj).attr("value", targetVal.value)
            }
            var modStr = valueObj.prop('outerHTML');
            retVal = modStr.replace(/"/gi, "'");
        } else {
            retVal = value;
        }
        return retVal;
    };

    var getTableCellValue = function (value) {
        var retVal = value;
        if (value === null || value === undefined || value.indexOf === undefined) return value;
        if (value.indexOf('<input') !== -1 || value.indexOf('<textarea') !== -1) {
            var valueObj = $(value);
            retVal = $(valueObj).attr("value")
        } else {
            retVal = value;
        }
        return retVal;
    };

    var getTableInstance = function (type) {
        var navTable = $("navcon-table[type='" + type + "']");
        var table = $($(navTable).find('table')[0]);
        var oTable = table.DataTable();
        return oTable;
    };

    var clearTableData = function (type, data) {
        $.map(data, function (item, index) {
            for (var k in item) {
                item[k] = setTableCellValue(item[k], "");
            }
        });
        var oTable = getTableInstance(type);
        oTable.clear();
        oTable.rows.add(data).draw();
    };

    var updateTableData = function (type, data, targetData, id) {
        if (id === undefined || id === "")
            id = "row";

        for (var i = 0; i < data.length; i++) {
            for (var k in data[i]) {
                if (k === i) continue;
                var idVal = (id === "row" ? i : data[i][id]);
                var valuObj = getItemByKeyValue(targetData, id, idVal);
                if (valuObj !== -1)
                    data[i][k] = setTableCellValue(data[i][k], valuObj[k]);
            }
        }
        var oTable = getTableInstance(type);
        oTable.clear();
        oTable.rows.add(data).draw();
    };

    var getItemByProperty = function (items, key) {
        var value = $.grep(items, function (e) {
            return e.key === key;
        });

        if (value.length > 0)
            return value[0];
        else {
            //alert('item not found...');
            return -1;
        }
    };

    var getTableData = function (type, id, checked, key, checkedCol, oldData, mode) {
        if (id === undefined || id === "")
            id = "row";
        var data = [];
        var navTable = $("navcon-table[type='" + type + "']");
        var table = $($(navTable).find('table')[0]);
        var oTable = getTableInstance(type);
        $.map(oTable.rows().data(), function (item, index) {
            if (checked !== undefined && checked) {
                var colField = ""
                if (checkedCol !== undefined)
                    colField = checkedCol;
                if (item[colField] === undefined || !item[colField])
                    return false;
            }
            var obj = {};
            obj[id] = index;
            for (var k in item) {
                if (item.hasOwnProperty(k)) {
                    obj[k] = getTableCellValue(item[k]);
                }
            }
            if (item[key] === undefined) {
                item[key] = 0;
            }
            if (item[key] === null || item[key] === 0) {
                obj["ObjectState"] = (item["ObjectState"] !== undefined && item["ObjectState"] !== null && item["ObjectState"] !== "" && item["ObjectState"] !== "0" && item["ObjectState"] !== 0) ? parseInt(item["ObjectState"]) : 1;
            }
            else {
                obj["ObjectState"] = (item["ObjectState"] !== undefined && item["ObjectState"] !== null && item["ObjectState"] !== "" && item["ObjectState"] !== "0" && item["ObjectState"] !== 0) ? parseInt(item["ObjectState"]) : 2;
            }

            obj["Status"] = (item["Status"] !== undefined && item["Status"] !== null && item["Status"] !== "" && item["Status"] !== "0") ? parseInt(item["Status"]) : 0;

            data.push(obj);
        });
        if (mode.toLowerCase() == "save")
            return data;
        else
            return insertDeleteditems(data, oldData, key, "table");
    };

    var tableRefresh = function (el, setting, scope) {
        if (setting.data.length === 0) setting.data = [];
        var table = $($(el).find('table')[0]);
        var tabInst = table.DataTable.fnTables();
        if ($(tabInst).parents("navcon-table[type='" + $(el).attr("type") + "']").length === 0 || table.children().length === 0) {
            tableSetting(el, setting, scope);
            return;
        }
        var oTable = table.DataTable();
        oTable.clear();
        oTable.rows.add(setting.data).draw();
    };

    var tableCellEditSetting = function (row, column, data, cellObj, oTable, $scope, $compile) {

        var colHeader = oTable.column(column).header();
        var headerTitle = $(colHeader).html().toLowerCase();
        var columnSetting = oTable.settings()[0].aoColumns[column];
        if (columnSetting.edit === true && cellObj.children.length === 0) {
            var height = cellObj.offsetHeight + "px;";
            var width = cellObj.offsetWidth + "px;"
            $(cellObj).empty().append($("<navcon-dropdown select-options='vm.selectOptions'></navcon-dropdown>", {
                "style": "height:calc(100% + 12px);width:calc(100% + 12px); margin-left:-6px; margin-top:-6px;"
            }).append(function () {
                var options = [];
                $.each([], function (k, v) {
                    options.push($("<option></option>", {
                        "text": v,
                        "value": v
                    }))
                })
                return options;
            }));

            $compile($(cellObj))($scope);

        }
    };

    var calendarSetting = function (el, data, scope) {
        var calendar = $($(el).find("div[type='calendar']")[0]);
        calendar.fullCalendar("destroy");

        calendar.fullCalendar("destroy");
        setTimeout(function () {
            calendar.fullCalendar({
                now: data.now,
                editable: data.editable,
                contentHeight: data.contentHeight,
                dragScroll: data.dragScroll,
                header: data.header,
                defaultView: data.defaultView,
                views: data.views,
                resourceAreaWidth: data.resourceAreaWidth,
                resourceColumns: data.resourceColumns,
                resources: data.resources,
                events: data.events,
                eventStartEditable: false,
                eventDurationEditable: false,
                dayClick: function (calEvent, jsEvent, view) {
                    var resourceId = $(jsEvent.target).parent().parent().attr("data-resource-id");
                    scope.navconData.calenderActionClick("click", calEvent, resourceId, view);
                },
                eventRender: function (event, element, view) {
                    if (data.todayVisible !== undefined && !data.todayVisible) $(".fc-today").removeClass("fc-today");// remove for current date color display

                    if (data.numberDisplay !== undefined && data.numberDisplay) {
                        var iDay = 1;
                        $(".fc-widget-header ").each(function () {
                            if ($(this).attr("data-date") != undefined) {
                                if ($(this).attr("colspan") != undefined) {
                                    $(this).parent().hide();
                                }
                                else {
                                    $(this).find(".fc-cell-content").each(function () {
                                        if ($(this).children().length === 1) {
                                            $(this).find(".fc-cell-text").html("" + iDay.toString());
                                            iDay += 1;
                                            //if (iDay > 151) $(this).parent().hide();
                                        }
                                    });
                                }
                            }
                        });
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    //alert('Event: ' + calEvent.title);
                    //$(this).css('border-color', 'red');
                    scope.navconData.calenderActionClick("click", calEvent, calEvent.resourceId, view);
                },
                eventResizeStart: function (event, jsEvent, ui, view) {
                    scope.navconData.calenderActionClick("resizeStart", event, event.resourceId, view);
                },
                eventResize: function (event, delta, revertFunc) {
                    //alert(event.title + " end is now " + event.end.format());
                },
                eventOverlap: function (stillEvent, movingEvent) {
                    return true;
                }
            });
        }, 500);
    };

    var callPrint = function (report, reportId, callback) {
        if (report.reportFrom === undefined)
            report.reportFrom = "page";
        
        var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });
        var ngAuthSettings = angular.element(document).injector().invoke(function (ngAuthSettings) { return ngAuthSettings; });
        var reportURL = ngAuthSettings.appURL + "ViewsStatic/XtraReport.aspx?"
        var authService = angular.element(document).injector().invoke(function (authService) { return authService; });
        var userId = "0";
        if (authService.authentication !== undefined && authService.authentication.userId !== undefined && authService.authentication.userId !== "")
            userId = authService.authentication.userId.toString();
        var postData = { "ReportRequestId": "0", "ReportDetailId": reportId, "ObjectState": 1, "Status": 0, "Source": report.reportFrom };
        dataservice.postServerData("ReportsSave", postData).then(function (data) {
            report.title = data.title || report.title || "";
            report.export = report.export || "false";

            if (report.parameters !== undefined && report.parameters !== null && report.parameters.length !== 0)
                report.source = reportURL + "r=" + data.GuId + "&rp=" + JSON.stringify(report.parameters) + "&export=" + report.export + "&title=" + report.title + "&userid=" + userId;
            else
                report.source = reportURL + "r=" + data.GuId + "&export=" + report.export + "&title=" + report.title + "&userid=" + userId ;

            callback(data);
        });
    };

    var chartSetting = function (el, data, scope) {
        org_chart = null;
        var chart = $($(el).find("div[type='orgChart']")[0]);
        //chart.orgChart("destroy");

        org_chart = chart.orgChart({
            modelId: data.modelId,
            data: data.data,
            showControls: data.showControls,
            allowEdit: data.allowEdit,
            newNodeText: data.newNodeText,
            dragAndDrop: data.dragAndDrop,
            panelHeight: data.panelHeight,
            entryType: data.entryType,
            firstLevel: data.firstLevel,
            nextLevel: data.nextLevel,
            onAddNode: function (event, element, view) {
                if (scope.navconData.chartActionClick !== null) {
                    scope.navconData.chartActionClick("Add", scope.type, event, org_chart.opts.data, org_chart, function (data) {
                        org_chart.newNode(event.data.id);
                    });
                }
                else
                    org_chart.newNode(event.data.id);
            },
            onUpdateNode: function (event, element, view) {
                if (scope.navconData.chartActionClick !== null) {
                    scope.navconData.chartActionClick("Save", scope.type, event, org_chart.opts.data, org_chart);
                }
            },
            onDeleteNode: function (node) {
                //log('Deleted node '+node.data.id);
                org_chart.deleteNode(node.data.id);

                if (scope.navconData.chartActionClick !== null) {
                    scope.navconData.chartActionClick("Delete", scope.type, node.data, org_chart.opts.data, org_chart);
                }
            },
            onClickNode: function (node) {
                //log('Clicked node '+node.data.id);
                //alert("test: node clicked");
            },
            onData: function (data) {
                this.data = data;
            }
        });
    };

    var treeSetting = function (el, options, scope, fields, isExpand) {
        var self = this;
        self.options = options;
        self.scope = scope;
        self.fields = fields;
        self.isExpand = isExpand;

        self.tree = $($(el).find("div[type='tree']")[0]);
        self.tree.jstree("destroy");

        self.tree.jstree({
            core: options.core,
            grid: options.grid,
            search: { "show_only_matches": true },
            plugins: options.plugins !== undefined ? options.plugins : ['grid', 'types', 'search'],
            checkbox: options.checkbox
        });



        self.tree.bind("select_node.jstree", function (evt, data) {
            self.scope.type = $(event.target).parents('navcon-tree').first().attr("type") || scope.type;

            var target = $(event.target);

            //setViewContentDisabled("");

            if (target.is('.fa-trash-o')) {
                //if (target.parent() !== null && target.parent().attr("disbled") === "disabled") return true;

                self.scope.navconData.treeActionClick("delete", self.scope.type, data, self.tree);
                return true;
            }
            else if (target.is('.fa-eye')) {
                self.scope.navconData.treeActionClick("view", self.scope.type, data, self.tree);
                //setViewContentDisabled("view");
                return true;
            }
            else if (target.is('.fa-file-o')) {
                self.scope.navconData.treeActionClick("add", self.scope.type, data, self.tree);
                return true;
            }
            else if (target.is('.fa-edit')) {
                //if (target.parent() !== null && target.parent().attr("disbled") === "disabled") return true;

                self.scope.navconData.treeActionClick("edit", self.scope.type, data, self.tree);
                return true;
            }
            else if (target.is('.fa-angle-down')) {
                if (target.parent().parent().parent().find(".dropdown") === undefined || target.parent().parent().parent().find(".dropdown").length === 0) {
                    target.wrap("<ul class='nav pull-right' ><li class='dropdown dropdown-extended dropdown-tasks'><a href='javascript:;' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'></a><li></ul>");
                    target.parent().parent().append('<ul class="dropdown-menu extended tasks" id="' + self.scope.type + 'data"></ul>');
                    for (i = 0; i < data.node.data.actiondata.length; i++)
                        target.parent().parent().find("[id=" + self.scope.type + "data]").append('<li class="external"><div class="h4 text-center">' + data.node.data.actiondata[i] + '</div></li>');
                }

                $("[type=" + self.scope.type + "]").find('.nav').each(function () {
                    $(this).css("position", "inherit");
                });
                target.parent().parent().parent().css("position", "fixed");

                $("[type=" + self.scope.type + "]").find('.nav a').each(function () {
                    $(this).css("display", "block");
                });
                target.parent().css("display", "none");

            }
            else if (target.is('.h4.text-center')) {
                self.scope.navconData.treeActionClick("actiondata", target.text(), data, self.tree);
                return true;
            }
            else {
                if ($(event.target).find("OPTION").length > 0) {
                    $(event.target).focus();
                    return false;
                }
                if ($(event.target).find(".nav").children().length > 0) {
                    $("[type='" + self.scope.type + "']").find('.nav').each(function () {
                        $(this).css("position", "inherit");
                    });

                    $("[type='" + self.scope.type + "']").find('.nav a').each(function () {
                        $(this).css("display", "block");
                    });
                }
                if (self.scope.navconData.treeActionClick !== undefined)
                    self.scope.navconData.treeActionClick("cellClick", data.node.text, data, self.tree);
            }

            if (self.scope.navconData.treeActionClick !== undefined)
                self.scope.navconData.treeActionClick("cellClick", self.scope.type, data.node.text, data, self.tree, target);
        });

        self.tree.bind("init.jstree", function (event) {

        });

        //self.tree.bind("changed.jstree", function (event,data) {
        //    setApprvoedTreeeColumnOptions(self.scope.type, self.options);
        //});


        self.tree.bind("loaded.jstree", function (event, data) {
            self.treeClickEvent();

            if (self.isExpand === "true" || self.isExpand === true) {
                self.tree.jstree('open_all');
            } else {
                self.tree.jstree('close_all');
            }

            setDisabledEnabledByRights(scope.navconData.rights);
            var viewMode = scope.navconData[scope.fieldSet].mode === undefined ? "" : scope.navconData[scope.fieldSet].mode;
            setViewContentDisabled(viewMode.toLowerCase() === "print" ? "view" : viewMode);
            //setApprvoedTreeeColumnOptions(self.scope.type,self.options);
        });

        self.tree.bind("loaded_grid.jstree", function (event, data) {
            //console.log(data);
            //setApprvoedTreeeColumnOptions(self.scope.type, self.options);
        });

        self.tree.bind("after_open.jstree", function (event, data) {
            //console.log(event);
            self.treeClickEvent();

            setDisabledEnabledByRights(scope.navconData.rights);
            //setViewContentDisabled(scope.navconData[scope.fieldSet].mode);
            //setApprvoedTreeeColumnOptions(self.scope.type,self.options);
        });

        self.tree.bind("redraw.jstree", function (evt, data) {
            self.data = data;
            self.treeClickEvent();
            setDisabledEnabledByRights(scope.navconData.rights);
            //setViewContentDisabled(scope.navconData[scope.fieldSet].mode);
            //setApprvoedTreeeColumnOptions(self.scope.type, self.options);
        });

        self.tree.bind("create_node.jstree", function (evt, data) {
            self.data = data;
            self.treeClickEvent();
            setDisabledEnabledByRights(scope.navconData.rights);
            //setViewContentDisabled(scope.navconData[scope.fieldSet].mode);
            //setApprvoedTreeeColumnOptions(self.scope.type, self.options);
        });

        self.treeClickEvent = function () {

            $('.jstree-grid-midwrapper').find('input[type=checkbox]').click(function (event, tt) {
                //console.log("click-checkbox");
                var header = $($($(event.currentTarget.offsetParent).parent().children()[0]).find('div')[0]).text();
                var node = self.data.instance.get_node($(event.currentTarget.offsetParent).attr('data-jstreegrid'));
                var columns = self.data.instance._gridSettings.columns;
                var field = self.getColumnValue(header, columns);
                var value = false;
                if ($(event.target).attr("checked") === "checked")
                    value = true;
                var updValue = updateTreeData(self.data.instance.settings.core.data, (typeof node.id === "string" ? node.id : parseInt(node.id)), field, value);
                node.data[field] = value === true ? 1 : 0;
                if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                    self.scope.navconData.treeCellClick(node.id, field, value, node, self.tree, $(this))
            });

            $('.jstree-grid-midwrapper').find('input[type=text]').click(function (event, tt) {
                setTimeout(function () {
                    $(event.target).focus();
                })
            });

            $('.jstree-grid-midwrapper').find('textarea').click(function (event, tt) {
                //setTimeout(function () {
                //    $(event.target).focus();
                //})
            });

            $('.jstree-grid-midwrapper').find('select').click(function (event, tt) {
                setTimeout(function () {
                    $(event.target).focus();
                })
            });

            $('.jstree-grid-midwrapper').find('select').blur(function (event, tt) {
                $(this).attr("size", 1).css('z-index', '1');
            });

            $('.jstree-grid-midwrapper').find('select').focus(function (event, tt) {
                if ($(event.target).is('option')) return false;
                //$(event.target).css("left",$(event.target).parents('div').first().offset().left + "px");
                var expandto = $(event.target).find('option').length;
                if (expandto > 5) expandto = 5;
                $(this).attr("size", expandto).css('z-index', 2);
            });

            $('.jstree-grid-midwrapper').find('input[type=text]').blur(function (event, tt) {
                var header = $($($(event.currentTarget.offsetParent).parent().children()[0]).find('div')[0]).text();
                var node = self.data.instance.get_node($(event.currentTarget.offsetParent).attr('data-jstreegrid'));
                var columns = self.data.instance._gridSettings.columns;
                var field = self.getColumnValue(header, columns);
                var value = $(event.target).val();
                var updValue = updateTreeData(self.data.instance.settings.core.data, parseInt(node.id), field, value);
                node.data[field] = value;
                if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                    self.scope.navconData.treeCellClick(node.id, field, value, node, self.tree, $(this))
            });

            $('.jstree-grid-midwrapper').find('textarea').blur(function (event, tt) {
                var header = $($($(event.currentTarget.offsetParent).parent().children()[0]).find('div')[0]).text();
                var node = self.data.instance.get_node($(event.currentTarget.offsetParent).attr('data-jstreegrid'));
                var columns = self.data.instance._gridSettings.columns;
                var field = self.getColumnValue(header, columns);
                var value = $(event.target).val();
                var updValue = updateTreeData(self.data.instance.settings.core.data, parseInt(node.id), field, value);
                node.data[field] = value;
                if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                    self.scope.navconData.treeCellClick(node.id, field, value, node, self.tree, $(this))
            });

            $('.jstree-grid-midwrapper').find('select').change(function (event, tt) {
                $(this).attr("size", 1).css('z-index', '1');
                var header = $($(event.currentTarget.parentNode.parentNode).parent().children()[0]).text();
                var node = self.data.instance.get_node($(event.currentTarget.parentNode.parentNode).attr('data-jstreegrid'));
                var columns = self.data.instance._gridSettings.columns;
                var field = self.getColumnValue(header, columns);
                var value = $(event.target).val();
                var updValue = updateTreeData(self.data.instance.settings.core.data, parseInt(node.id), field, value);
                node.data[field] = value;
                if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                    self.scope.navconData.treeCellClick(node.id, field, value, node, self.tree, $(this))
            });

            //setApprvoedTreeeColumnOptions(self.scope.type, self.options);
        };

        self.getColumnValue = function (header, columns) {
            for (key in columns) {
                if (columns[key].value === undefined) continue;
                var colHeader = columns[key].header;
                var text = colHeader;
                if (colHeader.indexOf('<div') !== -1)
                    text = $(colHeader).text();
                if (text.toLowerCase().trim() === header.toLowerCase().trim()) {
                    if (!$.isFunction(columns[key].value))
                        return columns[key].value;
                    else
                        return columns[key].field;
                    break;
                }
            }
        };

        self.getTreeSelectedValue = function (value, targetValue) {
            if (value === undefined) return targetValue;
            var retVal = targetValue;
            if (value !== null && value.toString().indexOf('<input') !== -1) {
                var valueObj = $(value);
                if (valueObj.prop("type") === "checkbox") {
                    if ($(event.target).attr("checked") === "checked") {
                        $(valueObj).attr("checked", "checked");

                    } else {
                        if ($(valueObj).attr("checked") !== undefined) {
                            valueObj.removeAttr("checked");
                        }
                    }
                } else {
                    valueObj.attr("value", targetValue);
                }
                var modStr = valueObj.prop('outerHTML');
                retVal = modStr.replace(/"/gi, "'");
            }
            return retVal;
        };

    };

    var updateTreeData = function (data, id, field, value) {
        var returnValue = value;
        var items = data;
        if (items.length === 0) return;
        var treeData = getDataFromTree(items);
        for (var i = 0, len = treeData.length; i < len ; i++) {
            var item = treeData[i];
            if (!$.isEmptyObject(item)) {
                if (item.id !== undefined && (item.id === id || item.id.toString() === id.toString())) {
                    var retVal = self.getTreeSelectedValue(item.data[field], value);
                    item.data[field] = retVal;
                    return retVal;
                }
            }
        };
        return returnValue;
    };

    var getNodeFromTreeDataByField = function (items, field, value) {
        if (items.length === 0) return -1;
        var treeData = getDataFromTree(items);
        for (var i = 0, len = treeData.length; i < len ; i++) {
            var item = treeData[i];
            if (!$.isEmptyObject(item)) {
                if (item[field] !== undefined && item[field] !== null && (item[field] === value || item[field].toString() === value)) {
                    return item;
                }
            }
        }
        return -1;
    };

    var insertChildrenTreeData = function (data, id, node) {
        var items = data;
        if (items.length === 0) return;
        var treeData = getDataFromTree(items);
        for (var i = 0, len = treeData.length; i < len ; i++) {
            var item = treeData[i];
            if (!$.isEmptyObject(item)) {
                /*if (item.CommonId !== undefined)
                    item.id = item.CommonId;*/
                if (item.id !== undefined && (item.id === id || item.id.toString() === id)) {
                    if (item.children === undefined || item.children === null)
                        item.children = [];
                    item.children.push(node);
                    return true;
                }
            }
        }
        return false;
    };

    var chooseTree = function (type, checkedData, targetType, targetData, vm, callback, insNode) {
        var tree = navcon.treeInstance(type);
        var targetTree = navcon.treeInstance(targetType);
        $(checkedData).each(function (index) {
            var currNode = tree.jstree().get_node(this);
            var checkInTarget = targetTree.jstree().get_node(this);
            if (!checkInTarget) {
                var parents = currNode.parents;
                for (var i = parents.length - 1; i >= 0 ; i--) {
                    var nodeId = parents[i];
                    if (nodeId === "#") continue;
                    var newNode = tree.jstree().get_node(nodeId);
                    var targetParent = targetTree.jstree().get_node(nodeId);
                    if (!targetParent) {
                        //create parent node
                        createNewTreeNode(newNode, tree, targetType, targetTree, targetData, vm, callback, insNode);
                    }
                }
                //create node
                createNewTreeNode(currNode, tree, targetType, targetTree, targetData, vm, callback, insNode);
            }
        })

        function createNewTreeNode(node, tree, targetType, targetTree, targetData, vm, callback, insNode) {
            var insNode = angular.copy(vm.pageConfig.trees[insNode]);
            //insNode.id = parseInt(node.id);
            insNode.id = node.id;
            insNode.ParentId = node.parent;
            //insNode.data.id = parseInt(node.id);
            insNode.data.id = node.id;
            insNode.data.ParentId = node.parent;
            insNode.text = node.text;
            if (vm[callback] !== undefined)
                insNode = vm[callback](tree, targetTree, targetData, insNode, node);

            var idExists = getNodeFromTreeDataByField(targetData, 'id', node.id);
            if (idExists === -1) {
                if (node.parent !== "#") {
                    var childrenIns = navcon.insertChildrenTreeData(targetData, node.parent, insNode)
                    if (!childrenIns)
                        targetData.push(insNode);
                }
                else
                    targetData.push(insNode);
            }
        }
    }

    var updateTreeNode = function (type, data, updatedNode, callback) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']").jstree(true);
        if (data.length === 0 && updatedNode === undefined) return;

        $.map(updatedNode, function (item, index) {
            //for (var k in item) {
            //if (k === "id" || item[k] === 0) continue;
            updateTreeDataByNode(data, item.id, item);
            //}
        });

        if (callback !== undefined) callback(data);

        return data;
    };

    var updateTreeDataByNode = function (items, id, targetNode, callback) {
        var retVal = 0;
        if (id !== undefined || id !== "")
            for (var i = 0; i < items.length; i++) {
                if (!$.isEmptyObject(items[i])) {
                    if (items[i].id.toString() === id.toString()) {
                        if (items[i] !== undefined && targetNode !== undefined)
                            items[i] = targetNode;

                        if (callback !== undefined) callback(true);
                        return 1;
                    }
                    if (items[i].children !== undefined && items[i].children !== null && items[i].children.length > 0) {
                        var found = updateTreeDataByNode(items[i].children, id, targetNode);
                        if (found === 1) {
                            retVal = 1;
                            break;
                        }
                    }
                }
            }
        return items;
    };

    //var removeNodeFromTree = function (type, items) {
    //    if (type !== undefined && items === undefined) {
    //        var targetTree = navcon.treeInstance(type);
    //        var insTree = targetTree.jstree();
    //        if (insTree !== undefined) {
    //            items = insTree.settings.core.data;
    //        }
    //    }

    //    var retVal = 0;
    //    for (var i = 0; i < items.length; i++) {
    //        if (!$.isEmptyObject(items[i])) {
    //            if (items[i].data !== undefined && items[i].data.Status !== undefined && items[i].data.Status.toString() === "1") {
    //                removeTreeNode(type, items[i]);
    //            }
    //            if (items[i].children !== undefined && items[i].children !== null && items[i].children.length > 0) {
    //                var found = reassignTreeData(type, items[i].children);
    //            }
    //        }
    //    }
    //    return items;
    //};

    var removeExistsTreeNode = function (sourceTreeType, targetTreeType, sourceTreeData, targetTreeData) {
        var targetTree = treeInstance(targetTreeType);
        var sourceTree = treeInstance(sourceTreeType);

        var treeData = getDataFromTree(targetTreeData);
        for (var i = 0, len = treeData.length; i < len ; i++) {
            var item = treeData[i];
            if (!$.isEmptyObject(item)) {
                /*if (item.CommonId !== undefined)
                    item.id = item.CommonId;*/
                if (item.id !== undefined) {
                    disableTreeNodeById(sourceTree, item.id, sourceTreeData);
                }
            }
        }
    };

    var disableTreeNodeById = function (sourceTree, id, sourceTreeData) {
        for (var i = 0; i < sourceTreeData.length; i++) {
            var item = sourceTreeData[i];
            if (item.id !== undefined && (item.id === id || item.id.toString() === id)) {
                if (item.state === undefined) item.state = {};
                item.state["disabled"] = true;
                if (item.children !== null && item.children.length <= 0)
                    item.state["selected"] = true;
                break;
            } else {
                if (item.children !== undefined && item.children !== null && item.children.length > 0) {
                    disableTreeNodeById(sourceTree, id, item.children);
                }
            }
        }
    };

    var getDataFromTree = function (items, data, seqNo) {
        if (data === undefined || data === "")
            data = [];
        $.map(items, function (item, index) {
            if (!$.isEmptyObject(item)) {
                if (seqNo !== undefined) {
                    item.data['SeqNo'] = seqNo;
                    seqNo++;
                }
                data.push(item)
                if (item.children !== undefined && item.children !== null && item.children.length > 0) {
                    getDataFromTree(item.children, data, 0);
                }
            }
        });

        return data;
    };


    var getTextFromTree = function (items, data, parent) {
        var text = "";
        $.map(items, function (item, index) {
            if (!$.isEmptyObject(item)) {
                var parentID = "";
                if (data === "") {
                    data = item.text;
                    parentID = "";
                } else if (parent === "#" && data !== "") {
                    data = data + ";" + item.text;
                    parentID = "";
                } else {
                    data = data + "\\" + item.text;
                    parentID = item.ParentId;
                }
                if (item.children !== undefined && item.children !== null && item.children.length > 0) {
                    data = getTextFromTree(item.children, data, parentID);
                }

            }
        });
        return data;
    };

    var updateTreeValueById = function (items, id, targetValue, key) {
        var retVal = 0;
        if (id !== undefined || id !== "")
            for (var i = 0; i < items.length; i++) {
                if (!$.isEmptyObject(items[i])) {
                    if (items[i].id === id) {
                        if (items[i].data[key] !== undefined && targetValue !== undefined)
                            items[i].data[key] = setCellControlValue(items[i].data[key], targetValue);
                        return 1;
                    }
                    if (items[i].children !== undefined && items[i].children !== null && items[i].children.length > 0) {
                        var found = updateTreeValueById(items[i].children, id, targetValue, key);
                        if (found === 1) {
                            retVal = 1;
                            break;
                        }
                    }
                }
            }
        return items;
    };

    var loadTreeData = function (type, data, targetData) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']").jstree(true);
        if (data.length === 0) return;
        $.map(JSON.parse(targetData), function (item, index) {
            for (var k in item) {
                if (k === "id" || item[k] === 0) continue;
                updateTreeValueById(data, item["id"], item[k], k);
            }

        });
        return data;
    };

    var treeInstance = function (type) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        return tree;
    }

    var getCheckedTreeNodes = function (type) {
        var tree = treeInstance(type);
        var data = tree.jstree('get_checked');
        return data;
    }

    var setTreeGridColumnValue = function (columns, item, obj) {
        $.map(columns, function (prop, key) {
            if (prop["value"] === undefined || (prop["save"] !== undefined && prop["save"] === false)) return;
            var field = "";
            if (!$.isFunction(prop["value"]))
                field = prop["value"].charAt(0).toUpperCase() + prop["value"].slice(1);
            else
                field = prop["field"].charAt(0).toUpperCase() + prop["field"].slice(1);

            if (field !== undefined && item.data[field] !== undefined) {
                var value = getCellControlValue(item.data[field]);
                obj[field] = value;
            }
        });

        return obj;
    };

    var getTreeData = function (type, field, mode, fields) {
        if (mode === undefined)
            mode = "save";

        var dataList = [];
        var treeData;
        var columns = "";
        var seqData = [];

        if (type !== undefined && type !== null && type !== "") {
            var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']").jstree(true);
            seqData = getDataFromTree(tree.get_json('#', { flat: false }), '', 0);
            treeData = getDataFromTree(tree.settings.core.data, '', 0);
            columns = tree._gridSettings.columns;
        } else {
            treeData = getDataFromTree(field.data, '', 0);
        }

        if (field.oldData !== undefined && field.oldData !== "") treeData = insertDeleteditems(treeData, getDataFromTree(field.oldData), "id", "tree");



        $.map(treeData, function (item, index) {
            var obj = {};
            if (!$.isEmptyObject(item)) {
                if (item['CommonId'] !== undefined && item['CommonId'] !== '')
                    item[field.id] = item['CommonId'];

                if (mode.toLowerCase() === "update") {
                    if (item[field.id] !== undefined)
                        obj[field.id] = item[field.id];
                    else
                        obj[field.id] = 0;

                    if (field.refkey !== undefined && item[field.refkey] !== undefined)
                        obj[field.refkey] = item[field.refkey];
                    else {
                        var refIndex = navcon.getItemIndexByProperty(fields, field.refkey);
                        if (refIndex !== undefined && refIndex !== -1) obj[field.refkey] = fields[refIndex].data;
                    }
                }
                else {
                    obj[field.id] = 0;
                }
                obj.id = item.id;
                obj.parentId = ((item.parent || item.ParentId) === "#" ? null : (item.parent || item.ParentId));
                obj.text = item.text || "";
                if (item.data !== undefined) {
                    if (columns !== undefined && columns !== "") {
                        obj = setTreeGridColumnValue(columns, item, obj);
                        if (mode.toLowerCase() === "update") {
                            if (field.refkey !== undefined && item[field.refkey] !== undefined)
                                obj[field.refkey] = item[field.refkey];
                            else {
                                var refIndex = navcon.getItemIndexByProperty(fields, field.refkey);
                                if (refIndex !== undefined && refIndex !== -1) obj[field.refkey] = fields[refIndex].data;
                            }
                        };
                    }
                    else { //Evaluation type data details assign
                        var fieldList = [];
                        $.map(item.data, function (key, index) {
                            if (index.toLowerCase() !== "$id") {
                                if (typeof key === "object")
                                    fieldList.push({ "type": "text", "key": index, "data": key[index] });
                                else if (index.toLowerCase() === "parentid") {
                                    if (key === "#")
                                        fieldList.push({ "type": "text", "key": index, "data": 0 });
                                    else
                                        fieldList.push({ "type": "text", "key": index, "data": parseInt(key) });
                                }
                                else
                                    fieldList.push({ "type": "text", "key": index, "data": key });
                            }
                        });
                        obj = getFieldsDataToSave(fieldList, mode, field.id);
                    }
                    if (mode.toLowerCase() === "save" || mode.toLowerCase() === "saveas") {
                        obj["ObjectState"] = (item.data["ObjectState"] !== undefined && item.data["ObjectState"].toString() !== "" && item.data["ObjectState"].toString() !== "0") ? parseInt(item.data["ObjectState"]) : 1;
                        obj["Status"] = (item.data["Status"] !== undefined && item.data["Status"].toString() !== "" && item.data["Status"].toString() !== "0") ? parseInt(item.data["Status"]) : 0;
                    }
                    else {
                        if (item[field.id] !== undefined)
                            obj["ObjectState"] = (item.data["ObjectState"] !== undefined && item.data["ObjectState"].toString() !== "" && item.data["ObjectState"].toString() !== "0") ? parseInt(item.data["ObjectState"]) : 2;
                        else
                            obj["ObjectState"] = (item.data["ObjectState"] !== undefined && item.data["ObjectState"].toString() !== "" && item.data["ObjectState"].toString() !== "0") ? parseInt(item.data["ObjectState"]) : 1;
                        obj["Status"] = (item.data["Status"] !== undefined && item.data["Status"].toString() !== "" && item.data["Status"].toString() !== "0") ? parseInt(item.data["Status"]) : 0;
                    }
                    obj['SeqNo'] = findSeqNo(seqData, obj.id);
                    dataList.push(obj);
                }
            }
        });
        return dataList;
    };

    var findSeqNo = function (seqData, id) {
        var value = $.grep(seqData, function (e) {
            return e['id'] === id.toString();
        });

        if (value.length > 0) {
            return value[0].data['SeqNo'];
        } else {
            return 0;
        }
    };

    var getCellControlValue = function (value) {
        if (value === null || value.indexOf === undefined) return value;
        var retVal = value;
        if (value.indexOf('<input') !== -1) {
            var valueObj = $(value);
            if (valueObj.prop("type") === "text") {
                retVal = valueObj.val();
            } else {
                if ($(valueObj).attr("checked") !== undefined)
                    retVal = 1;
                else
                    retVal = 0;
            }
        } else if (value.indexOf('<a') !== -1) {
            var valueObj = $(value);
            retVal = valueObj.text();
        }
        return retVal;
    };

    var setCellControlValue = function (value, targetValue) {
        var retVal = value;
        if (value.toString().indexOf('<input') !== -1) {
            var valueObj = $(value);
            if (targetValue === 1)
                valueObj.attr("checked", "checked");
            else
                valueObj.removeAttr("checked");

            var modStr = valueObj.prop('outerHTML');
            retVal = modStr.replace(/"/gi, "'");
        }
        return retVal;
    };

    var setValueToControl = function (value, targetValue) {
        var retVal = targetValue
        if (value.toString().indexOf('<input') !== -1) {
            var valueObj = $(value);
            valueObj.attr("value", targetValue);
            var modStr = valueObj.prop('outerHTML');
            retVal = modStr.replace(/"/gi, "'");
        }
        return retVal;
    };

    var getItemByProperty = function (items, key) {
        var value = $.grep(items, function (e) {
            return e.key === key;
        });

        if (value.length > 0)
            return value[0];
        else {
            //alert('item not found...');
            return -1;
        }
    };

    var getItemByKeyValue = function (items, key, value, lowercase) {
        if (items === null || items === undefined || items.length === undefined) return -1
        var value = $.grep(items, function (e) {
            if (lowercase !== undefined && lowercase)
                return e[key].toString().toLowerCase() === value.toString().toLowerCase();
            else
                return e[key] === value;
        });

        if (value.length > 0) {
            return value[0];
        }
        else {
            return -1;
        }
    };

    var getItemsFilterByKeyValue = function (items, key, value) {
        var value = $.grep(items, function (e) {
            return e[key] === value;
        });

        if (value.length > 0) {
            return value;
        }
        else {
            return [];
        }
    };


    var getItemsNotInOtherItems = function (items, notInItems, itemField, notInFiled) {
        var value = $.grep(items, function (e, i) {
            return e[itemField] !== undefined && getItemsFilterByKeyValue(notInItems, (notInFiled || itemField), e[itemField]).length === 0
        });
        return value;
    };


    var getItemsFilterByObject = function (items, object) {
        var value = $.grep(items, function (e) {
            var foundCount = 0;
            $.map(Object.keys(object), function (prop, key) {
                if (e[prop] === object[prop])
                    foundCount++;

            })
            return Object.keys(object).length === (foundCount);
        });

        if (value.length > 0) {
            return value;
        }
        else {
            return [];
        }
    };



    var getItemIndexByKeyValue = function (items, key, value) {
        var index = -1;
        var value = $.grep(items, function (e, i) {
            if (e[key] !== undefined && e[key] !== null && value !== undefined && value !== null) {
                if (e[key].toString() === value.toString()) {
                    index = i;
                    return;
                    /*} else if (e.children !== undefined && e.children !== null) {
                        arrayindex.push(i);
                        index = getItemIndexByKeyValue(e.children, key, value);
                        if (index !== -1) {
                            index = i;
                            return;
                        }*/
                }
            }
        });

        return index;

    };

    var getItemIndexByProperty = function (items, key) {
        if (items === undefined || items.length === 0) return;
        var index = -1;
        var value = $.grep(items, function (e, i) {
            if (e.key === key) {
                index = i;
                return;
            }
        });

        if (index != -1)
            return index;
        else {
            //alert('item not found...');
            return index;
        }
    };

    var closeModal = function (id) {
        navcon.setViewContentDisabled("");
        var smPadding = $(".page-sidebar-menu").css("padding");
        $(".page-sidebar-menu").css("padding", "0px");
        $(".page-sidebar-menu").css("padding", smPadding + "px");
        if (id !== undefined && id !== null && id !== '')
            $("div[id=" + id + "]").modal('hide');
    };

    var closeReport = function () {
        $('.modal').modal('hide');
    };

    var openModal = function (id, callback) {
        $('#' + id).modal({
            show: true
        });
        $('#' + id).on('shown.bs.modal', function (e) {
            if (callback !== undefined)
                return callback(true);
            else
                return true;
        });
    };

    var getFieldsData = function (fields) {
        var obj = {};
        $.map(fields, function (item, index) {
            obj[item.key] = item.data;
        });
        return obj;
    };

    var setFieldFocus = function (fields) {
        var itemObj;
        var $rootScope = angular.element(document).injector().invoke(function ($rootScope) { return $rootScope; });
        var $timeout = angular.element(document).injector().invoke(function ($timeout) { return $timeout; });
        var $scope = angular.element(document).injector().invoke(function ($timeout) { return $scope; })

        $.map(fields, function (item, index) {
            if (item.templateOptions !== undefined && item.templateOptions.focus !== undefined) {
                item.templateOptions.focus = true;
                $timeout(function () {
                    $rootScope.$broadcast('SET-FOCUS', true);
                })
                return false;
            }
        });
    };

    var saveTables = function (vm, dataservice, type, fields, refId, refValue, popup, callback) {
        for (i = 0, len = fields.length; i < len; i++) {
            if (fields[i].type !== undefined && fields[i].type === 'table' && fields[i].name === type) {
                if (refId !== undefined) {
                    var refIndex = navcon.getItemIndexByProperty(vm[fields[i].field], refId);
                    vm[fields[i].field][refIndex].data = refValue;
                }

                var uploadData = false;
                if (fields[i].upload !== undefined && fields[i].upload !== null && fields[i].upload !== "")
                    uploadData = fields[i].upload;

                var data = navcon.save.saveOption(vm, dataservice, vm[fields[i].field].mode, type, vm[fields[i].tableDataField], vm[fields[i].field], "0", fields[i].id, fields[i].displayfield, 0, uploadData, popup, type, function (data) {
                    if (callback !== undefined) callback(data);
                });
                return data;
            }
        }
    };

    var addNewTables = function ($scope, vm, type, fields, pageConfig, callback) {
        if (pageConfig === undefined || pageConfig === null || pageConfig === "")
            pageConfig = vm.pageConfig;

        for (i = 0, len = fields.length; i < len; i++) {
            if (fields[i].type !== undefined && fields[i].type === 'table' && fields[i].name === type) {
                var title = fields[i].title;
                vm[fields[i].field]["mode"] = "Save";
                var subFormTitle = navcon.save.addNewOption($scope, pageConfig.fields[fields[i].field], vm[fields[i].field], title || "", "", function (data) {
                    if (callback !== undefined) callback(data);
                }, type);
                return subFormTitle;
            }
        }
    };

    var editTables = function ($scope, vm, type, fields, action, data, callback, popup) {
        for (i = 0, len = fields.length; i < len; i++) {
            if (fields[i].type !== undefined && fields[i].type === 'table' && fields[i].name === type) {
                var title = fields[i].title;

                //vm[fields[i].field]["mode"] = "Update";
                if (action.toLowerCase() === "edit") vm[fields[i].field]["mode"] = "Update";
                if (action.toLowerCase() === "delete") vm[fields[i].field]["mode"] = "Delete";
                if (action.toLowerCase() === "view") vm[fields[i].field]["mode"] = "Print";

                //vm.selectedChildRow = navcon.save.selectedRowIndex(vm[fields[i].tableDataField], data, fields[i].id);
                vm[fields[i].field].selectedRow = navcon.save.selectedRowIndex(vm[fields[i].tableDataField], data, fields[i].id);
                var primaryKey;
                if (fields[i].alternatekey !== undefined && fields[i].alternatekey !== "")
                    primaryKey = fields[i].alternatekey;
                else
                    primaryKey = fields[i].id;

                var returnData = null;
                $scope.$apply(function () {
                    returnData = navcon.save.viewOption($scope, action, type, vm[fields[i].tableDataField], vm[fields[i].field], data, primaryKey, fields[i].displayfield, undefined, false,
                        function (data) {
                            if (callback !== undefined) callback(data);
                        }, "", popup);
                });

                return returnData;
            }
        }
    };

    var updateTableEditorData = function (data, field, $scope, isDisabled, vm) {
        var itemList = [];
        var value = angular.copy(data);
        if (value === null || value === undefined) return itemList;

        for (var i = 0, len = value.length; i < len; i++) {
            var setting = angular.copy($scope[field.templateOptions.settings]);
            var item = value[i];
            var retData = {};
            retData.fields = angular.copy(updateFieldsData(setting.fields, item, $scope, isDisabled, vm));
            retData.fields.sno = (i + 1);
            itemList.push(retData);
        }
        return itemList;
    };

    var updateFieldsData = function (fields, item, $scope, isDisabled, vm) {
        toolTipSetting();
        for (var key in fields) {
            var field = fields[key];
            var keyName = field.key;

            if (item !== null && item[keyName] === undefined) {
                if (field.alternatekey !== undefined && field.alternatekey !== "")
                    keyName = field.alternatekey;
            }
            if (keyName == "fuattachments") {
                keyName = keyName;
            }

            if (field.type != undefined && field.type.toLowerCase() === "label" && field.alternateType != undefined && field.alternateType.toLowerCase() === "lastupdated") {
                if (item !== null && item["UpdatedBy"] !== undefined && item["LastUpdateDate"] !== undefined) {
                    if (fields.mode !== undefined && (fields.mode.toLowerCase() === "update" || fields.mode.toLowerCase() === "delete")) {
                        field.data = "Modified by " + item["UpdatedBy"].toString() + " on " + navcon.dateFromUTCToLocal(item["LastUpdateDate"]).toString();
                        field.templateOptions.label = "Modified by " + item["UpdatedBy"].toString() + " on " + navcon.dateFromUTCToLocal(item["LastUpdateDate"], "DD/MM/YYYY hh:mm:ss A").toString();
                    } else {
                        field.data = "";
                        field.templateOptions.label = "";
                    }
                }
            }

            if (item !== null && item[keyName] !== undefined) { //data collected from table
                if (field.type.toLowerCase() === "date" || (field.alternateType != undefined && field.alternateType.toLowerCase() === "date") || field.type.toLowerCase() === "kendodate") {
                    if (item[keyName] !== undefined && item[keyName] !== null && item[keyName] !== "" && item[keyName] !== "0")
                        field.data = navcon.dateFromUTCToLocal(item[keyName]);
                    else
                        field.data = "";
                } else if (field.type.toLowerCase() === "datetime" || field.type.toLowerCase() === "kendodatetime") {
                    if (field.templateOptions.timeonly !== undefined && field.templateOptions.timeonly)
                        field.data = item[keyName];
                    else
                        field.data = navcon.dateFromUTCToLocal(item[keyName], "DD/MM/YYYY HH:mm:ss");
                }
                else if (field.type.toLowerCase() === "select" || field.type.toLowerCase() === "kendoselect" || field.type.toLowerCase() === "kendocombobox") {
                    var itemList = -1;
                    field.selectOptions.item["isSelect"] = false;

                    if ((item[keyName] !== undefined && item[keyName] !== null) || (item[field.selectOptions.item.refField] !== undefined && item[field.selectOptions.item.refField] !== null))
                        itemList = getItemByKeyValue(field.selectOptions.items, (field.selectOptions.item.dataField || "id"), item[field.selectOptions.item.refField || keyName])
                    if (itemList === -1)
                        field.data = "";
                    else
                        field.data = itemList;
                } else if (field.type.toLowerCase() === "checkboxlist" || field.type.toLowerCase() === "groupcheckboxlist") {
                    //field.selectOptions.item["isSelect"] = false;
                    field.data = loadCheckBoxList(item[keyName], field, fields);
                } else if (field.type.toLowerCase() === "multiselect" || field.type.toLowerCase() === "multiselectcheckbox" || field.type.toLowerCase() === "kendomultiselect") {
                    field.selectOptions.item["isSelect"] = false;
                    field.data = loadMultiSelect(item[keyName], field);
                } else if (field.type.toLowerCase() === "fileupload") {
                    field.data = item[keyName];
                    if (isDisabled !== undefined) field.ischangeable = !isDisabled;
                    if (field.readonly !== undefined && field.readonly) field.ischangeable = !field.readonly;
                } else if (field.type.toLowerCase() === "tableeditor") {
                    field.data = updateTableEditorData(item[keyName], field, $scope, isDisabled, vm);
                } else if (field.type.toLowerCase() === "table") {
                    if ($scope !== undefined && $scope[field.tableDataField] !== undefined) $scope[field.tableDataField].data = [];
                    if ($scope !== undefined && $scope.navconData !== undefined && $scope.navconData[field.tableDataField] !== undefined) $scope.navconData[field.tableDataField].data = [];
                    if (vm !== undefined && vm[field.tableDataField] !== undefined) vm[field.tableDataField].data = [];
                    if (vm !== undefined && vm[field.tableDataField] === undefined && vm[field.field] !== undefined) navcon.clearFieldsData(vm[field.field], $scope, false);

                    if (item[keyName] !== undefined && item[keyName] !== null && $scope[field.tableDataField] !== undefined) {
                        $scope[field.tableDataField].data = item[keyName];
                        $scope[field.tableDataField].oldData = angular.copy(item[keyName]);
                    } else if (item[keyName] !== undefined && item[keyName] !== null && $scope !== undefined && $scope.navconData !== undefined && $scope.navconData[field.tableDataField] !== undefined) {
                        $scope.navconData[field.tableDataField].data = item[keyName];
                        $scope.navconData[field.tableDataField].oldData = angular.copy(item[keyName]);
                    } else if (item[keyName] !== undefined && item[keyName] !== null && vm !== undefined && vm[field.tableDataField] !== undefined) {
                        vm[field.tableDataField].data = item[keyName];
                        vm[field.tableDataField].oldData = angular.copy(item[keyName]);

                        if (field.childrenField !== undefined && field.childrenField && item[keyName][0] !== undefined && item[keyName][0] !== null)
                            updateFieldsData(vm[field.field], item[keyName][0], $scope, isDisabled, vm);
                    } else if (vm !== undefined && vm[field.field] !== undefined) {
                        //} else if (item[keyName] !== undefined && item[keyName] !== null && vm !== undefined && vm[field.field] !== undefined) {
                        if (typeof item[keyName] === "object")
                            updateFieldsData(vm[field.field], item[keyName], $scope, isDisabled, vm);
                        else
                            updateFieldsData(vm[field.field], item[keyName][0], $scope, isDisabled, vm);
                    }

                    field.data = item[keyName];
                } else if (field.type.toLowerCase() === "tree" || field.type.toLowerCase() === "evaluation") {
                    if (vm === undefined) vm = $scope;
                    if (item[keyName] !== undefined && item[keyName] !== null && vm[field.treeDataField]) {
                        vm[field.treeDataField].core.data = [];
                        vm[field.treeDataField].core.data = item[keyName];
                        if (field.name !== undefined && field.name !== "")
                            vm[field.treeDataField].core.treeType = field.name;
                        vm[field.treeDataField].core.oldData = angular.copy(item[keyName]);
                        field.data = item[keyName];
                    }
                }
                else if (field.type.toLowerCase() === "rating") {
                    if (item[keyName] === null)
                        field.data = 0;
                    else
                        field.data = item[keyName];
                }
                else {
                    if (item[keyName] != null && item[keyName] !== undefined) field.data = item[keyName] == null ? "" : item[keyName];
                }

                if (isDisabled !== undefined) field.disabled = isDisabled;
                if (field.readonly !== undefined && field.readonly) field.disabled = field.readonly;
            } else if (item !== null && item[key] !== undefined) {//data collected from common fields
                if (item[key].data !== undefined) {
                    if (item[key] != null && item[key] !== undefined) field.data = item[key].data;

                    if (field.type.toLowerCase() === "fileupload") {
                        if (isDisabled !== undefined) field.ischangeable = !isDisabled;
                        if (field.readonly !== undefined && field.readonly) field.ischangeable = !field.readonly;
                    }

                    if (isDisabled !== undefined) field.disabled = isDisabled;
                    if (field.readonly !== undefined && field.readonly) field.disabled = field.readonly;
                }
            } else {
                if (item !== null && item.data !== undefined) {//data collected from tree / subchild
                    if (item.data[keyName] !== undefined) {
                        $scope.$apply(function () {
                            field.data = item.data[keyName];

                            if (isDisabled !== undefined) field.disabled = isDisabled;
                            if (field.readonly !== undefined && field.readonly) field.disabled = field.readonly;
                        });
                    }
                }
            }

            if (isDisabled !== undefined) field.disabled = isDisabled;
            if (field.readonly !== undefined && field.readonly) field.disabled = field.readonly;

            field.oldData = angular.copy(field.data);

            if (field.readOnlyText != undefined) {
                field.readOnlyText = displayreadonlyField(field);
            }
            else if (field.type != undefined) {
                if (field.type != undefined && field.type.toLowerCase() === "radio") {
                    $.each(field.templateOptions.items, function (key, item) {
                        if (item.value == field.data) {
                            field.readOnlyText = item.label;
                        }
                    })

                }
                else {
                    var result = displayField(field);
                    if (result.oldData != undefined) {
                        field.readOnlyText = result.data;
                    } else {
                        field.readOnlyText = result;
                    }

                }

            }
        }
        return fields;
    };

    function displayreadonlyField(item) {
        var returnValue = item.data;
        if (item.type === "select" || item.type === "kendoselect" || item.type === "kendocombobox") {
            returnValue = item.data[item.selectOptions.item.displayField];
        } else if (item.type === "multiselect" || item.type === "multiselectcheckbox" || item.type.toLowerCase() === "kendomultiselect") {
            var list = [];
            if (item.data == undefined || item.data == "" || item.data == null) {
                item.data = [];
            }
            for (var i = 0, len = item.data.length; i < len; i++) {
                var obj = item.data[i];
                list.push(obj[item.selectOptions.item.displayField])
            }
            returnValue = list.join("; ");
        } else if (item.type === "checkbox") {
            if (item.data || item.data === 1 || item.data === "true")
                returnValue = item.templateOptions.suffixLabel;
            else {
                if (item.templateOptions.suffixLabelfalse !== undefined)
                    returnValue = item.templateOptions.suffixLabelfalse;
                else
                    returnValue = "No";
            }
        } else if (item.type === "radio") {
            var items = item.templateOptions.items;
            var findObj = navcon.getItemByKeyValue(items, "value", item.data);
            if (findObj !== -1) {
                if (item.templateOptions.suffixLabelfalse !== undefined)
                    returnValue = findObj.suffixLabel;
                else
                    returnValue = findObj.label;
            } else {
                if (item.templateOptions.suffixLabelfalse !== undefined)
                    returnValue = items[0].suffixLabel;
                else
                    returnValue = item.data;
            }
        }
        else {
            returnValue = item.data;
        }
        if (returnValue != undefined) {
            returnValue.data = returnValue.data != undefined ? returnValue.data : ""
            returnValue.oldData = returnValue.oldData != undefined ? returnValue.oldData : ""
            if (returnValue.data == "" && returnValue.oldData == "") {
                returnValue = "";
            }
        }
        return returnValue != undefined ? returnValue : "";
    };

    var loadMultiSelect = function (items, field) {
        if (items === undefined || items === null || items === "")
            return;
        var list = [];
        $.map(items, function (item, key) {
            var objValue = getItemByKeyValue(field.selectOptions.items, (field.selectOptions.item.dataField || "id"), item[(field.selectOptions.item.dataField || "id")]);
            if (objValue === -1) {
                list.push(item);
            } else {
                if (field["altkey"] !== undefined)
                    objValue[field["altkey"]] = item[field["altkey"]];

                if (field["refkey"] !== undefined)
                    objValue[field["refkey"]] = item[field["refkey"]];
                list.push(objValue);
            }
        });
        return list;
    }

    var loadCheckBoxList = function (items, field, fields) {
        if (items === undefined || items === null || items === "") return;
        var list = [];
        var fieldData = field.data;
        var refId = "";
        if (field.listDisplay !== undefined && field.listDisplay) {
            $.map(fields, function (fieldItem, index) {
                if ((fieldItem.type === "checkboxlist" || fieldItem.type === "groupcheckboxlist") && fieldItem.listDisplay !== undefined && fieldItem.listDisplay && fieldItem.group !== undefined) {
                    $.map(fieldItem.data, function (dataItem, dataIndex) {
                        var eventIndex = getItemIndexByKeyValue(items, (field.templateOptions.item.dataField || "EventID"), dataItem[(field.templateOptions.item.dataField || "EventID")])
                        if (eventIndex !== -1 && fieldItem.group.indexOf(dataItem.EventSection) !== -1) {
                            dataItem.value = true;
                        }
                    })
                }
            });
        } else {
            $.map(items, function (item, key) {
                var groupObject = getItemByKeyValue(fieldData, (field.templateOptions.item.dataField || "ParentID"), item[(field.templateOptions.item.groupField || "ParentID")]);
                if (groupObject !== undefined && groupObject !== -1) {

                    var eventIndex = getItemIndexByKeyValue(groupObject.data, (field.templateOptions.item.dataField || "EventID"), item[(field.templateOptions.item.dataField || "EventID")]);
                    if (eventIndex !== undefined && eventIndex !== -1) {
                        var EventName = groupObject.data[eventIndex].EventName;
                        groupObject.data[eventIndex] = item;
                        groupObject.data[eventIndex].EventName = EventName;
                        groupObject.data[eventIndex].value = true;
                    }
                }
            });
        }
        return fieldData;
    }

    var insertDeleteditems = function (newItems, oldItems, tableKey, controlType) {
        if (oldItems === undefined) return newItems;
        if (controlType !== "tableEditor") {
            $.map(oldItems, function (item, key) {
                if (item['CommonId'] !== undefined && item['CommonId'] !== '') {
                    item[tableKey] = item['CommonId'];
                    tableKey = 'CommonId';
                }

                var value = getItemByKeyValue(newItems, tableKey, item[tableKey]);
                if (value === -1) {
                    if (controlType !== undefined && controlType !== "" && controlType.toString().toLowerCase() === "tree") {
                        item.data["ObjectState"] = 2;
                        item.data["Status"] = 1;
                    }

                    item["ObjectState"] = 2;
                    item["Status"] = 1;
                    if (controlType !== undefined && controlType !== "" && controlType.toString().toLowerCase() === "table") {
                        item["ObjectState"] = 2;
                        item["Status"] = 1;
                    }
                    newItems.push(item);
                }

            });

        }
        else if (controlType === "tableEditor") {
            var olditemList = [];
            var oldPrimaryKey = [];
            var newPrimaryKey = [];
            for (var i = 0, len = oldItems.length; i < len; i++) {
                var item = oldItems[i];
                var retSata = getFieldsDataToSave(item.fields, 'Update', tableKey);

                olditemList.push(retSata);
                oldPrimaryKey.push(retSata[tableKey]);
            }

            for (var j = 0; j < newItems.length; j++) {
                var item = newItems[j];
                newPrimaryKey.push(item[tableKey])
            }

            for (var j = 0; j < oldPrimaryKey.length; j++) {
                if (newPrimaryKey.indexOf(oldPrimaryKey[j]) === -1) {
                    olditemList[j].ObjectState = 2;
                    olditemList[j].Status = 1;
                    newItems.push(olditemList[j])
                }
            }

        }
        return newItems;
    };

    var getFieldsColumn = function (columns) {
        var obj = {};
        if (columns.length > 0) {
            $.map(columns, function (item, key) {
                if (item.data !== null) {
                    obj[item.data] = "";
                }
            });
        }
        return obj;
    };

    var clearKeyVakues = function (object) {
        for (key in object) {
            object[key] = "";
        }
        return object;
    };

    var addDataList = function (vm, fields, tableOptions, uniqueKey) {
        var item = navcon.getFieldsData(fields);
        var items = tableOptions;
        var tableData = {};
        if (items.data.length > 0) {
            var index = getItemIndexByKeyValue(items.data, uniqueKey, item[uniqueKey]);
            if (index !== -1) {
                tableData = items.data[index];
                items.data.splice(index, 1);
            } else {
                tableData = getFieldsColumn(items.columns);
                $.extend(tableData, item);
            }

            $.map(Object.keys(item), function (prop, key) {
                if (item[prop] !== undefined) {
                    var field = fields[key];
                    if (field.type.toUpperCase() === "SELECT")
                        tableData[prop] = tableData[prop].id || tableData[prop].Id || tableData[prop].code || tableData[prop].Code;
                    else if (field.type.toUpperCase() === "DATE") {
                        if (item[prop] !== undefined && item[prop] !== null && item[prop] !== "" && item[prop] !== "0")
                            tableData[prop] = navcon.dateToUTC(item[prop]);
                        else
                            tableData[prop] = "";
                    }
                    else
                        tableData[prop] = item[prop];
                }
            });
        } else {
            tableData = getFieldsColumn(items.columns);
            $.extend(tableData, item);
        }
        items.data.push(tableData);
        return tableData;
    };

    var getTableEditorData = function (data, mode, fieldItem, primaryKey, fields) {
        var itemList = [];
        var index = navcon.getItemIndexByProperty(fields, primaryKey);
        var primaryKeyValue = fields[index].data;
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            var retSata = getFieldsDataToSave(item.fields, mode, primaryKey);
            if (mode !== undefined && mode.toLowerCase() === "update") {
                // fieldItem.templateOptions.key = "CauseActiveFailureId";
                if (fieldItem.templateOptions.key !== undefined && fieldItem.templateOptions.key !== "") {
                    if (retSata[fieldItem.templateOptions.key] !== undefined && (retSata[fieldItem.templateOptions.key] === 0 || retSata[fieldItem.templateOptions.key] === "0")) {
                        retSata.ObjectState = 1;
                        if (retSata[primaryKey] !== undefined)
                            retSata[primaryKey] = primaryKeyValue;
                    }
                }
            }
            itemList.push(retSata);
        }
        //return itemList;
        if (mode.toLowerCase() === "save")
            return itemList;
        else {
            return insertDeleteditems(itemList, fieldItem.oldData, (fieldItem.templateOptions.key || 'id'), "tableEditor");
        }

    }

    var isSave = function (fields, editorsave) {
        var save = false
        if (editorsave !== undefined && editorsave !== "")
            save = editorsave;
        $.map(fields, function (item, index) {
            if (item.key.toLowerCase() !== "objectstate" || item.key.toLowerCase() !== "status") {
                if (item.type === "tableeditor") {
                    if ((item.data !== undefined)) {
                        for (var i = 0, len = item.data.length; i < len; i++) {
                            var data = item.data[i];
                            if (data.fields !== undefined)
                                save = isSave(data.fields, save);
                            if (save) return save;
                        }
                    }
                } else {
                    if (item.oldData !== undefined && JSON.stringify(angular.copy(item.oldData)) !== JSON.stringify(angular.copy(item.data))) {
                        save = true;
                        return save;
                    }
                }
            }
            if (save) return save;
        })
        return save;
    };

    var comparedata = function (fields, pagename, section, pkname, pkid, identifier, pushedData) {
        var changedItems;
        if (pushedData != undefined) {
            changedItems = pushedData;
        } else {
            changedItems = [];
        }
        var $rootScope = angular.element(document).injector().invoke(function ($rootScope) { return $rootScope; });
        var pagename = $rootScope.configHeaderMenu == 'bowtieanalysis' ? 'riskaggregation' : $rootScope.configHeaderMenu;
        var Batchdate = new Date();
        var keyword = identifier || "";
        // Batchdate = Batchdate.getTime();
        $.map(fields, function (item, index) {
            if (item.key.toLowerCase() !== "CompiledByIdName" && item.key.toLowerCase() !== "objectstate" && item.key.toLowerCase() !== "status" && !(item.key.toLowerCase().indexOf("itarwarning") != -1)) {
                if (item.type === "tableeditor") {
                    if ((item.data !== undefined)) {
                        for (var i = 0, len = item.data.length; i < len; i++) {
                            var data = item.data[i];
                            if (data.fields !== undefined) {
                                var key = item.key;
                                var groupname = item.templateOptions.label != undefined ? item.templateOptions.label : "";
                                var temp = [];
                                $.each(data.fields, function (index, value) {
                                    if (value.key.toLowerCase() !== "objectstate" && value.key.toLowerCase() !== "status") {
                                        value.tableEditor = key;
                                        if (value.oldData == undefined) {
                                            value.oldData = "";
                                        }
                                        if (value.oldData !== undefined && value.data !== undefined && JSON.stringify(angular.copy(value.oldData)) !== JSON.stringify(angular.copy(value.data)) && value.name != undefined) {
                                            var returnData = displayField(value)
                                            //temp.push({ name: value.name, oldData: returnData.oldData, data: returnData.data });
                                            if (returnData.data == undefined) {
                                                returnData.data = "";
                                            }
                                            if (returnData.oldData == undefined) {
                                                returnData.oldData = "";
                                            }
                                            if (returnData.data != returnData.oldData)
                                                changedItems.push({ HistoryId: 0, Field: value.name.replace(':', ''), oldData: returnData.oldData, NewData: returnData.data, row: i + 1, SubSection: groupname, Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword })
                                        }
                                    }
                                });
                            }
                        }
                        // if (item.data.length < item.oldData.length) {
                        var oldPrimarkeys = [];
                        var curPrimarkeys = [];
                        if (item.oldData != undefined) {
                            for (var i = 0, len = item.oldData.length; i < len; i++) {
                                var data = item.oldData[i];
                                $.each(data.fields, function (index, value) {
                                    if (value.key === item.templateOptions.key) {
                                        oldPrimarkeys.push(value.data);
                                    }
                                })
                            }
                        }
                        for (var i = 0, len = item.data.length; i < len; i++) {
                            var curdata = item.data[i];
                            $.each(curdata.fields, function (index, value) {
                                if (value.key === item.templateOptions.key) {
                                    curPrimarkeys.push(value.data);
                                }
                            })
                        }

                        for (var j = 0; j < oldPrimarkeys.length; j++) {

                            // look for same thing in new array
                            if (curPrimarkeys.indexOf(oldPrimarkeys[j]) == -1)

                                for (var i = 0, len = item.oldData.length; i < len; i++) {
                                    var data = item.oldData[i];
                                    $.each(data.fields, function (index, value) {
                                        if (value.data === oldPrimarkeys[j]) {
                                            $.each(data.fields, function (i, valueData) {
                                                if (valueData.name !== undefined) {
                                                    var returnData = displayField(valueData);
                                                    changedItems.push({ HistoryId: 0, Field: valueData.name, oldData: returnData.oldData, NewData: 'Deleted', row: j + 1, SubSection: groupname, Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword })
                                                }
                                            })
                                        }
                                    })
                                }
                        }
                    }
                }

                else if (item.type === "table") {
                    if (item.oldData == undefined) {
                        item.oldData = "";
                    }

                    if ((item.data !== undefined)) {
                        var groupname = item.label != undefined ? item.label : "";
                        var oldPrimarkeys = [];
                        var curPrimarkeys = [];
                        for (var i = 0, len = item.oldData.length; i < len; i++) {
                            var data = item.oldData[i];
                            oldPrimarkeys.push(data[item.primaryKey]);

                        }
                        for (var i = 0, len = item.data.length; i < len; i++) {
                            var curdata = item.data[i];
                            curPrimarkeys.push(curdata[item.primaryKey]);
                        }
                        var InsertFields = item.InsertFields;
                        for (var j = 0; j < oldPrimarkeys.length; j++) {

                            // look for same thing in new array
                            if (curPrimarkeys.indexOf(oldPrimarkeys[j]) == -1) {
                                var data = item.oldData[j];

                                if (oldPrimarkeys[j] == data[item.primaryKey]) {
                                    $.each(InsertFields, function (key, itemValue) {
                                        var oldData = data[itemValue.field];
                                        changedItems.push({ HistoryId: 0, Field: itemValue.label, oldData: oldData, NewData: "Deleted", row: j + 1, SubSection: groupname, Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate })
                                    })
                                }
                            }
                        }
                        for (var j = 0; j < curPrimarkeys.length; j++) {

                            // look for same thing in new array
                            if (oldPrimarkeys.indexOf(curPrimarkeys[j]) == -1) {

                                var curdata = item.data[j];

                                if (curPrimarkeys[j] == curdata[item.primaryKey]) {
                                    $.each(InsertFields, function (key, itemValue) {
                                        var newData = curdata[itemValue.field];
                                        changedItems.push({ HistoryId: 0, Field: itemValue.label, oldData: '--', NewData: newData, row: j + 1, SubSection: groupname, Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword })
                                    })
                                }
                            }
                        }
                    }
                }
                else if (item.type === "fileupload") {
                    var oldFiles = "";
                    var newFiles = "";
                    if (item.oldData === undefined) {
                        oldFiles = "";
                        item.oldData = [];
                    }
                    if (item.oldData !== undefined && JSON.stringify(angular.copy(item.oldData)) !== JSON.stringify(angular.copy(item.data))) {

                        $.each(item.oldData, function (i, item) {

                            oldFiles += item.name + ",";
                        });
                        oldFiles = oldFiles.substring(0, oldFiles.length - 1);

                        $.each(item.data, function (k, newItem) {

                            newFiles += newItem.name + ",";

                        });
                        newFiles = newFiles.substring(0, newFiles.length - 1);
                        var returnData = displayField(item);

                        if ((item.data == undefined || item.data == "" || item.data.length == 0) && item.oldData.length == 0) {
                            return true;
                        }
                        changedItems.push({ HistoryId: 0, Field: item.templateOptions.label.replace(':', ''), oldData: oldFiles, NewData: newFiles, row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });

                    }
                }
                else if (item.type === "groupcheckboxlist") {
                    var oldarray = [];
                    var newarray = [];
                    var dataField = item.templateOptions.item.dataField;
                    var Fieldname = item.templateOptions.item.displayField;
                    if (item.oldData != undefined && item.oldData.length > 0) {
                        if (item.data != undefined && item.data.length > 0) {
                            $.each(item.oldData, function (index, valueData) {
                                oldarray = valueData;
                                $.each(item.data, function (index, itemData) {

                                    if (oldarray[dataField] == itemData[dataField] && itemData.value != undefined && itemData.value != oldarray.value) {
                                        changedItems.push({ HistoryId: 0, Field: itemData[Fieldname], oldData: oldarray.value == undefined ? 'unchecked' : (oldarray.value ? 'checked' : 'unchecked'), NewData: itemData.value ? 'checked' : 'unchecked', row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                                    }
                                });
                            })
                        }
                    }
                }
                else if (item.type === "checkboxlist") {
                    if (item.oldData != undefined && item.oldData.length > 0) {
                        if (item.data != undefined && item.data.length > 0) {
                            var oldDataArray = [];
                            var dataArray = [];
                            var dataField = item.templateOptions.item.dataField;
                            var Fieldname = item.templateOptions.item.displayField;
                            $.each(item.oldData, function (index, ValueData) {
                                oldDataArray = ValueData.data
                                if (oldDataArray == null) {
                                    oldDataArray = [];
                                }

                                $.each(item.data, function (index, value) {
                                    dataArray = value.data
                                    //  if (oldDataArray != null && dataArray != null) {
                                    if (dataArray == null) {
                                        dataArray = [];
                                    }
                                    $.each(oldDataArray, function (index, itemData) {
                                        $.each(dataArray, function (index, item) {
                                            if (item[dataField] == itemData[dataField] && item.value != itemData.value) {
                                                changedItems.push({ HistoryId: 0, Field: item[Fieldname], oldData: itemData.value ? 'checked' : 'unchecked', NewData: item.value ? 'checked' : 'unchecked', row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                                            }
                                        });
                                    });
                                    // }
                                });

                            });
                        }
                    }
                }
                else if (item.type == "multiselectcheckbox" || item.type.toLowerCase() === "kendomultiselect") {
                    if (item.oldData === undefined) {
                        item.oldData = "";
                    }

                    if (item.data === undefined) {
                        item.data = "";
                    }
                    var PrimaryId = item.selectOptions.item.dataField;


                    if (item.oldData != "" && item.data != "") {

                        var matcheddata = angular.copy(item.data);

                        $.each(matcheddata, function (masterindex, itemValue) {
                            $.each(item.oldData, function (keyIndex, itemData) {
                                if (itemValue != undefined && itemValue[PrimaryId] == itemData[PrimaryId]) {
                                    matcheddata.splice(masterindex, 1);
                                }
                            })
                        })

                        if (matcheddata.length > 0) {
                            var returnData = displayField(item);
                            if (returnData != undefined && returnData.data != returnData.oldData)
                                changedItems.push({ HistoryId: 0, Field: item.templateOptions.label.replace(':', ''), oldData: returnData.oldData, NewData: returnData.data, row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                        }

                        else if (item.oldData != undefined && item.oldData != "" && item.oldData.length > item.data.length) {
                            var matchedolddata = angular.copy(item.oldData);
                            $.each(matchedolddata, function (masterindex, itemValue) {
                                $.each(item.data, function (keyIndex, itemData) {
                                    if (itemValue != undefined && itemValue[PrimaryId] == itemData[PrimaryId]) {
                                        matchedolddata.splice(masterindex, 1);
                                    }
                                })
                            })
                            if (matchedolddata != undefined && matchedolddata.length > 0) {
                                var returnData = displayField(item);
                                if (returnData != undefined && returnData.data != returnData.oldData)
                                    changedItems.push({ HistoryId: 0, Field: item.templateOptions.label.replace(':', ''), oldData: returnData.oldData, NewData: returnData.data, row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                            }

                        }
                    }
                    else if (item.oldData == "" && item.data != "") {

                        var returnData = displayField(item);
                        if (returnData != undefined && returnData.data != returnData.oldData)
                            changedItems.push({ HistoryId: 0, Field: item.templateOptions.label.replace(':', ''), oldData: "", NewData: returnData.data, row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });

                    }
                    else if (item.oldData != "" && item.data == "") {

                        var returnData = displayField(item);
                        if (returnData != undefined && returnData.data != returnData.oldData)
                            changedItems.push({ HistoryId: 0, Field: item.templateOptions.label.replace(':', ''), oldData: returnData.oldData, NewData: "", row: "", SubSection: "", Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                    }
                }
                else if (item.type === "htmltable") {
                    var oldDataArray = [];
                    var dataArray = [];

                    if (item.oldData === undefined) {
                        item.oldData = [];
                    }

                    if (item.data === undefined) {
                        item.data = [];
                    }

                    var columns = item.columns;
                    var labelcolumns = item.labelcolumns;
                    var scopevariable = item.scopevariable || "";
                    var objecttype = item.objecttype || "";

                    if (scopevariable != undefined && scopevariable != "") {

                        var _scopevariable = angular.element('#' + scopevariable).scope().$parent;

                        var paneldata = _scopevariable.formManage[item.panelvariable];
                        if (paneldata != undefined) {
                            for (var m = 0; m < paneldata.length; m++) {
                                changedItems = comparedata(paneldata[m], pagename, section, pkname, pkid, identifier, changedItems)
                            }
                        }
                    }
                    else if (item.objecttype != undefined && item.objecttype != "") {
                        if (item.data != undefined && item.data != null) {
                            $.each(item.data, function (index, itemData) {
                                var parentSection = itemData[item.section];
                                var oldDataObject;
                                if (item.objecttype != undefined) {
                                    oldDataObject = item.oldData[index][objecttype];
                                } else {
                                    oldDataObject = item.oldData[index];
                                }

                                if (itemData[objecttype] != undefined) {
                                    $.each(itemData[objecttype], function (key, value) {
                                        var childSection = value[item.subsection];
                                        if (oldDataObject[key] != undefined) {
                                            for (var k = 0; k < columns.length; k++) {
                                                if (value[columns[k]] != oldDataObject[key][columns[k]]) {
                                                    changedItems.push({
                                                        HistoryId: 0,
                                                        Field: labelcolumns[k],
                                                        oldData: oldDataObject[key][columns[k]],
                                                        NewData: value[columns[k]],
                                                        row: "",
                                                        SubSection: childSection,
                                                        Page: pagename,
                                                        ObjectState: 0,
                                                        Section: parentSection,
                                                        PKName: pkname,
                                                        PKId: pkid,
                                                        Batch: Batchdate, keyword: keyword
                                                    });
                                                }
                                            }
                                        } else {
                                            for (var k = 0; k < columns.length; k++) {
                                                changedItems.push({
                                                    HistoryId: 0,
                                                    Field: labelcolumns[k],
                                                    oldData: "",
                                                    NewData: value[columns[k]],
                                                    row: "",
                                                    SubSection: childSection,
                                                    Page: pagename,
                                                    ObjectState: 0,
                                                    Section: parentSection,
                                                    PKName: pkname,
                                                    PKId: pkid,
                                                    Batch: Batchdate, keyword: keyword
                                                });
                                            }
                                        }
                                    })
                                }
                                else {
                                    var childSection = itemData[item.subsection];
                                    if (oldDataObject != undefined) {
                                        for (var k = 0; k < columns.length; k++) {
                                            if (itemData[columns[k]] != oldDataObject[columns[k]]) {
                                                changedItems.push({
                                                    HistoryId: 0,
                                                    Field: labelcolumns[k],
                                                    oldData: oldDataObject[columns[k]],
                                                    NewData: itemData[columns[k]],
                                                    row: "",
                                                    SubSection: childSection,
                                                    Page: pagename,
                                                    ObjectState: 0,
                                                    Section: parentSection,
                                                    PKName: pkname,
                                                    PKId: pkid,
                                                    Batch: Batchdate, keyword: keyword
                                                });
                                            }
                                        }
                                    }
                                    else {
                                        for (var k = 0; k < columns.length; k++) {
                                            changedItems.push({
                                                HistoryId: 0,
                                                Field: labelcolumns[k],
                                                oldData: "",
                                                NewData: itemData[columns[k]],
                                                row: "",
                                                SubSection: childSection,
                                                Page: pagename,
                                                ObjectState: 0,
                                                Section: parentSection,
                                                PKName: pkname,
                                                PKId: pkid,
                                                Batch: Batchdate, keyword: keyword
                                            });
                                        }
                                    }
                                }
                            })
                        }
                    }
                    else {
                        $.each(item.data, function (index, itemData) {
                            var oldDataObject = item.oldData[index];
                            if (oldDataObject == undefined) {
                                oldDataObject = [];
                            }
                            var parentSection = itemData[item.section];
                            for (var k = 0; k < columns.length; k++) {
                                if (itemData[columns[k]] != oldDataObject[columns[k]]) {
                                    changedItems.push({ HistoryId: 0, Field: labelcolumns[k], oldData: oldDataObject[columns[k]], NewData: itemData[columns[k]], row: "", SubSection: parentSection, Page: pagename, ObjectState: 0, Section: section, PKName: pkname, PKId: pkid, Batch: Batchdate, keyword: keyword });
                                }
                            }
                        })
                    }
                }
                else if (item.type === "tree") {
                    var oldDataArray = [];
                    var dataArray = [];

                    if (item.oldData === undefined) {
                        item.oldData = [];
                    }

                    if (item.data === undefined) {
                        item.data = [];
                    }
                    var objecttype = item.objecttype || "";
                    var childobject = item.childobject || "";
                    var columns = item.columns;
                    var labelcolumns = item.labelcolumns;

                    var scopevariable = item.scopevariable || "";
                    if (scopevariable != undefined && scopevariable != "") {

                        var _scopevariable = angular.element('#' + scopevariable).scope().$parent;

                        var treedata = _scopevariable.formManage[item.treevariable];
                        if (treedata != undefined && treedata.data != undefined) {
                            var curdata = treedata.data;
                            var prevdata = treedata.oldData;

                            if (curdata != undefined && curdata != "" && prevdata != undefined && prevdata != "") {
                                for (var index = 0; index < curdata.length; index++) {
                                    for (var col = 0; col < columns.length; col++) {
                                        if (curdata[index].data[columns[col]] != prevdata[index].data[columns[col]]) {
                                            changedItems.push({
                                                HistoryId: 0,
                                                Field: labelcolumns[col],
                                                oldData: prevdata[index].data[columns[col]],
                                                NewData: curdata[index].data[columns[col]],
                                                row: "",
                                                SubSection: curdata[index].text,
                                                Page: pagename,
                                                ObjectState: 0,
                                                Section: "",
                                                PKName: pkname,
                                                PKId: pkid,
                                                Batch: Batchdate,
                                                keyword: keyword
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (item.oldData === undefined) {
                        item.oldData = "";
                    }

                    if (item.data === undefined) {
                        item.data = "";
                    }

                    if (item.oldData !== undefined && JSON.stringify(angular.copy(item.oldData)) !== JSON.stringify(angular.copy(item.data)) && item.type.toLowerCase() !== "table" && item.type.toLowerCase() !== "label" && item.key.toLowerCase() !== "ITAR") {
                        var returnData = displayField(item);
                        if (returnData != undefined && returnData.data != returnData.oldData) {
                            if (returnData.data != undefined && returnData.data == 'AUTHORISED') {
                                returnData.data = 'AUTHORIZED'
                            }
                            changedItems.push({
                                HistoryId: 0,
                                Field: item.templateOptions.label.replace(':', ''),
                                oldData: returnData.oldData,
                                NewData: returnData.data,
                                row: "",
                                SubSection: "",
                                Page: pagename,
                                ObjectState: 0,
                                Section: section,
                                PKName: pkname,
                                PKId: pkid,
                                Batch: Batchdate,
                                keyword: keyword
                            });
                        }
                    }
                }
            }
        })
        return changedItems;
    };
    function getDifferences(oldObj, newObj) {
        var diff = {};

        for (var k in oldObj) {
            if (!(k in newObj))
                diff[k] = undefined;  // property gone so explicitly set it undefined
            else if (oldObj[k] !== newObj[k])
                diff[k] = newObj[k];  // property in both but has changed
        }

        for (k in newObj) {
            if (!(k in oldObj))
                diff[k] = newObj[k]; // property is new
        }

        return diff;
    }
    var BrowserDetect = function () {
        var nav = window.navigator,
        ua = window.navigator.userAgent.toLowerCase();
        // detect browsers (only the ones that have some kind of quirk we need to work around)
        if (ua.match(/ipad/i) !== null)
            return "iPod";
        if (ua.match(/iphone/i) !== null)
            return "iPhone";
        if (ua.match(/android/i) !== null)
            return "Android";
        if ((nav.appName.toLowerCase().indexOf("microsoft") != -1 || nav.appName.toLowerCase().match(/trident/gi) !== null))
            return "IE";
        if (ua.match(/chrome/gi) !== null)
            return "Chrome";
        if (ua.match(/firefox/gi) !== null)
            return "Firefox";
        if (ua.match(/webkit/gi) !== null)
            return "Webkit";
        if (ua.match(/gecko/gi) !== null)
            return "Gecko";
        if (ua.match(/opera/gi) !== null)
            return "Opera";
        //If any case miss we will return null
        return null
    }

    function displayField(item) {
        var returnValue = {};
        if (item.type === "select" || item.type === "kendoselect" || item.type === "kendocombobox") {
            returnValue.data = item.data[item.selectOptions.item.displayField];
            if (item.oldData != undefined && item.oldData != "") {
                returnValue.oldData = item.oldData[item.selectOptions.item.displayField];
            }
            else {
                returnValue.oldData = "";
            }

        } else if (item.type === "multiselect" || item.type === "multiselectcheckbox" || item.type.toLowerCase() === "kendomultiselect") {
            var list = [];
            var oldlist = [];
            if (item.data == undefined) item.data = [];
            for (var i = 0, len = item.data.length; i < len; i++) {
                var obj = item.data[i];
                var getdata = obj[item.selectOptions.item.displayField];
                if (item.selectOptions.item.secondDisplayField != undefined) {
                    getdata = obj[item.selectOptions.item.displayField] + '/' + obj[item.selectOptions.item.secondDisplayField];
                }
                list.push(getdata);
            }
            if (item.oldData != undefined && item.oldData != "") {
                for (var i = 0, len = item.oldData.length; i < len; i++) {
                    var obj = item.oldData[i];
                    var getdata = obj[item.selectOptions.item.displayField];
                    if (item.selectOptions.item.secondDisplayField != undefined) {
                        getdata = obj[item.selectOptions.item.displayField] + '/' + obj[item.selectOptions.item.secondDisplayField];
                    }
                    oldlist.push(getdata);
                }
            }
            else {
                oldlist = [];
            }
            returnValue.data = list.join("; ");
            returnValue.oldData = oldlist.join("; ");

        } else if (item.type === "checkbox") {
            if (item.oldData != undefined && item.oldData != "") {
                if (item.oldData || item.oldData === 1 || item.oldData === "true") {
                    returnValue.oldData = item.templateOptions.suffixLabel;
                }
            } else {
                returnValue.oldData = "";
            }

            if (item.data || item.data === 1 || item.data === "true") {
                returnValue.data = item.templateOptions.suffixLabel;
            }
            else {
                if (item.templateOptions.suffixLabelfalse !== undefined)
                    returnValue.data = item.templateOptions.suffixLabelfalse;
                else
                    returnValue.data = "No";
            }
        } else if (item.type === "radio") {
            var items = item.templateOptions.items;
            if (item.oldData != undefined && item.oldData != null && item.oldData.toString() != "") {
                var findobjold = getItemByKeyValue(items, "value", item.oldData);
                if (findobjold !== -1) {
                    returnValue.oldData = findobjold.label;
                } else {
                    returnValue.oldData = item.oldData;
                }
            } else {
                returnValue.oldData = "";
            }

            var findObj = getItemByKeyValue(items, "value", item.data);
            if (findObj !== -1) {
                returnValue.data = findObj.label;
            } else {
                returnValue.data = item.data;
            }
        }
        else {
            returnValue.data = item.data;
            if (item.oldData != undefined && item.oldData != "") {
                returnValue.oldData = item.oldData;
            } else {
                returnValue.oldData = "";
            }
        }

        if (returnValue != undefined) {
            returnValue.data = returnValue.data != undefined ? returnValue.data : ""
            returnValue.oldData = returnValue.oldData != undefined ? returnValue.oldData : ""
            if (returnValue.data == "" && returnValue.oldData == "") {
                returnValue = "";
            }
        }
        return returnValue != undefined ? returnValue : "";
    }

    var getFieldsDataToSave = function (fields, mode, key, upload) {
        var obj = {};
        var formData = new FormData();
        var type;
        $.map(fields, function (item, index) {
            if (item != undefined && item != null && item != "") {
                if (item.save !== undefined && item.save === false) return true;
                if (item.type != undefined) {
                    type = 0;
                    if (item.type.toLowerCase() === "select" || item.type.toLowerCase() === "kendoselect" || item.type.toLowerCase() === "kendocombobox") {
                        if (item.data == undefined) {
                            item.data = "";
                        }
                        var selectedData = (item.data[item.selectOptions.item.dataField] || item.data.Id || item.data.id);
                        obj[item.key] = (selectedData !== undefined && selectedData !== "" ? selectedData : null);
                    } else if (item.type.toLowerCase() === "tab") {
                        var selectedData = (item.data[item.selectOptions.item.dataField] || item.data.Id || item.data.id || item.data);
                        obj[item.key] = (selectedData !== undefined && selectedData !== "" ? selectedData : null);
                    } else if (item.type.toLowerCase() === "multiselect" || item.type.toLowerCase() === "multiselectcheckbox" || item.type.toLowerCase() === "kendomultiselect") {
                        obj[item.key] = updateMultiselectData(item, mode, fields, key);
                    } else if (item.type.toLowerCase() === "checkboxlist" || item.type.toLowerCase() === "groupcheckboxlist") {
                        obj[item.key] = updateCheckBoxListData(item, mode, fields, key);
                    } else if (item.type.toLowerCase() === "tableeditor") {
                        obj[item.key] = getTableEditorData(item.data, mode, item, key, fields);
                    } else if (item.type.toLowerCase() === "table") {
                        if (item.checkedField !== undefined && item.checkedField !== "" && item.checkedField.toString().toLowerCase() === "all") {
                            obj[item.key] = item.data;
                        }
                        else {
                            var checked = (item.checkedField === undefined || item.checkedField === '') ? false : true;
                            obj[item.key] = navcon.getTableData(item.name, '', checked, (item.id || ''), checked ? item.checkedField : '', item.oldData, mode);
                        }
                    } else if (item.type.toLowerCase() === "tree") {
                        obj[item.key] = getTreeData(item.name, item, mode, fields);
                    } else if (item.type.toLowerCase() === "evaluation") {
                        obj[item.key] = getTreeData("", item, mode, fields);
                    } else if (item.type.toLowerCase() === "checkbox") {
                        if (item.data === false || item.data === "" || item.data === undefined)
                            obj[item.key] = false;
                        else
                            obj[item.key] = true;
                    } else if (item.type.toLowerCase() === "radio") {
                        obj[item.key] = (item.data != undefined && item.data.toString() != "") ? item.data : null;
                    }
                    else if (item.type.toLowerCase() === "date" || item.type.toLowerCase() === "kendodate") {
                        if (item.data !== undefined && item.data !== null && item.data !== "" && item.data !== "0")
                            obj[item.key] = navcon.dateToUTC(item.data);
                        else
                            obj[item.key] = null;
                    } else if (item.type.toLowerCase() === "datetime" || item.type.toLowerCase() === "kendodatetime") {
                        if (item.data !== undefined && item.data !== null && item.data !== "" && item.data !== "0") {
                            if (item.templateOptions.timeonly !== undefined && item.templateOptions.timeonly)
                                obj[item.key] = item.data;
                            else
                                obj[item.key] = navcon.dateToUTC(item.data, "DD/MM/YYYY HH:mm:ss");
                        }
                        else
                            obj[item.key] = null;
                    } else if (item.type.toLowerCase() === "fileupload" || item.type.toLowerCase() === "photoupload") {
                        angular.forEach(item.data, function (f) {
                            if (f.status !== undefined && f.status === "new") {
                                var blob = base64ToBlob(f.base64, f.type);
                                formData.append("blob", blob, f.name);
                            }
                        });
                        obj[item.key] = item.data;
                        item.data = "";
                    } else {
                        if ((item.datatype !== undefined && item.datatype.toLowerCase() === "integer") && (item.data === undefined || item.data === null || item.data === ""))
                            obj[item.key] = null;
                            /*else if (item.data === "" || item.data === undefined)
                                obj[item.key] = null;*/
                        else
                            if (item.key == "History" || item.key == "HistoryRemarks") {
                                obj[item.key] = item.data == 0 ? "" : item.data;
                            }
                            else {
                                obj[item.key] = item.data === undefined ? "" : item.data;
                            }
                    }
                }
                else {
                    type = -1;
                }
            }
            else {
                type = -1;
            }
        });

        //if (mode !== undefined && mode.toLowerCase() === "save") {
        //    if (fields['objectstate'] !== undefined) fields['objectstate'] = 1;
        //    if (fields[key] !== undefined) fields[key] = 0;
        //} else if (mode !== undefined && mode.toLowerCase() === "update") {
        //    if (fields['objectstate'] !== undefined) fields['objectstate'] = 2;
        //}
        if (type === 0) {
            var objIndex = navcon.getItemIndexByProperty(fields, "ObjectState");
            if (mode !== undefined && mode.toLowerCase() === "save") {
                if (fields[objIndex] !== undefined && (obj.ObjectState === "" || obj.ObjectState === "0" || obj.ObjectState === 0)) obj.ObjectState = 1;
                if (fields[key] !== undefined) obj[key] = 0;
            } else if (mode !== undefined && mode.toLowerCase() === "update") {
                if (fields[objIndex] !== undefined && (obj.ObjectState === "" || obj.ObjectState === "0" || obj.ObjectState === 0)) obj.ObjectState = 2;
            }

            if (upload !== undefined && upload)
                obj["filesUpload"] = formData;

            return obj;
        }
        else {
            return fields;
        }
    };

    var base64ToBlob = function (b64Data, contentType) {
        var byteCharacters = atob(b64Data.split(',')[1]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: contentType });
        return blob;
    }

    var updateMultiselectData = function (item, mode, fields, key) {
        var list = [];
        if (item.data === undefined || item.data === "" || item.data === null) {
            item.data = [];
            return item.data;
        }
        $.map(item.data, function (value, index) {
            var obj = {};
            //obj[item.selectOptions.item.dataField || 'id'] = value[item.selectOptions.item.dataField] || value.Id;
            obj[item.selectOptions.item.dataField || 'id'] = value[item.selectOptions.item.dataField || 'Id'];

            if ((mode.toLowerCase() === "save" || mode.toLowerCase() === "saveas") && value[item.altkey || 'Id'] == 0) {
                obj.ObjectState = 1;
            } else {
                //retData = navcon.getItemByKeyValue(item.oldData, (item.selectOptions.item.dataField || 'id'), (value[item.selectOptions.item.dataField] || value.Id))
                retData = navcon.getItemByKeyValue(item.oldData, (item.selectOptions.item.dataField || 'id'), (value[item.selectOptions.item.dataField || 'Id']))
                if (retData !== -1) {
                    obj.ObjectState = 2;
                    if (item.refkey !== undefined && item.refkey !== null) obj[item.refkey] = value[item.refkey];
                }
                else {
                    obj.ObjectState = 1;
                    var keyIndex = navcon.getItemIndexByProperty(fields, item.refkey);
                    if (keyIndex !== undefined && keyIndex !== -1) obj[item.refkey] = fields[keyIndex].data;
                }

                if (item.altkey !== undefined && item.altkey !== null) obj[item.altkey] = (value[item.altkey] === undefined ? 0 : value[item.altkey]);
            }
            obj.Status = 0;
            if (item.selectOptions.item.type !== undefined && value[item.selectOptions.item.type])
                obj[item.selectOptions.item.type] = value[item.selectOptions.item.type];
            list.push(obj);
        });

        //if (mode.toLowerCase() === "save")
        //    return list;
        //else
        return insertDeleteditems(list, item.oldData, (item.selectOptions.item.dataField || 'id'));
    };

    var updateCheckBoxListData = function (item, mode, fields, key) {
        var list = [];
        if (item.data === undefined || item.data === "" || item.data === null || item.data.length === undefined || item.data.length === 0) return;
        if (item.listDisplay !== undefined && item.listDisplay) {
            $.map(fields, function (fieldItem, index) {
                if ((fieldItem.type === "checkboxlist" || fieldItem.type === "groupcheckboxlist") && fieldItem.listDisplay !== undefined && fieldItem.listDisplay) {
                    $.map(fieldItem.data, function (dataItem, dataIndex) {
                        if (dataItem.value !== undefined && dataItem.value) {
                            dataItem.Status = 0;

                            var refkeyIndex = navcon.getItemIndexByProperty(fields, item.refkey);
                            if (refkeyIndex !== undefined && refkeyIndex !== -1) dataItem[item.refkey] = fields[refkeyIndex].data;

                            if (mode.toLowerCase() === "save" || mode.toLowerCase() === "saveas") {
                                dataItem.ObjectState = 1;
                            } else {
                                dataItem.ObjectState = 1;
                            }

                            var eventIndex = getItemIndexByKeyValue(list, (fieldItem.templateOptions.item.dataField || "EventID"), dataItem[(fieldItem.templateOptions.item.dataField || "EventID")]);
                            if (eventIndex === -1) {
                                list.push(dataItem);
                            }
                        }
                    });
                }
            })
        } else {
            $.map(item.data, function (parentdata, index) {
                $.map(parentdata.data, function (eventdata, ind) {
                    var obj = {};
                    obj = eventdata;
                    obj.Status = 0;

                    var refkeyIndex = navcon.getItemIndexByProperty(fields, item.refkey);
                    if (refkeyIndex !== undefined && refkeyIndex !== -1) obj[item.refkey] = fields[refkeyIndex].data;

                    if (mode.toLowerCase() === "save" || mode.toLowerCase() === "saveas") {
                        obj.ObjectState = 1;
                    } else {
                        obj.ObjectState = 1;
                    }

                    if (obj.value === true)
                        if (eventdata.value) list.push(obj);
                });
            });
        }


        return list;
    };

    /*var treeDataUpdate = function (type, id, mode) {
        getDataFromTree(items)
        return getTreeData(type, id, mode);
    }*/

    var clearFieldsData = function (fields, $scope, uploadClear) {
        $.map(fields, function (item, index) {
            if (item.type.toLowerCase() === "fileupload" || item.type.toLowerCase() === "photoupload") {
                item.data = [];
                if (item.type.toLowerCase() === "fileupload") {
                    var elem = angular.element(document.querySelector('[ng-app]'));
                    var injector = elem.injector();
                    var $rootScope = injector.get('$rootScope');
                    if (uploadClear !== undefined && !uploadClear)
                        $rootScope.$broadcast('FILEUPLOAD-CLEAR', true, false);
                    else
                        $rootScope.$broadcast('FILEUPLOAD-CLEAR', true, true);
                }
            } else if (item.type.toLowerCase() === "label" && item.alternateType != undefined && item.alternateType.toLowerCase() === "lastupdated") {
                item.data = "";
                item.templateOptions.label = "";
            } else if (item.type.toLowerCase() === "rating") {
                item.data = "0";
            } else if (item.type.toLowerCase() === "tableeditor") {
                if (item.tableeditorSettings != undefined && item.tableeditorSettings.tableAction != undefined && item.tableeditorSettings.tableAction.clear != undefined) {
                    item.tableeditorSettings.tableAction.clear();
                    item.tableeditorSettings.tableAction.addNew();
                    item.data = [];
                    item.data.push({ fields: item.tableeditorSettings.fields });
                }
            } else if (item.type.toLowerCase() === "multiselectcheckbox" || item.type.toLowerCase() === "kendomultiselect" || item.type.toLowerCase() === "kendoselect" || item.type.toLowerCase() === "kendocombobox") {
                item.data = [];
            }
            else if (item.type.toLowerCase() === "label" && (item.templateOptions === undefined || item.templateOptions === null)) {
                if (item.Olddata === null) {
                    item.data = null;
                }
                else {
                    item.data = "0";
                }

            } else if ((item.datatype !== undefined && item.datatype !== null && item.datatype !== "" && item.datatype.toLowerCase() === "integer")) {
                item.data = "";
            } else
                item.data = "";

            item.valid = false;

            if (item.form !== undefined) {
                if (item.form[item.key] !== undefined && item.form[item.key].$setValidity !== undefined && typeof item.form[item.key].$setValidity === "function")
                    item.form[item.key].$setValidity('isExist', true)
            }

            if (item.oldData != undefined) {
                item.oldData = "";
            }
        });
    };

    var clearTreeData = function (type) {
        //var checkbox = $("navcon-tree[type='" + type + "']").find('.jstree').find("input[type='checkbox']");
        var checkbox = $("navcon-tree[type='" + type + "']").find('.jstree').find("input[type='checkbox'][checked='checked']")
        $(checkbox).removeAttr("checked");
    };

    var treeDataRefresh = function (data, type, callback) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']").jstree(true);
        if (tree.settings === undefined) return;
        tree.settings.core.data = data;
        tree.refresh();
        tree.redraw(true);
        if (callback !== undefined)
            callback(data);
    };

    var deleteDataList = function (tableOptions, row) {
        if (tableOptions !== undefined && row !== undefined) {
            tableOptions.data.splice(row, 1);
        }
    };

    var createTreeNode = function (type, currentNode, newNode, position) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        tree.jstree('create_node', currentNode.id, newNode, position);
    };

    var removeTreeNode = function (type, currentNode, treeSettings, hasParentRemove) {
        ///*below 2 line used for setViewContentDisabled function, don't remove*/
        //if (scope.navconData[scope.fieldSet] !== undefined && scope.navconData[scope.fieldSet].mode !== undefined)
        //    scope.navconData[scope.fieldSet].mode = "";

        /*selected node remove*/
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        tree.jstree().delete_node($('#' + currentNode.id));

        var parentRemove = false;
        if (hasParentRemove !== undefined && hasParentRemove !== null && hasParentRemove !== "")
            parentRemove = hasParentRemove;
        else
            parentRemove = currentNode.parent !== "#" ? true : false;

        /*Parent node remove*/
        if (parentRemove) {
            var parentNode = tree.jstree().get_node(currentNode.parent);
            if (parentNode.children.length === 0) {
                removeTreeNode(type, parentNode, treeSettings, hasParentRemove);
            }
        }

        /*current node treesetting rebind*/
        var jsInstance = tree.jstree(true);
        if (jsInstance !== undefined && jsInstance !== null) {
            //tree data value remove
            if (treeSettings !== undefined && treeSettings !== "") {
                var checkdata = angular.copy(treeSettings.core.data);
                if (checkdata !== undefined && checkdata !== "") {
                    var data = deleteTreeValueByNode(checkdata, currentNode["id"]);
                    if (typeof data === "object") {
                        var returnData = reorderTreeData(data);
                        treeSettings.core.data = [];
                        treeSettings.core.data = angular.copy(returnData);
                    }
                    else
                        treeSettings.core.data.splice(data, 1);
                    jsInstance.settings.core.data = treeSettings.core.data;
                }
            }
        }
    };

    var deleteTreeValueByNode = function (items, targetValue) {
        var retVal = 0;
        if (targetValue !== undefined || targetValue !== "") {
            for (var i = 0; i < items.length; i++) {
                if (!$.isEmptyObject(items[i])) {
                    /*if (items[i].id === undefined || items[i].id === null)
                        items[i].id = items[i].CommonId;*/
                    if (items[i].id.toString() === targetValue.toString()) {
                        delete items[i];
                        return i;
                    }
                    if (items[i].children !== undefined && items[i].children !== null && items[i].children.length > 0) {
                        var found = deleteTreeValueByNode(items[i].children, targetValue);
                        if ((found !== undefined) && (typeof found !== "object")) {
                            retVal = 1;
                            break;
                        }
                    }
                }
            }
        }
        return items;
    };

    var reorderTreeData = function (data) {
        var childData = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i] !== undefined) {
                var currentData = angular.copy(data[i]);
                currentData.children = {};

                childData.push(currentData);

                if (data[i].children !== undefined && data[i].children !== null && data[i].children.length > 0) {
                    var returnVal = reorderTreeData(data[i].children);
                    if (returnVal != undefined && returnVal.length > 0) {
                        var childLoop = childData.length - 1;
                        childData[childLoop].children = returnVal;
                    }
                }
            }
        }

        return childData;
    };

    var getTreeDataById = function (treeData, parentId, nodeType) {
        //var getTreeData = [];
        var getDataCollect = [];
        for (var i = 0; i < treeData.length; i++) {
            var item = angular.copy(treeData[i]);
            if (item.id !== undefined && item.id !== null && (item.id === parentId || item.id.toString() === parentId.toString())) {
                if (nodeType !== undefined && (nodeType.toLowerCase() === "child" || nodeType.toLowerCase() === "children"))
                    getDataCollect = item.children;
                else
                    getDataCollect.push(item);

                break;
            } else {
                if (item.children !== undefined && item.children !== null && item.children.length > 0) {
                    getDataCollect = getTreeDataById(item.children, parentId, nodeType);
                    if (getDataCollect.length > 0) break;
                }
            }
        }

        return getDataCollect;
    };

    var editTreeNode = function (type, currentNode, text) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        tree.jstree().rename_node(currentNode, text);
    };

    var updateTreeSingleData = function (type, currentNode, columnName, text, columnNo, controlType) {
        var tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        var nodeId;
        if (currentNode.data.id !== undefined && currentNode.data.id !== null)
            nodeId = (currentNode.data.id || currentNode.data.Id);
        else
            nodeId = (currentNode.id || currentNode.Id);

        var parentNode = tree.jstree().get_node(nodeId);
        parentNode.data[columnName] = text;

        if (columnNo === undefined || columnNo === null || columnNo === "") columnNo = 1;
        var getColumn = $(tree).parent().parent().find("div[id='jsgrid_" + nodeId + "_col" + columnNo + "']");
        if (getColumn !== undefined && getColumn.children.length !== 0) {
            if (controlType !== undefined && controlType !== null && controlType !== "") {
                var getCtrl = $(getColumn.children().find(controlType));
                if (getCtrl !== undefined)
                    getCtrl.val(text);
            } else {
                $(getColumn.children()[0]).html(text);
            }
        }
    };

    var dateConvert = function (date, isUTC, format) {
        var returnData = "";

        if (format === undefined || format === "") format = "YYYY-MM-DD HH:mm:ss";
        if (isUTC === undefined || isUTC === "") isUTC = true;

        if (isUTC) {
            returnData = moment.utc(date).format(format);
        }
        else {
            var localTime = moment.utc(date).toDate();
            returnData = moment(localTime).format(format);
        }

        return returnData;
    };

    var dateToUTC = function (date, format) {
        var format = format || "DD/MM/YYYY";
        if (date !== undefined && date !== "")
            return moment(date, format).utc().format("YYYY-MM-DD HH:mm:ss");
        else
            return null;
    };

    var dateFromUTCToLocal = function (date, format) {
        var format = format || "DD/MM/YYYY";
        var localTime = moment.utc(date).toDate();
        return moment(localTime).format(format);
    };

    var dateFormat = function (date, format) {
        var format = format || "DD/MM/YYYY";
        return moment(date, format);
    };

    var getCurrentDate = function (format) {
        return "Date: " + moment().format(format || "DD-MM-YYYY");
    }

    var insertControl = function (type, data) {
        var valueObj = "";
        if (data.toString().indexOf('<input') !== -1) return data;
        if (type === "checkbox") {
            valueObj = "<input type='checkbox'>";
            if (data === 1 || data === true || data === "1")
                $(valueObj).attr("checked", "checked");
            else
                $(valueObj).removeAttr("checked");
        } else if (type === "text") {
            valueObj = "<input type='text' value='" + data.toString() + "' style='width: 50px' maxlength='5'>";
        }
        var html = $(valueObj).prop('outerHTML');
        if (html === undefined) return data;
        return html.replace(/"/gi, "'");
    };

    var loadData = function (node, obj) {
        var value = node.data[obj.field];
        var fieldType = obj.fieldType || '';
        var parent = obj.parent || false;
        if (node.children !== undefined && node.children.length > 0 && fieldType !== undefined && fieldType !== '' && parent === false)
            return "";

        var valueObj = "";
        if (fieldType === "checkbox") {
            if (value === 1 || value === true || value === "1" && value !== null) {
                valueObj = "<div style = 'text-align:center;'><input type='checkbox' checked='checked'></div>";
            }
            else {
                valueObj = "<div style='text-align:center;'><input type='checkbox'></div>";
                //default data assign
                if ((value === 0 || value === "0" || value === "" || value === undefined)) node.data[obj.field] = 0;
            }

            //default data assign
            if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                self.scope.navconData.treeCellClick(node.id, obj.field, value !== undefined && value !== null ? value : 0, node, null, $(this));

        } else if (fieldType === "text") {
            if (obj.format !== undefined && obj.format.toLowerCase() === "date" && value !== "")
                value = dateFromUTCToLocal(value.toString());
            valueObj = "<div style='text-align:center;'><input type='text' value='" + value.toString() + "'></div>";
        } else if (fieldType === "textarea") {
            if (obj.format !== undefined && obj.format.toLowerCase() === "date" && value !== "")
                value = dateFromUTCToLocal(value.toString());
            valueObj = "<div><textarea style='width: 96%; height: 33px;'>" + value.toString() + "</textarea><div type='validRequiredIndicate' title='Required' style='color: red; font-size:15pt; display: none;'>*</div></div>";
        }
        else if (fieldType === "select") {
            var data = node.data.OptionData;
            var optionData = "";
            for (var iLoop = 0; iLoop < data.length; iLoop++) {
                optionData += "<option value='" + data[iLoop].id + "'>" + data[iLoop].text + "</option>";
            }
            //default data assign
            if (data.length > 0 && (value === 0 || value === "0" || value === "" || value === undefined)) {
                if (self.scope.navconData !== undefined && self.scope.navconData.treeCellClick !== undefined)
                    self.scope.navconData.treeCellClick(node.id, obj.field, data[0].id, node, null, $(this));

                node.data[obj.field] = data[0].id;
            }
            valueObj = "<select size=\"1\" expandto=\"5\" class=\"selectpicker\" style='position:fixed; width: 150px;'>" + optionData + "</select>";
        }
        else if (fieldType === "delete") {
            valueObj = "<div style = 'text-align:center;'><a class='float-center delete btn default btn-xs treebtn' href='javascript:;' data-target='#deleteconform' data-toggle='modal'>\
                        <i class='fa fa-trash-o'></i> </a></div>";
        }
        else if (fieldType === "anchor") {
            valueObj = "<div style='text-align:center;'><a  href='javascript:;' class='mandatory'>" + value.toString() + "</a></div>";
        } else {
            if (obj.format !== undefined && obj.format.toLowerCase() === "date" && value !== "" && value !== null)
                valueObj = dateFromUTCToLocal(value);
        }

        return valueObj;
    };

    var loadTableData = function (node, field, fieldType) {
        var value = node[field];
        //var fieldType = obj.fieldType;
        if (node.children !== undefined && node.children.length > 0)
            return "";
        var valueObj = "";
        if (fieldType === "checkbox") {
            if (value === 1 || value === true || value === "1")
                valueObj = "<input type='checkbox' checked='checked'>";
            else
                valueObj = "<input type='checkbox'>";

            node["Check_Field"] = field;
            node[field] = node["Row_Checked"] !== undefined && node["Row_Checked"] !== null ? node["Row_Checked"] : value;
        } else if (fieldType === "text") {
            valueObj = "<input type='text' value='" + value.toString() + "'>";
        }
        else if (fieldType === "anchor") {
            valueObj = "<div style = 'text-align:center;'><a  href='javascript:;' class='mandatory'>" + value.toString() + "</a></div>";
        }
        return valueObj;
    };

    var jsonTransformed = function (data) {
        var $rootScope = angular.element(document).injector().invoke(function ($rootScope) { return $rootScope; });
        var ngAuthSettings = angular.element(document).injector().invoke(function (ngAuthSettings) { return ngAuthSettings; });
        var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });


        var $q = angular.element(document).injector().invoke(function ($q) { return $q; });
        var deferred = $q.defer();
        $q.all(["navconfieldhtml"].map(function (d) {
            if (d == "navconfieldhtml" && $rootScope.fieldTemplate == undefined) {
                var environment = ngAuthSettings.environment;
                var prodPath = "start/";
                //var appPath = (environment === "production") ? prodPath + "navconFieldTemplate.html" : "ext-modules/navconField/navconFieldTemplate.html";
                var appPath = (environment === "production") ? prodPath + "navconFieldTemplate.html" : "start/navconFieldTemplate.html";
                return dataservice.getServerHtmlData(appPath).then(function (res) {
                    var htmlObj = $('<html></html>');
                    htmlObj.html(res.data);
                    $rootScope.fieldTemplate = htmlObj;

                    if (data !== undefined && data !== null) {
                        var jsonText = JSON.stringify(data);
                        data = functionConvert(jsonText);
                    }

                    deferred.resolve(data);
                });
            } else if (d == "navconfieldhtml" && $rootScope.fieldTemplate != undefined) {

                if (data !== undefined && data !== null) {
                    var jsonText = JSON.stringify(data);
                    data = functionConvert(jsonText);
                }
                deferred.resolve(data);
            }
        }));

        return deferred.promise;

        function functionConvert(jsonText) {
            var jsonFinal = JSON.parse(jsonText, function (key, value) {
                if (value && (typeof value === 'string') && value.indexOf("function") === 0) {
                    // we can only pass a function as string in JSON ==> doing a real function
                    var jsFunc = new Function('return ' + value)();
                    return jsFunc;
                }

                return value;
            });

            return jsonFinal;
        }
    };

    var handleError = function (error, logger) {
        if (error.data === undefined) {
            logger.error('', 'XHR Failed');
        }
        var message = error.statusText;
        var reason = error.data.Message;
        if (error.statusText === "Unauthorized") {
            reason = "Unauthorized";
            message = error.data.Message;
        }

        logger.error(message, reason);
    };

    var menuRightsCheck = function (menuSettings, mainMenu, subMenu) {
        var retValue = false;
        var main = getItemByKeyValue(menuSettings.data, 'ConfigName', mainMenu);
        if (main !== -1) {
            var item = getItemByKeyValue(main.children, 'ConfigName', subMenu);
            if (item !== -1)
                retValue = true;
        }
        return retValue;
        //return true;
    }

    var getUserRights = function (menuSettings, mainMenu, subMenu) {
        var retValue = {};
        if (mainMenu !== undefined && mainMenu === "") {
            var main = getItemByKeyValue(menuSettings.data, 'MenuCode', subMenu);
            if (main !== -1)
                retValue = main.data;
        } else {
            var main = getItemByKeyValue(menuSettings.data, 'MenuCode', mainMenu);
            if (main !== -1) {
                var item = getItemByKeyValue(main.children, 'MenuCode', subMenu);
                if (item !== -1)
                    retValue = item.data;
            }
        }
        return retValue;
    }


    var getSubMenus = function (menuSettings, mainMenu) {
        var retValue = [];
        var main = getItemByKeyValue(menuSettings.data, 'ConfigName', mainMenu);
        if (main !== -1) {
            retValue = main.children;
        }
        return retValue;
    }

    var getMenuTitle = function (menuSettings, mainMenu) {
        /*var scope = getAppScope();
        var $injector = angular.injector();
        $injector.invoke(['bsLoadingOverlayService', function(bsLoadingOverlayService){
            console.log(bsLoadingOverlayService);
        }]);*/
        var retValue = "";
        var main = getItemByKeyValue(menuSettings.data, 'ConfigName', mainMenu);
        if (main !== -1) {
            retValue = main.text;
        }
        return retValue;
    };

    var setViewContentDisabled = function (currentMode) {
        if (currentMode !== undefined) {
            if (currentMode.toLowerCase() === "view" || currentMode.toLowerCase() === "delete") {
                $(".jstree-grid-wrapper").css({ "pointer-events": "none", "background-color": "aliceblue" });
            } else {
                $(".jstree-grid-wrapper").css({ "pointer-events": "auto", "background-color": "transparent" });
            }
        }
    };

    var setApprvoedTableCollection = function (table, options) {
        if (options.approvedDisplay === undefined || options.approvedDisplay === false) {
            var columnNo = navcon.getItemIndexByKeyValue(options.columns, "title", "Status");

            $.map($(table).find("tbody tr"), function (item, index) {
                if ($($(item).find("td")[columnNo]).text() !== undefined && $($(item).find("td")[columnNo]).text() !== null
                    && $($(item).find("td")[columnNo]).text().toLowerCase() === "approved") {
                    if ($(item).find(".fa-edit").length > 0)
                        //$(item).find(".fa-edit").parent().css("display", "none");
                        $(item).find(".fa-edit").parent().attr("disabled", "disabled");
                    if ($(item).find(".fa-trash-o").length > 0)
                        //$(item).find(".fa-trash-o").parent().css("display", "none");
                        $(item).find(".fa-trash-o").parent().attr("disabled", "disabled");
                } else {
                    if ($(item).find(".fa-edit").length > 0)
                        //$(item).find(".fa-edit").parent().css("display", "");
                        $(item).find(".fa-edit").parent().removeAttr("disabled");
                    if ($(item).find(".fa-trash-o").length > 0)
                        //$(item).find(".fa-trash-o").parent().css("display", "");
                        $(item).find(".fa-trash-o").parent().removeAttr("disabled");
                }
            });
        }
    };

    var setApprvoedTableColumnOptions = function (row, data, options) {
        if (options.approvedDisplay === undefined || options.approvedDisplay === false) {
            if (data.StatusName !== undefined && data.StatusName !== null && data.StatusName.toLowerCase() === "approved") {
                if ($(row).find(".fa-edit").length > 0)
                    //$(row).find(".fa-edit").parent().css("display", "none");
                    $(row).find(".fa-edit").parent().attr("disabled", "disabled");
                if ($(row).find(".fa-trash-o").length > 0)
                    //$(row).find(".fa-trash-o").parent().css("display", "none");
                    $(row).find(".fa-trash-o").parent().attr("disabled", "disabled");
            } else {
                if ($(row).find(".fa-edit").length > 0)
                    //$(row).find(".fa-edit").parent().css("display", "");
                    $(row).find(".fa-edit").parent().removeAttr("disabled");
                if ($(row).find(".fa-trash-o").length > 0)
                    //$(row).find(".fa-trash-o").parent().css("display", "");
                    $(row).find(".fa-trash-o").parent().removeAttr("disabled");
            }
        }
    };

    var setApprvoedTreeeColumnOptions = function (type, options) {
        if (options !== undefined && options !== null && options.approvedDisplay !== undefined && options.approvedDisplay) return;

        var tree = $("navcon-tree[type='" + type + "']").find('.jstree');//.find("div[role='tree']");
        if (tree.length === 0) tree = $("navcon-tree[type='" + type + "']").find('.jstree').find("div[role='tree']");
        if (tree.length !== 0) {
            if ($(tree[0]).jstree().settings === undefined) $(tree[0]).jstree().settings = options;

            //if ($(tree[0]).jstree().settings.approvedDisplay === undefined || $(tree[0]).jstree().settings.approvedDisplay === false) {
            var data = $(tree[0]).jstree().settings.core.data;
            if (data !== undefined && data !== null && data !== false && data.length !== 0) {
                $.map(data, function (item, index) {
                    var nodeId = item["id"];
                    var nodeChild = $(tree[0]).jstree().get_node(nodeId);
                    if (nodeChild !== undefined && nodeChild !== null) {
                        if (item.StatusName !== undefined && item.StatusName !== null && item.StatusName.toLowerCase() === "approved") {
                            var columnNo = 4;
                            var getColumn = $(tree[0]).parent().parent().find("div[id='jsgrid_" + nodeId + "_col" + columnNo + "']");
                            if (getColumn !== undefined && getColumn.children.length !== 0) {
                                var getCtrl = $(getColumn.find("a"));
                                if (getCtrl !== undefined)
                                    //getCtrl.css("display", "none");
                                    getCtrl.attr("disabled", "disabled");
                            }

                            var columnNo = 5;
                            var getColumn = $(tree[0]).parent().parent().find("div[id='jsgrid_" + nodeId + "_col" + columnNo + "']");
                            if (getColumn !== undefined && getColumn.children.length !== 0) {
                                var getCtrl = $(getColumn.find("a"));
                                if (getCtrl !== undefined)
                                    //getCtrl.css("display", "none");
                                    getCtrl.attr("disabled", "disabled");
                            }
                        } else {
                            var columnNo = 4;
                            var getColumn = $(tree[0]).parent().parent().find("div[id='jsgrid_" + nodeId + "_col" + columnNo + "']");
                            if (getColumn !== undefined && getColumn.children.length !== 0) {
                                var getCtrl = $(getColumn.find("a"));
                                if (getCtrl !== undefined)
                                    //getCtrl.css("display", "");
                                    getCtrl.removeAttr("disabled");
                            }

                            var columnNo = 5;
                            var getColumn = $(tree[0]).parent().parent().find("div[id='jsgrid_" + nodeId + "_col" + columnNo + "']");
                            if (getColumn !== undefined && getColumn.children.length !== 0) {
                                var getCtrl = $(getColumn.find("a"));
                                if (getCtrl !== undefined)
                                    //getCtrl.css("display", "");
                                    getCtrl.removeAttr("disabled");
                            }
                        }
                    }
                });
            }
            //}
        }
    };

    var setDisabledEnabledByRights = function (rights, appItem) {
        if (rights === undefined || Object.keys(rights).length === 0) return false;

        if (appItem !== undefined && appItem !== "") {
            var status = (rights.Approve || false) ? false : true;
            if (status) {
                $("navcon-button[approval-id^='" + appItem + "']").find("a").attr("disabled", "disabled");
                $("navcon-button[approval-id^='" + appItem + "']").find("a").css("pointerEvents", "none");
            } else {
                $("navcon-button[approval-id^='" + appItem + "']").find("a").removeAttr("disabled");
                $("navcon-button[approval-id^='" + appItem + "']").find("a").css("pointerEvents", "auto");
            }
            return;
        }

        var addStatus = (rights.Add || false) ? false : true;
        var editStatus = (rights.Edit || false) ? false : true;
        var deleteStatus = (rights.Delete || false) ? false : true;
        var approvalStatus = (rights.Approve || false) ? false : true;
        var printStatus = (rights.View || false) ? false : true;


        if (addStatus) {
            $("a[class*='addnew'][data-target!='#requestlist']").attr("disabled", "disabled");
            $('.jstree-grid-midwrapper').find('.float-center.add.btn.btntree.btn-xs').attr("disabled", "disabled");
        } else {
            $("a[class*='addnew'][data-target!='#requestlist']").removeAttr("disabled");
            $('.jstree-grid-midwrapper').find('.float-center.add.btn.btntree.btn-xs').removeAttr("disabled");
        }

        if (editStatus) {
            $("a[class*='edit']").attr("disabled", "disabled");
            $('.jstree-grid-midwrapper').find('.float-center.edit.btn.btntree.btn-xs').attr("disabled", "disabled");
        } else {
            $("a[class*='edit']").removeAttr("disabled");
            $('.jstree-grid-midwrapper').find('.float-center.edit.btn.btntree.btn-xs').removeAttr("disabled");
        }

        if (printStatus) {
            $("a[class*='view']").attr("disabled", "disabled");
            $('.jstree-grid-midwrapper').find('.float-center.view.btn.btntree.btn-xs').attr("disabled", "disabled");
        } else {
            $("a[class*='view']").removeAttr("disabled");
            $('.jstree-grid-midwrapper').find('.float-center.view.btn.btntree.btn-xs').removeAttr("disabled");
        }


        if (deleteStatus) {
            $("a[class*='delete']").attr("disabled", "disabled");
            $('.jstree-grid-midwrapper').find('.float-center.delete.btn.btntree.btn-xs').attr("disabled", "disabled");
        } else {
            $("a[class*='delete']").removeAttr("disabled");
            $('.jstree-grid-midwrapper').find('.float-center.delete.btn.btntree.btn-xs').removeAttr("disabled");
        }


        if (approvalStatus) {
            $("a[class*='addnew'][data-target^='#requestlist_']").attr("disabled", "disabled");
            $("a[class*='addnew'][data-target^='#requestlist_']").parent().css("pointerEvents", "none");
        } else {
            $("a[class*='addnew'][data-target^='#requestlist_']").removeAttr("disabled");
            $("a[class*='view']").removeAttr("disabled");
            $('.jstree-grid-midwrapper').find('.float-center.view.btn.btntree.btn-xs').removeAttr("disabled");
            $("a[class*='addnew'][data-target^='#requestlist_']").parent().css("pointerEvents", "auto");
        }

    };


    var clearTableSelectedRows = function (type) {
        var tableInstance = navcon.getTable(type);
        if (tableInstance !== undefined)
            tableInstance.row('.selected').remove().draw(false);
    }

    var pageControlAction = function ($scope, mode, tableDefine, callback) {
        if (mode.toLowerCase() === "view" || mode.toLowerCase() === "print" || mode.toLowerCase() === "delete" || mode.toLowerCase() === "saveas") {
            $.map(tableDefine, function (item, index) {
                if (item.type !== undefined && item.type !== "") {
                    var tableInstance = navcon.getTable(item.type);
                    if (tableInstance !== undefined && tableInstance !== null && item.columns !== undefined && item.columns !== "")
                        tableInstance.columns(item.columns).visible(false);
                }
            });

            //$scope.navconData.hideButton = true;
            if ($scope.navconData !== undefined && $scope.navconData.hideTab !== undefined && $scope.navconData.hideTab !== null) $scope.navconData.hideTab = false;

            if (callback !== undefined) callback(true);
        } else {
            $.map(tableDefine, function (item, index) {
                if (item.type !== undefined && item.type !== "") {
                    var tableInstance = navcon.getTable(item.type);
                    if (tableInstance !== undefined && tableInstance !== null && item.columns !== undefined && item.columns !== "")
                        tableInstance.columns(item.columns).visible(true);
                }
            });

            //$scope.navconData.hideButton = false;
            if ($scope !== undefined && $scope.navconData !== undefined) $scope.navconData.hideTab = false;
            if ($scope !== undefined && $scope.navconData !== undefined && $scope.navconData.hideTab !== undefined && mode.toLowerCase() === "save") $scope.navconData.hideTab = true;

            if (callback !== undefined) callback(false);
        }
    };


    var sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };


    var getTableNotInOtherTable = function (mode, selectedItem, collectionItem, primaryKey, deleteRowItem, assignPrimaryKey) {
        if (mode.toLowerCase() === "add") {
            if (collectionItem !== undefined && collectionItem !== null) {
                if (collectionItem.oldData === undefined || collectionItem.oldData === null) collectionItem.oldData = collectionItem.data;

                var filterMembers = navcon.getItemsNotInOtherItems(collectionItem.data, selectedItem !== undefined && selectedItem !== null ? selectedItem.data : [], primaryKey);
                $.map(filterMembers, function (item, index) {
                    if (assignPrimaryKey !== undefined && assignPrimaryKey !== "" && item[assignPrimaryKey] !== undefined) item[assignPrimaryKey] = null;
                    if (item.Row_Checked !== undefined) item.Row_Checked = false;
                    if (item.Check_Field !== undefined && item[item.Check_Field] !== undefined) item[item.Check_Field] = false;
                });

                collectionItem.data = filterMembers;
            }
        } else if (mode.toLowerCase() === "delete") {
            if (deleteRowItem !== undefined && deleteRowItem !== null) {
                if (navcon.getItemIndexByKeyValue(collectionItem.data, primaryKey, deleteRowItem[primaryKey]) === -1) {
                    var selectedRowIndex = navcon.save.selectedRowIndex(collectionItem.oldData, deleteRowItem, primaryKey);
                    var itemInsert = navcon.getItemByKeyValue(collectionItem.oldData, primaryKey, deleteRowItem[primaryKey]);
                    if (itemInsert !== -1) {
                        if (assignPrimaryKey !== undefined && assignPrimaryKey !== "" && itemInsert[assignPrimaryKey] !== undefined) itemInsert[assignPrimaryKey] = null;
                        if (itemInsert.Row_Checked !== undefined) itemInsert.Row_Checked = false;
                        if (itemInsert.Check_Field !== undefined && itemInsert[itemInsert.Check_Field] !== undefined) itemInsert[itemInsert.Check_Field] = false;

                        //collectionItem.data.splice(selectedRowIndex, 0, itemInsert);
                        collectionItem.data.push(itemInsert);
                    }
                }
            }
        }
    };


    var getObjectsfromJSON = function (obj, key, val) {
        var newObj = false;
        var data = [];
        $.each(obj, function () {
            var testObject = this;
            if (testObject[key] === val)
            { data.push(testObject); }
        });

        return data;
    }

    var getTemplateUrl = function (path) {
        var environment = getApplicationEnvironment();
        var version = getApplicationVersion();
        var cacheBust = (new Date()).getTime();
        if (environment === "production")
            cacheBust = version.split('.').join(''); //version;
        var returnUrl = "";
        path = path.toLowerCase();

        var templateAppPath = (environment === "production") ? "/partials/" : "app/";
        var templateExtPath = (environment === "production") ? "/partials/" : "ext-modules/";
        if (path === "kendomultiselect") {
            returnUrl = templateAppPath + 'kendomultiselect/kendomultiselect.html';
        }
        else if (path === "dashboard") {
            returnUrl = templateAppPath + 'dashboard/dashboardTemplate.html';
        } else if (path === "404") {
            returnUrl = templateAppPath + '404/404.html';
        } else if (path === "sort") {
            returnUrl = templateAppPath + 'sort/sort.html';
        } else if (path === "hazardmanagement") {
            returnUrl = templateAppPath + 'hazardmanagement/hazardmanagement.html';
        } else if (path === "sortpage1") {
            returnUrl = templateAppPath + 'sort/page1/page1.html';
        } else if (path === "sortpage2") {
            returnUrl = templateAppPath + 'sort/page2/page2.html';
        } else if (path === "sortpage2groundmarineland") {
            returnUrl = templateAppPath + 'sort/page2/ground.marine.land.html';
        } else if (path === "sortpage3") {
            returnUrl = templateAppPath + 'sort/page3/page3.html';
        } else if (path === "sortpage3equipmentdetails") {
            returnUrl = templateAppPath + 'sort/page3/equipmentdetails.html';
        } else if (path === "sortconfiguration") {
            returnUrl = templateAppPath + 'sort/sortconfiguration/sortconfiguration.html';
        } else if (path === "actionstracker") {
            returnUrl = templateAppPath + 'sort/actionstracker/actionstracker.html';
        } else if (path === "sortmanagement") {
            returnUrl = templateAppPath + 'sortmanagement/sortmanagement.html';
        } else if (path === "eda") {
            returnUrl = templateAppPath + 'eda/eda.html';
        } else if (path === "edamanagement") {
            returnUrl = templateAppPath + 'edamanagement/edamanagement.html';
        } else if (path === "hazardsystemconfig") {
            returnUrl = templateAppPath + 'hazardmanagement/hazardsystemconfig/hazardsystemconfig.html';
        } else if (path === "controlmanagement") {
            returnUrl = templateAppPath + 'controlmanagement/controlmanagement.html';
        } else if (path === "riskaggregation") {
            returnUrl = templateAppPath + 'riskaggregation/riskaggregation.html';
        } else if (path === "hazardimport") {
            returnUrl = templateAppPath + 'hazardimport/hazardimport.html';
        } else if (path === "bowtie") {
            returnUrl = templateAppPath + 'bowtieanalysis/bowtie.html';
        } else if (path === "hazardreports") {
            returnUrl = templateAppPath + 'hazardreports/hazardreports.html';
        } else if (path === "sortreports") {
            returnUrl = templateAppPath + 'sortreports/sortreports.html';
        } else if (path === "psmmconfiguration") {
            returnUrl = templateAppPath + 'psmmconfiguration/psmmconfiguration.html';
        } else if (path === "psmmcompliance") {
            returnUrl = templateAppPath + 'psmmcompliance/psmmcompliance.html';
        } else if (path === "psmmmaturity") {
            returnUrl = templateAppPath + 'psmmmaturity/psmmmaturity.html';
        } else if (path === "psmmreports") {
            returnUrl = templateAppPath + 'psmmreports/psmmreports.html';
        } else if (path === "adminreports") {
            returnUrl = templateAppPath + 'adminreports/adminreports.html';
        } else if (path === "mrr") {
            returnUrl = templateAppPath + 'form/mrr/mrr.html';
        } else if (path === "foc") {
            returnUrl = templateAppPath + 'form/flightoperationcause/foc.html';
        } else if (path === "formconfiguration") {
            returnUrl = templateAppPath + 'form/formconfiguration/formconfiguration.html';
        } else if (path === "forms") {
            returnUrl = templateAppPath + 'forms/forms.html';
        } else if (path === "referencemanagement") {
            returnUrl = templateAppPath + 'referencemanagement/referencemanagement.html';
        } else if (path === "tiles") {
            returnUrl = templateAppPath + 'tiles/tiles.html';
        } else if (path === "usermanagement") {
            returnUrl = templateAppPath + 'usermanagement/usermanagement.html';
        } else if (path === "rolemanagement") {
            returnUrl = templateAppPath + 'rolemanagement/rolemanagement.html';
        } else if (path === "useraccessrights") {
            returnUrl = templateAppPath + 'useraccessrights/useraccessrights.html';
        } else if (path === "masterconfiguration") {
            returnUrl = templateAppPath + 'masterconfiguration/masterconfiguration.html';
        } else if (path === "actionlog") {
            returnUrl = templateAppPath + 'actionlog/actionlog.html';
        } else if (path === "notificationsetup") {
            returnUrl = templateAppPath + 'notificationsetup/notificationsetup.html';
        } else if (path === "notifications") {
            returnUrl = templateAppPath + 'notifications/notifications.html';
        } else if (path === "userimport") {
            returnUrl = templateAppPath + 'userimport/userimport.html';
        } else if (path === "quarantine") {
            returnUrl = templateAppPath + 'quarantine/quarantine.html';
        } else if (path === "userprofile") {
            returnUrl = templateAppPath + 'userprofile/userprofile.html';
        } else if (path === "changepassword") {
            returnUrl = templateAppPath + 'changepassword/changepassword.html';
        } else if (path === "dashboardmanagement") {
            returnUrl = templateAppPath + 'dashboardmanagement/dashboardmanagement.html';
        } else if (path === "dashboardreports") {
            returnUrl = templateAppPath + 'dashboardreports/dashboardreports.html';
        } else if (path === "news") {
            returnUrl = templateAppPath + 'news/news.html';
        } else if (path === "notificationmaster") {
            returnUrl = templateAppPath + 'notificationmaster/notificationmaster.html';

        } else if (path === "newcontrol") {
            returnUrl = templateAppPath + 'controlmanagement/newcontrol/newcontrol.html';
        } else if (path === "maincontrol") {
            returnUrl = templateAppPath + 'controlmanagement/newcontrol/maincontrol.html';
        } else if (path === "dashboarddetails") {
            returnUrl = templateAppPath + 'dashboarddetails/dashboarddetails.html';
        } else if (path === "delete") {
            returnUrl = templateAppPath + 'delete/delete.html';
        } else if (path === "cfmaintenancehumanfactors") {
            returnUrl = templateAppPath + 'eda/cfmaintenancehumanfactors/cfmaintenancehumanfactors.html';
        } else if (path === "cfpersonalinjury") {
            returnUrl = templateAppPath + 'eda/cfpersonalinjury/cfpersonalinjury.html';
        } else if (path === "contributingfactorschecklist") {
            returnUrl = templateAppPath + 'eda/contributingfactorschecklist/contributingfactorschecklist.html';
        } else if (path === "errorpreventionstrategies") {
            returnUrl = templateAppPath + 'eda/errorpreventionstrategies/errorpreventionstrategies.html';
        } else if (path === "generalinformation") {
            returnUrl = templateAppPath + 'eda/generalinformation/generalinformation.html';
        } else if (path === "occurrence") {
            returnUrl = templateAppPath + 'eda/occurrence/occurrence.html';
        } else if (path === "summary") {
            returnUrl = templateAppPath + 'eda/summary/summary.html';
        } else if (path === "causeanalysis") {
            returnUrl = templateAppPath + 'hazardmanagement/causeanalysis/causeanalysis.html';
        } else if (path === "causedetails") {
            returnUrl = templateAppPath + 'hazardmanagement/causedetails/causedetails.html';
        } else if (path === "history") {
            returnUrl = templateAppPath + 'history/history.html';
        } else if (path === "photouploader") {
            returnUrl = templateAppPath + 'photo/egPhotoUploader.html';
        } else if (path === "pcccompliancetemplates") {
            returnUrl = templateAppPath + 'psmmconfiguration/pcccompliancetemplates/pcccompliancetemplates.html';
        } else if (path === "pccrequirements") {
            returnUrl = templateAppPath + 'psmmconfiguration/pccrequirements/pccrequirements.html';
        } else if (path === "pmcleadingindicatorscalculation") {
            returnUrl = templateAppPath + 'psmmconfiguration/pmcleadingindicatorscalculation/pmcleadingindicatorscalculation.html';
        } else if (path === "pmcleadingindicatorsstatus") {
            returnUrl = templateAppPath + 'psmmconfiguration/pmcleadingindicatorsstatus/pmcleadingindicatorsstatus.html';
        } else if (path === "pmcsubjectindicator") {
            returnUrl = templateAppPath + 'psmmconfiguration/pmcsubjectindicator/pmcsubjectindicator.html';
        } else if (path === "pmctemplates") {
            returnUrl = templateAppPath + 'psmmconfiguration/pmctemplates/pmctemplates.html';
        } else if (path === "programme") {
            returnUrl = templateAppPath + 'psmmconfiguration/programme/programme.html';
        } else if (path === "psmmpanel") {
            returnUrl = templateAppPath + 'psmmpanel/psmmpanel.html';
        } else if (path === "referencepage") {
            returnUrl = templateAppPath + 'referencemanagement/directives/referencepage.html';
        } else if (path === "summaryaccidentstate") {
            returnUrl = templateAppPath + 'riskaggregation/summaryaccidentstate/summaryaccidentstate.html';
        } else if (path === "summaryhazardstate") {
            returnUrl = templateAppPath + 'riskaggregation/summaryhazardstate/summaryhazardstate.html';
        } else if (path === "actioninvestigation") {
            returnUrl = templateAppPath + 'sort/actionstracker/directive/actioninvestigationtemplate.html';
        } else if (path === "actionstrackertemplate") {
            returnUrl = templateAppPath + 'sort/actionstracker/directive/actionstrackertemplate.html';
        } else if (path === "airproximity") {
            returnUrl = templateAppPath + 'sort/airproximity/airproximity.html';
        } else if (path === "airtrafficmanagement") {
            returnUrl = templateAppPath + 'sort/airtrafficmanagement/airtrafficmanagement.html';
        } else if (path === "birdstrike") {
            returnUrl = templateAppPath + 'sort/birdstrike/birdstrike.html';
        } else if (path === "tireburst") {
            returnUrl = templateAppPath + 'sort/tireburst/tireburst.html';
        } else if (path === "sortclosing") {
            returnUrl = templateAppPath + 'sortclosing/sortclosing.html';
        } else if (path === "edainvestigation") {
            returnUrl = templateAppPath + 'sortdecision/edainvestigation/edainvestigation.html';
        } else if (path === "sortdecision") {
            returnUrl = templateAppPath + 'sortdecision/sortdecision.html';
        } else if (path === "sortfindings") {
            returnUrl = templateAppPath + 'sortfindings/findings.html';
        } else if (path === "mycounttemplate") {
            returnUrl = templateAppPath + 'dashboard/directives/mycountTemplate.html';
        } else if (path === "myreporttemplate") {
            returnUrl = templateAppPath + 'dashboard/directives/myreportTemplate.html';
        } else if (path === "myriskmatrixtemplate") {
            returnUrl = templateAppPath + 'dashboard/directives/myriskmatrixTemplate.html';
        } else if (path === "mysummarytemplate") {
            returnUrl = templateAppPath + 'dashboard/directives/mysummaryTemplate.html';
        } else if (path === "probability") {
            returnUrl = templateAppPath + 'hazardmanagement/hazardsystemconfig/probability/probability.html';
        } else if (path === "riskclass") {
            returnUrl = templateAppPath + 'hazardmanagement/hazardsystemconfig/riskclass/riskclass.html';
        } else if (path === "severity") {
            returnUrl = templateAppPath + 'hazardmanagement/hazardsystemconfig/severity/severity.html';
        } else if (path === "navconchart") {
            returnUrl = templateAppPath + 'widgets/navconChart/navconChartTemplate.html';

        } else if (path === "navcondashboard") {
            returnUrl = templateExtPath + 'navconDashboard/navconDashboardTemplate.html';
        } else if (path === "navconwidgetbody") {
            returnUrl = templateExtPath + 'navconDashboard/navconWidgetBodyTemplate.html';
        } else if (path === "navcondelete") {
            returnUrl = templateExtPath + 'navconDelete/navconDeleteTemplate.html';
        } else if (path === "navconevaluation") {
            returnUrl = templateExtPath + 'navconEvaluation/navconEvaluationTemplate.html';
        } else if (path === "navconform") {
            returnUrl = templateExtPath + 'navconForm/navconFormTemplate.html';
        } else if (path === "navconframework") {
            returnUrl = templateExtPath + 'navconFramework/navconFrameworkTemplate.html';
        } else if (path === "navconuserprofile") {
            returnUrl = templateExtPath + 'navconFramework/navconUserProfile/navconUserProfileTemplate.html';
        } else if (path === "navconuserprofilesmall") {
            returnUrl = templateExtPath + 'navconFramework/navconUserProfile/navconUserProfileSmallTemplate.html';
        } else if (path === "navconmenu") {
            returnUrl = templateExtPath + 'navconMenu/navconMenuTemplate.html';
        } else if (path === "navconmenugroup") {
            returnUrl = templateExtPath + 'navconMenu/navconMenuGroupTemplate.html';
        } else if (path === "navconmenuitem") {
            returnUrl = templateExtPath + 'navconMenu/navconMenuItemTemplate.html';
        } else if (path === "navconmodal") {
            returnUrl = templateExtPath + 'navconModal/navconModalTemplate.html';
        } else if (path === "navconpagebar") {
            returnUrl = templateExtPath + 'navconPagebar/navconPagebarTemplate.html';
        } else if (path === "navconportlet") {
            returnUrl = templateExtPath + 'navconPortlet/navconPortletTemplate.html';
        } else if (path === "navconrating") {
            returnUrl = templateExtPath + 'navconRating/navconRatingTemplate.html';
        } else if (path === "navconreport") {
            returnUrl = templateExtPath + 'navconReport/navconReportTemplate.html';
        } else if (path === "navconreportpage") {
            returnUrl = templateExtPath + 'navconReport/navconReportPageTemplate.html';
        } else if (path === "navcontable") {
            returnUrl = templateExtPath + 'navconTable/navconTableTemplate.html';
        } else if (path === "navcontableeditor") {
            returnUrl = templateExtPath + 'navconTableEditor/navconTableEditorTemplate.html';
        } else if (path === "navcontree") {
            returnUrl = templateExtPath + 'navconTree/navconTreeTemplate.html';
        } else if (path === "navconfileupload") {
            returnUrl = templateExtPath + 'navconUpload/navconFileUploadTemplate.html';
        } else if (path === "navconphotoupload") {
            returnUrl = templateExtPath + 'navconUpload/navconPhotoUploadTemplate.html';
        } else if (path === "login") {
            returnUrl = templateAppPath + 'login/login.html';
        }

        if (environment !== "production") returnUrl + "?v=" + cacheBust;
        return returnUrl;
    }

    var pageChanges = function (funcPageChange, funcpageSave, callback) {
        var changes = funcPageChange();
        if (changes) {
            BootstrapDialog.show({
                title: 'Confirmation',
                closable: false,
                message: 'Do you want to discard the changes?',
                buttons: [{
                    icon: 'glyphicon glyphicon-ok-circle',
                    label: 'Yes',
                    cssClass: 'btn-primary green',
                    action: function (dialogItself) {
                        if (funcpageSave !== undefined && funcpageSave !== "")
                            funcpageSave();
                        dialogItself.close();
                        callback(false);
                    }
                },
                {
                    icon: 'glyphicon glyphicon-remove-circle',
                    label: 'No',
                    cssClass: 'btn-primary red',
                    action: function (dialogItself) {
                        dialogItself.close();
                        callback(true);
                    }
                }]
            });
        } else {
            callback(false);
        }
    };

    var getApplicationVersion = function () {
        version = "1.0.0";

        var ngAuthSettings = angular.element(document).injector().invoke(function (ngAuthSettings) { return ngAuthSettings; });
        var localStorageService = angular.element(document).injector().invoke(function (localStorageService) { return localStorageService; });
        var authData = localStorageService.get('authorizationData');
        if (authData !== undefined && authData !== null) {
            //var version = ngAuthSettings.version;
            var version = authData.RMSVersion;
            if (version === undefined || version === "")
                version = "1.0.0";
        }
        return version;
    }

    var getApplicationEnvironment = function () {
        var ngAuthSettings = angular.element(document).injector().invoke(function (ngAuthSettings) { return ngAuthSettings; });
        var environment = ngAuthSettings.environment;
        if (environment === undefined || environment === "")
            environment = "development";
        return environment.toLowerCase();
    }

    var getPageConfig = function (scope, pageConfig, fieldConfigName) {
        if (pageConfig !== undefined && pageConfig !== null && pageConfig !== "") {
            /*breadcrumbs*/
            if (pageConfig.breadcrumbs !== undefined && pageConfig.breadcrumbs !== null && scope !== undefined && scope !== null && scope !== "")
                scope["breadcrumbs"] = pageConfig.breadcrumbs;

            //Field Assign
            if (pageConfig.fields !== undefined && pageConfig.fields !== null && pageConfig.fields.length !== 0) {
                $.map(pageConfig.fields, function (fields, index) {

                    if (scope !== undefined && scope !== null && scope !== "") {
                        scope[index] = angular.copy(fields);

                        updateFields(scope[index], index, pageConfig);

                        //Data Assign
                        if (pageConfig.data !== undefined && pageConfig.data !== null && pageConfig.data.length !== 0) {
                            navcon.save.loadListDefaultData(pageConfig.data, scope[index]);
                        }
                    }

                });
            } else {
                updateFields(pageConfig, "", pageConfig);
            }

            if (scope !== undefined && scope !== null && scope !== "") {

                //Table Assign
                if (pageConfig.tables !== undefined && pageConfig.tables !== null && pageConfig.tables.length !== 0) {
                    $.map(pageConfig.tables, function (table, index) {
                        scope[index] = angular.copy(pageConfig.tables[index]);
                    });
                }

                //Tree Assign
                if (pageConfig.trees !== undefined && pageConfig.trees !== null && pageConfig.trees.length !== 0) {
                    $.map(pageConfig.trees, function (tree, index) {
                        scope[index] = angular.copy(pageConfig.trees[index]);
                    });
                }

                //tableEditor Assign
                if (pageConfig.tableEditor !== undefined && pageConfig.tableEditor !== null && pageConfig.tableEditor.length !== 0) {
                    $.map(pageConfig.tableEditor, function (tableEditor, index) {
                        scope[index] = angular.copy(pageConfig.tableEditor[index]);
                        scope[index].tableAction = {};

                        if (tableEditor.templateOptions.primaryKey !== undefined && tableEditor.templateOptions.primaryKey !== null && tableEditor.templateOptions.primaryKey !== "") scope[index].primaryKey = tableEditor.templateOptions.primaryKey;
                        if (tableEditor.templateOptions.displayKey !== undefined && tableEditor.templateOptions.displayKey !== null && tableEditor.templateOptions.displayKey !== "") scope[index].displayKey = tableEditor.templateOptions.displayKey;
                    });
                }
            }
        }

        function updateFields(fields, fieldName, clientConfig) {
            var fieldData = null;

            if (clientConfig !== undefined && clientConfig.models !== undefined && clientConfig.models.length !== 0 && fieldName !== "") {
                if (fieldConfigName === undefined || fieldConfigName === null || fieldConfigName === "") fieldConfigName = "fieldsetName";
                var fieldPrimaryIndex = navcon.getItemIndexByKeyValue(clientConfig.models, fieldConfigName, fieldName);;
                if (fieldPrimaryIndex !== undefined && fieldPrimaryIndex !== -1) {
                    fieldData = clientConfig.models[fieldPrimaryIndex];
                }
            } else {
                if (fieldConfigName === undefined || fieldConfigName === null || fieldConfigName === "") fieldConfigName = "fieldConfig";
                var fieldPrimaryIndex = navcon.getItemIndexByProperty(fields, fieldConfigName);
                if (fieldPrimaryIndex !== undefined && fieldPrimaryIndex !== -1) {
                    fieldData = fields[fieldPrimaryIndex];
                }
            }

            if (fieldData !== null) {
                if (fieldData.primaryKey !== undefined && fieldData.primaryKey !== null && fieldData.primaryKey !== "") fields.primaryKey = fieldData.primaryKey;
                if (fieldData.displayKey !== undefined && fieldData.displayKey !== null && fieldData.displayKey !== "") fields.displayKey = fieldData.displayKey;
                if (fieldData.alternatePrimaryKey !== undefined && fieldData.alternatePrimaryKey !== null && fieldData.alternatePrimaryKey !== "") fields.alternatePrimaryKey = fieldData.alternatePrimaryKey;
                if (fieldData.alternateDisplayKey !== undefined && fieldData.alternateDisplayKey !== null && fieldData.alternateDisplayKey !== "") fields.alternateDisplayKey = fieldData.alternateDisplayKey;
                if (fieldData.title !== undefined && fieldData.title !== null && fieldData.title !== "") fields.title = fieldData.title;
            }
        }
    };

    var getSequenceNo = function (options, callback) {
        var returnData;
        if (options.table !== undefined && options.table !== null) {
            if (options.table.columnName !== undefined && options.table.columnName !== null) {
                var currentData = 0;
                $.map(options.table, function (item, index) {
                    if (parseInt(item[options.table.columnName]) > parseInt(currentData)) {
                        currentData = item[options.table.columnName];
                    }
                });

                returnData = (currentData + 1);

                if (options.fields !== undefined && options.fields !== null) {
                    if (options.fields.key !== undefined && options.fields.key !== null) {//Field key assigned
                        var fieldsKeyIndex = navcon.getItemIndexByProperty(options.fields, options.fields.key);
                        if (fieldsKeyIndex !== null && fieldsKeyIndex !== -1 && fieldsKeyIndex.length !== 0) {
                            options.fields[fieldsKeyIndex].data = returnData;
                        }
                    }
                }
            } else { //No table column assigned
                var currentData = 0;
                returnData = 0;

                if (options.table.columns.length !== 0) { // serialNoColumn based data
                    $.map(options.table.columns, function (item, colIndex) {
                        if (item.serialNoColumn !== undefined && item.serialNoColumn != null) {
                            if (parseInt(item.serialNoColum) > parseInt(currentData)) {
                                currentData = item.serialNoColum;
                            }
                        }
                    });
                    returnData = (currentData + 1);
                }

                if (options.fields !== undefined && options.fields !== null) {
                    if (options.fields.key !== undefined && options.fields.key !== null) {//Field key assigned
                        var fieldsKeyIndex = navcon.getItemIndexByProperty(options.fields, options.fields.key);
                        if (fieldsKeyIndex !== null && fieldsKeyIndex !== -1 && fieldsKeyIndex.length !== 0) {
                            options.fields[fieldsKeyIndex].data = returnData;
                        }
                    }
                }
            }
        } else { // no table assigned
            returnData = 0;
        }

        if (callback !== undefined) callback(returnData);
        return returnData;
    };

    var getEmailPattern = function () {
        var emailPattern = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])";
        return emailPattern;
    };

    var viewContentLoaded = function (configMenu) {
        // $(".page-container").css("margin-top", "");
        toolTipSetting();
        initEvents();

        chartToolTipClose(configMenu);

        //setTimeout('$(".page-container").css("margin-top", "58px");', 1000)
    }



    function toolTipSetting() {
        setTimeout(function () {
            $('.fa.fa-print').attr("data-toggle", "tooltip");
            $('.fa.fa-print').attr("data-original-title", "Print");
            $('.fa.fa-print').attr("data-placement", "bottom");

            $('.portlet .collapse > a').attr("data-toggle", "tooltip");
            $('.portlet .collapse > a').attr("data-original-title", "Collapse");
            $('.portlet .collapse > a').attr("data-placement", "bottom");

            $('.portlet .collapse > a').attr("data-toggle", "tooltip");
            $('.portlet .collapse > a').attr("data-original-title", "Expand");
            $('.portlet .collapse > a').attr("data-placement", "bottom");

            $('li[data-toggle="tooltip"]').tooltip();
            $('a[data-toggle="tooltip"]').tooltip();

            if ($('navcon-button').attr("text") !== undefined && $('navcon-button').attr("text").toLowerCase() === "cancel") {
                $('navcon-button').attr("text", "Cancel");
            }
        }, 500);
    }

    function initEvents() {
        $('.portlet .collapse').on("click", function () {
            if ($(this) === undefined) return;
            if ($(this).hasClass('collapse'))
                $(this).attr("data-original-title", "Expand");
            else
                $(this).attr("data-original-title", "Collapse");
        });
        document.addEventListener('scroll', function (e) {
            if ($('.sp-container').is(":visible")) {
                $('.sp-container').addClass("sp-hidden");
            }
        }, true);
    }

    function colorpickerHide() {
        $('.sp-container').addClass("sp-hidden");
    }

    var riskAggressionModalClose = function (configHeaderMenu, event) {//bowtie riskaggression modal close
        if (configHeaderMenu !== undefined && configHeaderMenu !== null && configHeaderMenu.toLowerCase() === "bowtieanalysis") {
            var targetId = event.target.id;
            if (targetId !== undefined && targetId !== null && targetId.toLowerCase() === "hazardclassification") {// $(".modal.in").find("navcon-modal[id=" + targetId + "]").length !== 0) {
                var targetScope = $(".modal.in").find("navcon-modal[id=" + targetId + "]").scope();
                if (targetScope !== undefined && targetScope !== null) {
                    var parentScope = targetScope.$parent;
                    if (parentScope !== undefined && parentScope !== null && parentScope.cancel !== undefined) {
                        var type = parentScope.type;
                        parentScope.cancel(type);
                    }
                }
            }
        }
    }

    function chartToolTipClose(configMenu) {
        if (configMenu !== undefined && configMenu !== null && configMenu.toLowerCase() === "dashboard") {
            if ($(".chartToolTip") !== undefined && $(".chartToolTip").length !== 0) {

            }
        } else if ($("#fusioncharts-tooltip-element") !== undefined && $("#fusioncharts-tooltip-element").length !== 0) {
            $("#fusioncharts-tooltip-element").hide();
        }
    }

    // Reveal public pointers to
    // private functions and properties

    return {
        getSiteURL: webUrl,
        getPageConfig: function (scope, pageConfig, fieldConfigName) { return getPageConfig(scope, pageConfig, fieldConfigName) },
        getSequenceNo: function (options) { return getSequenceNo(options) },
        /*Fields*/
        getFieldsData: function (fields) { return getFieldsData(fields) },
        updateFieldsData: function (fields, item, $scope, isDisabled, $timeout) { return updateFieldsData(fields, item, $scope, isDisabled, $timeout) },
        clearFieldsData: function (fields, $scope, uploadClear) { clearFieldsData(fields, $scope, uploadClear) },
        setFieldFocus: function (fields) { setFieldFocus(fields) },
        getFieldsDataToSave: function (fields, mode, key, upload) { return getFieldsDataToSave(fields, mode, key, upload) },
        /*Tables*/
        setTableSetting: function (el, data, scope) { tableSetting(el, data, scope) },
        tableRefresh: function (el, setting, scope) { tableRefresh(el, setting, scope) },
        tableCellEditSetting: function (row, column, data, cellObj, oTable, $scope, $compile) { return tableCellEditSetting(row, column, data, cellObj, oTable, $scope, $compile) },
        getTableData: function (type, id, checked, key, checkedCol, oldData, mode) { return getTableData(type, id, checked, key, checkedCol, oldData, mode) },
        getTable: function (type, id, mode, fields) { return getTableInstance(type) },
        clearTableData: function (type, data) { return clearTableData(type, data) },
        updateTableData: function (type, data, targetData, id) { updateTableData(type, data, targetData, id) },
        saveTables: function (vm, dataservice, type, fields, refId, refValue, popup, callback) { return saveTables(vm, dataservice, type, fields, refId, refValue, popup, callback) },
        addNewTables: function ($scope, vm, type, fields, pageConfig, callback) { return addNewTables($scope, vm, type, fields, pageConfig, callback) },
        editTables: function ($scope, vm, type, fields, action, data, callback, popup) { return editTables($scope, vm, type, fields, action, data, callback, popup) },
        loadTableData: function (node, field, fieldType) { return loadTableData(node, field, fieldType) },
        getTableNotInOtherTable: function (mode, selectedItem, collectionItem, primaryKey, deleteRowItem, assignPrimaryKey) { return getTableNotInOtherTable(mode, selectedItem, collectionItem, primaryKey, deleteRowItem, assignPrimaryKey) },
        updateTableEditorData: function (data, field, $scope, isDisabled, vm) { return updateTableEditorData(data, field, $scope, isDisabled, vm) },
        /*Trees*/
        setTreeSetting: function (el, data, scope, fields, isExpand) { treeSetting(el, data, scope, fields, isExpand) },
        clearTreeData: function (type) { clearTreeData(type) },
        treeDataRefresh: function (data, type, callback) { treeDataRefresh(data, type, callback) },
        createTreeNode: function (tree, currentNode, newNode, position) { createTreeNode(tree, currentNode, newNode, position) },
        removeTreeNode: function (type, currentNode, treeSettings, hasParentDelete) { removeTreeNode(type, currentNode, treeSettings, hasParentDelete) },
        editTreeNode: function (tree, currentNode, text) { editTreeNode(tree, currentNode, text) },
        getTreeData: function (type, id, mode, fields) { return getTreeData(type, id, mode, fields) },
        treeInstance: function (type) { return treeInstance(type) },
        loadTreeData: function (type, data, targetData) { return loadTreeData(type, data, targetData) },
        getDataFromTree: function (items, data) { return getDataFromTree(items, data) },
        updateTreeData: function (data, id, field, value) { return updateTreeData(data, id, field, value) },
        updateTreeNode: function (type, data, updatedNode, callback) { return updateTreeNode(type, data, updatedNode, callback) },
        insertChildrenTreeData: function (data, id, node) { return insertChildrenTreeData(data, id, node) },
        chooseTree: function (type, checkedData, targetType, targetData, scope, callback, insNode) { return chooseTree(type, checkedData, targetType, targetData, scope, callback, insNode) },
        removeExistsTreeNode: function (sourceTreeType, targetTreeType, sourceTreeData, targetTreeData) { return removeExistsTreeNode(sourceTreeType, targetTreeType, sourceTreeData, targetTreeData) },
        disableTreeNodeById: function (sourceTree, id, sourceTreeData) { return disableTreeNodeById(sourceTree, id, sourceTreeData) },
        getNodeFromTreeDataByField: function (items, field, value) { return getNodeFromTreeDataByField(items, field, value) },
        getCheckedTreeNodes: function (type) { return getCheckedTreeNodes(type) },
        getTreeDataById: function (treeData, parentId, nodeType) { return getTreeDataById(treeData, parentId, nodeType) },
        updateTreeSingleData: function (tree, currentNode, columnName, text, columnNo, controlType) { updateTreeSingleData(tree, currentNode, columnName, text, columnNo, controlType) },
        /*Calendar*/
        calendarSetting: function (el, data, scope) { calendarSetting(el, data, scope) },
        /*Print*/
        callPrint: function (report, reportId, callback) { callPrint(report, reportId, callback) },
        /*Chart*/
        chartSetting: function (el, data, scope) { chartSetting(el, data, scope) },
        /*Page*/
        pageControlAction: function ($scope, mode, tableDefine, callback) { return pageControlAction($scope, mode, tableDefine, callback) },
        openModal: function (id, callback) { return openModal(id, callback) },
        closeModal: function (id) { return closeModal(id) },
        /*Common*/
        getItemByProperty: function (items, key) { return getItemByProperty(items, key) },
        getItemIndexByProperty: function (items, key) { return getItemIndexByProperty(items, key) },
        getItemByKeyValue: function (items, key, value, lowercase) { return getItemByKeyValue(items, key, value, lowercase) },
        getItemIndexByKeyValue: function (items, key, value) { return getItemIndexByKeyValue(items, key, value) },
        addDataList: function (vm, fields, tableOptions, uniqueKey) { return addDataList(vm, fields, tableOptions, uniqueKey) },
        deleteDataList: function (tableOptions, row) { deleteDataList(tableOptions, row) },
        dateConvert: function (date, format) { return dateConvert(date, format) },
        dateToUTC: function (date, format) { return dateToUTC(date, format) },
        dateFromUTCToLocal: function (date, format) { return dateFromUTCToLocal(date, format) },
        getItemsFilterByKeyValue: function (items, key, value) { return getItemsFilterByKeyValue(items, key, value) },
        setValueToControl: function (value, targetValue) { return setValueToControl(value, targetValue) },
        insertControl: function (type, data) { return insertControl(type, data) },
        insertDeleteditems: function (newItems, oldItems, tableKey, controlType) { return insertDeleteditems(newItems, oldItems, tableKey, controlType) },
        loadData: function (node, obj) { return loadData(node, obj) },
        jsonTransformed: function (data) { return jsonTransformed(data) },
        handleError: function (error, logger) { return handleError(error, logger) },
        dateFormat: function (date, format) { return dateFormat(date, format) },
        menuRightsCheck: function (menuSettings, mainMenu, subMenu) { return menuRightsCheck(menuSettings, mainMenu, subMenu) },
        updateMultiselectData: function (item, mode, fields, key) { return updateMultiselectData(item, mode, fields, key) },
        loadMultiSelect: function (items, field) { return loadMultiSelect(items, field) },
        updateCheckBoxListData: function (item, mode, fields, key) { return updateCheckBoxListData(item, mode, fields, key) },
        loadCheckBoxList: function (items, field, fields) { return loadCheckBoxList(items, field, fields) },
        getUserRights: function (menuSettings, mainMenu, subMenu) { return getUserRights(menuSettings, mainMenu, subMenu) },
        setDisabledEnabledByRights: function (rights, appItem) { return setDisabledEnabledByRights(rights, appItem) },
        getCurrentDate: function (format) { return getCurrentDate(format) },
        getItemsFilterByObject: function (items, object) { return getItemsFilterByObject(items, object) },
        getSubMenus: function (menuSettings, mainMenu) { return getSubMenus(menuSettings, mainMenu) },
        getMenuTitle: function (menuSettings, mainMenu) { return getMenuTitle(menuSettings, mainMenu) },
        getItemsNotInOtherItems: function (items, notInItems, itemField, notInFiled) { return getItemsNotInOtherItems(items, notInItems, itemField, notInFiled) },
        setViewContentDisabled: function (currentMode) { return setViewContentDisabled(currentMode) },
        getTextFromTree: function (items, data, parent) { return getTextFromTree(items, data, parent) },
        sleep: function (milliseconds) { sleep(milliseconds) },
        getObjectsfromJSON: function (obj, key, val) { return getObjectsfromJSON(obj, key, val) },
        isSave: function (fields) { return isSave(fields) },
        comparedata: function (fields, pagename, section, pkname, pkid, keyword) { return comparedata(fields, pagename, section, pkname, pkid, keyword) },
        clearTableSelectedRows: function (type) { return clearTableSelectedRows(type) },
        closeReport: function () { return closeReport() },
        getTemplateUrl: function (path) { return getTemplateUrl(path) },
        getApplicationVersion: function () { return getApplicationVersion() },
        getApplicationEnvironment: function () { return getApplicationEnvironment() },
        defaultFormat: function () { return defaultFormat() },
        getDistinctfromJSON: function (obj, key) { return getDistinctfromJSON(obj, key) },
        getMatchedobjectfromJSON: function (obj, key1, key2, value) { return getMatchedobjectfromJSON(obj, key1, key2, value) },
        getFilterobjectfromJSON: function (obj, key1, value) { return getFilterobjectfromJSON(obj, key1, value) },
        pageChanges: function (funcPageChange, funcpageSave, callback) { return pageChanges(funcPageChange, funcpageSave, callback) },
        tableSortDDMMYYYEExt: function () { return tableSortDDMMYYYEExt() },
        getEmailPattern: function () { return getEmailPattern() },
        viewContentLoaded: function (configMenu) { return viewContentLoaded(configMenu) },
        colorpickerHide: function () { return colorpickerHide() },
        riskAggressionModalClose: function (configHeaderMenu, event) { return riskAggressionModalClose(configHeaderMenu, event) }
    };

}());