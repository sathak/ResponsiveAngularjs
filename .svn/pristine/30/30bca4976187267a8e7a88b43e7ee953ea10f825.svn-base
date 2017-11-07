(function (navcon) {
    navcon.kendo.tree = {
        columnSetting: function (settings, scope) {
            var items = [];
            $.each(settings.columns, function (i, item) {
                item.field = item.data;
                if (item.visible !== undefined && item.visible !== "") item.hidden = !item.visible;

                if (item.template !== undefined && item.template.toLowerCase() === "checkbox")
                    item.template = $("#treeview-checkbox-template").html();

                if (item.type !== undefined && item.type.toLowerCase() === "select") {
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
                    if (item.type !== undefined && item.type !== "") item.type = "string";
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
            items = angular.copy(navcon.getDataFromTree(settings.data, '', 0));
            $.each(items, function (i, item) {
                item.id = item.data.id;
                item.Add = item.data.Add;
                item.Approve = item.data.Approve;
                item.Delete = item.data.Delete;
                item.Deny = item.data.Deny;
                item.Edit = item.data.Edit;
                item.PRINT = item.data.PRINT;
            });
            
            var fieldsConfig = scope.fields[0];
            var field = { "primaryKey": "id", "foreignKey": "parentId" };
            var fieldConfigIndex = navcon.getItemIndexByProperty(scope.fields, "fieldConfig");
            if (fieldConfigIndex !== undefined && fieldConfigIndex !== -1) field = scope.fields[fieldConfigIndex];

            var schemaFields = navcon.kendo.tree.validationSchema(settings, scope);
            var foreignKey = (settings.options !== undefined && settings.options.foreignKey !== undefined ? settings.options.foreignKey : field.foreignKey);
            schemaFields[foreignKey] = { field: foreignKey, nullable: true };

            var dataSource = {
                type: "odata",
                data: items,
                pageSize: settings.pageLength !== undefined ? settings.pageLength : 20,
                batch: true,
                schema: {
                    model: {
                        id: (settings.options !== undefined && settings.options.primaryKey !== undefined ? settings.options.primaryKey : field.primaryKey),
                        parentId: (settings.options !== undefined && settings.options.foreignKey !== undefined ? settings.options.foreignKey : field.foreignKey),
                        fields: schemaFields,
                        expanded: true,
                    }
                }
            };

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
                    dataSource: treeDatasource,
                    filterable: (settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled ? settings.filterable.enabled : false),
                    sortable: (settings.sortable !== undefined ? settings.sortable : true),
                    columns: treeColumn
                }).data("kendoTreeList");

                ////var oTree = tree.kendoTreeList({
                //tree1.kendoTreeList({
                //    //type: $(el).attr("type"),
                //    //scrollable: {
                //    //    endless: true,
                //    //    virtual: true
                //    //},
                //    //height: 600,
                //    //noRecords: true,
                //    //autoBind: true,
                //    //autoFitColumn: true,
                //    columns: navcon.kendo.tree.columnSetting(options, scope),
                //    dataSource: new navcon.kendo.tree.rowSetting(options, scope),
                //    //reorderable: true,
                //    //resizable: true,
                //    //sortable: settings.sortable !== undefined ? settings.sortable : true,
                //    //selectable: settings.selectable !== undefined ? settings.selectable : false,
                //    //pageable: settings.pageable !== undefined && settings.pageable.enabled !== undefined && settings.pageable.enabled ? settings.pageable.enabled : false,
                //    //filterable: settings.filterable !== undefined && settings.filterable.enabled !== undefined && settings.filterable.enabled ? settings.filterable.enabled : false,
                //    //editable: settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled ? settings.editable.enabled : false,
                //    //groupable: settings.groupable !== undefined && settings.groupable.enabled !== undefined && settings.groupable.enabled ? settings.groupable.enabled : false,
                //    //columnMenu: settings.columnMenu !== undefined && settings.columnMenu.enabled !== undefined && settings.columnMenu.enabled ? settings.columnMenu.enabled : false,
                //    //dataBound: navcon.kendo.tree.dataBound,
                //    //dataBinding: navcon.kendo.tree.dataBinding,
                //    //sort: navcon.kendo.tree.sorting
                //});//.data("kendoTreeList");
            }

            var dataservice = angular.element(document).injector().invoke(function (dataservice) { return dataservice; });
            var logger = angular.element(document).injector().invoke(function (logger) { return logger; });
            var toolbarOptions = [];

            if (oTree !== undefined && oTree !== null) {
                //Selectree Settings

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

                            oTree.hideColumn(4);

                            e.promise.done(function () {
                                oTree.showColumn(4);
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
                //var treeSettings = scope.treeSettings;
                //var tr = $(this).closest("tr");

                //var treeData = oTree.dataSource.data();
                //var rowId = tr.attr("data-uid");
                //var selectedRowIndex = navcon.save.selectedRowIndex(treeData, { "uid": rowId }, "uid");

                //var rowData = treeData[selectedRowIndex];
                //var rowIndex = selectedRowIndex;
                //var rowObj = tr;

                //var cellData = $(this).text();
                //var columnIndex = rowObj.find(this).index();
                //var cellObj = this;
                //var columnTitle = treeSettings.columns[columnIndex].title;

                //scope.fields.mode = "View";

                ////if (scope.navconData.rights !== undefined && ((!scope.navconData.rights.Add && columnTitle === "add") || (!scope.navconData.rights.Edit && columnTitle === "edit")
                ////    || ((!scope.navconData.rights.View && !scope.navconData.rights.Approve) && columnTitle === "view") || (!scope.navconData.rights.Delete && columnTitle === "delete"))) return false;

                ////if (scope.treeSettings.treeCellClick !== undefined) {
                //var approveAnchor = $(this).find("a.gridApprove");
                //if (approveAnchor !== undefined && approveAnchor !== null && approveAnchor.length !== 0) {
                //    var action = "Approve";
                //    if (scope.navconData.treeRowApproveClick === undefined) return;
                //    scope.navconData.treeRowApproveClick(rowIndex, columnIndex, rowData, scope.type, this, oTree, action);
                //} else {
                //    if (scope.navconData.treeCellClick === undefined) return;
                //    scope.navconData.treeCellClick(rowIndex, columnIndex, rowData, scope.type, this, oTree, undefined, action);
                //}
                ////}
            });

            //});
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

            var tableColums = settings.columns;
            $.each(tableColums, function (i, item) {
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