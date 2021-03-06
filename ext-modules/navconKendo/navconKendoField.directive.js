"use strict";

angular.module('app').directive('navconKendofield', ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', 'ngAuthSettings',
function ($timeout, dataservice, $compile, $http, $rootScope, ngAuthSettings) {
    return {
        /*E: Directive defined as an element. <navcon-input></navcon-input>
        A: Directive applied as an attribute on existing element. <div navcon-input></div>
        C: Directive applied as a css class to existing element <div class="navcon-input"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        replace: 'true',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            //items:'=fieldData',
            fieldKey: '@',
            //navconData: '=',
            //fieldType:'@',
            //fieldIndex:'@',
            showMessage: '@',
            onClick: '@',
            onBlur: '@',
            onChange: '@',
            invalid: '@',
            onKeyPress: '@',
            fields: '=',
            //form: '@',
            labelClass: '@',
            fieldClass: '@',
            fieldData: '='
        },
        require: ['^?navconForm', '^?form'],
        link: function (scope, el, attrs, ctrl) {

            if (ctrl[0] !== null) {
                if (scope.fieldData !== undefined)
                    scope.items = scope.fieldData;
                else
                    scope.items = ctrl[0].getFieldItems();
                scope.form = ctrl[1];

                scope.navconData = ctrl[0].getNavconData();
                scope.validate = ctrl[0].getValidate();
                scope.readOnly = ctrl[0].getFormReadOnly();

            }
            if (scope.items === undefined) {
                if (scope.fieldData !== undefined)
                    scope.items = scope.fieldData;
                else
                    return;
            }

            if (scope.validate === undefined)
                scope.validate = true;

            if (scope.readOnly === undefined)
                scope.readOnly = false;

            if (ngAuthSettings.enableFieldLevelValidation !== undefined && !ngAuthSettings.enableFieldLevelValidation)
                scope.enableFieldLevelValidation = false;
            else
                scope.enableFieldLevelValidation = true;


            scope.fieldIndex = navcon.getItemIndexByProperty(scope.items, scope.fieldKey);
            scope.fieldType = scope.items[scope.fieldIndex].type;

            var templateData = $($rootScope.fieldTemplate).find("script[id ='" + scope.fieldType + "']").text();
            el.html(templateData);
            $compile(el.contents())(scope);
            el.find('[data-toggle="tooltip"]').tooltip();
            scope.redirectURL = function (URL) {
                if (URL.indexOf('http') == -1) {
                    URL = "http://" + URL;
                }
                window.open(encodeURI(URL), '_blank');
            }
            scope.onClick = function (key, e) {
                showMessaggeStatus(scope, $timeout);

            };




            scope.onChange = function (key, e) {
                scope.item.selectOptions.item["isSelect"] = true;
            };

            var replaceSpecialCharacter = function (item) {
                if (item !== undefined && typeof item === "string" && item !== "") {
                    scope.item.data = item.replace(/\u2013|\u2014/g, "-");
                }
            }



            scope.$watch("items[" + scope.fieldIndex + "]", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    scope.item = newValue;
                    scope.item.form = scope.form;
                    scope.item.showMessage = false;
                    scope.item.setFocus = false;
                    fieldSettings(scope, el, attrs, $compile);
                    scope.$watch('form.' + scope.item.key + '.$valid', function (newValue, oldValue) {
                        if (newValue !== undefined && newValue !== oldValue) {
                            scope.item.setFocus = false;
                            if (newValue === false && scope.validate && scope.enableFieldLevelValidation) {
                                scope.invalid = true;
                                scope.item.valid = false;
                                showMessaggeStatus(scope, $timeout);
                            } else {
                                scope.invalid = false;
                                scope.item.valid = true;
                            }
                        }
                    });
                }
            });

            scope.$on('FORM-READONLY', function (event, data) {
                scope.readOnly = data;
            });

            scope.$watch("items[" + scope.fieldIndex + "].readonly", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    scope.readOnly = newValue;
                }
            });


            //scope.$watch("items[" + scope.fieldIndex + "].data", function (newValue, oldValue) {
            //    //  if (newValue !== undefined && newValue !== oldValue) {
            //    if (newValue !== undefined) {
            //        scope.item.showMessage = false;
            //        if (scope.readOnly) {
            //            scope.item.readOnlyText = scope.displayReadOnlyField(scope.item);
            //        }
            //    }
            //}, this);

            scope.$on('FIELD-VALID', function (event, value, keyIndex) {
                if (scope.items.length >= keyIndex && scope.items[keyIndex] !== undefined) {
                    if (value === true) {
                        scope.items[keyIndex].valid = true;

                    } else {
                        scope.items[keyIndex].valid = false;

                    }
                }
            });


            scope.tabMouseOver = function (el, scope, item) {
                $(el.srcElement).css('cursor', scope.templateOptions.cursor);
            };



            scope.displayReadOnlyField = function (item) {
                var returnValue = item.data != null ? item.data : "";
                if (item.type === "select" || item.type === "kendoselect" || item.type === "kendocombobox") {
                    returnValue = item.data[item.selectOptions.item.displayField];
                } else if (item.type === "multiselect" || item.type === "multiselectcheckbox" || item.type === "kendomultiselect") {
                    var list = [];
                    for (var i = 0, len = item.data.length; i < len; i++) {
                        var obj = item.data[i];
                        if (item.selectOptions.item.secondDisplayField !== undefined && item.selectOptions.item.secondDisplayField !== null && item.selectOptions.item.secondDisplayField !== "")
                            list.push(obj[item.selectOptions.item.displayField] + " / " + obj[item.selectOptions.item.secondDisplayField])
                        else
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
                return returnValue != undefined ? (returnValue != null ? returnValue : "") : "";
            };



            function fieldSettings(scope, el, attrs, $compile) {

                if (scope.item.type === "kendodate") {
                    kendodateSetting(scope, el, attrs);
                } else if (scope.item.type === "kendocombobox") {
                    kendocomboboxSetting(scope, el, attrs);
                } else if (scope.item.type === "kendonumerictextbox") {
                    kendonumerictextboxSetting(scope, el, attrs);
                } else if (scope.item.type === "kendomaskedtextbox") {
                    kendomaskedtextboxSetting(scope, el, attrs);
                } else if (scope.item.type === "kendocolorpicker") {
                    kendocolorpickerSetting(scope, el, attrs);
                } else if (scope.item.type === "kendoswitch") {
                    kendoswitchSetting(scope, el, attrs);
                } else if (scope.item.type === "kendodatetime") {
                    kendodatetimeSetting(scope, el, attrs);
                } else if (scope.item.type === "kendotime") {
                    kendotimeSetting(scope, el, attrs);
                } else if (scope.item.type === "kendoselect") {
                    kendoselectSetting(scope, el, attrs);
                } else if (scope.item.type === "kendomultiselect") {
                    kendomultiSelectSetting(scope, el, attrs);
                }


                if ($(el).is('[class*="col-sm"]'))
                    $('<div class="clearfix visible-xs-block visible-sm-block"></div>').insertAfter($(el));

                if (scope.item.templateOptions.label === "") {
                    var fistObj = $($(el).find("div[ng-show*='" + scope.item.type + "']")[0]).find('label').first();
                    fistObj.css("display", "none")
                    fistObj.next().css("width", "79%");
                }
            };

            function showMessaggeStatus(scope, $timeout) {
                if (scope.invalid === true && (scope.item.showMessage === undefined || scope.item.showMessage === false)) {
                    scope.item.showMessage = true;
                    $timeout(function () {
                        message(scope);
                    }, 6000);
                };

                function message(scope) {
                    scope.item.showMessage = false;
                };
            };


            function tabSetting(scope, el, attr) {
                $(el).find('a').css('cursor', scope.item.templateOptions.cursor);
            }

            function kendodateSetting(scope, el, attr) {


                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    options["format"] = "dd/MM/yyyy";
                    if (scope.items[scope.fieldIndex].templateOptions.dateformat != undefined) {
                        options["format"] = scope.items[scope.fieldIndex].templateOptions.dateformat;
                    }
                    options["disableDates"] = function (date) {
                        if (scope.item.templateOptions.futureDate !== undefined && scope.item.templateOptions.futureDate !== "" && scope.item.templateOptions.futureDate)
                            return date < new Date();
                    };
                    if (scope.items[scope.fieldIndex].templateOptions.parseFormats != undefined)
                        options["parseFormats"] = scope.items[scope.fieldIndex].templateOptions.parseFormats
                    options["change"] = onkendodateChange;
                }


                var element = $(el);
                element.find("input").kendoDatePicker(options);

                if (scope.item.disabled !== undefined) {
                    var dateelement = element.data("kendoDatePicker");
                    dateelement.enable(!(scope.item.disabled));
                }
            };

            function onkendodateChange() {
                scope.item.data = [];

                scope.item.data = this._oldText;
            }


            function kendoswitchSetting(scope, el, attr) {

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.onLabel !== undefined)
                        options["onLabel"] = scope.items[scope.fieldIndex].templateOptions.onLabel;

                    if (scope.items[scope.fieldIndex].templateOptions.offLabel != undefined) {
                        options["offLabel"] = scope.items[scope.fieldIndex].templateOptions.offLabel;
                    }

                    options["change"] = onkendoswitchChange;
                }
                var element = $(el);
                element.find("input").kendoMobileSwitch(options);

                if (scope.item.disabled !== undefined) {
                    var dateelement = element.data("kendoMobileSwitch");
                    dateelement.enable(!(scope.item.disabled));
                }
            };

            function onkendoswitchChange(e) {
                scope.item.data = [];

                scope.item.data = e.checked;
            }

            function kendodatetimeSetting(scope, el, attr) {

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                        options["timeFormat"] = "HH:mm";
                    options["format"] = "dd/MM/yyyy HH:mm";
                    if (scope.items[scope.fieldIndex].templateOptions.dateformat != undefined) {
                        options["format"] = scope.items[scope.fieldIndex].templateOptions.dateformat;
                    }
                    options["disableDates"] = function (date) {
                        if (scope.item.templateOptions.futureDate !== undefined && scope.item.templateOptions.futureDate !== "" && scope.item.templateOptions.futureDate)
                            return date < new Date();
                    };
                    if (scope.items[scope.fieldIndex].templateOptions.parseFormats != undefined)
                        options["parseFormats"] = scope.items[scope.fieldIndex].templateOptions.parseFormats
                    options["change"] = onkendodatetimeChange;
                }
                var element = $(el);
                element.find("input").kendoDateTimePicker(options);

                if (scope.item.disabled !== undefined) {
                    var dateelement = element.data("kendoDateTimePicker");
                    dateelement.enable(!(scope.item.disabled));
                }
            };

            function onkendodatetimeChange() {
                scope.item.data = [];

                scope.item.data = this._oldText;
            }

            function kendotimeSetting(scope, el, attr) {

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                        options["timeFormat"] = "HH:mm";

                    if (scope.items[scope.fieldIndex].templateOptions.parseFormats != undefined)
                        options["parseFormats"] = scope.items[scope.fieldIndex].templateOptions.parseFormats
                    options["change"] = onkendotimeChange;
                }
                var element = $(el);
                element.find("input").kendoTimePicker(options);

                if (scope.item.disabled !== undefined) {
                    var dateelement = element.data("kendoTimePicker");
                    dateelement.enable(!(scope.item.disabled));
                }
            };

            function onkendotimeChange() {
                scope.item.data = [];

                scope.item.data = this._oldText;
            }



            function kendocolorpickerSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendocolorpicker")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.buttons !== undefined) {
                        options["buttons"] = scope.item.templateOptions.buttons;
                    }


                    options["select"] = onkendocolorpickerSelect;
                }




                var element = $($(el).find('input'));
                element.kendoColorPicker(options);

                if (scope.item.disabled !== undefined) {
                    var colorboxField = element.data("kendoColorPicker");
                    colorboxField.enable(!(scope.item.disabled));
                }


                scope.$watch("items[" + keyIndex + "].data", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        var colorboxField = element.data("kendoColorPicker");
                        colorboxField.value(newValue);
                    }
                });

            }

            function onkendocolorpickerSelect() {
                scope.item.data = this.value();
            }

            function kendomaskedtextboxSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendomaskedtextbox")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.mask !== undefined) {
                        options["mask"] = scope.item.templateOptions.mask;
                    }


                    options["change"] = onkendomaskedtextboxChange;
                }




                var element = $($(el).find('input'));
                element.kendoMaskedTextBox(options);

                if (scope.item.disabled !== undefined) {
                    var textboxField = element.data("kendoMaskedTextBox");
                    textboxField.enable(!(scope.item.disabled));
                }



            }

            function onkendomaskedtextboxChange() {
                scope.item.data = this.value().replace(/[- ()]/g, '');
            }


            function kendonumerictextboxSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendonumerictextbox")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.format !== undefined) {
                        options["format"] = scope.item.templateOptions.format;
                    }
                    if (scope.item.templateOptions.decimals !== undefined) {
                        options["decimals"] = scope.item.templateOptions.decimals;
                    }

                    if (scope.item.templateOptions.min !== undefined) {
                        options["min"] = scope.item.templateOptions.min;
                    }

                    if (scope.item.templateOptions.max !== undefined) {
                        options["max"] = scope.item.templateOptions.max;
                    }

                    if (scope.item.templateOptions.step !== undefined) {
                        options["step"] = scope.item.templateOptions.step;
                    }

                    if (scope.item.templateOptions.round !== undefined) {
                        options["round"] = scope.item.templateOptions.round;
                    }

                    if (scope.item.templateOptions.restrictDecimals !== undefined) {
                        options["restrictDecimals"] = scope.item.templateOptions.restrictDecimals;
                    }

                    if (scope.item.templateOptions.placeholder !== undefined) {
                        options["placeholder"] = scope.item.templateOptions.placeholder;
                    }

                    options["change"] = onkendonumerictextboxChange;
                }




                var element = $($(el).find('input'));
                element.kendoNumericTextBox(options);

                if (scope.item.disabled !== undefined) {
                    var textboxField = element.data("kendoNumericTextBox");
                    textboxField.enable(!(scope.item.disabled));
                }



            }

            function onkendonumerictextboxChange() {
                scope.item.data = this.value();
            }

            function kendocomboboxSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendocombobox")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.selectOptions.item.filter !== undefined) {
                        options["filter"] = scope.item.selectOptions.item.filter;
                    }
                    if (scope.item.selectOptions.item.autoBind !== undefined) {
                        options["autoBind"] = scope.item.selectOptions.item.autoBind;
                    }
                    if (scope.item.selectOptions.item.autoBind !== undefined) {
                        options["autoBind"] = scope.item.selectOptions.item.autoBind;
                    }
                    if (scope.item.selectOptions.item.minLength !== undefined) {
                        options["minLength"] = scope.item.selectOptions.item.minLength;
                    }
                    if (scope.item.selectOptions.item.displayField !== undefined) {
                        options["dataTextField"] = scope.item.selectOptions.item.displayField;
                    }
                    if (scope.item.selectOptions.item.dataField !== undefined) {
                        options["dataValueField"] = scope.item.selectOptions.item.dataField;
                    } if (scope.item.selectOptions.placeholder !== undefined) {
                        options["placeholder"] = scope.item.templateOptions.placeholder;
                    }
                    if (scope.item.selectOptions.item.group !== undefined) {
                        options["dataSource"] = { data: scope.item.selectOptions.items, group: { field: scope.item.selectOptions.item.groupField } }
                    } else {
                        options["dataSource"] = { data: scope.item.selectOptions.items }
                    }

                    if (scope.item.selectOptions.item.headerTemplate !== undefined) {
                        options["headerTemplate"] = scope.item.selectOptions.item.headerTemplate;
                    }
                    if (scope.item.selectOptions.item.footerTemplate !== undefined) {
                        options["footerTemplate"] = scope.item.selectOptions.item.footerTemplate;
                    }
                    if (scope.item.selectOptions.item.template !== undefined) {
                        options["template"] = scope.item.selectOptions.item.template;
                    }
                    options["select"] = onkendocomboBoxselect;
                }




                var element = $($(el).find('input'));
                element.kendoComboBox(options);

                if (scope.item.disabled !== undefined) {
                    var dropselect = element.data("kendoComboBox");
                    dropselect.enable(!(scope.item.disabled));
                }
                scope.$watch("items[" + keyIndex + "].selectOptions.items", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        var singleselect = element.data("kendoComboBox");
                        singleselect.dataSource.data(newValue);
                        //$(multiselect.wrapper).addClass(scope.fieldClass);
                    }
                });

                scope.$watch("items[" + keyIndex + "].data", function (newValue, oldValue) {
                    if (newValue !== undefined && newValue[scope.item.selectOptions.item.dataField] != undefined) {
                        var dropselect = element.data("kendoComboBox");
                        dropselect.value(newValue[scope.item.selectOptions.item.dataField]);
                    } else {
                        var dropselect = element.data("kendoComboBox");
                        dropselect.value("");
                    }
                });
            }
            function onkendocomboBoxselect(e) {
                scope.item.data = [];

                scope.item.data = e.dataItem;
            }

            function kendoselectSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendoselect")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.selectOptions.item.displayField !== undefined) {
                        options["dataTextField"] = scope.item.selectOptions.item.displayField;
                    }
                    if (scope.item.selectOptions.item.dataField !== undefined) {
                        options["dataValueField"] = scope.item.selectOptions.item.dataField;
                    } if (scope.item.selectOptions.placeholder !== undefined) {
                        options["placeholder"] = scope.item.templateOptions.placeholder;
                    }
                    options["dataSource"] = { data: scope.item.selectOptions.items }
                    options["select"] = onkendoselect;
                    options["index"] = -1;
                }




                var element = $($(el).find('select'));
                element.kendoDropDownList(options);

                if (scope.item.disabled !== undefined) {
                    var dropselect = element.data("kendoDropDownList");
                    dropselect.enable(!(scope.item.disabled));
                }
                scope.$watch("items[" + keyIndex + "].selectOptions.items", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        var singleselect = element.data("kendoDropDownList");
                        singleselect.dataSource.data(newValue);
                        //$(multiselect.wrapper).addClass(scope.fieldClass);
                    }
                },true);

                scope.$watch("items[" + keyIndex + "].data", function (newValue, oldValue) {
                    if (newValue !== undefined && newValue[scope.item.selectOptions.item.dataField] != undefined) {
                        var dropselect = element.data("kendoDropDownList");
                        dropselect.value(newValue[scope.item.selectOptions.item.dataField]);
                        scope.item.selectdata = newValue[scope.item.selectOptions.item.dataField];
                    } else {
                        var dropselect = element.data("kendoDropDownList");
                        dropselect.value("");
                        scope.item.selectdata = "";
                    }
                },true);
            }
            function onkendoselect(e) {
                scope.item.data = [];

                scope.item.data = e.dataItem;
            }

            function kendomultiSelectSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "kendomultiselect")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];
                var element = $($(el).find('select'));

                var options = {};
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.selectOptions.item.displayField !== undefined) {
                        options["dataTextField"] = scope.item.selectOptions.item.displayField;
                    }
                    if (scope.item.selectOptions.tagTemplate !== undefined) {
                        options["tagTemplate"] = scope.item.selectOptions.tagTemplate;
                    }
                    if (scope.item.selectOptions.itemTemplate !== undefined) {
                        options["itemTemplate"] = scope.item.selectOptions.itemTemplate;
                    }
                    if (scope.item.selectOptions.headerTemplate !== undefined) {
                        options["headerTemplate"] = scope.item.selectOptions.headerTemplate;
                    }
                    if (scope.item.selectOptions.footerTemplate !== undefined) {
                        options["footerTemplate"] = scope.item.selectOptions.footerTemplate;
                    }
                    if (scope.item.selectOptions.tagMode !== undefined && scope.item.selectOptions.tagMode) {
                        options["tagMode"] = "single";
                    }
                    if (scope.item.selectOptions.item.dataField !== undefined) {
                        options["dataValueField"] = scope.item.selectOptions.item.dataField;
                    }
                    if (scope.item.selectOptions.placeholder !== undefined) {
                        options["placeholder"] = scope.item.templateOptions.placeholder;
                    }
                    options["dataSource"] = [];
                    options["select"] = onSelectKendomultiselect;
                    options["deselect"] = onDeselectKendomultiselect;
                    //options["index"] = -1;
                    options["autoBind"] = false;

                }



                element.kendoMultiSelect(options).data('kendoMultiSelect');

                if (scope.item.disabled !== undefined) {
                    var dropselect = element.data("kendoMultiSelect");
                    dropselect.enable(!(scope.item.disabled));
                }


                scope.$watch("items[" + keyIndex + "].selectOptions.items", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        var multiselect = element.data("kendoMultiSelect");
                        //newValue.push({ "RoleId": "-1", "RoleName": "" });
                        multiselect.dataSource.data(newValue);
                        $(multiselect.wrapper).addClass(scope.fieldClass);

                        // multiselect.value([-1]);
                    }
                });
                scope.$watch("items[" + keyIndex + "].data", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        var selectedValues = [];
                        $.each(newValue, function (index, item) {
                            selectedValues.push(item[scope.item.selectOptions.item.dataField]);
                        })
                        var multiselect = element.data("kendoMultiSelect");
                        multiselect.value(selectedValues);
                        scope.item.multiselectData = selectedValues;
                    } else {
                        var selectedValues = [];
                        var multiselect = element.data("kendoMultiSelect");
                        multiselect.value(selectedValues);
                        scope.item.multiselectData = [];
                    }
                });



            }
            function onSelectKendomultiselect(e) {
                if (scope.item.data == null) {
                    //scope.item.data = [];
                }
                //var JsonResult = e.dataItem.toJSON();
                scope.item.data.push(e.dataItem.toJSON());

                //var element = $($(el).find('select'));
                //var selectedValues = [];
                //$.each(scope.item.data, function (index, item) {
                //    selectedValues.push(item[scope.item.selectOptions.item.dataField]);
                //})
                //var multiselect = element.data("kendoMultiSelect");
                //multiselect.value(selectedValues);
            }
            function onDeselectKendomultiselect(e) {
                $(scope.item.data).filter(function (i, n) {
                    if (n[scope.item.selectOptions.item.dataField] != e.dataItem[scope.item.selectOptions.item.dataField]) {
                        scope.item.data.push(e.dataItem);
                    };
                });

            }

            scope.$watch("items[" + scope.fieldIndex + "].data", function (newValue, oldValue) {
                //debugger;
                //  if (newValue !== undefined && newValue !== oldValue) {
                if (newValue !== undefined) {
                    scope.item.showMessage = false;
                    if (scope.readOnly) {
                        scope.item.readOnlyText = scope.displayReadOnlyField(scope.item);
                    }
                }
            }, this);
            scope.displayReadOnlyField = function (item) {
                var returnValue = item.data != null ? item.data : "";
                if (item.type === "select" || item.type === "kendoselect") {
                    returnValue = item.data[item.selectOptions.item.displayField];
                } else if (item.type === "multiselect" || item.type === "multiselectcheckbox" || item.type === "kendomultiselect") {
                    var list = [];
                    for (var i = 0, len = item.data.length; i < len; i++) {
                        var obj = item.data[i];
                        if (item.selectOptions.item.secondDisplayField !== undefined && item.selectOptions.item.secondDisplayField !== null && item.selectOptions.item.secondDisplayField !== "")
                            list.push(obj[item.selectOptions.item.displayField] + " / " + obj[item.selectOptions.item.secondDisplayField])
                        else
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
                return returnValue != undefined ? (returnValue != null ? returnValue : "") : "";
            };
            function parentItems(item) {
                for (var key in item) {
                    if (item["$parent"].items != undefined)
                        return item["$parent"].items;
                    else
                        return parentItems(item["$parent"]);
                }
            };


        }
    };
}]);