(function (navcon) {
    navcon.kendo = {
        loadListDefaultData: function (data, fields) {
            $.map(fields, function (item, key) {
                if (item.type.toLowerCase() === "kendomultiselect" || item.type.toLowerCase() === "kendoselect" || item.type.toLowerCase() === "kendocombobox") {
                    var defaultField = item.selectOptions.item.defaultField;
                    if (defaultField !== undefined && defaultField !== "") {
                        if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                            item.selectOptions.items = angular.copy(navcon.getDistinctfromJSON(data[defaultField], item.selectOptions.item.dataField));
                    }
                }
            });
        },
        loadListSingleData: function (data, fields, key) {
            var keyIndex = navcon.getItemIndexByProperty(fields, key);
            var item = fields[keyIndex];
            if (keyIndex !== -1 && item !== undefined) {
                if (item.type.toLowerCase() === "kendomultiselect" || item.type.toLowerCase() === "kendoselect" || item.type.toLowerCase() === "kendocombobox") {
                    var defaultField = item.selectOptions.item.defaultField;
                    if (defaultField !== undefined && defaultField !== "") {
                        if (data[defaultField] !== undefined && data[defaultField] !== null && data[defaultField] !== "")
                            item.selectOptions.items = angular.copy(data[defaultField]);
                    }
                }
            }
        },
        requiredValidation: function (myFields, fieldName, validation) {
            //Required message
            if (validation.required !== undefined && validation.required !== null && (validation.required || validation.required.toLowerCase() === "yes")) {
                if (validation.requiredMessage !== undefined && validation.requiredMessage !== null && validation.requiredMessage !== "")
                    myFields.validation["required"] = { "message": validation.requiredMessage };
                else
                    myFields.validation["required"] = (validation.required || validation.required.toLowerCase() === "yes" ? true : false);
            }
        },
        minimumValidation: function (myFields, fieldName, validation) {
            //Minium message
            if (validation.minlength !== undefined && validation.minlength !== null && validation.minlength !== "") {
                var messageMin = validation.minlengthMessage !== undefined && validation.minlengthMessage !== "" ? validation.minlengthMessage : "Minimum " + validation.minlength + " character required.";
                myFields.validation[fieldName.toLowerCase() + "min"] = function (input) {
                    if (input.is("[name='" + fieldName + "']") && input.val().length < validation.minlength) {
                        input.attr("data-" + fieldName.toLowerCase() + "min-msg", "" + validation.minlengthMessage + "");
                        return false;
                    }
                    return true;
                }
            }
        },
        maximumValidation: function (myFields, fieldName, validation) {
            //Maximum message
            if (validation.maxlength !== undefined && validation.maxlength !== null && validation.maxlength !== "") {
                var messageMin = validation.maxlengthMessage !== undefined && validation.maxlengthMessage !== "" ? validation.maxlengthMessage : "Maximum " + validation.maxlength + " only allowed.";
                myFields.validation[fieldName.toLowerCase() + "max"] = function (input) {
                    if (input.is("[name='" + fieldName + "']") && input.val().length > validation.maxlength) {
                        input.attr("data-" + fieldName.toLowerCase() + "max-msg", "" + validation.maxlengthMessage + "");
                        return false;
                    }
                    return true;
                }
            }
        },
        patternValidation: function (myFields, fieldName, validation) {
            //Pattern message
            if (validation.pattern !== undefined && validation.pattern !== null && validation.pattern !== "") {
                var patternRegex = new RegExp(validation.pattern.toString());
                var messageMin = validation.patternMessage !== undefined && validation.patternMessage !== "" ? validation.patternMessage : "Alpha numeric only allowed.";
                myFields.validation[fieldName.toLowerCase() + "pattern"] = function (input) {
                    if (input.is("[name='" + fieldName + "']") && input.val() != "") {
                        input.attr("data-" + fieldName.toLowerCase() + "pattern-msg", "" + validation.patternMessage + "");
                        return patternRegex.test(input.val());
                    }
                    return true;
                }
            }
        },
        existDataValidation: function (myFields, fieldName, fieldKey, validation, scope) {
            //ExistData message
            if (validation.isExistData !== undefined && validation.isExistData !== null && validation.isExistData !== "") {
                var scopeData = scope.navconData[validation.isExistData];
                var keyOldData = "";

                var messageMin = validation.isExistMessage !== undefined && validation.isExistMessage !== "" ? validation.isExistMessage : "already exists..";
                myFields.validation[fieldName.toLowerCase() + "exists"] = function (input) {
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
            }
        }
    }
}(navcon || {}));