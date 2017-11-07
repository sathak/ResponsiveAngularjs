"use strict";

angular.module('app').directive('navconField', ['$timeout', 'dataservice', '$compile', '$http', '$rootScope', 'ngAuthSettings',
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

                /*if (scope.fieldType === "select") {
                    if (key !== undefined && scope.navconData !== undefined && scope.navconData.dropdownchange !== undefined)
                        scope.navconData.dropdownchange(key, scope, scope.item.data);

                    if (scope.item.selectOptions.item.addNew !== undefined && scope.item.selectOptions.item.addNew === "yes") {

                        //remove last user input
                        scope.item.selectOptions.items = scope.item.selectOptions.items.filter(function (item) {
                            if (item["undefined"] !== undefined && item["undefined"] === "")
                                return false;
                            else if(item[(scope.item.selectOptions.item.dataField || "id")] === -1)
                                return false;
                            else
                                return true;
                        });
                    }

                } else*/ if (scope.fieldType === "autocomplete") {

                } else if (scope.fieldType === "datetime") {
                    $(e.target).parent().data('DateTimePicker').show();
                }
            };


            scope.dropdownClick = function (key, e) {
                showMessaggeStatus(scope, $timeout);
                if (scope.fieldType === "select") {
                    if (key !== undefined && scope.navconData !== undefined && scope.navconData.dropdownchange !== undefined)
                        scope.navconData.dropdownchange(key, scope, scope.item.data);

                    if (scope.item.selectOptions.item.addNew !== undefined && scope.item.selectOptions.item.addNew === "yes") {

                        //remove last user input
                        scope.item.selectOptions.items = scope.item.selectOptions.items.filter(function (itm) {
                            if (itm["undefined"] !== undefined && itm["undefined"] === "" && scope.item.data !== undefined && scope.item.data[(scope.item.selectOptions.item.dataField || "id")] !== itm[(scope.item.selectOptions.item.dataField || "id")])
                                return false;
                            else if (itm[(scope.item.selectOptions.item.dataField || "id")] === -1)
                                return false;
                            else
                                return true;
                        });
                    }

                }
            }

            scope.colorpickerBeforeShow = function () {

                colorpickerEventChange();
            }

            scope.colorpickerMove = function () {

            }

            scope.colorpickerShow = function () {
                $('a[class="sp-cancel"]').replaceWith('<button type="button" onclick="navcon.colorpickerHide();">Cancel</button>');

                $('.sp-palette-toggle').on("click", function () {
                    colorpickerEventChange();
                })
                colorpickerEventChange();
            }

            scope.onChange = function (key, e) {
                scope.item.selectOptions.item["isSelect"] = true;
            };

            var replaceSpecialCharacter = function (item) {
                if (item !== undefined && typeof item === "string" && item !== "") {
                    scope.item.data = item.replace(/\u2013|\u2014/g, "-");
                }
            }

            scope.labelDataClick = function (item) {
                if (!item.templateOptions.href) return;
                if (scope.navconData !== undefined && scope.navconData.labelDataClick !== undefined && $.isFunction(scope.navconData.labelDataClick))
                    scope.navconData.labelDataClick(item);

            }

            scope.onPaste = function (event) {
                $timeout(function () {
                    var item = angular.element(event.currentTarget).val();
                    replaceSpecialCharacter(item);
                }, 100)
            }

            scope.tabClick = function (scope, selectItem) {
                showMessaggeStatus(scope, $timeout);
                scope.data = selectItem[scope.selectOptions.item.dataField];
            };

            scope.onBlur = function (evt) {
                if ((evt !== undefined && evt.relatedTarget !== null && evt.relatedTarget !== undefined && $(evt.relatedTarget).prop("tagName").toLowerCase() === "button") && ($(evt.relatedTarget).text().toLowerCase() === "cancel" || $(evt.relatedTarget).text().toLowerCase() === "save" || $(evt.relatedTarget).text().toLowerCase() === "ok")) {
                    evt.preventDefault();
                    if ($(evt.relatedTarget).text().toLowerCase() === "save")
                        scope.item.setFocus = false;
                    return false;
                } else {
                    showMessaggeStatus(scope, $timeout);
                }
                if (scope.item.setFocusBlur === undefined || scope.item.setFocusBlur === false)
                    scope.item.setFocus = false;
            };

            scope.checkboxlistFilter = function (item) {
                if (scope.item.group !== undefined && scope.item.group.length > 0) {
                    for (var i = 0, len = scope.item.group.length; i < len; i++) {
                        var data = scope.item.group[i];
                        if (parseInt(item.EventSection) === parseInt(data)) {
                            if (scope.readOnly && item.ParentID !== 0) {
                                if (item.value !== undefined && item.value)
                                    return true;
                                else
                                    return false;
                            } else {
                                return true;
                            }
                        }
                    }
                    return false;

                } else {
                    if (scope.readOnly) {
                        if (item.value !== undefined && item.value)
                            return true;
                        else
                            return false;
                    } else {
                        return true;
                    }
                }
            };

            scope.radioClick = function (event, selectedItem) {
                if (scope.navconData !== undefined && scope.navconData.radioClick !== undefined) {
                    scope.navconData.radioClick(event, selectedItem);
                }
            };

            scope.dropdownSelect = function (item, model) {
                if (scope.item.selectOptions.item.addNew !== undefined && scope.item.selectOptions.item.addNew === "yes") {

                    //remove last user input
                    scope.item.selectOptions.items = scope.item.selectOptions.items.filter(function (itm) {
                        if (itm["undefined"] !== undefined && itm["undefined"] === "" && item[(scope.item.selectOptions.item.dataField || "id")] !== itm[(scope.item.selectOptions.item.dataField || "id")])
                            return false;
                        else
                            return true;
                    });

                    var found = navcon.getItemByKeyValue(scope.item.selectOptions.items, (scope.item.selectOptions.item.dataField || "id"), item[scope.item.selectOptions.item.dataField || id]);
                    if (found !== -1) return;
                    item[scope.item.selectOptions.item.dataField || id] = item[scope.item.selectOptions.item.displayField];

                    if (scope.navconData !== undefined && scope.navconData.addValueToSelect !== undefined) {
                        scope.navconData.addValueToSelect(item, scope.fieldKey, function (retItem) {
                            scope.$apply(function () {
                                scope.item.selectOptions.items = [retItem].concat(scope.item.selectOptions.items);
                            });
                        })
                    }
                }

            };

            scope.selectRefreshResults = function ($select, itemList) {
                if ($select.search === undefined || $select.search === "" || $select.search === null) return;
                if ($select.items.length !== 0) return;
                if (scope.item.selectOptions.item.addNew === undefined || scope.item.selectOptions.item.addNew !== "yes") return;
                var search = $select.search,
                  list = angular.copy($select.items),
                  FLAG = -1;

                //remove last user input
                list = list.filter(function (item) {
                    return item[(scope.item.selectOptions.item.dataField || "id")] !== FLAG;
                });

                if (!search) {
                    //use the predefined list
                    $select.items = list;
                }
                else {
                    //manually add user input and set selection
                    var userInputItem = {};
                    userInputItem[(scope.item.selectOptions.item.dataField || "id")] = FLAG;
                    userInputItem[(scope.item.selectOptions.item.displayField || "id")] = search;

                    if ($select.isGrouped) {
                        userInputItem[scope.item.selectOptions.item.groupBy] = "";
                    }

                    $select.items = [userInputItem].concat(list);
                    //$select.selected = userInputItem;

                    scope.$apply(function () {
                        scope.item.selectOptions.items = [userInputItem].concat(scope.item.selectOptions.items);
                    });

                }
            };

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


            scope.$watch("items[" + scope.fieldIndex + "].data", function (newValue, oldValue) {
                //  if (newValue !== undefined && newValue !== oldValue) {
                if (newValue !== undefined) {
                    scope.item.showMessage = false;
                    if (scope.readOnly) {
                        scope.item.readOnlyText = scope.displayReadOnlyField(scope.item);
                    }
                }
            }, this);

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

            scope.colorpickerOptions = getColorpickerOptions();

            scope.displayReadOnlyField = function (item) {
                var returnValue = item.data != null ? item.data : "";
                if (item.type === "select" || item.type === "kendomultiselect") {
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

            function colorpickerEventChange() {
                if ($('.sp-palette-toggle').html() !== undefined && $('.sp-palette-toggle').html().toLowerCase() !== "") {

                    if (!$('.sp-picker-container').is(":visible"))
                        $('.sp-palette-toggle').html("More")

                    if ($('.sp-picker-container').is(":visible"))
                        $('.sp-palette-toggle').html("Less")
                }

                if ($('.sp-choose').html() !== undefined && $('.sp-choose').html().toLowerCase() !== "")
                    $('.sp-choose').html("Choose")
            }

            function fieldSettings(scope, el, attrs, $compile) {

                if (scope.item.type === "input") {
                    inputSetting(scope, el, attrs);
                } else if (scope.item.type === "date") {
                    dateSetting(scope, el, attrs);
                } else if (scope.item.type === "colorpicker") {
                    //colorpickerSetting(scope, el, attrs);
                } else if (scope.item.type === "datetime") {
                    dateTimeSetting(scope, el, attrs);
                } else if (scope.item.type === "tableeditor") {
                    tableeditorSetting(scope, el, attrs);
                } else if (scope.item.type === "select") {
                    selectSetting(scope, el, attrs);
                } else if (scope.item.type === "multiselect" || scope.item.type === "multiselectcheckbox") {
                    multiSelectSetting(scope, el, attrs);
                } else if (scope.item.type === "tab") {
                    tabSetting(scope, el, attrs);
                }
                else if (scope.item.type === "switch") {
                    switchSetting(scope, el, attrs);
                } else if (scope.item.type === "autocomplete") {
                    autoCompleteSetting(scope, el, attrs);
                } else if (scope.item.type === "rating") {
                    ratingSetting(scope, el, attrs);
                } else if (scope.item.type === "labeldata") {
                    if (scope.item.templateOptions.href === undefined) {
                        scope.item.templateOptions.href = false;
                    }
                    if (scope.item.templateOptions.href) {
                        var obj = $(el).find('.field-group label');
                        obj.css("color", "blue");
                        obj.css("cursor", "pointer");
                    }
                } else if (scope.item.type === "fileupload" || scope.item.type === "photoupload") {
                    var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.templateOptions.key);
                    scope.$watch("items[" + keyIndex + "].data", function (newValue, oldValue) {
                        if (newValue !== undefined && newValue !== oldValue) {
                            scope.keyData = newValue;
                        }
                    });

                    var keyShowOnlyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                    scope.$watch("items[" + keyShowOnlyIndex + "].templateOptions.showOnly", function (newValue, oldValue) {
                        if (newValue !== undefined && newValue !== oldValue) {
                            //console.log(newValue);
                        }
                    });

                    var keyNameIndex = navcon.getItemIndexByProperty(scope.items, scope.item.templateOptions.keyName);
                    scope.$watch("items[" + keyNameIndex + "].data", function (newValue, oldValue) {
                        if (newValue !== undefined && newValue !== oldValue) {
                            scope.keyName = newValue;
                        }
                    });

                    if (scope.item.templateOptions.fileType === undefined || scope.item.templateOptions.fileType === "")
                        scope.item.templateOptions.fileType = [];

                    if (scope.item.templateOptions.fileSize === undefined || scope.item.templateOptions.fileSize === "")
                        scope.item.templateOptions.fileSize = "0";

                    if (scope.item.templateOptions.sameFile === undefined || scope.item.templateOptions.sameFile === "")
                        scope.item.templateOptions.sameFile = true;

                    if (scope.item.templateOptions.showOnly === undefined || scope.item.templateOptions.showOnly === "")
                        scope.item.templateOptions.showOnly = false;

                    if (scope.item.templateOptions.label === undefined || scope.item.templateOptions.label === "")
                        scope.item.templateOptions.label = "Attachments";



                }

                if (scope.item.type === "input" || scope.item.type === "textarea") {
                    if (scope.item.templateOptions !== undefined) {
                        if (scope.item.templateOptions.spellcheck === undefined) {
                            scope.item.templateOptions.spellcheck = true;
                        }
                    }
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

            function inputSetting(scope, el, attr) {
                if (scope.item.templateOptions.hideLabel === undefined || scope.item.templateOptions.hideLabel === false)
                    scope.item.templateOptions.hideLabel = false;
                else
                    scope.item.templateOptions.hideLabel = true;

                if (scope.item.templateOptions.customClass !== undefined)
                    scope.item.templateOptions.customClass = "";

            };

            function getColorpickerOptions() {
                //$("#picker").on('move.spectrum', function(e, tinycolor) { });
                return {
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    togglePaletteMoreText: 'more',
                    togglePaletteLessText: 'less',
                    showInput: true,
                    palette: [
                        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                        ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                        ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                        ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                        ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                        ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                        ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                    ]
                }
            }

            function dateSetting123(scope, el, attr) {
                var options = {};
                options.rtl = Metronic.isRTL();
                options.orientation = "left";
                options.autoclose = true;
                options.todayHighlight = true;

                if (scope.item.templateOptions.mode !== undefined && scope.item.templateOptions.mode.toLowerCase() === "year") {
                    options.format = "yyyy";
                    options.viewMode = "years";
                    options.minViewMode = "years";
                }

                $(el).find('.date-picker').datepicker(options);


            };
            function dateSetting(scope, el, attr) {
                var options = {};
                options.rtl = Metronic.isRTL();
                options.orientation = "left";
                options.autoclose = true;
                options.todayHighlight = true;


                if (scope.item.templateOptions.mode !== undefined && scope.item.templateOptions.mode.toLowerCase() === "year") {
                    options.format = "yyyy";
                    options.viewMode = "years";
                    options.minViewMode = "years";
                }

                if (scope.item.templateOptions.futureDate !== undefined && scope.item.templateOptions.futureDate !== "")
                    options.endDate = scope.item.templateOptions.futureDate; //'+0d'

                $(el).find('.date-picker').datepicker(options);

                $(el).find('.date-picker').datepicker().on('changeDate', function (e) {
                    // `e` here contains the extra attributes
                    if (scope.items[scope.fieldIndex].templateOptions.dateformat === undefined ||
                        scope.items[scope.fieldIndex].templateOptions.dateformat === null ||
                        scope.items[scope.fieldIndex].templateOptions.dateformat === "")
                        scope.items[scope.fieldIndex].data = moment(e.date).format("DD/MM/YYYY");
                    else
                        scope.items[scope.fieldIndex].data = moment(e.date).format(scope.items[scope.fieldIndex].templateOptions.dateformat.toUpperCase());
                });

                scope.$watch("item.displayData", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        $(el).find('.date-picker').datepicker('update', newValue)
                    }
                });


            };


            function dateTimeSetting(scope, el, attr) {
                var options = { "sideBySide": true };
                if (scope.item.templateOptions !== undefined) {
                    if (scope.item.templateOptions.timeonly !== undefined && scope.item.templateOptions.timeonly) {
                        options["format"] = 'LT';
                        if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                            options["format"] = "HH:mm";
                    } else {
                        options["format"] = 'LT';
                        if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                            options["format"] = "DD/MM/YYYY HH:mm";
                        else
                            options["format"] = "DD/MM/YYYY hh:mm A";
                    }
                    if (scope.item.templateOptions.futureDate !== undefined && !scope.item.templateOptions.futureDate)
                        options.maxDate = new Date();

                }

                $(el).find('.input-group').datetimepicker(options);

                $(el).find('.input-group').on("dp.change", function (e) {
                    if (scope.item.templateOptions.timeonly !== undefined && scope.item.templateOptions.timeonly) {
                        options["format"] = 'LT';
                        if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                            scope.items[scope.fieldIndex].data = e.date.locale('en').format("HH:mm");
                        else
                            scope.items[scope.fieldIndex].data = e.date.locale('en').format("hh:mm A");
                    } else {
                        if (scope.item.templateOptions.hours24 !== undefined && scope.item.templateOptions.hours24)
                            scope.items[scope.fieldIndex].data = e.date.locale('en').format("DD/MM/YYYY HH:mm");
                        else
                            scope.items[scope.fieldIndex].data = e.date.locale('en').format("DD/MM/YYYY hh:mm A");
                    }
                });
            };


            function autoCompleteSetting(scope, el, attr) {
                var source = new Bloodhound({
                    datumTokenizer: function (d) {
                        return Bloodhound.tokenizers.whitespace(d[scope.item.selectOptions.item.displayField]);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: scope.item.selectOptions.items
                });

                source.initialize();

                var defaults = function (q, sync) {
                    if (q === '') {
                        sync(source.index.all());
                    } else {
                        source.search(q, sync);
                    }
                }

                $(el).find('.typeahead').typeahead({
                    minLength: 0
                }, {
                    source: defaults,
                    display: scope.item.selectOptions.item.displayField,
                });

                $($(el).find('.typeahead')).data(scope.item);

                $(el).find('.typeahead').on('typeahead:selected', function (e, datum, name, t) {
                    $(e.target).data().data = datum;
                    scope.item.data = datum.text !== undefined ? datum.text : datum[scope.item.selectOptions.item.displayField];
                });

                scope.$watch("item.selectOptions.items", function (newValue, oldValue) {
                    if (newValue !== undefined && newValue.length !== 0) {
                        source = new Bloodhound({
                            datumTokenizer: function (d) {
                                return Bloodhound.tokenizers.whitespace(d[scope.item.selectOptions.item.displayField]);
                            },
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            local: newValue
                        });

                        source.initialize();
                    }
                });
            };

            function selectSetting(scope, el, attr) {

                if (scope.item.selectOptions.isCustomFormat === undefined) {
                    scope.item.selectOptions.isCustomFormat = false;
                    //scope.item.selectOptions.customFormat = "reasonClosureCustomFormat";
                }

                scope.getFormat = function (selectedItem) {
                    var retVal = "";
                    if (selectedItem !== undefined && selectedItem !== "") {
                        if (scope.item.selectOptions.customFormat !== undefined && scope.item.selectOptions.customFormat !== "" && scope.item.selectOptions.isCustomFormat) {
                            if (scope.navconData[scope.item.selectOptions.customFormat] !== undefined)
                                retVal = scope.navconData[scope.item.selectOptions.customFormat](selectedItem);
                            else if (scope.navconData.$parent[scope.item.selectOptions.customFormat] !== undefined)
                                retVal = scope.navconData.$parent[scope.item.selectOptions.customFormat](selectedItem);
                            else
                                retVal = selectedItem[scope.item.selectOptions.item.displayField];
                        }
                        else {

                            if (selectedItem[scope.item.selectOptions.item.displayField] !== undefined)
                                retVal = selectedItem[scope.item.selectOptions.item.displayField];
                        }
                    }
                    return retVal;
                };

                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                scope.$watch("items[" + keyIndex + "].disabled", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        if (scope.item.disabled) {
                            $('.ui-select-container .selectize-input').css("background", "aliceblue");
                            $('.ui-select-container .selectize-input').css("color", "royalblue");
                        }
                    }
                });

            };

            function multiSelectSetting(scope, el, attr) {


                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                if (scope.items[keyIndex].type === "multiselectcheckbox")
                    if (scope.items[keyIndex].data === undefined || scope.items[keyIndex].data === "") scope.items[keyIndex].data = [];

                scope.$watch("items[" + keyIndex + "].disabled", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        if (scope.item.disabled) {
                            $('.select2-choices').css("background", "aliceblue");
                            $('.ui-select-match-item').css("background", "aliceblue");
                            $('.select2-choices').css("color", "royalblue");
                            $('.ui-select-match-item').css("color", "royalblue");
                        }
                    }
                });

                scope.multiSelectGroupColor = function (item, selectedItem, parentItem) {
                    var retVal = "#000";
                    if (scope.item.group == undefined || scope.item.group.key == undefined) {
                        return;
                    }

                    var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.group.key);
                    var parentData = scope.items[keyIndex].data;

                    if (scope.item.group.field !== undefined && scope.item.group.field !== null) {
                        var value = $.grep(selectedItem[scope.item.group.object], function (e) {
                            return e[scope.item.group.field] === parentData[scope.item.group.field] && parentData !== undefined;
                        });

                        if (value !== undefined && value !== null && value.length !== 0 && value !== -1)
                            retVal = (scope.item.group.color || "#FF4500");
                    }

                    return retVal;
                };

                scope.multiSelectGroupBold = function (item, selectedItem, parentItem) {
                    var retVal = "normal";
                    if (scope.item.group == undefined || scope.item.group.key == undefined) {
                        return;
                    }

                    var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.group.key);
                    var parentData = scope.items[keyIndex].data;

                    if (scope.item.group.field !== undefined && scope.item.group.field !== null) {
                        var value = $.grep(selectedItem[scope.item.group.object], function (e) {
                            return e[scope.item.group.field] === parentData[scope.item.group.field] && parentData !== undefined;
                        });

                        if (value !== undefined && value !== null && value.length !== 0 && value !== -1)
                            retVal = "600";
                    }

                    return retVal;
                };
            };

            function switchSetting(scope, el, attr) {
                var keyIndex = navcon.getItemIndexByProperty(scope.items, scope.item.key);
                scope.$watch("items[" + keyIndex + "].disabled", function (newValue, oldValue) {
                    if (newValue !== undefined) {
                        if (scope.item.disabled) {
                            $(el).find(".bootstrap-switch-container").css("pointer-events", "none");
                            $(el).find(".bootstrap-switch-wrapper").css("cursor", "not-allowed");
                        }
                        else {
                            $(el).find(".bootstrap-switch-container").css("pointer-events", "");
                            $(el).find(".bootstrap-switch-wrapper").css("pointer-events", "default");
                        }
                    }
                });
            };

            function tableeditorSetting(scope, el, attr) {
                if (scope.item.templateOptions.settings !== undefined && scope.item.templateOptions.settings !== "") {
                    scope.item.tableeditorSettings = scope.navconData[scope.item.templateOptions.settings];
                }

                if (scope.item.templateOptions.showAdd === undefined) {
                    scope.item.templateOptions.showAdd = true;
                }

                if (scope.item.templateOptions.showDel === undefined) {
                    scope.item.templateOptions.showDel = true;
                }

                if (scope.item.templateOptions.showUpdate === undefined) {
                    scope.item.templateOptions.showUpdate = false;
                }

                if (scope.item.templateOptions.showoverAllsave === undefined) {
                    scope.item.templateOptions.showoverAllsave = false;
                }
                if (scope.item.templateOptions.showItar === undefined) {
                    scope.item.templateOptions.showItar = false;
                }
                if (scope.item.templateOptions.SaveButtonText === undefined)
                    scope.item.templateOptions.SaveButtonText = "";
            }

            function parentItems(item) {
                for (var key in item) {
                    if (item["$parent"].items != undefined)
                        return item["$parent"].items;
                    else
                        return parentItems(item["$parent"]);
                }
            };

            function ratingSetting(scope, el, attr) {
                /*scope.item.data = 3;
                if(scope.item.ratingOptions !== undefined && scope.item.ratingOptions.max !== undefined)
                    scope.max = scope.item.ratingOptions.max;
                else
                    scope.max = 5;
              
                if(scope.item.ratingOptions !== undefined && scope.item.ratingOptions.isReadonly !== undefined)
                    scope.isReadonly = scope.item.ratingOptions.isReadonly;
                else
                    scope.isReadonly = false;
              
                if(scope.item.ratingOptions !== undefined && scope.item.ratingOptions.titles !== undefined)
                    scope.titles = scope.item.ratingOptions.titles;
                else
                    scope.titles = ['one','two','three', 'four', 'five'];*/

                scope.hoveringOver = function (value) {
                    scope.overStar = value;
                    scope.percent = 100 * (value / scope.max);
                };

                scope.ratingStates = [
                      { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
                      { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
                      { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
                      { stateOn: 'glyphicon-heart' },
                      { stateOff: 'glyphicon-off' }
                ];
            }
        }
    };
}]).directive('navconButton', ['$timeout', 'dataservice',
function ($timeout, dataservice) {
    return {
        /*E: Directive defined as an element. <navcon-input></navcon-input>
        A: Directive applied as an attribute on existing element. <div navcon-input></div>
        C: Directive applied as a css class to existing element <div class="navcon-input"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            customClass: '@',
            navconData: '=',
            text: '@',
            icon: '@',
            target: '@',
            fieldDisabled: '=',
            tooltipText: '@'
        },
        template: '<a class="{{customClass}}"  data-target="#{{target}}" data-toggle="modal"><div data-toggle="tooltip" data-original-title="{{tooltipText}}">{{text}}&nbsp;<span class="{{icon}}"></span></div></a>',
        link: function (scope, el, attrs) {
            //console.log(scope);
            if (scope.tooltipText == undefined || scope.tooltipText === null) scope.tooltipText = "";

            scope.$watch("fieldDisabled", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    if (newValue === null)
                        $(el).find("a").attr("disabled", "disbaled");
                    else
                        $(el).find("a").removeAttr("disabled");
                }
            });

            $('a > div[data-toggle="tooltip"]').tooltip();
        }
    };
}]).directive('navconButtonCollapse', ['$timeout', 'dataservice',
function ($timeout, dataservice) {
    return {
        /*E: Directive defined as an element. <navcon-input></navcon-input>
        A: Directive applied as an attribute on existing element. <div navcon-input></div>
        C: Directive applied as a css class to existing element <div class="navcon-input"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            customClass: '@',
            navconData: '=',
            text: '@',
            icon: '@',
            target: '@',
            fieldDisabled: '='
        },
        template: '<button class="{{customClass}}" data-toggle="collapse" data-target="#{{target}}">{{text}}&nbsp;<i class="{{icon}}" aria-hidden="true"></i></button>',
        link: function (scope, el, attrs) {
            //console.log(scope);

            scope.$watch("fieldDisabled", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    if (newValue === null)
                        $(el).find("a").attr("disabled", "disbaled");
                    else
                        $(el).find("a").removeAttr("disabled");
                }
            });
        }
    };
}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}).directive('requireMultiple', function () {
    return {
        require: 'ngModel',
        link: function postLink(scope, element, attrs, ngModel) {
            ngModel.$validators.required = function (value) {
                return angular.isArray(value) && value.length > 0;
            };
        }
    };
}
).directive('windowExit', ['authService', '$window', '$location', '$rootScope', function (authService, $window, $location, $rootScope) {
    return {
        restrict: 'AE',
        link: function (element, attrs) {
            var myEvent = $window.attachEvent || $window.addEventListener,
            chkevent = $window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compatable

            myEvent('unload', function (e) {
                
            });

            myEvent(chkevent, function (e) { // For >=IE7, Chrome, Firefox
                
                if ($location.$$url === "/login" || ($rootScope.isFeedback !== undefined && $rootScope.isFeedback)) {
                    $rootScope.isFeedback = false;
                    return false;
                }
                if (window.appReload !== undefined && window.appReload) {
                    window.appReload = false;
                    return false;
                }
                var confirmationMessage = '';  // a space
                (e || $window.event).returnValue = "Are you sure that you'd like to close the browser?";
                return confirmationMessage;
            });




        }
    };
}]).directive('focusMe', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                var itemFocus = scope.items[scope.fieldIndex].templateOptions.focus;
                if (itemFocus !== undefined && value === true) {
                    // element[0].focus();
                }
            }, true);

            scope.$on('SET-FOCUS', function (event, value) {
                var itemFocus = scope.items[scope.fieldIndex].templateOptions.focus;
                if (itemFocus !== undefined && value === true) {
                    scope.item.setFocus = true;
                    scope.item.setFocusBlur = true;

                    if (scope.item.type !== undefined && scope.item.type.toLowerCase() === 'select')
                        $(element[0]).find('input')[0].focus();
                    else
                        element[0].focus();

                    setTimeout(function () {
                        scope.item.setFocusBlur = false;
                    }, 100)
                }
            });

            element.bind('blur', function () {
                if (scope.item.templateOptions.focus !== undefined)
                    scope.$apply(model.assign(scope, false));
            })
        }
    };
}).directive('ngEsc', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            element.bind("keydown keypress keyup", function (event) {
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEsc);
                    });
                    event.preventDefault();
                }
            })
        }
    };
});