(function (navcon) {
    navcon.kendo.schedule = {
        resourceSetting: function (settings, scope, objParam) {
            var items = [];

            if (objParam !== undefined && objParam.resources !== undefined && objParam.resources !== null && objParam.resources.length !== 0)
                items = objParam.resources
            else
                items = settings.resources;

            return items;
        },
        eventSetting: function (settings, scope) {
            var items = [];
            items = settings.events;

            var resources = settings.resources;

            var modelFields = settings.model.fields;
            if (modelFields.color === undefined || modelFields.color === null) modelFields.color = { from: "Color", fieldKey: "" };

            /*if (modelFields.description === undefined || modelFields.description === null) modelFields.description = { from: "Description",fieldKey: "" };
            if (modelFields.startTimezone === undefined || modelFields.startTimezone === null) modelFields.startTimezone = { from: "StartTimezone",fieldKey: "" };
            if (modelFields.endTimezone === undefined || modelFields.endTimezone === null) modelFields.endTimezone = { from: "EndTimezone",fieldKey: "" };
            if (modelFields.recurrenceRule === undefined || modelFields.recurrenceRule === null) modelFields.recurrenceRule = { from: "RecurrenceRule",fieldKey: "" };
            if (modelFields.recurrenceID === undefined || modelFields.recurrenceID === null) modelFields.recurrenceID = { from: "RecurrenceID",fieldKey: "" };
            if (modelFields.recurrenceException === undefined || modelFields.recurrenceException === null) modelFields.recurrenceException = { from: "RecurrenceException",fieldKey: "" };
            if (modelFields.isAllDay === undefined || modelFields.isAllDay === null) modelFields.isAllDay = { IsAllDay: false,fieldKey: "" };*/

            $.map(items, function (item, index) {
                $.each(modelFields, function (key, value) {
                    if (modelFields[key].type !== undefined && modelFields[key].type.toLowerCase() === "date") {
                        item[modelFields[key].from] = new Date(item[modelFields[key].from]);
                    }
                });

                if (item.Color === undefined || item.Color === null) {
                    var colorValue = [{ color: "" }];
                    var iLoop = 0;
                    //for (var iLoop = 0, length = resources.length; iLoop < length; iLoop++) {
                    $.each(item, function (key, value) {
                        if (resources[iLoop].field === key) {
                            colorValue = resources[iLoop].dataSource.filter(function (e) { return e.value === item[key] });
                            return;
                        }
                    });
                    //}
                    item["Color"] = colorValue[0].color;
                }
                /*if (item.Description === undefined || item.Description === null) item.Description = "";
                if (item.StartTimezone === undefined || item.StartTimezone === null) item.StartTimezone = null";
                if (item.EndTimezone === undefined || item.EndTimezone === null) item.EndTimezone = null;
                if (item.RecurrenceRule === undefined || item.RecurrenceRule === null) item.RecurrenceRule = null;
                if (item.RecurrenceID === undefined || item.RecurrenceID === null) item.RecurrenceID = null;
                if (item.RecurrenceException === undefined || item.RecurrenceException === null) item.RecurrenceException = null;
                if (item.IsAllDay === undefined || item.IsAllDay === null) item.IsAllDay = false;*/
            });

            var dataSource = {
                //var dataSource = new kendo.data.DataSource({
                //type: "odata",
                //batch: true,
                /*transport: {
                    read: function (e) { e.success([]); }
                    read: function (e) {
                        e.success(data);
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },*/
                data: items,
                schema: {
                    model: {
                        id: (settings.model.id !== undefined && settings.model.id !== "" ? settings.model.id : "id"),
                        fields: navcon.kendo.schedule.validationSchema(settings, scope),
                    }
                }
            };
            return dataSource;
        },
        schedulerViews: function (settings, objParam) {
            var viewList = [];
            var defaultView = false;

            var myGroup = null;
            if (objParam !== undefined && objParam.group !== undefined && objParam.group !== null) {
                myGroup = objParam.group;
            } else if (settings.group !== undefined && settings.group.enabled !== undefined && settings.group.enabled) {
                myGroup = {
                    date: settings.group.date !== undefined && settings.group.orientation === undefined ? settings.group.date : false,
                    resources: settings.group.resources !== undefined ? settings.group.resources : [],
                    orientation: settings.group.orientation !== undefined ? settings.group.orientation : "vertical"//"horizontal"
                };
            }

            if (settings.views !== undefined) {
                $.map(settings.views, function (item, index) {
                    if (item.toLowerCase() === "day") {
                        defaultView = (settings.defaultView.toLowerCase() === "day" ? true : false);
                        viewList.push({
                            type: "day",
                            showWorkHours: true,
                            title: "Today",
                            date: new Date(navcon.getCurrentDate("YYYY/MM/DD")),
                            startTime: new Date(navcon.getCurrentDate("YYYY/MM/DD") + " 00:00"),
                            endTime: new Date(navcon.getCurrentDate("YYYY/MM/DD") + " 23:00"),
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "week") {
                        defaultView = (settings.defaultView.toLowerCase() === "week" ? true : false);
                        viewList.push({
                            type: "week",
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "workWeek") {
                        defaultView = (settings.defaultView.toLowerCase() === "workweek" ? true : false);
                        viewList.push({
                            type: "workWeek", workWeekStart: 0, workWeekEnd: 4,
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "month") {
                        defaultView = (settings.defaultView.toLowerCase() === "month" ? true : false);
                        viewList.push({
                            type: "month",
                            majorTick: 1440,
                            minorTickCount: 1,
                            eventTemplate: $("#event-template").html(),
                            //group: myGroup,
                            //groupHeaderTemplate: $("#groupHeaderTemplate").html(),
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "year") {
                        defaultView = (settings.defaultView.toLowerCase() === "year" ? true : false);
                        viewList.push({
                            title: "Year",
                            type: "kendo.ui.SchedulerTimelineYearView",
                            majorTick: 1440,
                            minorTickCount: 1,
                            columnWidth: 100,
                            group: myGroup,
                            groupHeaderTemplate: $("#groupHeaderTemplate").html(),
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                            //dayTemplate: kendo.template("<strong>#= kendo.toString(date, 'MMM') #</strong>"),
                            //majorTimeHeaderTemplate: kendo.template("<strong>#= kendo.toString(date, 'dd') #</strong>"),
                            //minorTimeHeaderTemplate: kendo.template("<strong>#= kendo.toString(date, 'dd') #</strong>"),
                        });
                    } else if (item.toLowerCase() === "agenda") {
                        defaultView = (settings.defaultView.toLowerCase() === "agenda" ? true : false);
                        viewList.push({
                            type: "agenda",
                            eventHeight: 200,
                            selected: defaultView,
                            eventTemplate: $("#event-agenda-template").html(),
                        });
                    } else if (item.toLowerCase() === "todo") {
                        defaultView = (settings.defaultView.toLowerCase() === "todo" ? true : false);
                        viewList.push({
                            type: "kendo.ui.ToDoView", title: "To Do",
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "timeline") {
                        defaultView = (settings.defaultView.toLowerCase() === "timeline" ? true : false);
                        viewList.push({
                            type: "timeline",
                            eventHeight: 50,
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "timelineworkweek") {
                        defaultView = (settings.defaultView.toLowerCase() === "timelineworkweek" ? true : false);
                        viewList.push({
                            type: "timelineWorkWeek",
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "timelinemonth") {
                        defaultView = (settings.defaultView.toLowerCase() === "timelinemonth" ? true : false);
                        viewList.push({
                            type: "timelineMonth",
                            //startTime: new Date(navcon.getCurrentDate("YYYY/MM/DD") + " 00:00 AM"),
                            //majorTick: 1440,
                            group: myGroup,
                            groupHeaderTemplate: $("#groupHeaderTemplate").html(),
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    } else if (item.toLowerCase() === "customagenda") {
                        defaultView = (settings.defaultView.toLowerCase() === "customagenda" ? true : false);
                        viewList.push({
                            type: "kendo.ui.CustomAgendaView",
                            title: "Custom Agenda",
                            selected: defaultView,
                            eventTemplate: $("#event-template").html(),
                        });
                    }
                });
            } else {
                viewList = ["day", "month", "agenda"];
            }
            return viewList;
        },
        setting: function (el, options, scope, objParam) {
            var settings = {};
            if (options != undefined) settings = options;
            //if (options != undefined && options.options !== undefined) settings = options.options;

            var kScheduler = null;
            var scheduler = $($(el).find('.kendoSchedule')[0]);
            if (scheduler !== undefined && scheduler !== null) {

                kendo.destroy(scheduler);
                scheduler.empty();

                var myGroup = null;
                if (objParam !== undefined && objParam.group !== undefined && objParam.group !== null) {
                    myGroup = objParam.group;
                } else if (settings.group !== undefined && settings.group.enabled !== undefined && settings.group.enabled) {
                    myGroup = {
                        date: settings.group.date !== undefined && settings.group.orientation === undefined ? settings.group.date : false,
                        resources: settings.group.resources !== undefined ? settings.group.resources : [],
                        orientation: settings.group.orientation !== undefined ? settings.group.orientation : "vertical"//"horizontal"
                    };
                }

                var schedulerDatasource = navcon.kendo.schedule.eventSetting(options, scope);
                var schedulerResource = navcon.kendo.schedule.resourceSetting(options, scope, objParam);

                var kScheduler = scheduler.kendoScheduler({
                    timezone: (settings.timezone !== undefined ? settings.timezone : "Etc/UTC"),
                    date: new Date(navcon.getCurrentDate("YYYY/MM/DD")),
                    //startTime: new Date(navcon.getCurrentDate("YYYY/MM/DD") + " 00:00 AM"),
                    dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'dd-MMM-yyyy')#</strong>"),
                    selectable: settings.selectable !== undefined ? settings.selectable : false,
                    //mobile: true,
                    //currentTimeMarker: settings.todayVisible !== undefined ? settings.todayVisible : { updateInterval: 100, useLocalTimezone: false },
                    //eventHeight: settings.contentHeight !== undefined ? settings.contentHeight : 50,

                    allDaySlot: (settings.allDaySlot !== undefined ? settings.allDaySlot : false),
                    allDaySlotTemplate: "<div style='background:\\#A2A2AA; height: 100%;width: 100%;'></div>",
                    //allDayEventTemplate: $("#event-template").html(),

                    //eventTemplate: $("#event-template").html(),
                    ////slotTemplate: kendo.template("<strong>#=kendo.toString(date, 'dd-MMM-yyyy')#</strong>"),

                    //groupHeaderTemplate: kendo.template("<span>#=kendo.toString(start, 'HH:mm')#</span> - <span>#=kendo.toString(end, 'HH:mm')#</span>"),
                    ////groupHeaderTemplate: $("#groupHeaderTemplate").html(),
                    ////majorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'h')#</strong><sup>00</sup>"),
                    ////minorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 't')#</strong>"),

                    views: navcon.kendo.schedule.schedulerViews(options, objParam),

                    //autoBind: settings.autoBind !== undefined ? settings.autoBind : false,
                    dataSource: schedulerDatasource,

                    //Group settings
                    //group: myGroup,

                    resources: schedulerResource,//navcon.kendo.schedule.resourceSetting(options, scope, objParam),

                    //Edit settings
                    //editable: settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled ? settings.editable.enabled : false,
                    editable: ((settings.editable !== undefined && settings.editable.enabled !== undefined && settings.editable.enabled) ?
                        {
                            confirmation: settings.editable.confirmText !== undefined ? settings.editable.confirmText : "Are you sure you want to delete this meeting?",
                            create: settings.editable.create !== undefined ? settings.editable.create : false,
                            update: settings.editable.update !== undefined ? settings.editable.update : false,
                            destroy: settings.editable.destroy !== undefined ? settings.editable.destroy : false,
                            //editRecurringMode: settings.editable.editRecurringMode !== undefined ? settings.editable.editRecurringMode : "series",
                            //Recurring events edit mode. The available modes are: "dialog" (default), "series" and "occurrence".
                            move: settings.editable.move !== undefined ? settings.editable.move : false,
                            resize: settings.editable.resize !== undefined ? settings.editable.resize : false,
                            //template: $("#editor").html(),
                            //window: {
                            //    title: "My Custom Title",
                            //    animation: false,
                            //    open: function(e){}
                            //},
                        } : null),
                    //footer: settings.footer !== undefined && settings.footer.enabled !== undefined && settings.footer.enabled ? settings.footer.enabled : false,
                    dataBound: navcon.kendo.schedule.dataBound,
                    dataBinding: navcon.kendo.schedule.dataBinding,
                    change: settings.selectable !== undefined && settings.selectable ? navcon.kendo.schedule.change : null,
                    add: function (e) {
                        //e.event.location = 1;
                        //e.event.appointmentType = 1;

                        //if (!navcon.kendo.schedule.checkAvailability(e.event.start, e.event.end, e.event)) {
                        //    e.preventDefault();
                        //}

                        console.log("Add", e.event.title);
                    },
                    edit: function (e) {
                        //e.preventDefault(); //prevent popup editing
                        //var dataSource = this.dataSource;
                        //var event = e.event;

                        //if (event.isNew()) {
                        //    setTimeout(function () {
                        //        dataSource.add(event);
                        //        navcon.kendo.schedule.editEvent(event);
                        //    });
                        //} else {
                        //    navcon.kendo.schedule.editEvent(event);
                        //}

                        console.log("Edit", e.event.title);
                    },
                    save: function (e) {
                        var container = e.container;
                        var event = e.event;

                        var scheduler = $(e.sender.element).data("kendoScheduler");
                        var dataSource = scheduler.dataSource;

                        //if (!navcon.kendo.schedule.checkAvailability(e.event.start, e.event.end, e.event)) {
                        //    e.preventDefault();
                        //}

                        if (event.id !== "") {
                        } else {
                            //$(".k-scheduler").data("kendoScheduler").dataSource.sync();
                            event.id = 122;
                            event.meetingId = 122;
                            dataSource.options.data.push(event);

                            //$(".k-scheduler").data("kendoScheduler").addEvent({
                            //    start: new Date(event.start),
                            //    end: new Date(event.end)
                            //});

                            dataSource.add({ event });
                            /*dataSource.add({
                                meetingId: 122,
                                roomID: 3,
                                attendees: event.attendees,
                                start: event.start,
                                end: event.end,
                                title: event.title,
                                description: event.title,
                                startTimezone: "",
                                endTimezone: "",
                                recurrenceRule: "",
                                recurrenceID: "",
                                recurrenceException: "",
                                isAllDay: event.isAllDay,
                                uid:event.uid
                            });*/
                        }
                        //e.preventDefault();
                        console.log("Saving", e.event.title);
                    },
                    remove: function (e) {
                        //e.preventDefault();
                        console.log("Removing", e.event.title);
                    },
                    cancel: function (e) {
                        //kSchedule.cancelChanges();
                        console.log("Cancel");
                    },
                    moveStart: navcon.kendo.schedule.moveStart,
                    move: navcon.kendo.schedule.move,
                    moveEnd: navcon.kendo.schedule.moveEnd,
                    resizeStart: navcon.kendo.schedule.resizeStart,
                    resize: navcon.kendo.schedule.resize,
                    resizeEnd: navcon.kendo.schedule.resizeEnd,
                    navigate: navcon.kendo.schedule.navigate,

                    //footer settings
                    footer: ((settings.footer !== undefined && settings.footer.enabled !== undefined && settings.footer.enabled) ?
                        {
                            command: settings.footer.command !== undefined ? settings.footer.command : false,//"workDay" 
                        } : false),
                    //PDF settings
                    toolbar: [{ name: "pdf", text: "Export PDF", iconClass: "k-icon k-i-copy" }],
                    pdf: //((settings.pdf !== undefined && settings.pdf.enabled !== undefined && settings.pdf.enabled) ?
                        {
                            //allPages: true,
                            //avoidLinks: true,
                            //paperSize: "A4",
                            //margin: { top: "2cm", right: "1cm", bottom: "1cm", left: "1cm" },
                            landscape: true,
                            //repeatHeaders: true,
                            fileName: $(el).attr("type") + ".pdf",
                            //template: $("#print-template").html(),
                            //scale: 0.8
                        },// : null),
                    pdfExport: function (e) {
                        title = $(el).attr("type");
                        //date = navcon.getCurrentDate();

                        //kSchedule.hideColumn(4);

                        //e.promise.done(function () {
                        //    kSchedule.showColumn(4);
                        //});
                    }
                }).data("kendoScheduler");
            }

            var toolbarOptions = [];

            if (kScheduler !== undefined && kScheduler !== null) {
                //$("#scheduler").data("kendoScheduler").addEvent({
                //    start: new Date("2013/6/13"),
                //    end: new Date("2013/6/13")
                //});

                //var tooltip = $(scheduler).kendoTooltip({
                //    filter: "td[role='gridcell']",
                //    //width: 300,
                //    content: function (e) {
                //        var scheduler = $($(el).find('.kendoSchedule')[0]);
                //        scheduler = $(scheduler).getKendoScheduler();

                //        var slot = scheduler.slotByElement(e.target);
                //        var events = scheduler.occurrencesInRange(slot.startDate, slot.endDate);
                //        var content = "";
                //        for (var i = 0; i < events.length; i++) {
                //            content = content + "<div>" + events[i].title + "</div>";
                //        }
                //        return content == "" ? "No events" : content;
                //    }
                //}).data("kendoTooltip");

                var tooltipSlotEvent = $(scheduler).kendoTooltip({
                    filter: ".k-event > div",
                    //position: "top",
                    //width: 250,
                    content: kendo.template($('#tooltip-slotevent-template').html())
                }).data("kendoTooltip");

                var tooltipSlot = $(scheduler).kendoTooltip({
                    filter: ".k-scheduler-content td[role=gridcell]",
                    //position: "top",
                    //width: 250,
                    content: kendo.template($('#tooltip-slot-template').html())
                }).data("kendoTooltip");

                //Multiselect control
                var layouts2 = new kendo.data.DataSource({
                    data: schedulerResource[0].dataSource,
                    /*schema: {
                        data: "d",
                        total: function (data) {
                            //return data.d.length;
                            return data.length;
                        }
                    },*/
                    pageSize: 10
                });

                $(".kendoLegend").kendoListView({
                    dataSource: layouts2,
                    selectable: "multiple",
                    //dataBound: onDataBound,
                    //change: onChange,
                    template: kendo.template($("#legend-template").html())
                });

                //$timeout(function () {
                //var schedulerMS = $($(el).find('.schedulerMS')[0]);
                //schedulerMS.kendoMultiSelect({
                //    delay: 1000, // wait 1 second before clearing the user input
                //    dataTextField: "text",
                //    dataValueField: "value",
                //    dataSource: {
                //        data: $(scheduler).getKendoScheduler().resources[0].dataSource.data().toJSON()
                //    },
                //    //value: [$(scheduler).getKendoScheduler().resources[0].dataSource.at(0).value],
                //    //change: navcon.kendo.schedule.multiselectChange(el, scheduler, this.value()),
                //});

                //var multiselect = $(schedulerMS).data("kendoMultiSelect");
                //multiselect.value($(scheduler).getKendoScheduler().resources[0].dataSource.at(0).value);
                ////multiselect.trigger("change");
                //multiselect.bind("change", navcon.kendo.schedule.multiselectChange(el, scheduler, multiselect));

                //var schedulerMSB = $($(el).find('.schedulerMSB')[0]);
                //$(schedulerMSB).click(function () {
                //    navcon.kendo.schedule.multiselectGroup(el, scheduler, kScheduler)
                //});
                //});

                //Legend and Export Position
                //if (settings.editable !== undefined && settings.editable.createAt !== undefined && settings.editable.createAt.toLowerCase() === "bottom") {
                //$(".k-scheduler-tools").insertAfter($(".kendoLegend"));
                //$(".kendoCustomFooter").append($(".k-scheduler-tools"));
                //}

                //$(".k-pdf").parent().parent().css("float", "right");

                $(".kendoCustomFooter").insertBefore($(".k-floatwrap .k-header .k-scheduler-toolbar"));
            }
        },
        validationSchema: function (settings, scope) {
            var myFields = {};
            if (settings.model !== undefined && settings.model !== null) {
                var strFields = "";
                //myFields = { "id": settings.model.id !== undefined && settings.model.id !== "" ? settings.model.id : "id" };

                var item = settings.model.fields;
                if (item.description === undefined || item.description === null) item.description = { "from": "Description", "fieldKey": "" };
                if (item.startTimezone === undefined || item.startTimezone === null) item.startTimezone = { "from": "StartTimezone", "fieldKey": "" };
                if (item.endTimezone === undefined || item.endTimezone === null) item.endTimezone = { "from": "EndTimezone", "fieldKey": "" };
                if (item.recurrenceRule === undefined || item.recurrenceRule === null) item.recurrenceRule = { "from": "RecurrenceRule", "fieldKey": "" };
                if (item.recurrenceId === undefined || item.recurrenceId === null) item.recurrenceId = { "from": "RecurrenceID", "fieldKey": "" };
                if (item.recurrenceException === undefined || item.recurrenceException === null) item.recurrenceException = { "from": "RecurrenceException", "fieldKey": "" };
                if (item.isAllDay === undefined || item.isAllDay === null) item.isAllDay = { "from": "IsAllDay", "fieldKey": "", "type": "boolean" };

                $.each(item, function (i, item) {
                    var key = i;
                    var type = item.type !== undefined && item.type !== "" ? item.type : "";
                    var fieldTitle = item.defaultValue !== undefined && item.defaultValue !== "" ? item.defaultValue : "";
                    var fieldName = item.from !== undefined && item.from !== "" ? item.from : "";
                    var nullable = item.nullable !== undefined && item.nullable !== "" ? item.nullable : true;
                    var defaultValue = item.defaultValue !== undefined && item.defaultValue !== "" ? item.defaultValue : "";

                    var fieldKey = item.fieldKey !== undefined && item.fieldKey !== "" ? item.fieldKey : "";
                    var field = null;
                    var fieldKeyIndex = navcon.getItemIndexByProperty(scope.fields, fieldKey);
                    if (fieldKeyIndex !== undefined && fieldKeyIndex !== -1) field = scope.fields[fieldKeyIndex];

                    if (fieldName !== undefined && fieldName !== null && fieldName !== "") {
                        if (type.toLowerCase() === "autoselect") type = "string";

                        myFields[key] = { "from": fieldName, "type": type, "defaultValue": defaultValue, "nullable": nullable, "validation": {} };
                        //myFields[key] = { "from": fieldName, "type": type, "validation": {} };

                        if (fieldKey !== undefined && fieldKey !== null && fieldKey !== "") {
                            myFields[key].validation["type"] = type;

                            if (field !== undefined && field !== null && field.templateOptions !== undefined && field.templateOptions.length !== 0) {
                                var validation = field.templateOptions;
                                //Required message
                                navcon.kendo.requiredValidation(myFields[key], fieldName, validation);
                                /*if (validation.required !== undefined && validation.required !== null && (validation.required || validation.required.toLowerCase() === "yes")) {
                                    if (validation.requiredMessage !== undefined && validation.requiredMessage !== null && validation.requiredMessage !== "")
                                        myFields[fieldName].validation["required"] = { "message": validation.requiredMessage };
                                    else
                                        myFields[fieldName].validation["required"] = (validation.required || validation.required.toLowerCase() === "yes" ? true : false);
                                }*/

                                //Minium message
                                navcon.kendo.minimumValidation(myFields[key], fieldName, validation);
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
                                navcon.kendo.maximumValidation(myFields[key], fieldName, validation);
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
                                navcon.kendo.patternValidation(myFields[key], fieldName, validation);
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
                                navcon.kendo.existDataValidation(myFields[key], fieldName, validation, scope);
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
            }

            return myFields;
        },
        change: function (e) {
            //var start = e.start;
            //var end = e.end;
            //var scope = $(e.sender.element).scope();

            //var scheduler = $(e.sender.element).data("kendoScheduler");
            ////scheduler.options.group.orientation = this.value();

            ////scheduler.view(scope.calendarSetting.defaultView);
            ////scheduler.view(scheduler.view().name);

            ////console.log(kendo.format("Selection between {0:g} and {1:g}", start, end));
        },
        multiselectChange: function (el, scope, scheduler, values) {
            var scheduler = $(scheduler).getKendoScheduler();
            var resources = scheduler.resources;

            var filters = null;
            if (values !== undefined && values !== null && values.length !== 0) {
                filters = $.map(values, function (val) {
                    return { field: "value", operator: "eq", value: val }
                });
            }

            if (filters !== null) {
                resources[0].dataSource.filter({
                    logic: "or",
                    filters: ((filters !== undefined && filters !== null && filters !== -1) ? filters : null)
                });
            } else {
                resources[0].dataSource._filter = undefined;
            }

            navcon.kendo.schedule.setting(el, scope.calendarSetting, scope, { resources: resources });
        },
        multiselectGroup: function (el, scope) {
            var group = scope.calendarSetting.group;

            var button = $($(el).find('.schedulerMSB')[0]);
            if (button.text() === "Group") {
                button.text("Ungroup");
                //group.resources= ["Rooms"]
            } else {
                button.text("Group");
                group.resources = null;
            }

            navcon.kendo.schedule.setting(el, scope.calendarSetting, scope, { group: group });
        },
        itemPageChange: function (el, scope, values) {
            scope.records_per_page = values.toString().toLowerCase() === "all" ? scope.objJson.length : values;

            scope.current_page--;
            scope.nextPage();
        },
        dataBinding: function (e) {
            //console.log("data binding");
        },
        dataBound: function (e) {
            var view = this.view();
            var events = this.dataSource.view();
            var eventElement;
            var event;

            //view.times.hide();
            //view.timesHeader.hide();

            var table1 = $(".k-scheduler-times .k-scheduler-table");
            table1 = table1.first();
            table1.find("tr:nth(0)").children().first().text("Resources").css({ "text-align": "left" });
            table1.find("tr:nth(1)").hide();

            var table2 = $(".k-scheduler-header .k-scheduler-header-wrap .k-scheduler-table");
            table2 = table2.last();
            table2.find("tr:nth(1)").hide();

            //var rows = table.find("tr").hide();
            //rows.each(function () {
            //    $(this).children("th:last").hide();
            //});

            /*for (var idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];
        
                //get event element
                eventElement = view.element.find("[data-uid=" + event.uid + "]");
        
                //set the backgroud of the element
                eventElement.css("background-color", "red");
            }*/

            //console.log("data bound");
        },
        messagesInfo: function (e) {
            return {
                allDay: "daily",
                ariaEventLabel: "Selected event is {0}. It starts on {1:d} {2:t}",
                ariaSlotLabel: "Selected from {0:g} to {0:g}",
                date: "Date",
                deleteWindowTitle: "Remove event",
                event: "Meeting",
                defaultRowText: "Conference room",
                showFullDay: "Show 24h",
                showWorkDay: "Show work hours",
                time: "Time of the day",
                today: "Current Date",
                previous: "Previous",
                next: "Next",
                save: "Update",
                cancel: "Undo",
                destroy: "Destroy",
                pdf: "PDF Export",
                editable: {
                    confirmation: "Are you sure you want to delete this meeting?",
                    allDayEvent: "Full day",
                    description: "Message",
                    editorTitle: "Edit event",
                    end: "End of the event",
                    endTimezone: "End date timezone",
                    repeat: "Repeat the event",
                    separateTimezones: "Set different start and end time zones",
                    start: "Start of the event",
                    startTimezone: "Start date timezone",
                    timezone: "Event timezone",
                    timezoneEditorButton: "Time zone",
                    timezoneEditorTitle: "Timezones",
                    title: "Title of the event",
                },
                recurrenceEditor: {
                    daily: {
                        interval: " days(s)",
                        repeatEvery: "Repeat on: ",
                    },
                    end: {
                        after: "after ",
                        occurrence: " occurrence(s).",
                        label: "end: ",
                        never: "never",
                        mobileLabel: "ends: ",
                        on: "on ",

                    }
                },
                recurrenceEditor: {
                    frequencies: {
                        daily: "daily",
                        monthly: "monthly",
                        weekly: "weekly",
                        yearly: "yearly",
                        never: "never",
                    },
                    monthly: {
                        day: "day ",
                        interval: " month(s).",
                        repeatEvery: "Repeat each: ",
                        repeatOn: "repeat on: ",
                    },
                    offsetPositions: {
                        first: "first",
                        second: "second",
                        last: "last",
                    },
                    weekly: {
                        interval: " week(s).",
                        repeatEvery: "Repeat each: ",
                    },
                    weekdays: {
                        day: "Day",
                        weekday: "Week day",
                        weekend: "Week day"
                    },
                    yearly: {
                        of: " of ",
                        repeatEvery: "Repeat each: ",
                        repeatOn: "repeat on: ",
                        interval: " year(s).",
                    }
                },
                recurrenceMessages: {
                    deleteRecurring: "Delete only this event occurrence or the whole series?",
                    deleteWindowOccurrence: "Delete current event",
                    deleteWindowSeries: "Delete all occurrences",
                    deleteWindowTitle: "Delete Recurring event",
                    editRecurring: "Do you want to edit only this event or the whole series?",
                    editWindowOccurrence: "Edit current event",
                },
                views: {
                    day: "Today",
                    week: "Weekly",
                    month: "Monthly",
                    agenda: "Events list",
                }
            };
        },
        destroyEditor() {
            //var editor = $("#editor");
            //var template = kendo.template($("#editor-template").html());
            //var scheduler = $("#scheduler").data("kendoScheduler");

            //kendo.destroy(editor);
            //editor.find("button").off();
            //editor.html("");
        },
        editEvent: function () {
            //var editor = $("#editor");
            //var template = kendo.template($("#editor-template").html());
            //var scheduler = $("#scheduler").data("kendoScheduler");

            //navcon.kendo.schedule.destroyEditor();

            //editor.html(template({}));
            //kendo.bind(editor, event); //Bind the editor container (uses MVVM)

            //editor.find("#save").click(function () {
            //    scheduler.dataSource.sync();
            //    navcon.kendo.schedule.destroyEditor();
            //});

            //editor.find("#cancel").click(function () {
            //    scheduler.dataSource.cancelChanges(currentEvent);
            //    navcon.kendo.schedule.destroyEditor();
            //});
        },
        moveStart: function (e) {
            //console.log("Move Start", e.event.title);
        },
        move: function (e) {
            //var scheduler = $("#scheduler").data("kendoScheduler");
            //var view = scheduler.view();
            //var template = "your custom template";
            //$(".k-event-drag-hint").html(template);

            //if (navcon.kendo.schedule.roomIsOccupied(e.start, e.end, e.event, e.resources) || navcon.kendo.schedule.attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            //    this.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
            //}

            //console.log("Move", e.slot.start);
        },
        moveEnd: function (e) {
            //if (!navcon.kendo.schedule.checkAvailability(e.start, e.end, e.event, e.resources)) {
            //    e.preventDefault();
            //}
            //console.log("MoveEnd", e.slot.start);
        },
        navigate: function (e) {
            //console.log("navigate", e.date);
        },
        resizeStart: function (e) {
            //console.log("Resize Start", e.event.title);
        },
        resize: function (e) {
            //if (navcon.kendo.schedule.roomIsOccupied(e.start, e.end, e.event, e.resources) || navcon.kendo.schedule.attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            //    this.wrapper.find(".k-marquee-color").addClass("invalid-slot");
            //    e.preventDefault();
            //}

            //console.log("Resize", e.slot.start);
        },
        resizeEnd: function (e) {
            //if (!navcon.kendo.schedule.checkAvailability(e.start, e.end, e.events)) {
            //    e.preventDefault();
            //}

            //console.log("Resize End", e.slot.start);
        },
        refresh: function (el, setting, scope) {
            var schedulerElement = $($(el).find('.kendoSchedule')[0]);
            scheduler = schedulerElement.getKendoScheduler();

            if (scheduler) {
                scheduler.destroy();
                schedulerElement.empty();
            }

            navcon.kendo.schedule.setting(el, setting, scope);
        },
        selectedRowIndex: function (table, selectedRow, idColumn) {
            var returnData = -1;
            var tableData = table.data !== undefined ? table.data : table;

            if (tableData !== undefined && tableData.length > 0)
                returnData = navcon.getItemIndexByKeyValue(tableData, idColumn, selectedRow[idColumn]);

            return returnData;
        },
        pdfExport: function (kScheduler, settings, e) {
            var progress = $.Deferred();

            /*kendo.drawing.drawDOM($("#header"))
              .done(function(header) {
                  kendo.drawing.drawDOM($("#footer"))
                    .done(function(footer) {*/
            kScheduler._drawPDF(progress)
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
        exportData: function () {
            //drawing = kendo.drawing;

            ////workaround PDF export rowspan limitation
            //$(".k-scheduler-content table [rowspan]").each(function () {
            //    var currentCell = $(this);
            //    var rowSpan = parseInt(currentCell.attr("rowspan"));
            //    var currentRow = currentCell.closest("tr");

            //    var nextRow = null;
            //    for (var i = 0; i < rowSpan - 1; i++) {
            //        nextRow = nextRow ? nextRow.next() : currentRow.next();
            //        nextRow.prepend($("<td class='inserted'></td>"));
            //    }

            //    currentCell.attr("rowspan", 1);
            //})

            //drawing.drawDOM("#scheduler .k-scheduler-content", {
            //    paperSize: "A4",
            //    margin: "2cm",
            //    scale: 0.6
            //}).then(function (group) {
            //    drawing.pdf.saveAs(group, "scheduler_agenda.pdf");
            //    var scheduler = $("#scheduler").getKendoScheduler();
            //    scheduler.view(scheduler.view().name);
            //});
        },
        occurrencesInRangeByResource: function(start, end, resourceFieldName, event, resources) {
            //var scheduler = $("#scheduler").getKendoScheduler();
            var scheduler = $($(el).find('.kendoSchedule')[0]);

            var occurrences = scheduler.occurrencesInRange(start, end);

            var idx = occurrences.indexOf(event);
            if (idx > -1) {
                occurrences.splice(idx, 1);
            }

            event = $.extend({}, event, resources);

            return navcon.kendo.schedule.filterByResource(occurrences, resourceFieldName, event[resourceFieldName]);
        },
        filterByResource: function(occurrences, resourceFieldName, value) {
            var result = [];
            var occurrence;

            for(var idx = 0, length = occurrences.length; idx < length; idx++) {
                occurrence = occurrences[idx];
                if (occurrence[resourceFieldName] === value) {
                    result.push(occurrence);
                }
            }
            return result;
        },
        attendeeIsOccupied: function (start, end, event, resources) {
            var occurrences = navcon.kendo.schedule.occurrencesInRangeByResource(start, end, "attendee", event, resources);
            if (occurrences.length > 0) {
                return true;
            }
            return false;
        },
        roomIsOccupied: function (start, end, event, resources) {
            var occurrences = navcon.kendo.schedule.occurrencesInRangeByResource(start, end, "roomId", event, resources);
            if (occurrences.length > 0) {
                return true;
            }
            return false;
        },
        checkAvailability: function (start, end, event, resources) {
            if (attendeeIsOccupied(start, end, event, resources)) {
                setTimeout(function () {
                    alert("This person is not available in this time period.");
                }, 0);

                return false;
            }

            if (roomIsOccupied(start, end, event, resources)) {
                setTimeout(function () {
                    alert("This room is not available in this time period.");
                }, 0);

                return false;
            }

            return true;
        }
    }
}(navcon || {}));