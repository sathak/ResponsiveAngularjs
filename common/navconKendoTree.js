(function (navcon) {
    navcon.kendo.tree = {
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

            var data = navcon.kendo.tree.distinctData(settings.data, fieldName);

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

                    var data = navcon.kendo.tree.distinctData(returnData, fieldId);

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
                var data = navcon.kendo.tree.distinctData(dataSource.data, fieldId);

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

            var fieldMode = (scope.fields.mode !== undefined ? scope.fields.mode : "View");
            var field = { "primaryKey": "id", "foreignKey": "parentId" };
            //var fieldsConfig = scope.fields[0];
            var fieldConfigIndex = navcon.getItemIndexByProperty(scope.fields, "fieldConfig");
            if (fieldConfigIndex !== undefined && fieldConfigIndex !== -1) field = scope.fields[fieldConfigIndex];
            var primaryKey = (settings.options !== undefined && settings.options.primaryKey !== undefined ? settings.options.primaryKey : field.primaryKey);
            var foreignKey = (settings.options !== undefined && settings.options.foreignKey !== undefined ? settings.options.foreignKey : field.foreignKey);
            var parentRowCheck = (settings.options !== undefined && settings.options.parentRowCheck !== undefined && settings.options.parentRowCheck ? true : false);
            if (fieldMode.toLowerCase() === 'view') parentRowCheck = false;

            $.each(settings.columns, function (i, item) {
                item.field = item.data;
                if (item.visible !== undefined && item.visible !== "") item.hidden = !item.visible;

                //item.footerTemplate= "#= count # employee(s)";
                //item.footerTemplate= "Last employee hired on #= kendo.format('{0:MMMM d, yyyy}', max) #";

                //if (item.template !== undefined && item.template.toLowerCase() === "checkbox") {
                if (item.type !== undefined && item.type.toLowerCase() === "boolean") {
                    item.sortable = false;

                    item.headerTemplate = "# if('" + fieldMode + "'.toLowerCase()==='view') { # <span class='k-link'>" + item.title + "</span> #} "
                                          + "else {# <span class='k-link'><input type='checkbox' ng-text='" + item.field + "' onclick='navcon.kendo.tree.toggleAll(event)' />&nbsp;&nbsp;" + item.title + "</span> #}#";
                    //item.template = $("#treeview-checkbox-template").html();
                    //#= Discontinued ? "checked=checked" : "" # disabled="disabled"

                    //item.template = "# if (data." + foreignKey + "!= null) { "
                    //                + "     if('" + fieldMode + "'.toLowerCase()==='view') { "
                    //                + "         if(data." + item.field + "!==undefined && (data." + item.field + "===true || data." + item.field + ".toString()==='1')) {# <span class='treeview-checkbox'>Yes</span> #} else {# <span class='treeview-checkbox'>No</span> #} "
                    //                + "     } else {# <input type='checkbox' class='treeview-checkbox' ng-model='" + item.field + "' data-bind='checked: " + item.field + "' onclick='navcon.kendo.tree.toggleItem(event)' /> # }"
                    //                + "} else {# &nbsp; #}#";

                    item.template = "# if (data." + foreignKey + "!= null) { "
                                    + "     if('" + fieldMode + "'.toLowerCase()==='view') { "
                                    + "         if(data." + item.field + "!==undefined && (data." + item.field + "===true || data." + item.field + ".toString()==='1')) {# "
                                    + "             <span class='treeview-checkbox'>Yes</span> "
                                    + "         #} else if (data." + item.field + "!==undefined && data." + item.field + "===null) {# &nbsp; "
                                    + "         #} else {# <span class='treeview-checkbox'>No</span> #} "
                                    + "     } else if (data." + item.field + "!==undefined && data." + item.field + "===null) {# &nbsp; "
                                    + "     #} else {# <input type='checkbox' class='treeview-checkbox' ng-model='" + item.field + "' data-bind='checked: " + item.field + "' onclick='navcon.kendo.tree.toggleItem(event)' /> # }"
                                    + "} else if (data." + foreignKey + "== null && " + parentRowCheck + "==true) {# <input type='checkbox' class='treeview-checkbox' ng-model='" + item.field + "' data-bind='checked: " + item.field + "' onclick='navcon.kendo.tree.toggleItem(event)' /> #"
                                    + "} else {# &nbsp; #}#";
                } else if (item.type !== undefined && item.type.toLowerCase() === "select") {
                    item.template = "#=" + item.data + "#";

                    //item.editor = navcon.kendo.tree.editDropDown;
                    item.editor = jQuery.proxy(navcon.kendo.tree.editDropDown, { option: { id: item.data, text: item.data }, dataset: settings });

                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                template: function (args) {
                                    args.element.kendoDropDownList({
                                        dataSource: navcon.kendo.tree.distinctData(args.dataSource.options.data, item.data),
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
                                //navcon.kendo.tree.filterDropDown(element, item.data, settings);
                                jQuery.proxy(navcon.kendo.tree.filterDropDown, { option: { id: item.data, text: item.data }, dataset: settings });
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
                    if (item.type === undefined || item.type === "") item.type = "string";
                    if (item.filterable === undefined || item.filterable) {
                        item.filterable = {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains"
                            }
                        };
                    }
                }

                if (settings.options !== undefined && settings.options.editree !== undefined && settings.options.editree.enabled !== undefined
                    && !settings.options.editree.enabled && item.command !== undefined && item.command.length !== 0) return false;

                items.push(item);
            });

            return items;
        },
        rowSetting: function (settings, scope) {
            var items = [];
            var treeData = angular.copy(settings.core.data);
            items = navcon.getDataFromTree(treeData, '', 0);

            var fieldTree = null
            var fieldTreeIndex = navcon.getItemIndexByProperty(scope.fields, scope.type);
            if (fieldTreeIndex !== undefined && fieldTreeIndex !== -1) fieldTree = scope.fields[fieldTreeIndex];
            if (fieldTree !== null) {

                $.each(items, function (i, item) {
                    $.each(fieldTree.columns, function (iCol, colItem) {
                        item[colItem] = item.data[colItem];
                    });
                });

                fieldTree.oldData = angular.copy(items);
                fieldTree.data = items;

                settings.oldData = angular.copy(items);
                settings.data = items;
            }

            var field = { "primaryKey": "id", "foreignKey": "parentId" };
            //var fieldsConfig = scope.fields[0];
            var fieldConfigIndex = navcon.getItemIndexByProperty(scope.fields, "fieldConfig");
            if (fieldConfigIndex !== undefined && fieldConfigIndex !== -1) field = scope.fields[fieldConfigIndex];
            var primaryKey = (settings.options !== undefined && settings.options.primaryKey !== undefined ? settings.options.primaryKey : field.primaryKey);
            var foreignKey = (settings.options !== undefined && settings.options.foreignKey !== undefined ? settings.options.foreignKey : field.foreignKey);

            var schemaFields = navcon.kendo.tree.validationSchema(settings, scope);
            schemaFields[foreignKey] = { field: foreignKey, nullable: true };

            var dataSource = {
                type: "odata",
                data: items,
                //pageSize: settings.pageLength !== undefined ? settings.pageLength : 20,
                batch: true,
                schema: {
                    model: {
                        id: primaryKey,//(settings.options !== undefined && settings.options.primaryKey !== undefined ? settings.options.primaryKey : field.primaryKey),
                        parentId: foreignKey,//(settings.options !== undefined && settings.options.foreignKey !== undefined ? settings.options.foreignKey : field.foreignKey),
                        fields: schemaFields,
                        expanded: true,
                    }
                }/*,
                aggregate: [
                    { field: "FirstName", aggregate: "count" },
                    { field: "HireDate", aggregate: "max" }
                ]*/
            };

            //var dataSource = new kendo.data.TreeListDataSource({
            //    data: items
            //});

            return dataSource;
        },
        setting: function (el, options, scope) {
            var settings = {};
            if (options != undefined && options.options !== undefined) settings = options.options;

            var oTree = null;
            var tree = $($(el).find('.kendoTree')[0]);
            if (tree !== undefined && tree !== null) {
                kendo.destroy(tree);
                tree.empty();

                var treeColumn = navcon.kendo.tree.columnSetting(options, scope);
                var treeDatasource = navcon.kendo.tree.rowSetting(options, scope);

                var oTree = tree.kendoTreeList({
                    type: $(el).attr("type"),
                    //scrollable: {
                    //    endless: true,
                    //    virtual: true
                    //},
                    //height: 600,
                    //noRecords: true,
                    //autoBind: true,
                    //autoFitColumn: true,
                    columns: treeColumn,
                    dataSource: treeDatasource,
                    reorderable: (settings.reorderable !== undefined ? settings.reorderable : true),
                    resizable: (settings.resizable !== undefined ? settings.resizable : true),
                    sortable: (settings.sortable !== undefined ? settings.sortable : true),
                    selectable: (settings.selectable !== undefined ? settings.selectable : false),
                    filterable: (settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled ? settings.filterable.enabled : false),
                    pageable: (settings.pageable !== undefined && settings.pageable.enabled !== undefined && settings.pageable.enabled ? settings.pageable.enabled : false),
                    editable: (settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled ? settings.editable.enabled : false),
                    groupable: (settings.groupable !== undefined && settings.groupable.enabled !== undefined && settings.groupable.enabled ? settings.groupable.enabled : false),
                    columnMenu: (settings.columnMenu !== undefined && settings.columnMenu.enabled !== undefined && settings.columnMenu.enabled ? settings.columnMenu.enabled : false),
                    dataBound: navcon.kendo.tree.dataBound,
                    dataBinding: navcon.kendo.tree.dataBinding,
                    sort: navcon.kendo.tree.sorting
                }).data("kendoTreeList");
            }

            var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });
            var logger = angular.element(document).injector().invoke(function (logger) { return logger; });
            var toolbarOptions = [];

            if (oTree !== undefined && oTree !== null) {
                //Selectable Settings
                if (settings.selectable !== undefined && settings.selectable) {
                    oTree.setOptions({
                        change: navcon.kendo.tree.change,
                    });
                }

                //Filter Settings
                if (settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled) {
                    oTree.setOptions({
                        filterable: {//CELL FILTERING OPTIONS
                            mode: "row",
                            extra: (settings.filterable.extra !== undefined ? settings.filterable.extra : false), //the filter menu allows the user to input a second criterion.
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
                        filterMenuInit: navcon.kendo.tree.filterMenuInit,
                        filter: navcon.kendo.tree.filtering
                    });
                }

                //Header menu settings
                if (settings.columnMenu !== undefined && settings.columnMenu.enabled !== undefined && settings.columnMenu.enabled) {
                    oTree.setOptions({
                        columnMenu: {
                            columns: settings.columnMenu.columns !== undefined ? settings.columnMenu.columns : false, //DISABLE COLUMN SELECTION
                            filterable: settings.columnMenu.filterable !== undefined ? settings.columnMenu.filterable : false, //DISABLE COLUMN MENU FILTERING
                            sortable: settings.columnMenu.sortable !== undefined ? settings.columnMenu.sortable : false, //DISABLE COLUMN MENU SORTING
                        }
                    });
                }

                //Pager settings
                if (settings.pageable !== undefined && settings.pageable.enabled !== undefined && settings.pageable.enabled) {
                    oTree.setOptions({
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
                        }
                    });
                } else {
                    oTree.setOptions({
                        scrollable: {
                            endless: true,
                            virtual: true
                        },
                        pageable: true
                    });
                }

                //Group settings
                if (settings.groupable !== undefined && settings.groupable.enabled !== undefined && settings.groupable.enabled) {
                    oTree.setOptions({
                        groupable: {
                            showFooter: true,
                            messages: {
                                empty: "Drop columns here"
                            }
                        },
                        group: navcon.kendo.tree.grouping,
                        groupExpand: navcon.kendo.tree.groupExpand,
                        groupCollapse: navcon.kendo.tree.groupCollapse
                    });
                }

                //Edit settings
                if (settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled) {
                    if (settings.editable.addNew !== undefined && settings.editable.addNew)
                        toolbarOptions.push({ name: "create", text: "Add new" });

                    oTree.setOptions({
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
                            var approvalColumn = navcon.kendo.tree.approvalColumn(scope.treeSettings.columns);

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

                                    oTree.saveRow();
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

                                    oTree.dataSource.remove(model);
                                    oTree.dataSource.sync();
                                }
                            });
                        },
                        cancel: function (e) {
                            oTree.cancelChanges();
                            //console.log("Cancel");
                        }
                    });
                }

                //PDF settings
                if (settings.pdf !== undefined && settings.pdf.enabled !== undefined && settings.pdf.enabled) {
                    toolbarOptions.push({ name: "pdf", text: "Export PDF", iconClass: "k-icon k-i-print" });

                    oTree.setOptions({
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
                        },
                        pdfExport: function (e) {
                            title = $(el).attr("type");
                            date = navcon.getCurrentDate();

                            oTree.hideColumn(4);

                            e.promise.done(function () {
                                oTree.showColumn(4);
                            });
                        }
                    });
                }

                //Toolbar  options
                if (toolbarOptions !== undefined && toolbarOptions.length !== 0) {
                    oTree.setOptions({
                        toolbar: toolbarOptions
                    });

                    if (settings.editree !== undefined && settings.editree.createAt !== undefined && settings.editree.createAt.toLowerCase() === "bottom") {
                        $(".k-grid-toolbar").insertAfter($(".k-grid-pager").length !== 0 ? $(".k-grid-pager") : $(".k-grid-content"));
                    }

                    $(".k-grid-pdf").css("float", "right");
                }
            }

            //cell click 
            $(tree).find('tbody').on('click', 'td', function (el, tt) {
                var treeSettings = scope.treeSettings;
                var tr = $(this).closest("tr");

                var treeData = oTree.dataSource.data();
                var rowId = tr.attr("data-uid");
                var selectedRowIndex = navcon.save.selectedRowIndex(treeData, { "uid": rowId }, "uid");

                var rowData = treeData[selectedRowIndex];
                var rowIndex = selectedRowIndex;
                var rowObj = tr;

                var cellData = $(this).text();
                var columnIndex = rowObj.find(this).index();
                var cellObj = this;
                var columnTitle = treeSettings.columns[columnIndex].title;

                scope.fields.mode = "View";

                //if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && columnTitle === "add") || (!scope.navconData.rights.Edit && columnTitle === "edit")
                //    || ((!scope.navconData.rights.View && !scope.navconData.rights.Approve) && columnTitle === "view") || (!scope.navconData.rights.Delete && columnTitle === "delete"))) return false;

                //if (scope.treeSettings.treeCellClick !== undefined) {
                var approveAnchor = $(this).find("a.gridApprove");
                if (approveAnchor !== undefined && approveAnchor !== null && approveAnchor.length !== 0) {
                    var action = "Approve";
                    if (scope.navconData.treeRowApproveClick === undefined) return;
                    scope.navconData.treeRowApproveClick(rowIndex, columnIndex, rowData, scope.type, this, oTree, action);
                } else {
                    if (scope.navconData.treeCellClick === undefined) return;
                    scope.navconData.treeCellClick(rowIndex, columnIndex, rowData, scope.type, this, oTree, undefined, action);
                }
                //}
            });
        },
        dataBound: function (e) {
            var view = this.dataSource.view();
            this.items().each(function (index, row) {
                kendo.bind(row, view[index]);
            });
        },
        setData: function (tree, rowIndex, columnField, checked) {
            var oTree = $(tree).data("kendoTreeList");
            var view = oTree.dataSource.view();
            var scope = $(tree).scope();

            var fieldTree = null
            var fieldTreeIndex = navcon.getItemIndexByProperty(scope.fields, scope.type);
            if (fieldTreeIndex !== undefined && fieldTreeIndex !== -1) fieldTree = scope.fields[fieldTreeIndex];
            if (fieldTree !== null) {
                fieldTree.data[rowIndex][columnField] = (checked === true ? 1 : 0);
            }

            view[rowIndex].set(columnField, checked);
        },
        itemChecked: function (tree, columnField, checked, e) {
            var oTree = $(tree).data("kendoTreeList");
            var scope = $(tree).scope();
            var options = $(tree).scope().treeSettings.options;

            var dataSource = oTree.dataSource;
            var view = dataSource.view();

            var columns = oTree.columns;
            var selectedColumnIndex = navcon.save.selectedRowIndex(oTree.columns, { "checkDeny": false }, "checkDeny");
            var selectedColumnData = columns[selectedColumnIndex];

            var field = { "primaryKey": "id", "foreignKey": "parentId" };
            //var fieldsConfig = scope.fields[0];
            var fieldConfigIndex = navcon.getItemIndexByProperty(scope.fields, "fieldConfig");
            if (fieldConfigIndex !== undefined && fieldConfigIndex !== -1) field = scope.fields[fieldConfigIndex];

            var primaryKey = (options !== undefined && options.primaryKey !== undefined ? options.primaryKey : field.primaryKey);
            var foreignKey = (options !== undefined && options.foreignKey !== undefined ? options.foreignKey : field.foreignKey);
            var parentRowCheck = (options !== undefined && options.parentRowCheck !== undefined && options.parentRowCheck ? true : false);

            //Selected Row
            var selectedData = [];
            if (e !== undefined) {
                var rowId = $($(e.target).parent().parent()).attr("data-uid");
                var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.data(), { "uid": rowId }, "uid");
                selectedData = dataSource.options.data[selectedRowIndex];

                //view[selectedRowIndex].set(columnField, checked);
                navcon.kendo.tree.setData(tree, selectedRowIndex, columnField, checked);
            }

            //Selected Child Row
            if (parentRowCheck !== undefined && parentRowCheck) {
                //var selectedChildData = $.grep(dataSource.data(), function (item) { return item[foreignKey] === selectedData[primaryKey] });
                var selectedChildData = $.grep(dataSource.data(), function (item) { return item.parentId === selectedData.id });
                if (selectedChildData !== undefined && selectedChildData.length !== 0) {
                    var rowChildId = selectedChildData[0].uid;
                    var selectedchildRowIndex = navcon.save.selectedRowIndex(dataSource.data(), { "uid": rowChildId }, "uid");

                    for (var iChildRow = 0; iChildRow < selectedChildData.length; iChildRow++) {
                        //view[(selectedchildRowIndex + iChildRow)].set(columnField, checked);
                        navcon.kendo.tree.setData(tree, (selectedchildRowIndex + iChildRow), columnField, checked);
                    }
                }
            }

            //Top row
            if (selectedColumnData !== undefined && selectedColumnData.field.toLowerCase() === columnField.toLowerCase()) {
                for (var iCol = 0; iCol < columns.length; iCol++) {
                    if (columns[iCol] !== undefined && columns[iCol].checkDeny !== undefined && columns[iCol].checkDeny !== "") {
                        if (columns[iCol].checkDeny && $($(".k-grid-header-wrap").find("th")[iCol]).find("input[type=checkbox]").prop("checked"))
                            $($(".k-grid-header-wrap").find("th")[iCol]).find("input[type=checkbox]").removeAttr("checked");
                    }
                }
            } else {
                $($(".k-grid-header-wrap").find("th")[selectedColumnIndex]).find("input[type=checkbox]").removeAttr("checked");
            }
        },
        toggleItem: function (e) {
            var tree = $($(e.target).parents(".kendoTree")[0]);
            var oTree = $(tree).data("kendoTreeList");

            var dataSource = oTree.dataSource;
            var view = dataSource.view();

            var rowId = $($(e.target).parent().parent()).attr("data-uid");
            var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.data(), { "uid": rowId }, "uid");

            var columns = oTree.columns;
            var selectedColumnIndex = navcon.save.selectedRowIndex(oTree.columns, { "checkDeny": false }, "checkDeny");
            var selectedColumnData = columns[selectedColumnIndex];

            var checked = e.target.checked;
            var modalField = $(e.target).attr("ng-model");

            if (selectedColumnData !== undefined && selectedColumnData.field.toLowerCase() === modalField.toLowerCase()) {
                if (checked && !columns[selectedColumnIndex].checkDeny) {
                    for (var iCol = 0; iCol < columns.length; iCol++) {
                        if (columns[iCol] !== undefined && columns[iCol].checkDeny !== undefined && columns[iCol].checkDeny !== "") {
                            if (columns[iCol].checkDeny) {
                                //All Rows except deny row
                                navcon.kendo.tree.itemChecked(tree, columns[iCol].field, false, e);
                            } else if (!columns[iCol].checkDeny) {
                                //Denay Row
                                navcon.kendo.tree.itemChecked(tree, columns[iCol].field, true, e);
                            }
                        }
                    }
                }
            } else {
                //Selected Row
                navcon.kendo.tree.itemChecked(tree, modalField, checked, e);

                //Deny Row
                navcon.kendo.tree.itemChecked(tree, columns[selectedColumnIndex].field, false, e);
            }
        },
        toggleAll: function (e) {
            var tree = $($(e.target).parents(".kendoTree")[0]);
            var oTree = $(tree).data("kendoTreeList");
            var options = $(tree).scope().treeSettings.options;

            var dataSource = oTree.dataSource;
            var view = dataSource.view();

            //var rowId = $($(e.target).parent().parent()).attr("data-uid");
            //var selectedRowIndex = navcon.save.selectedRowIndex(dataSource.data(), { "uid": rowId }, "uid");
            //var selectedData = dataSource.data()[selectedRowIndex];

            var columns = oTree.columns;
            var selectedColumnIndex = navcon.save.selectedRowIndex(oTree.columns, { "checkDeny": false }, "checkDeny");
            var selectedColumnData = columns[selectedColumnIndex];

            var checked = e.target.checked;
            var modalField = $(e.target).attr("ng-text");

            for (var iRow = 0; iRow < view.length; iRow++) {
                if (selectedColumnData !== undefined && selectedColumnData.field.toLowerCase() === modalField.toLowerCase()) {
                    for (var iCol = 0; iCol < columns.length; iCol++) {
                        if (columns[iCol] !== undefined && columns[iCol].checkDeny !== undefined && columns[iCol].checkDeny !== "") {
                            if (columns[iCol].checkDeny) {
                                //view[iRow].set(columns[iCol].field, false);
                                navcon.kendo.tree.setData(tree, iRow, columns[iCol].field, false);
                            } else if (!columns[iCol].checkDeny) {
                                //view[iRow].set(columns[iCol].field, true);
                                navcon.kendo.tree.setData(tree, iRow, columns[iCol].field, true);
                            }
                        }
                    }
                } else {
                    //view[iRow].set(modalField, checked);
                    navcon.kendo.tree.setData(tree, iRow, modalField, checked);

                    //view[iRow].set(selectedColumnData.field, false);
                    navcon.kendo.tree.setData(tree, iRow, selectedColumnData.field, false);
                }
            }

            if (selectedColumnData !== undefined && selectedColumnData.field.toLowerCase() === modalField.toLowerCase()) {
                for (var iCol = 0; iCol < columns.length; iCol++) {
                    if (columns[iCol] !== undefined && columns[iCol].checkDeny !== undefined && columns[iCol].checkDeny !== "") {
                        if (columns[iCol].checkDeny && $($(".k-grid-header-wrap").find("th")[iCol]).find("input[type=checkbox]").prop("checked"))
                            $($(".k-grid-header-wrap").find("th")[iCol]).find("input[type=checkbox]").removeAttr("checked");
                    }
                }
            } else {
                $($(".k-grid-header-wrap").find("th")[selectedColumnIndex]).find("input[type=checkbox]").removeAttr("checked");
            }
        },
        change: function (arg, e) {
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
            navcon.kendo.tree.setting(el, setting, scope);
        },
        selectedRowIndex: function (tree, selectedRow, idColumn) {
            var returnData = -1;
            var treeData = tree.data !== undefined ? tree.data : tree;

            if (treeData !== undefined && treeData.length > 0)
                returnData = navcon.getItemIndexByKeyValue(treeData, idColumn, selectedRow[idColumn]);

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
        pdfExport: function (kendoTree, settings, e) {
            var progress = $.Deferred();

            /*kendo.drawing.drawDOM($("#header"))
              .done(function(header) {
                  kendo.drawing.drawDOM($("#footer"))
                    .done(function(footer) {*/
            kendoTree._drawPDF(progress)
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

            var treeColums = settings.columns;
            $.each(treeColums, function (i, item) {
                var type = (item.type || "string");
                var fieldTitle = (item.title || "");
                var fieldName = (item.field || item.data);

                var fieldKey = item.fieldKey;
                var field = null;
                var fieldKeyIndex = navcon.getItemIndexByProperty(scope.fields, fieldKey);
                if (fieldKeyIndex !== undefined && fieldKeyIndex !== -1) field = scope.fields[fieldKeyIndex];
                if (type !== undefined && type.toLowerCase() === "autoselect") type = "string";

                if (fieldName !== undefined && fieldName !== null && fieldName !== "") {
                    myFields[fieldName] = { "field": fieldName, "type": type, "validation": {} };

                    if (fieldName !== undefined && fieldName !== null && fieldName !== "" && fieldName.length !== 0) {
                        myFields[fieldName].validation["type"] = type;

                        if (field !== undefined && field !== null && field.templateOptions !== undefined && field.templateOptions.length !== 0) {
                            var validation = field.templateOptions;
                            //Required message
                            navcon.kendo.requiredValidation(myFields[fieldName], fieldName, validation);

                            //Minium message
                            navcon.kendo.minimumValidation(myFields[fieldName], fieldName, validation);

                            //Maximum message
                            navcon.kendo.maximumValidation(myFields[fieldName], fieldName, validation);

                            //Pattern message
                            navcon.kendo.patternValidation(myFields[fieldName], fieldName, validation);

                            //ExistData message
                            navcon.kendo.existDataValidation(myFields[fieldName], fieldName, validation, scope);
                        }
                    }
                }
            });

            return myFields;
        }
    }
}(navcon || {}));