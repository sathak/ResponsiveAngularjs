(function (navcon) {
    navcon.save = {
        selectedRowIndex: function (table, selectedRow, idColumn) {
            var returnData = -1;
            var tableData = table.data !== undefined ? table.data : table;

            if (tableData !== undefined && tableData.length > 0)
                returnData = navcon.getItemIndexByKeyValue(tableData, idColumn, selectedRow[idColumn]);

            return returnData;
        },
        loadListDefaultData: function (data, fields) {
            $.map(fields, function (item, key) {
                if (item.type.toLowerCase() === "select" || item.type.toLowerCase() === "autocomplete" || item.type.toLowerCase() === "multiselect" || item.type.toLowerCase() === "multiselectcheckbox"
                    || item.type.toLowerCase() === "tab" || item.type.toLowerCase() === "listview") {
                    var defaultField = item.selectOptions.item.defaultField;
                    if (defaultField !== undefined && defaultField !== "") {
                        if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                            item.selectOptions.items = angular.copy(navcon.getDistinctfromJSON(data[defaultField], item.selectOptions.item.dataField));
                    }
                }
                else if (item.type.toLowerCase() === "radio") {
                    if (item.templateOptions.item !== undefined && item.templateOptions.item !== null) {
                        var defaultField = item.templateOptions.item.defaultField;
                        if (defaultField !== undefined && defaultField !== "") {
                            if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                                item.templateOptions.items = angular.copy(data[defaultField]);
                        }
                    }

                }
                else if (item.type.toLowerCase() === "checkboxlist" || item.type.toLowerCase() === "groupcheckboxlist") {
                    if (item.templateOptions.item !== undefined && item.templateOptions.item !== null) {
                        var defaultField = item.templateOptions.item.defaultField;
                        if (defaultField !== undefined && defaultField !== "") {
                            if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                                item.data = angular.copy(data[defaultField]);
                        }
                    }

                }
            });
        },
        loadListSingleData: function (data, fields, key) {
            var keyIndex = navcon.getItemIndexByProperty(fields, key);
            var item = fields[keyIndex];
            if (keyIndex !== -1 && item !== undefined) {
                if (item.type.toLowerCase() === "select" || item.type.toLowerCase() === "autocomplete" || item.type.toLowerCase() === "multiselect" || item.type.toLowerCase() === "multiselectcheckbox"
                    || item.type.toLowerCase() === "tab" || item.type.toLowerCase() === "listview") {
                    var defaultField = item.selectOptions.item.defaultField;
                    if (defaultField !== undefined && defaultField !== "") {
                        if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                            item.selectOptions.items = angular.copy(data[defaultField]);
                    }
                }
            }
        },
        tableColumnAssign: function (table, columnData, serviceName) {
            var returnData = "";
            if (serviceName != undefined && serviceName != "") {
                returnData = dataservice.getServerData(serviceName).then(function (data) {
                    if (data === undefined || data.length === 0) return;
                    tableColumnCreate(data);
                    return data;
                });
            } else {
                tableColumnCreate(columnData);
            }

            function tableColumnCreate(data) {
                if (data != undefined) {
                    var columndetails = "", i = 0;

                    for (i = 0; i < data.length; i++) {
                        //var columnIndex = navcon.getItemByKeyValue(table.columnControl.exceptColumns, "index", i);
                        var columnIndex = table.columnControl.exceptColumns.indexOf(i);
                        if (columnIndex !== -1)
                            columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"data\": \"" + data[i].id + "\", \"width\": \"100px\" },";
                        else
                            columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"options\" : {\"type\" : \"" + table.columnControl.type + "\"}, \"data\": \"" + data[i].id + "\", \"width\": \"100px\" },";
                        //columndetails += "{\"title\": \"" + data[i].text.trim() + "\", \"data\": \"" + data[i].id + "\", \"field\": \"" + data[i].id + "\", \"width\": \"" + columnIndex.width + "\", \"fieldType\": \"text\" },";
                    }
                    if (columndetails !== "") columndetails = columndetails.substring(0, columndetails.length - 1);

                    table.columns = $.parseJSON("[" + columndetails + "]");
                    //table.columns = navcon.jsonTransformed($.parseJSON("[" + columndetails + "]"));
                }
                return data;
            }
        },
        addNewOption: function (scope, configFields, fields, displayTitle, treeTable, callback, type) {
            var retData = canceldata();
            if (callback !== undefined && $.isFunction(callback))
                callback(retData);

            return retData;

            function canceldata() {
                var returnData = "";
                navcon.clearFieldsData(fields);
                navcon.updateFieldsData(fields, configFields, scope, false);
                returnData = 'Add ( ' + displayTitle + " )";

                if (treeTable !== undefined && treeTable !== "" && treeTable.length > 0) {
                    navcon.clearTreeData(treeTable);
                }

                if (type !== undefined && type !== "") {
                    if (type !== false) {
                        if (!$("#" + type).hasClass('in')) {
                            navcon.openModal(type, function (val) {
                                navcon.setFieldFocus(fields);
                            });
                        }
                    }
                } else {
                    setTimeout(function () {
                        scope.$apply();
                        navcon.setFieldFocus(fields);
                    }, 500);
                }

                return returnData;
            }
        },
        optionType: function (optional, callback) {
            if (optional === undefined || optional === {}) return true;
            navcon.save.saveOption(optional.scope, optional.dataservice, optional.mode, optional.type,
                optional.table, optional.fields, optional.rowNumber,
                optional.idColumn, optional.displayColumn, optional.treeTable, optional.upload, optional.popup, optional.type,
                function (data) {
                    callback(data);
                });
        },
        tableAction: function (optional, callback) {
            if (optional === undefined || optional === {}) return true;

            //optional{"scope":"", "type":"", fields:"", table:"", rowNumber:"", primaryColumn:"", displayColumn:"", popup:"", upload:""};
            if (optional.fields.mode === undefined || optional.fields.mode === null || optional.fields.mode === "") return;
            var returnData = "";
            if (optional.fields.mode.toUpperCase() === "SAVE" || optional.fields.mode.toUpperCase() === "SAVEAS"
                || optional.fields.mode.toUpperCase() === "UPDATE" || optional.fields.mode.toUpperCase() === "DELETE") {

                if (optional.dataAssign !== undefined && optional.dataAssign !== "" && optional.dataAssign.length > 0) {
                    $.map(optional.dataAssign, function (item, key) {
                        var mainIndex = navcon.getItemIndexByProperty(item[0][0], item[0][1]);
                        var childIndex = navcon.getItemIndexByProperty(optional.fields, item[1][0]);
                        if (item[0][2] !== undefined && item[0][2] !== null) {
                            optional.fields[childIndex].data = (item[0][0][mainIndex].data[item[0][2]] !== undefined ? item[0][0][mainIndex].data[item[0][2]] : item[0][0][mainIndex].data);
                        } else if (mainIndex !== undefined && mainIndex !== null && mainIndex !== -1 && childIndex !== -1) {
                            optional.fields[childIndex].data = item[0][0][mainIndex].data;
                        } else if ((mainIndex === undefined || mainIndex === null || mainIndex === -1) && childIndex !== -1) {
                            optional.fields[childIndex].data = item[0][0];
                        }
                    });
                }

                var addedItem = navcon.getFieldsDataToSave(optional.fields, optional.fields.mode, optional.idColumn, optional.upload);

                if (optional.fields.mode.toUpperCase() === "SAVE" || optional.fields.mode.toUpperCase() === "SAVEAS") {
                    addedItem[optional.primaryColumn] = (parseInt(optional.table.data.length) - 100);
                    if (addedItem.ObjectState !== undefined && (addedItem.ObjectState === "0" || addedItem.ObjectState === "")) addedItem.ObjectState = 1;
                    if (addedItem.Status !== undefined && (addedItem.Status === "0" || addedItem.Status === "")) addedItem.Status = 0;

                    if (addedItem !== undefined && addedItem !== null && optional.table !== undefined && optional.table !== null)
                        optional.table.data.push(addedItem);
                } else if (optional.fields.mode.toUpperCase() === "UPDATE") {
                    if (addedItem.ObjectState !== undefined && (addedItem.ObjectState === 0 || addedItem.ObjectState === "0" || addedItem.ObjectState === "")) addedItem.ObjectState = 2;
                    if (addedItem.Status !== undefined && (addedItem.Status === "0" || addedItem.Status === "")) addedItem.Status = 0;

                    var index = navcon.getItemIndexByKeyValue(optional.table.data, optional.primaryColumn, addedItem[optional.primaryColumn]);
                    if (index !== -1 && optional.table !== undefined && optional.table !== null) {
                        optional.table.data.splice(index, 1, addedItem);
                    }
                } else if (optional.fields.mode.toUpperCase() === "DELETE") {
                    //navcon.deleteDataList(optional.table, optional.fields.selectedRow);
                    navcon.openModal(optional.type + "delete");

                    if (callback !== undefined) callback(addedItem);

                    return addedItem;
                }

                if (optional.fields !== undefined && optional.fields !== "") navcon.clearFieldsData(optional.fields);
                if (optional.popup === undefined || optional.popup === "" || optional.popup === false) navcon.closeModal(optional.type);

                if (callback !== undefined) callback(addedItem);

                return addedItem;
            } else if (optional.fields.mode.toUpperCase() === "DELETED") {
                navcon.deleteDataList(optional.table, optional.fields.selectedRow);
                //optional.table.data.splice(optional.fields.selectedRow, 1);

                navcon.closeModal(optional.type + "delete");
                navcon.closeModal(optional.type);

                if (callback !== undefined) callback(addedItem);

                return addedItem;
            } else if (optional.fields.mode.toUpperCase() === "TABLESAVE") {
                var returnData = [];
                var tableData = optional.table.data !== undefined && optional.table.data !== null ? optional.table.data : [];
                var tableOldData = optional.table.oldData !== undefined && optional.table.oldData !== null ? optional.table.oldData : [];

                if (tableData !== undefined && tableData !== null && tableData.length !== 0) {
                    for (var i = 0; i < tableData.length; i++) {
                        if (tableData[i][tableData[i].Check_Field] !== undefined && (tableData[i][tableData[i].Check_Field] === 1 || tableData[i][tableData[i].Check_Field] === true)) {
                            if (tableData[i][optional.primaryColumn] !== undefined && tableData[i][optional.primaryColumn] !== null && tableData[i][optional.primaryColumn].toString() !== "0") {
                                tableData[i]["ObjectState"] = 2;
                                tableData[i]["Status"] = 0;
                            } else {
                                tableData[i]["ObjectState"] = 1;
                                tableData[i]["Status"] = 0;
                            }

                            if (optional.saveDataInclude !== undefined && optional.saveDataInclude.length !== 0 && optional.saveDataInclude !== "")
                                $.extend(true, tableData[i], optional.saveDataInclude);

                            returnData.push(tableData[i]);
                        } else if (optional.noCheckedData) {
                            if (optional.saveDataInclude !== undefined && optional.saveDataInclude.length !== 0 && optional.saveDataInclude !== "")
                                $.extend(true, tableData[i], optional.saveDataInclude);

                            returnData.push(tableData[i]);
                        }
                    }

                    if (returnData.length > 0 && optional.dataservice !== undefined && optional.dataservice !== null && optional.dataservice !== "") {
                        returnData = optional.dataservice.postServerData(optional.type + optional.saveType, returnData).then(function (data) {
                            if (optional.assignTable !== undefined && optional.assignTable !== null && optional.assignTable !== "") {
                                optional.assignTable.data = [];
                                optional.assignTable.data = (typeof data === "object" && data.length !== 0 ? data : []);
                            }

                            if (callback !== undefined) callback(typeof data === "object" && data.length !== 0 ? data : []);
                        });
                    } else if (returnData.length > 0) {
                        if (callback !== undefined) callback(returnData);
                    }
                }

                if ($("#" + optional.type).data('modal') && $("#" + optional.type).data('modal').isShown) navcon.closeModal(optional.type);
            } else if (optional.fields.mode.toUpperCase() === "FINAL") {
                var jsondata = [];

                var tableData = optional.table.data !== undefined && optional.table.data !== null ? optional.table.data : [];
                var tableOldData = optional.table.oldData !== undefined && optional.table.oldData !== null ? optional.table.oldData : [];

                var tableData = navcon.insertDeleteditems(tableData, tableOldData, optional.primaryColumn, "table");
                for (var i = 0; i < tableData.length; i++) {
                    if (tableData[i][optional.primaryColumn] > 0) {
                        if (tableData[i].ObjectState === undefined || tableData[i].ObjectState.toString() === "0") tableData[i].ObjectState = 2;
                        if (tableData[i].Status === undefined || tableData[i].Status.toString() === "0") tableData[i].Status = 0;
                    } else {
                        if (tableData[i].ObjectState === undefined || tableData[i].ObjectState.toString() === "0") tableData[i].ObjectState = 1;
                        if (tableData[i].Status === undefined || tableData[i].Status.toString() === "0") tableData[i].Status = 0;
                    }
                }

                if (tableData.length > 0 && optional.dataservice !== undefined && optional.dataservice !== null && optional.dataservice !== "") {
                    if (optional.saveType.toLowerCase() === "update" || optional.saveType.toLowerCase() === "updateall") {
                        returnData = optional.dataservice.putServerData(optional.type + optional.saveType, tableData).then(function (data) {
                            optional.table.data = [];
                            optional.table.data = data;

                            if (callback !== undefined) callback(data);
                        });
                    } else {
                        returnData = optional.dataservice.postServerData(optional.type + optional.saveType, tableData).then(function (data) {
                            optional.table.data = [];
                            optional.table.data = data;

                            if (callback !== undefined) callback(data);
                        });
                    }
                } else if (tableData !== undefined) {
                    if (callback !== undefined) callback(tableData);
                }
            }
        },
        saveOption: function (scope, dataservice, mode, type, table, fields, rowNumber, idColumn, displayColumn, treeTable, upload, popup, saveType, callback) {
            if (mode === undefined || mode === "") return;
            var returnData = "";
            if (mode.toUpperCase() === "SAVE" || mode.toUpperCase() === "SAVEAS" || mode.toUpperCase() === "UPDATE") { //Form Data update
                var addedItem = navcon.getFieldsDataToSave(fields, mode, idColumn, upload);

                if (mode.toUpperCase() === "SAVE" || mode.toUpperCase() === "SAVEAS") {
                    if (addedItem.ObjectState !== undefined && (addedItem.ObjectState === "0" || addedItem.ObjectState === "")) addedItem.ObjectState = 1;
                    if (addedItem.Status !== undefined && (addedItem.Status === "0" || addedItem.Status === "")) addedItem.Status = 0;

                    if (saveType === undefined || saveType === "") saveType = type;
                    returnData = dataservice.postServerData(saveType + mode + (fields.page !== undefined ? "/" + fields.page : ""), addedItem).then(function (data) {
                        if (upload !== undefined && upload !== "" && upload) {
                            if (data != undefined) {
                                var collectData = data;
                               /* var fileData = {
                                    file  : addedItem["filesUpload"]
                                }*/

                               

                                var formData = addedItem["filesUpload"];
                                delete addedItem["filesUpload"];
                                var dataInfo = {
                                    folder: type || saveType,  // Page Name
                                    id: data[idColumn]   // Primary Key
                                };
                                if (formData != undefined && formData != null) {
                                    formData.append("data", JSON.stringify(dataInfo));
                                    dataservice.fileUpload(formData).then(function (uploadData) {
                                        if (uploadData !== undefined && uploadData.Files !== undefined && uploadData.Files.length !== 0) {
                                            if (collectData.DocumentName !== undefined) collectData.DocumentName = uploadData.Files[0].name;
                                            if (collectData.Documents !== undefined) collectData.Documents = uploadData.Files;
                                            if (collectData["fuattachments"] === undefined || collectData["fuattachments"] === null || collectData["fuattachments"] === "") collectData["fuattachments"] = [];

                                            $.each(uploadData.Files, function (index, value) {
                                                collectData["fuattachments"].push(value);
                                            })
                                            
                                            var retData = refreshSavedData(collectData);
                                            closePopup(collectData);
                                            if (callback !== undefined)
                                                callback(collectData);
                                        }
                                        else {
                                            var retData = refreshSavedData(collectData);
                                            closePopup(collectData);
                                            if (callback !== undefined)
                                                callback(collectData);
                                        }


                                    });
                                }
                                else {
                                    if (callback !== undefined)
                                        callback(collectData);
                                }
                            }
                        } else {
                            var retData = refreshSavedData(data);
                            closePopup(data);
                            if (callback !== undefined)
                                callback(retData);
                        }
                    });

                    function refreshSavedData(data) {
                        //if (data.TableData !== undefined && data.TableData !== null) {
                        //    if (data.TableData.length > 0) {
                        //        if (data.TableData[0].$ref != undefined)
                        //            table.data.push(data);
                        //        else
                        //            table.data.push(data.TableData[0]);
                        //    }
                        //    else if (data.TableData.$ref != undefined)
                        //        table.data.push(data);
                        //    else
                        //        table.data.push(data.TableData);
                        //}
                        if (data !== undefined && data !== null && table !== undefined && table !== null && table !== "") {
                            if (table.data == undefined) {
                                table.data = [];
                            }
                            table.data.push(data);
                        }
                        return data;
                    }

                }
                else if (mode.toUpperCase() === "UPDATE") {
                    if (addedItem.ObjectState !== undefined && (addedItem.ObjectState === 0 || addedItem.ObjectState === "0" || addedItem.ObjectState === "")) addedItem.ObjectState = 2;
                    if (addedItem.Status !== undefined && (addedItem.Status === "0" || addedItem.Status === "")) addedItem.Status = 0;

                    if (saveType === undefined || saveType === "") saveType = type;
                    returnData = dataservice.putServerData(saveType + mode, addedItem).then(function (data) {
                        //if (popup !== undefined && popup === false) return;
                        if (upload !== undefined && upload !== "" && upload) {
                            if (data != undefined) {
                                var collectData = data;
                                var formData = addedItem["filesUpload"];
                                if (formData == undefined) {
                                    formData = new FormData();
                                }
                                delete addedItem["filesUpload"];
                                var dataInfo = {
                                    folder: type || saveType,  // Page Name
                                    id: data[idColumn]   // Primary Key
                                };
                                formData.append("data", JSON.stringify(dataInfo));
                                dataservice.fileUpload(formData).then(function (uploadData) {
                                    if (uploadData !== undefined && uploadData.Files !== undefined && uploadData.Files.length !== 0) {
                                        if (collectData.DocumentName !== undefined) collectData.DocumentName = uploadData.Files[0].name;
                                        if (collectData.Documents !== undefined) collectData.Documents = uploadData.Files;
                                        if (collectData["fuattachments"] === undefined || collectData["fuattachments"] === null || collectData["fuattachments"] === "") collectData["fuattachments"] = [];
                                        $.each(uploadData.Files, function (index, value) {
                                            collectData["fuattachments"].push(value);
                                        })
                                        closePopup(collectData);
                                        if (callback !== undefined)
                                            callback(collectData);
                                    }
                                    else {
                                        closePopup(collectData);
                                        if (callback !== undefined)
                                            callback(collectData);
                                    }
                                    //var retData = refreshSavedData(collectData);

                                });
                            }
                        }
                        else {

                            // var retData = refreshSavedData(data);
                            closePopup(data);

                            if (callback !== undefined)
                                callback(data);
                            else
                                return data;
                        }
                    });

                    function refreshSavedData(data) {
                        //if (data.TableData !== undefined && data.TableData !== null) {
                        //    if (data.TableData.length > 0) {
                        //        if (data.TableData[0].$ref != undefined)
                        //            table.data.push(data);
                        //        else
                        //            table.data.push(data.TableData[0]);
                        //    }
                        //    else if (data.TableData.$ref != undefined)
                        //        table.data.push(data);
                        //    else
                        //        table.data.push(data.TableData);
                        //}
                        if (data !== undefined && data !== null && table !== undefined && table !== null && table !== "") {
                            if (table.data == undefined) {
                                table.data = [];
                            }
                            table.data.push(data);
                        }
                        return data;
                    }
                }

                function closePopup(data) {
                    if (data === undefined) return;
                    if (popup !== undefined && popup !== "" && popup === false) return;

                    var idColumnIndex = navcon.getItemIndexByProperty(fields, idColumn);
                    if (idColumnIndex !== undefined && idColumnIndex !== -1) {
                        var primaryKey = idColumn;
                        if (fields[idColumnIndex].alternatekey !== undefined && fields[idColumnIndex].alternatekey !== "")
                            primaryKey = fields[idColumnIndex].alternatekey;
                        else {
                            if (fields[idColumnIndex].id !== undefined)
                                primaryKey = fields[idColumnIndex].id;
                            else
                                primaryKey = fields[idColumnIndex].key;
                        }

                        if (table !== undefined && table !== null && data !== undefined && table !== "" && table.data != undefined && data !== null) {
                            var index = -1;
                            index = navcon.getItemIndexByKeyValue(table.data, primaryKey, data[primaryKey]);
                            if (index !== -1) {
                                //table.data.splice(index, 1);
                                //table.data.push(data);

                                table.data.splice(index, 1, data);
                            }
                        }
                    }

                    if (treeTable !== undefined && treeTable !== "" && treeTable.length > 0) {
                        navcon.clearTreeData(treeTable);
                    }
                    if (idColumnIndex != -1)
                        navcon.clearFieldsData(fields);
                    navcon.closeModal(type);
                }


            }
            else if (mode.toUpperCase() === "OK") { //OK Button update
                var addedItem = navcon.getFieldsDataToSave(fields, mode, idColumn);

                var index = navcon.getItemIndexByKeyValue(table.data, idColumn, addedItem[idColumn]);
                if (index > -1) {
                    if (addedItem.ObjectState !== undefined) addedItem.ObjectState = 2;
                    if (addedItem.Status !== undefined) addedItem.Status = 0;

                    table.data.splice(index, 1);
                    if (addedItem !== undefined)
                        table.data.push(addedItem);
                }
                else {
                    if (addedItem.ObjectState !== undefined) addedItem.ObjectState = 1;
                    if (addedItem.Status !== undefined) addedItem.Status = 0;

                    addedItem[idColumn] = parseFloat(addedItem[idColumn]) + 1;
                    table.data.push(addedItem);
                }
                //navcon.clearTableData(type, updateFields)
                //updateFields.data=table.data;

                navcon.closeModal(type);
                return table.data;
            }
            else if (mode.toUpperCase() === "DELETE") { //Delete Modal Open
                var currentTableItem = navcon.getFieldsDataToSave(fields, mode, idColumn);
                //var currentTableItem = table.data[rowNumber];

                if (displayColumn.indexOf(".") > 0)
                    returnData = "Delete ( " + currentTableItem[displayColumn.split('.')[0]][displayColumn.split('.')[1]] + " )";
                else
                    returnData = "Delete ( " + currentTableItem[displayColumn] + " )";

                for (var key in fields) {
                    var field = fields[key];
                    field.disabled = true;
                }

                type = type + "delete";
                navcon.openModal(type);

                if (callback !== undefined) callback(returnData);
            }
            else if (mode.toUpperCase() === "PRINT") { //PRINT Modal Open
                returnData = "";
            }

            return returnData;
        },
        viewOption: function (scope, action, type, table, fields, selectedRow, idColumn, displayColumn, dataservice, directCall, callback, addtionalId, popup, directUrl) { //View form 
            if (directCall !== undefined && directCall) {
                if (directUrl === undefined || directUrl === "")
                    url = type + '/GetById';
                else
                    url = directUrl;

                var data = dataservice.getData(url + "/" + selectedRow[idColumn] + (addtionalId != undefined && addtionalId != "" ? "/" + addtionalId : "")).then(function (data) {
                    var retData = updatedata(data);
                    if (callback !== undefined)
                        callback(retData);
                });
            }
            else {
                var currentTableItem = navcon.getItemByKeyValue(table.data, idColumn, selectedRow[idColumn]);
                var retData = updatedata(currentTableItem);
                if (callback !== undefined)
                    callback(retData);
                else
                    return retData;
            }
            function updatedata(currentTableItem) {
                var returnData = "";
                if (currentTableItem !== -1) {
                    if (displayColumn.indexOf(".") > 0)
                        returnData = action.substr(0, 1).toUpperCase() + action.substr(1) + " ( " + currentTableItem[displayColumn.split('.')[0]][displayColumn.split('.')[1]] + " )";
                    else
                        returnData = action.substr(0, 1).toUpperCase() + action.substr(1) + " ( " + currentTableItem[displayColumn] + " )";
                }
                else if (selectedRow.data !== undefined) {
                    returnData = action.substr(0, 1).toUpperCase() + action.substr(1) + " ( " + selectedRow.data[displayColumn] + ")";

                    currentTableItem = selectedRow.data;
                }

                var isDisabled = false;
                if (action.toUpperCase() !== "EDIT" && action.toUpperCase() !== "MANAGE") isDisabled = true;

                navcon.updateFieldsData(fields, currentTableItem, scope, isDisabled, scope.vm);
                navcon.setViewContentDisabled(action);

                fields.getById = currentTableItem;

                if (type.toLowerCase() === "approval") return returnData;


                if (popup !== undefined && popup !== null && popup !== "") {
                    if (popup !== false) {
                        navcon.openModal(popup, function (val) {
                            if (action.toUpperCase() === "EDIT")
                                navcon.setFieldFocus(fields);
                        });
                    }
                } else {
                    navcon.openModal(type, function (val) {
                        if (action.toUpperCase() === "EDIT")
                            navcon.setFieldFocus(fields);
                    });
                }
                return returnData;
            }
        },
        deleteOption: function (dataservice, type, table, RowNumber, primaryKey, saveType, callback, isTableRemove) { //Delete event update
            var returnData = "";
            if (saveType === undefined || saveType === "") saveType = type;

            returnData = dataservice.deleteServerData(saveType + 'Delete', table.data[RowNumber][primaryKey]).then(function (data) {
                if (data !== undefined) {
                    if (isTableRemove !== undefined && isTableRemove !== null && isTableRemove == false)
                        //navcon.deleteDataList(table, RowNumber);
                        console.log("no table delete");
                    else
                        navcon.deleteDataList(table, RowNumber);
                }
                closeModal(data);

                if (callback !== undefined) {
                    callback(data);
                } else {
                    return data;
                }
            });

            function closeModal(data) {
                if ($("#" + type + "delete").data('modal') && $("#" + type + "delete").data('modal').isShown) navcon.closeModal(type + "delete");
                if ($("#" + type).data('modal') && $("#" + type).data('modal').isShown) navcon.closeModal(type);
            }

            //return returnData;
        },
        treeView: function (scope, action, type, table, fields, displayColumn, idColumn, dataservice, directCall, callback) {
            if (directCall !== undefined && directCall) {
                var data = dataservice.getData(type + '/GetById/' + table.data[idColumn]).then(function (data) {
                    var retData = updatedata(data);
                    if (callback !== undefined)
                        callback(retData);
                    else
                        return retData;
                    //return data;
                });
            } else {
                var currentTableItem = table.data;// navcon.getItemByKeyValue(table.data, idColumn, table.data[idColumn]);
                return updatedata(currentTableItem);
            }
            function updatedata(currentTableItem) {
                var returnData = "";

                if (currentTableItem.data !== undefined && currentTableItem.data[displayColumn] !== undefined)
                    returnData = action.substr(0, 1).toUpperCase() + action.substr(1) + " ( " + currentTableItem.data[displayColumn] + " )";
                else
                    returnData = action.substr(0, 1).toUpperCase() + action.substr(1) + " ( " + currentTableItem[displayColumn] + " )";

                var isDisabled = false;
                if (action.toUpperCase() !== "EDIT" && action.toUpperCase() !== "MANAGE") isDisabled = true;

                navcon.clearFieldsData(fields, scope);
                navcon.updateFieldsData(fields, currentTableItem, scope, isDisabled, scope.vm);
                navcon.setViewContentDisabled(action);

                fields.getById = currentTableItem;

                navcon.openModal(type, function (val) {
                    navcon.setFieldFocus(fields);
                });

                return returnData;
            }
        },
        treeDeleteAction: function (dataservice, type, currentNode, idColumn, callback, hasParentRemove) { //Tree delee
            var returnData = "";
            var currentId = "0";
            if (currentNode.data[idColumn] !== undefined)
                currentId = currentNode.data[idColumn];
            else
                currentId = currentNode[idColumn];

            returnData = dataservice.deleteServerData(type + "Delete", currentId).then(function (data) {
                if (data !== undefined)
                    navcon.removeTreeNode(type, currentNode, "", hasParentRemove);
                closeModal(data);

                if (callback !== undefined) {
                    callback(data);
                } else {
                    return data;
                }
            });

            function closeModal(data) {
                navcon.closeModal(type + "delete");
                if ($("#" + type).data('modal') && $("#" + type).data('modal').isShown) navcon.closeModal(type);
            }

            //return returnData;
        },
        treeAction: function (scope, dataservice, action, type, fields, currentNode, assignNode, idColumn, displayColumn, treeData, popup, callback) { //Tree data save
            if (fields === undefined) {
            }

            var position = "";
            if (position === undefined || position === '') position = 'last';

            //var item = navcon.getFieldsData(fields);
            var item = navcon.getFieldsDataToSave(fields, action, idColumn);
            if (assignNode !== null) {
                for (var key in assignNode.data) {
                    if (item.hasOwnProperty(key)) assignNode.data[key] = item[key];
                }

                if (assignNode.text !== undefined) assignNode.text = item[displayColumn];


                if (action.toUpperCase() === "SAVE" || action.toUpperCase() === "SAVEAS") {

                    if (assignNode.data.ParentId !== undefined) assignNode.data.ParentId = currentNode.data.id;
                    if (assignNode.data.LevelId !== undefined) assignNode.data.LevelId = parseFloat(currentNode.data.LevelId) + 1;
                    if (assignNode.data.SeqNo !== undefined) assignNode.data.SeqNo = (currentNode.data.id !== "" ? currentNode.children.length : currentNode.data.SeqNo) + 1;
                    if (assignNode.data.ObjectState !== undefined && (assignNode.data.ObjectState === "0" || assignNode.data.ObjectState === "")) assignNode.data.ObjectState = 1;
                    if (assignNode.data.Status !== undefined && (assignNode.data.Status === "0" || assignNode.data.Status === "")) assignNode.data.Status = 0;

                    returnData = dataservice.postServerData(type + action, assignNode.data).then(function (data) {
                        if (assignNode.StatusName === undefined && data.StatusName !== undefined && data.StatusName !== null) assignNode.StatusName = data.StatusName;
                        if (assignNode.data.StatusName === undefined && data.StatusName !== undefined && data.StatusName !== null) assignNode.data.StatusName = data.StatusName;

                        //return data;
                        assignNode.id = data.id;
                        assignNode.data.id = data.id;

                        if (currentNode === undefined || currentNode.data === undefined || currentNode.data.id === "" || currentNode.data.id === "-1" || currentNode.data.id === "0")
                            currentNode = { "id": "#" };

                        var data = assignNode.data;
                        navcon.createTreeNode(type, currentNode, assignNode, position);
                        assignNode.data = data;

                        //navcon.closeModal(type);
                        if (callback !== undefined)
                            callback(assignNode)
                        else
                            return assignNode;
                    });
                }
                else if (action.toUpperCase() === "UPDATE") {

                    if (assignNode.data.id !== undefined) assignNode.data.id = currentNode.data.id;
                    if (assignNode.data.ParentId !== undefined) assignNode.data.ParentId = currentNode.data.ParentId;
                    if (assignNode.data.LevelId !== undefined) assignNode.data.LevelId = currentNode.data.LevelId;
                    if (assignNode.data.SeqNo !== undefined) assignNode.data.SeqNo = currentNode.data.SeqNo;
                    if (assignNode.data.ObjectState !== undefined && (assignNode.data.ObjectState === "0" || assignNode.data.ObjectState === "")) assignNode.data.ObjectState = 2;
                    if (assignNode.data.Status !== undefined && (assignNode.data.Status === "0" || assignNode.data.Status === "")) assignNode.data.Status = 0;

                    returnData = dataservice.putServerData(type + action, assignNode.data).then(function (data) {
                        if (assignNode.StatusName === undefined && data.StatusName !== undefined && data.StatusName !== null) assignNode.StatusName = data.StatusName;
                        if (assignNode.data.StatusName === undefined && data.StatusName !== undefined && data.StatusName !== null) assignNode.data.StatusName = data.StatusName;

                        navcon.editTreeNode(type, currentNode, assignNode.text);
                        if (assignNode !== undefined && data.id !== undefined) {
                            assignNode.id = data.id;
                            assignNode.data.id = data.id;

                            var nodeChildren = navcon.getItemByKeyValue(treeData, "id", data.id);
                            if (nodeChildren !== -1) assignNode.children = nodeChildren.children;

                            var jsonData = [assignNode];
                            if (treeData !== undefined) navcon.updateTreeNode(type, treeData, jsonData)
                        }

                        //navcon.closeModal(type);
                        if (callback !== undefined)
                            callback(currentNode)
                        else
                            return currentNode;
                    });
                }
                else if (action.toUpperCase() === "DELETE") {
                    if (currentNode.data[displayColumn] !== undefined)
                        returnData = action + " ( " + currentNode.data[displayColumn] + " )";
                    else
                        returnData = action + " ( " + currentNode[displayColumn] + " )";

                    for (var key in fields) {
                        var field = fields[key];
                        field.disabled = true;
                    }

                    type = type + "delete";
                    navcon.openModal(type);
                    return treeData;
                }

                if ((popup !== undefined && popup !== "" && popup === false) || action.toUpperCase() === "DELETE") return;
                navcon.closeModal(type);
            }
            else {
                if (action.toUpperCase() === "SAVE" || action.toUpperCase() === "SAVEAS")
                    dataservice.postServerData(type + action, item).then(function (data) {
                        if (callback !== undefined)
                            callback(data);
                    });
                else if (action.toUpperCase() === "UPDATE")
                    dataservice.putServerData(type + action, item).then(function (data) {
                        if (callback !== undefined)
                            callback(data);
                    });
                else if (action.toUpperCase() === "DELETE")
                    dataservice.putServerData(type + action, item).then(function (data) {
                        if (callback !== undefined)
                            callback(data);
                    });
            }
        }
    };
}(navcon || {}));