(function (navcon) {
    navcon.kendo.table = {
        distinctData: function (collectionData, distinctField) {
            var filterData = [];
            if (collectionData !== undefined && collectionData !== null && collectionData.length !== 0) {
                $.each(collectionData, function (index, event) {
                    var events = $.grep(filterData, function (e) {
                        return event[distinctField] === e[distinctField];
                    });
                    if (events.length === 0) {
                        filterData.push(event);
                    }
                });
            }
            return filterData;
        },
        filterDropDown: function (element, fieldName, settings) {
            //var dataSource = new kendo.data.DataSource({ data: this.dataS.data().toJSON() });

            var data = navcon.kendo.table.distinctData(settings.data, fieldName);

            element.kendoDropDownList({
                dataSource: {
                    data: data
                },
                group: { field: fieldName },
                serverFiltering: true,
                dataTextField: fieldName,
                dataValueField: fieldName,
                optionLabel: "--Select Value--"
            });
        },
        editDropDown: function (container, options, serviceMethod) {
            //var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });

            var fieldId = this.option.id;
            var fieldText = this.option.text;
            var dataSource = this.dataset;

            if (serviceMethod !== undefined && serviceMethod !== null && serviceMethod !== "") {
                return dataservice.getServerData(serviceMethod, '').then(function (returnData) {
                    if (returnData === undefined || returnData === null || returnData.length === 0) return;

                    var data = navcon.kendo.table.distinctData(returnData, fieldId);

                    $('<input required name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataValueField: fieldId,
                            dataTextField: fieldText,
                            dataSource: {
                                type: "odata",
                                data: data,
                                /*transport: {
                                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                                }*/
                            }
                        });
                });
            } else {
                var data = navcon.kendo.table.distinctData(dataSource.data, fieldId);

                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataValueField: fieldId,
                        dataTextField: fieldText,
                        dataSource: {
                            type: "odata",
                            data: data,
                            /*transport: {
                                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                            }*/
                        }
                    });
            }
        },
        columnSetting: function (settings, scope) {
            var items = [];
            $.each(settings.columns, function (i, item) {
                item.field = item.data;
                if (item.visible !== undefined && item.visible !== "") item.hidden = !item.visible;

                if (item.type !== undefined && item.type.toLowerCase() === "select") {
                    //item.editor = navcon.kendo.table.editDropDown;
                    item.editor = jQuery.proxy(navcon.kendo.table.editDropDown, { option: { id: item.data, text: item.data }, dataset: settings });

                    item.template = "#=" + item.data + "#";

                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                template: function (args) {
                                    args.element.kendoDropDownList({
                                        dataSource: navcon.kendo.table.distinctData(args.dataSource.options.data, item.data),
                                        dataTextField: item.data,
                                        dataValueField: item.data,
                                        valuePrimitive: true,
                                        optionLabel: "--Select " + item.title + "--"
                                    });
                                },
                                showOperators: false,
                                operator: "contains"
                            },
                            ui: function (element) {
                                //navcon.kendo.table.filterDropDown(element, item.data, settings);
                                jQuery.proxy(navcon.kendo.table.filterDropDown, { option: { id: item.data, text: item.data }, dataset: settings });
                            }
                        };
                    }
                } else if (item.type !== undefined && item.type.toLowerCase() === "date") {
                    item.template = "#= kendo.toString(kendo.parseDate(" + item.data + "), '" + navcon.defaultFormat().kdate + "')#";

                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                showOperators: false,
                                operator: "contains"
                            },
                            ui: "datetimepicker" // use Kendo UI DateTimePicker
                            //element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
                        };
                    }
                } else if (item.type !== undefined && item.type.toLowerCase() === "autoselect") {
                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                inputWidth: "100%",
                                showOperators: true,
                                operator: "contains",
                                suggestionOperator: "contains"
                            }
                        };
                    }
                } else {
                    if (item.type !== undefined && item.type !== "") item.type = "string";
                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains"
                            }
                        };
                    }

                    /*item.editor= function (container, options) {
                        var input = $("<input/>");
                        input.attr("name", options.field);
                        input.attr("placeholder", "(optional)");
                        input.appendTo(container);
                    }*/
                }

                if (settings.options !== undefined && settings.options.editable !== undefined && settings.options.editable.enabled !== undefined
                    && !settings.options.editable.enabled && item.command !== undefined && item.command.length !== 0) return false;

                items.push(item);
            });

            return items;
        },
        rowSetting: function (settings, scope) {
            var items = [];
            items = settings.data;

            var fieldsConfig = scope.fields[0];
            var field = { "primaryKey": "Id" };
            var fieldConfigIndex = navcon.getItemIndexByProperty(scope.fields, "fieldConfig");
            if (fieldConfigIndex !== undefined && fieldConfigIndex !== -1) field = scope.fields[fieldConfigIndex];

            var dataSource = new kendo.data.DataSource({
                type: "odata",
                data: items,
                pageSize: settings.pageLength !== undefined ? settings.pageLength : 20,
                batch: true,
                schema: {
                    model: {
                        id: (settings.options !== undefined && settings.options.primaryKey !== undefined ? settings.options.primaryKey : field.primaryKey),
                        fields: navcon.kendo.table.validationSchema(settings, scope),
                    }
                }
            });

            return dataSource;
        },
        setting: function (el, options, scope) {
            var settings = {};
            if (options != undefined && options.options !== undefined) settings = options.options;

            var oTable = null;
            var table = $($(el).find('.kendoGrid')[0]);
            if (table !== undefined && table !== null) {
                //var scope = $(table).scope();

                kendo.destroy(table);
                table.empty();

                var oTable = table.kendoGrid({
                    type: $(el).attr("type"),
                    scrollable: {
                        endless: true,
                        virtual: true
                    },
                    //height: 600,
                    noRecords: true,
                    autoBind: true,
                    autoFitColumn: true,
                    columns: navcon.kendo.table.columnSetting(options, scope),
                    dataSource: new navcon.kendo.table.rowSetting(options, scope),
                    reorderable: true,
                    resizable: true,
                    sortable: settings.sortable !== undefined ? settings.sortable : true,
                    selectable: settings.selectable !== undefined ? settings.selectable : false,
                    //selectable: "multiple, row"
                    pageable: settings.pageable !== undefined && settings.pageable.enabled !== undefined && settings.pageable.enabled ? settings.pageable.enabled : false,
                    filterable: settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled ? settings.filterable.enabled : false,
                    editable: settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled ? settings.editable.enabled : false,
                    groupable: settings.groupable !== undefined && settings.groupable.enabled !== undefined && settings.groupable.enabled ? settings.groupable.enabled : false,
                    columnMenu: settings.columnMenu !== undefined && settings.columnMenu.enabled !== undefined && settings.columnMenu.enabled ? settings.columnMenu.enabled : false,
                    dataBound: navcon.kendo.table.dataBound,
                    dataBinding: navcon.kendo.table.dataBinding,
                    sort: navcon.kendo.table.sorting
                }).data("kendoGrid");
            }

            var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });
            var logger = angular.element(document).injector().invoke(function (logger) { return logger; });
            var toolbarOptions = [];

            if (oTable !== undefined && oTable !== null) {
                //Selectable Settings
                if (settings.selectable !== undefined && settings.selectable) {
                    oTable.setOptions({
                        change: navcon.kendo.table.change,
                    });
                }

                //Filter Settings
                if (settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled) {
                    oTable.setOptions({
                        filterable: {//CELL FILTERING OPTIONS
                            mode: "row",
                            extra: false, //the filter menu allows the user to input a second criterion.
                            operators: {
                                string: {
                                    eq: "Equal to",
                                    neq: "Not equal to",
                                    contains: "Contains",
                                    startswith: "Starts",
                                    isempty: "Empty"
                                }
                            }
                        },
                        /*dataSource: {
                            serverPaging: true,
                            serverFiltering: true,
                        }*/
                        /*filterable: {//CELL FILTERING OPTIONS
                            mode: "row",
                            //mode: "menu, row",
                            extra: true, //the filter menu allows the user to input a second criterion.
                            messages: {
                                and: "and",
                                or: "or",
                                filter: "Apply filter",
                                clear: "Clear filter",
                                info: "Filter by: ",
                                isFalse: "False",
                                search: "Search category",
                                selectValue: "Select category",
                                cancel: "Reject",
                                selectedItemsFormat: "There are {0} selected items",
                                operator: "Choose operator",
                                value: "Choose value"
                            },
                            operators: {
                                string: {
                                    eq: "Equal to",
                                    neq: "Not equal to",
                                    isnull: "Null",
                                    isnotnull: "Not null",
                                    isempty: "Empty",
                                    isnotempty: "Not empty",
                                    startswith: "Starts",
                                    contains: "Contains",
                                    doesnotcontain: "Doesn't contain",
                                    endswith: "Ends"
                                },
                                number: {
                                    eq: "Equal to",
                                    neq: "Not equal to",
                                    lte: "Less than or equal to",
                                    lt: "Less than",
                                },
                                date: {
                                    gt: "After",
                                    lt: "Before"
                                },
                                enums: {
                                    eq: "Equal to",
                                    neq: "Not equal to"
                                }
                            }
                        }*/
                        filterMenuInit: navcon.kendo.table.filterMenuInit,
                        filter: navcon.kendo.table.filtering
                    });
                }

                //Header menu settings
                if (settings.columnMenu !== undefined && settings.columnMenu.enabled !== undefined && settings.columnMenu.enabled) {
                    oTable.setOptions({
                        columnMenu: {
                            columns: settings.columnMenu.columns !== undefined ? settings.columnMenu.columns : false, //DISABLE COLUMN SELECTION
                            filterable: settings.columnMenu.filterable !== undefined ? settings.columnMenu.filterable : false, //DISABLE COLUMN MENU FILTERING
                            sortable: settings.columnMenu.sortable !== undefined ? settings.columnMenu.sortable : false, //DISABLE COLUMN MENU SORTING
                            /*messages: {
                                columns: "Choose columns",
                                filter: "Apply filter",
                                sortAscending: "Sort (asc)",
                                sortDescending: "Sort (desc)",
                                settings: "Column Options",
                                done: "Ok",
                                lock: "Pin this column",
                                unlock: "Unpin this column"
                            }*/
                        }
                    });
                }

                //Pager settings
                if (settings.pageable !== undefined && settings.pageable.enabled !== undefined && settings.pageable.enabled) {
                    oTable.setOptions({
                        pageable: {
                            refresh: true,
                            alwaysVisible: false,
                            pageSize: settings.pageable.pageLength !== undefined ? settings.pageable.pageLength : 20,
                            previousNext: settings.pageable.previousNext !== undefined ? settings.pageable.previousNext : true,
                            pageSizes: settings.pageable.pageSizes !== undefined ? settings.pageable.pageSizes : [5, 15, 25, "all"],
                            buttonCount: settings.pageable.buttonCount !== undefined ? settings.pageable.buttonCount : 5,
                            numeric: settings.pageable.pageBadge !== undefined ? settings.pageable.pageBadge : true,
                            input: settings.pageable.pageInput !== undefined ? settings.pageable.pageInput : false,
                            info: settings.pageable.info !== undefined ? settings.pageable.info : true,
                            messages: {
                                display: "Showing {0}-{1} from {2} data items",
                                empty: options.emptyTable !== undefined ? options.emptyTable : "No data available in table",
                                page: "Enter page",
                                of: "from {0}",
                                itemsPerPage: "data items per page",
                                first: "First page",
                                last: "Last page",
                                next: "Next page",
                                previous: "Previous page",
                                refresh: "Refresh the grid",
                                morePages: "More pages"
                            }
                        }/*,
                        dataSource: {
                            pageSize: settings.pageable.pageLength !== undefined ? settings.pageable.pageLength : 20,
                        }*/
                    });
                } else {
                    oTable.setOptions({
                        scrollable: {
                            endless: true,
                            virtual: true
                        },
                        pageable: true
                    });
                }

                //Group settings
                if (settings.groupable !== undefined && settings.groupable.enabled !== undefined && settings.groupable.enabled) {
                    oTable.setOptions({
                        groupable: {
                            showFooter: true,
                            messages: {
                                empty: "Drop columns here"
                            }
                        },
                        group: navcon.kendo.table.grouping,
                        groupExpand: navcon.kendo.table.groupExpand,
                        groupCollapse: navcon.kendo.table.groupCollapse
                    });
                }

                //Edit settings
                if (settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled) {
                    if (settings.editable.addNew !== undefined && settings.editable.addNew)
                        toolbarOptions.push({ name: "create", text: "Add new" });

                    //$timeout(function () {
                    oTable.setOptions({
                        //toolbar: [{ name: "create", text: "Add new", iconClass: "k-icon k-i-copy" }],
                        //command: [
                        //    { name: "edit", text: { edit: "Edit", update: "Update", cancel: "Cancel" } },
                        //    { name: "destroy", text: "Delete" }
                        //],
                        editable: {
                            mode: settings.editable.mode !== undefined ? settings.editable.mode : "",
                            createAt: settings.editable.createAt !== undefined ? settings.editable.createAt : "bottom", //INSERT NEW DATA ITEMS AT THE BOTTOM {"top","bottom"},
                            update: settings.editable.update !== undefined ? settings.editable.update : true,
                            destroy: settings.editable.delete !== undefined ? settings.editable.delete : true,//DISABLE DELETING
                            confirmation: settings.editable.confirmationInfo !== undefined ? settings.editable.confirmationInfo : false, //DISABLE DELETE CONFIRMATION
                            //template: kendo.template($("#" + $(el).attr("type") + "-editor").html())
                            //template: kendo.template($("#" + $(el).attr("type")).children().html())

                            //template: kendo.template($("#popup-editor").html())
                        },
                        addRow: function (e) {
                            console.log("add row");
                        },
                        edit: function (e) {
                            e.preventDefault();

                            var model = e.model; //reference to the model that is about the be edited
                            var container = e.container; //reference to the editor container
                            var dataSource = this.dataSource;
                            //var event = e.event;

                            if (e.container.data("kendoWindow") !== undefined) e.container.data("kendoWindow").title($(el).attr("type"));

                            var scope = $(e.sender.element).scope()
                            var rowId = model.uid;
                            var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.options.data, { "uid": rowId }, "uid");
                            var selectedData = dataSource.options.data[selectedRowIndex];

                            scope.fields.selectedRow = angular.copy(selectedRowIndex);
                            scope.fields.getById = angular.copy(selectedData);

                            if (model.id !== undefined && model.id !== null && model.id !== "")
                                scope.fields.mode = "View";
                            else {
                                scope.fields.mode = "Save";
                                container.find(".k-button.k-primary").text("Save");
                            }
                            var approvalColumn = navcon.kendo.table.approvalColumn(scope.tableSettings.columns);

                            container.find("[data-container-for='" + approvalColumn + "']").find(".k-dropdown").hide();
                            container.find("[data-container-for='" + approvalColumn + "']").find("[name='" + approvalColumn + "']").removeAttr("required");

                            //navcon.openModal($(el).attr("type"));

                            //console.log("Edit - " + scope.fields.mode);

                            if (settings.editable.mode !== undefined && settings.editable.mode.toLowerCase() === "navcon") {
                                //this.closeCell();
                                if (scope.fields.mode.toLowerCase() === "save") this.cancelRow();
                                //e.container.data("kendoWindow").close();

                                if (scope.navconData.addNew === undefined) return;
                                scope.navconData.addNew(scope.type, scope.fields.mode);
                            }
                        },
                        saveChanges: function (e) {
                            var model = e.model; //reference to the model that is about the be edited
                            var container = e.container; //reference to the editor container
                            var type = $(el).attr("type");
                            //console.log("saveChanges");
                        },
                        save: function (e) {
                            e.preventDefault();

                            var model = e.model; //reference to the model that is about the be edited
                            var container = e.container; //reference to the editor container
                            var type = $(el).attr("type");

                            var scope = $(e.sender.element).scope()
                            var rowId = model.uid;
                            //var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.options.data, { "uid": rowId }, "uid");
                            //var selectedData = dataSource.options.data[selectedRowIndex];

                            //if (model.id !== undefined && model.id !== null && model.id !== "")
                            //    scope.fields.mode = "Update";
                            //else
                            //    scope.fields.mode = "Save";

                            navcon.updateFieldsData(scope.fields, model, scope, false);

                            var fieldKeyIndex = navcon.getItemIndexByProperty(scope.fields, scope.fields.primaryKey);
                            if (fieldKeyIndex !== undefined && fieldKeyIndex !== -1 && (scope.fields[fieldKeyIndex].data === null || scope.fields[fieldKeyIndex].data === ""))
                                scope.fields[fieldKeyIndex].data = "0";

                            scope.navconData.save(type, "", function (data) {
                                if (data) {
                                    var msg = "Entries are saved successfully...";
                                    if (scope.navconData !== undefined && scope.items.mode !== undefined && scope.items.mode === "Update")
                                        msg = "Entries are updated successfully...";
                                    if (scope.navconData !== undefined && scope.items.mode !== undefined && scope.items.mode !== "Delete")
                                        logger.success(msg, "", "");

                                    oTable.saveRow();
                                }
                            });

                            //console.log("Save");
                        },
                        remove: function (e) {
                            e.preventDefault();

                            var model = e.model; //reference to the model that is about the be edited
                            var container = e.container; //reference to the editor container
                            var dataSource = e.sender.dataSource;
                            var type = $(el).attr("type");

                            var scope = $(e.sender.element).scope()
                            var rowId = model.uid;
                            var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.options.data, { "uid": rowId }, "uid");
                            var selectedData = dataSource.options.data[selectedRowIndex];

                            scope.fields.selectedRow = angular.copy(selectedRowIndex);
                            scope.fields.getById = angular.copy(selectedData);

                            scope.navconData.tableRowDelete(type, type + 'delete', function (data) {
                                if (data) {
                                    logger.success("Entries are deleted successfully...", "", "");

                                    oTable.dataSource.remove(model);
                                    oTable.dataSource.sync();
                                }
                            });
                        },
                        cancel: function (e) {
                            oTable.cancelChanges();
                            //console.log("Cancel");
                        }
                    });
                }

                //PDF settings
                if (settings.pdf !== undefined && settings.pdf.enabled !== undefined && settings.pdf.enabled) {
                    toolbarOptions.push({ name: "pdf", text: "Export PDF", iconClass: "k-icon k-i-print" });

                    oTable.setOptions({
                        //toolbar: [{ name: "pdf", text: "Export PDF", iconClass: "k-icon k-i-copy" }],
                        pdf: {
                            allPages: true,
                            avoidLinks: true,
                            paperSize: "A4",
                            margin: { top: "2cm", right: "1cm", bottom: "1cm", left: "1cm" },
                            landscape: true,
                            repeatHeaders: true,
                            fileName: $(el).attr("type") + ".pdf",
                            template: $("#print-template").html(),
                            scale: 0.8
                            /*subject: "Products",
                            title: "Products",
                            fileName: "Products.pdf",
                            keywords: "northwind products",
                            author: "Navcon",
                            creator: "Navcon",
                            avoidLinks: true,
                            date: navcon.getCurrentDate,
                            paperSize: ["20mm", "20mm"],
                            landscape: true,
                            margin: {
                                left: 10,
                                right: "10pt",
                                top: "10mm",
                                bottom: "1in"
                            },
                            forceProxy: true,
                            proxyURL: "/save",
                            proxyTarget: "_blank",*/
                        },
                        pdfExport: function (e) {
                            title = $(el).attr("type");
                            date = navcon.getCurrentDate();

                            oTable.hideColumn(4);

                            e.promise.done(function () {
                                oTable.showColumn(4);
                            });
                        }
                    });
                }

                //Toolbar  options
                if (toolbarOptions !== undefined && toolbarOptions.length !== 0) {
                    //toolbarOptions.push("<p>My string template in a paragraph.</p>");
                    //toolbarOptions.push(kendo.template("<p>My function template.</p>"));
                    //toolbarOptions.push({ template: '<a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>' });
                    //toolbarOptions.push({ template: kendo.template($("#toolbar-template").html()) }); //toolbar template

                    oTable.setOptions({
                        toolbar: toolbarOptions
                    });

                    if (settings.editable !== undefined && settings.editable.createAt !== undefined && settings.editable.createAt.toLowerCase() === "bottom") {
                        $(".k-grid-toolbar").insertAfter($(".k-grid-pager").length !== 0 ? $(".k-grid-pager") : $(".k-grid-content"));
                    }

                    $(".k-grid-pdf").css("float", "right");
                }

            }

            //cell click 
            $(table).find('tbody').on('click', 'td', function (el, tt) {
                var tableSettings = scope.tableSettings;
                var tr = $(this).closest("tr");

                var tableData = oTable.dataSource.data();
                var rowId = tr.attr("data-uid");
                var selectedRowIndex = navcon.save.selectedRowIndex(tableData, { "uid": rowId }, "uid");

                var rowData = tableData[selectedRowIndex];
                var rowIndex = selectedRowIndex;
                var rowObj = tr;

                var cellData = $(this).text();
                var columnIndex = rowObj.find(this).index();
                var cellObj = this;
                var columnTitle = tableSettings.columns[columnIndex].title;

                scope.fields.mode = "View";

                //if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && columnTitle === "add") || (!scope.navconData.rights.Edit && columnTitle === "edit")
                //    || ((!scope.navconData.rights.View && !scope.navconData.rights.Approve) && columnTitle === "view") || (!scope.navconData.rights.Delete && columnTitle === "delete"))) return false;

                //if (scope.tableSettings.tableCellClick !== undefined) {
                var approveAnchor = $(this).find("a.gridApprove");
                if (approveAnchor !== undefined && approveAnchor !== null && approveAnchor.length !== 0) {
                    var action = "Approve";
                    if (scope.navconData.tableRowApproveClick === undefined) return;
                    scope.navconData.tableRowApproveClick(rowIndex, columnIndex, rowData, scope.type, this, oTable, action);
                } else {
                    if (scope.navconData.tableCellClick === undefined) return;
                    scope.navconData.tableCellClick(rowIndex, columnIndex, rowData, scope.type, this, oTable, undefined, action);
                }
                //}
            });

            //});
        },
        detailTemplate: function (arg) {
            //kendo.template($("#detail-template").html())

            //console.log("Grid detail Template");
            return {};
        },
        rowTemplate: function (arg) {
            //kendo.template($("#template").html())
            //console.log("Grid row Template");
            return {};
        },
        change: function (arg, e) {
            var selected = $.map(this.select(), function (item) {
                return $(item).text();
            });

            //console.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");

            var oTable = null;
            var table = $($(arg.sender.element).parents()[0]).find('.kendoGrid')[0];
            if (table !== undefined && table !== null) var oTable = $(table).data("kendoGrid");

            var scope = $(arg.sender.select()).scope();
            if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && headerTitle === "add") || (!scope.navconData.rights.Edit && headerTitle === "edit")
                || ((!scope.navconData.rights.View && !scope.navconData.rights.Approve) && headerTitle === "view") || (!scope.navconData.rights.Delete && headerTitle === "delete"))) return false;

            $(event.target).addClass("navcon-selected");
            var tr = event.target.closest("tr");
            var data = this.dataItem(event.target.closest("tr"));
            var row = $(tr).index();
            var column = $(event.target.closest("tr")).find(".navcon-selected").index();
            var rowId = $(this.select()).data().uid;
            $(event.target).removeClass("navcon-selected");

            /*var primaryKey = scope.tableSettings.options !== undefined && scope.tableSettings.options.primaryKey !== undefined
                && scope.tableSettings.options.primaryKey !== "" ? scope.tableSettings.options.primaryKey : "id";
            var tableData = arg.sender.dataSource.data();
            var selectedRowIndex = navcon.save.selectedRowIndex(tableData, { "uid": rowId }, "uid");
            var selectedData = tableData[selectedRowIndex];*/

            if ($(arg.sender)[0].type !== "checkbox" && (scope.tableSettings.columnNonclick === undefined || scope.tableSettings.columnNonclick === null || !scope.tableSettings.columnNonclick)) {
                var action = "View";

                if (scope.tableSettings.tableCellClick !== undefined) {
                    var approveAnchor = $(this).find("a.gridApprove");
                    if (approveAnchor !== undefined && approveAnchor !== null && approveAnchor.length !== 0) {
                        action = "Approve";
                        if (scope.tableSettings.tableRowApproveClick === undefined) return;
                        scope.tableSettings.tableRowApproveClick(row, column, data, scope.type, this, oTable, action, rowId);
                    } else {
                        if (scope.tableSettings.tableCellClick === undefined) return;
                        scope.tableSettings.tableCellClick(row, column, data, scope.type, this, oTable, rowId, action);
                    }
                } else {
                    var approveAnchor = $(this).find("a.gridApprove");
                    if (approveAnchor !== undefined && approveAnchor !== null && approveAnchor.length !== 0) {
                        action = "Approve";
                        if (scope.navconData.tableRowApproveClick === undefined) return;
                        scope.navconData.tableRowApproveClick(row, column, data, scope.type, this, oTable, action, rowId);
                    } else {
                        if (scope.navconData.tableCellClick === undefined) return;
                        scope.navconData.tableCellClick(row, column, data, scope.type, this, oTable, rowId, action);
                    }
                }
            }

            //console.log("Grid change");
        },
        detailInit: function (arg) {
            //e.detailCell.text("City: " + e.data.city);

            e.detailRow.find(".grid").kendoGrid({
                //dataSource: e.data.products
            });

            //console.log("Grid detail Init");
        },
        dataBinding: function (arg) {
            //console.log("Grid data binding");
        },
        dataBound: function (e) {
            var scope = $(e.sender.element).scope();
            var tableSettings = scope.tableSettings;
            var columns = e.sender.columns;
            var approvalColumn = navcon.kendo.table.approvalColumn(columns);
            var type = scope.type;

            /*Rights based edit and delete button enabled*/
            $(e.sender.element).find(".k-button.k-grid-edit").show();
            $(e.sender.element).find(".k-button.k-grid-delete").show();
            if (scope.navconData !== undefined && scope.navconData.rights !== undefined && scope.navconData.rights !== null) {
                if (scope.navconData.rights.Edit !== undefined && scope.navconData.rights.Edit !== null && scope.navconData.rights.Edit !== null && !scope.navconData.rights.Edit)
                    $(arg.sender.element).find(".k-button.k-grid-edit").hide();

                if (scope.navconData.rights.Delete !== undefined && scope.navconData.rights.Delete !== null && scope.navconData.rights.Delete !== null && !scope.navconData.rights.Delete)
                    $(arg.sender.element).find(".k-button.k-grid-delete").hide();
            }

            /*Grid row*/
            var columnIndex = this.wrapper.find(".k-grid-header [data-field='" + approvalColumn + "']").index();
            var dataItems = e.sender.dataSource.view();
            for (var j = 0; j < dataItems.length; j++) {
                var data = dataItems[j];

                var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
                var cellObj = row.children().eq(columnIndex);

                if (scope.navconData !== undefined && scope.navconData.tableRowUpdate !== undefined)
                    scope.navconData.tableRowUpdate(row, data, j, type, cellObj, scope);

                //ApprovalColumn
                if (columnIndex !== undefined && columnIndex !== "" && columnIndex !== -1) {
                    if (scope.navconData !== undefined && scope.navconData.rights !== undefined && scope.navconData.rights.Approve !== undefined && scope.navconData.rights.Approve) {
                        var item = tableSettings.columns[columnIndex];
                        if (item.approvalColumn !== undefined && item.approvalColumn != null && item.approvalColumn) {
                            //if ($(row).children().length <= columnIndex)
                            //    columnIndex = ($(row).children().length - 1);

                            if (data["SendApproval"] === undefined || (data["SendApproval"] != null && data["SendApproval"])) {
                                var columnText = $(row).children().eq(columnIndex).text();
                                if (columnText !== undefined && columnText !== null && (columnText.toLowerCase() === "active" || columnText.toLowerCase() === "draft" || columnText.toLowerCase() === "pending" || columnText.toLowerCase() === "completed" || columnText === ""))
                                    $(row).children().eq(columnIndex).html('<a class="btn default green btn-xs gridApprove"><i class="fa fa-check"></i>Approve</a>');
                            } else if (data["SendApproval"] === undefined && (data[item.data] === undefined || (data[item.data] != null && data[item.data]))) {
                                var columnText = $(row).children().eq(columnIndex).text();
                                if (columnText !== undefined && columnText !== null && (columnText.toLowerCase() === "active" || columnText.toLowerCase() === "draft" || columnText.toLowerCase() === "pending" || columnText.toLowerCase() === "completed" || columnText === ""))
                                    $(row).children().eq(columnIndex).html('<a class="btn default green btn-xs gridApprove"><i class="fa fa-check"></i>Approve</a>');
                            }
                        }
                    }
                }
                //row.addClass("discontinued");
                //cellObj.addClass(getUnitsInStockClass(units));
            }

            //$(arg.sender.element).find("[data-container-for='StatusName']").find(".k-dropdown").hide();
            //$(arg.sender.element).find("[data-container-for='StatusName']").find("[name='StatusName']").removeAttr("required");

            //this.expandRow(this.tbody.find("tr.k-master-row").first());
            //console.log("Grid data bound");
        },
        dataItems: function (arg) {
            //console.log("Grid dataItems");
        },
        _displayRow: function (t) {
            //console.log("Grid _displayRow");
        },
        _rowsHtml: function (e, t) {
            //console.log("Grid _rowsHtml");
        },
        sorting: function (arg) {
            //console.log("Sorting on field: " + arg.sort.field + ", direction:" + (arg.sort.dir || "none"));
        },
        filtering: function (arg) {
            //if (arg.filter == null) {
            //    console.log("filter has been cleared");
            //} else {
            //    console.log(arg.filter.logic);
            //    console.log(arg.filter.filters[0].field);
            //    console.log(arg.filter.filters[0].operator);
            //    console.log(arg.filter.filters[0].value);
            //}

            console.log("Filter on " + kendo.stringify(arg.filter));
        },
        filterMenuInit: function () {
            console.log("filter Menu Init");
            /*var popup = e.container.data("kendoPopup");
            popup.bind("open", function(e) {
                //find the dropdownlist in this.element container
                //use the setDataSource to change its DataSource
                //or filter method to filter the current dataSource
            }*/

            // If the filter is for the "Role" column...
            /*if (e.field == "roleTitle") {
                e.container.find("div.k-filter-help-text").text("Select an item from the list:");
                e.container.find("span.k-dropdown:first").css("display", "none");
        
                // Change the text field to a dropdownlist in the Role filter menu.
                var dropDownList = e.container.find(".k-textbox:first")
                    .removeClass("k-textbox")
                    .kendoDropDownList({
                        dataSource: new kendo.data.DataSource({
                            data: [
                                { title: "Software Engineer" },
                                { title: "Quality Assurance Engineer" },
                                { title: "Team Lead" }
                            ]
                        }),
                        dataTextField: "title",
                        dataValueField: "title"
                    }).data("kendoDropDownList");
        
                // Get the FilterMenu object for the roleTitle column.
                // Set the FilterMenu.filterModel.filters[0] to the
                // title of the first item in the dropdownlist.
                _grid.thead.find("th:last")     //roleTitle is the last column 
                    .data("kendoFilterMenu")    // Get the FilterMenu for the last column 
                        .filterModel.filters[0].value = dropDownList.dataSource.data()[0].title;
            }*/
        },
        paging: function (arg) {
            //console.log("Paging to page index:" + arg.page);
        },
        grouping: function (arg) {
            //console.log("Group on " + kendo.stringify(arg.groups));
        },
        groupExpand: function (arg) {
            //console.log("The group to be expanded: " + kendo.stringify(arg.group));
        },
        groupCollapse: function (arg) {
            //console.log("The group to be collapsed: " + kendo.stringify(arg.group));
        },
        refresh: function (el, setting, scope) {
            if (setting.data.length === 0) setting.data = [];
            navcon.kendo.table.setting(el, setting, scope);

            //var table = $($(el).find('table')[0]);
            //var tabInst = table.DataTable.fnTables();
            //if ($(tabInst).parents("navcon-table[type='" + $(el).attr("type") + "']").length === 0 || table.children().length === 0) {
            //    navcon.kendo.table.setting(el, setting, scope);
            //    return;
            //}
            //var oTable = table.DataTable();
            //oTable.clear();

            //oTable.rows.add(setting.data).draw();

            //var table = $($(el).find('.kendoGrid')[0]);
            //var grid = table.data("kendoGrid");
            /*var items = navcon.kendo.table.rowSetting(setting.data);
            grid.dataSource.data(items);*/

            //table.find(".k-grid-content").css('max-height', '500px');
            //table.find(".k-filtercell>span[style='width: 100%;']").css("display", "");
            //table.find(".k-filtercell, .k-filtercell .k-widget, .k-filtercell>span[style='width: 100%;']").css("display", "");
        },
        selectedRowIndex: function (table, selectedRow, idColumn) {
            var returnData = -1;
            var tableData = table.data !== undefined ? table.data : table;

            if (tableData !== undefined && tableData.length > 0)
                returnData = navcon.getItemIndexByKeyValue(tableData, idColumn, selectedRow[idColumn]);

            return returnData;
        },
        approvalColumn: function (columns) {
            var objColumn = $.grep(columns, function (v) { return v.approvalColumn === true; });
            var strColumn = ((objColumn.length !== 0 && objColumn[0].data !== undefined) ? objColumn[0].data : "");

            return strColumn;
        },
        dateColumn: function (settings) {
            var objColumn = $.grep(settings.dateFields, function (v) { return v.approvalColumn === true; });
            var strColumn = ((objColumn.length !== 0 && objColumn[0].data !== undefined) ? objColumn[0].data : "");

            return strColumn;
        },
        columnAssign: function (table, columnData, serviceName, columnType) {
            var returnData = "";
            if (serviceName != undefined && serviceName != "") {
                returnData = dataservice.getServerData(serviceName).then(function (data) {
                    if (data === undefined || data.length === 0) return;
                    tableColumnCreate(data, columnType);
                    return data;
                });
            } else {
                tableColumnCreate(columnData, columnType);
            }

            function tableColumnCreate(data, columnType) {
                if (data != undefined) {
                    var columndetails = "", i = 0;

                    for (i = 0; i < data.length; i++) {
                        //var columnIndex = navcon.getItemByKeyValue(table.columnControl.exceptColumns, "index", i);
                        var columnIndex = table.columnControl.exceptColumns.indexOf(i);
                        if (columnIndex !== -1)
                            columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"data\": \"" + data[i].id + "\", \"width\": \"100px\" },";
                        else
                            columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"options\" : {\"type\" : \"" + table.columnControl.type + "\", \"dataType\": \"" + columnType + "\"}, \"data\": \"" + data[i].id + "\", \"width\": \"100px\" },";
                        //columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"data\": \"" + data[i].id + "\", \"field\": \"" + data[i].id + "\", \"width\": \"" + columnIndex.width + "\", \"fieldType\": \"text\" },";
                    }
                    if (columndetails !== "") columndetails = columndetails.substring(0, columndetails.length - 1);

                    table.columns = $.parseJSON("[" + columndetails + "]");
                    //table.columns = navcon.jsonTransformed($.parseJSON("[" + columndetails + "]"));
                }
                return data;
            }
        },
        manageData: function (columns, items) {
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
        },
        pdfExport: function (kendoTable, settings, e) {
            var progress = $.Deferred();

            /*kendo.drawing.drawDOM($("#header"))
              .done(function(header) {
                  kendo.drawing.drawDOM($("#footer"))
                    .done(function(footer) {*/
            kendoTable._drawPDF(progress)
              .then(function (root) {
                  root.children.unshift(header);
                  root.children.push(footer);

                  return kendo.drawing.exportPDF(root, {
                      paperSize: "auto",
                      margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" },
                      multiPage: true
                  });
              })
              .done(function (dataURI) {
                  //console.log("Okay");
                  kendo.saveAs({
                      dataURI: dataURI,
                      fileName: "navcon.pdf"
                  });
                  progress.resolve();
              })
            /*});
        })*/
        },
        validationSchema: function (settings, scope) {
            var myFields = {};
            var strFields = "";

            $.each(settings.columns, function (i, item) {
                var type = item.type;
                var fieldTitle = item.title;
                var fieldName = item.data;

                var fieldKey = item.fieldKey;
                var field = null;
                var fieldKeyIndex = navcon.getItemIndexByProperty(scope.fields, fieldKey);
                if (fieldKeyIndex !== undefined && fieldKeyIndex !== -1) field = scope.fields[fieldKeyIndex];

                if (fieldName !== undefined && fieldName !== null && fieldName !== "") {
                    myFields[fieldName] = { "validation": {} };

                    if (fieldName !== undefined && fieldName !== null && fieldName !== "" && fieldName.length !== 0) {
                        if (type !== undefined && type.toLowerCase() === "autoselect") type = "string";
                        myFields[fieldName].validation["type"] = type;

                        if (field !== undefined && field !== null && field.templateOptions !== undefined && field.templateOptions.length !== 0) {
                            var validation = field.templateOptions;
                            //Required message
                            navcon.kendo.requiredValidation(myFields[fieldName], fieldName, validation);
                            /*if (validation.required !== undefined && validation.required !== null && (validation.required || validation.required.toLowerCase() === "yes")) {
                                if (validation.requiredMessage !== undefined && validation.requiredMessage !== null && validation.requiredMessage !== "")
                                    myFields[fieldName].validation["required"] = { "message": validation.requiredMessage };
                                else
                                    myFields[fieldName].validation["required"] = (validation.required || validation.required.toLowerCase() === "yes" ? true : false);
                            }*/

                            //Minium message
                            navcon.kendo.minimumValidation(myFields[fieldName], fieldName, validation);
                            /*if (validation.minlength !== undefined && validation.minlength !== null && validation.minlength !== "") {
                                var messageMin = validation.minlengthMessage !== undefined && validation.minlengthMessage !== "" ? validation.minlengthMessage : "Minimum " + validation.minlength + " character required.";
                                myFields[fieldName].validation[fieldName.toLowerCase() + "min"] = function (input) {
                                    if (input.is("[name='" + fieldName + "']") && input.val().length < validation.minlength) {
                                        input.attr("data-" + fieldName.toLowerCase() + "min-msg", "" + validation.minlengthMessage + "");
                                        return false;
                                    }
                                    return true;
                                }
                            }*/

                            //Maximum message
                            navcon.kendo.maximumValidation(myFields[fieldName], fieldName, validation);
                            /*if (validation.maxlength !== undefined && validation.maxlength !== null && validation.maxlength !== "") {
                                var messageMin = validation.maxlengthMessage !== undefined && validation.maxlengthMessage !== "" ? validation.maxlengthMessage : "Maximum " + validation.maxlength + " only allowed.";
                                myFields[fieldName].validation[fieldName.toLowerCase() + "max"] = function (input) {
                                    if (input.is("[name='" + fieldName + "']") && input.val().length > validation.maxlength) {
                                        input.attr("data-" + fieldName.toLowerCase() + "max-msg", "" + validation.maxlengthMessage + "");
                                        return false;
                                    }
                                    return true;
                                }
                            }*/

                            //Pattern message
                            navcon.kendo.patternValidation(myFields[fieldName], fieldName, validation);
                            /*if (validation.pattern !== undefined && validation.pattern !== null && validation.pattern !== "") {
                                var patternRegex = new RegExp(validation.pattern.toString());
                                var messageMin = validation.patternMessage !== undefined && validation.patternMessage !== "" ? validation.patternMessage : "Alpha numeric only allowed.";
                                myFields[fieldName].validation[fieldName.toLowerCase() + "pattern"] = function (input) {
                                    if (input.is("[name='" + fieldName + "']") && input.val() != "") {
                                        input.attr("data-" + fieldName.toLowerCase() + "pattern-msg", "" + validation.patternMessage + "");
                                        return patternRegex.test(input.val());
                                    }
                                    return true;
                                }
                            }*/

                            //ExistData message
                            navcon.kendo.existDataValidation(myFields[fieldName], fieldName, validation, scope);
                            /*if (validation.isExistData !== undefined && validation.isExistData !== null && validation.isExistData !== "") {
                                var scopeData = scope.navconData[validation.isExistData];
                                var keyOldData = "";

                                var messageMin = validation.isExistMessage !== undefined && validation.isExistMessage !== "" ? validation.isExistMessage : "already exists..";
                                myFields[fieldName].validation[fieldName.toLowerCase() + "exists"] = function (input) {
                                    if (input.is("[name='" + fieldName + "']") && input.val() != "") {
                                        if (scope.fields.getById !== undefined && scope.fields.getById !== null)
                                            keyOldData = scope.fields.getById[fieldKey];

                                        retVal = navcon.getItemByKeyValue(scopeData, fieldKey, input.val().toString().trim());
                                        if (retVal !== -1 && input.val().toString().trim() !== keyOldData.toString().trim()) {
                                            input.attr("data-" + fieldName.toLowerCase() + "exists-msg", "" + validation.isExistMessage + "");
                                            retVal = false;
                                        }
                                        else
                                            retVal = true;

                                        return retVal;
                                    }
                                    return true;
                                }
                            }*/
                        }
                    }
                }
            });

            return myFields;
        }
    }

    //},1200);
}(navcon || {}));