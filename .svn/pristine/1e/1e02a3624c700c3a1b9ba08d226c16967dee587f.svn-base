var chartData = (function () {

    var chartData = [];

    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    function type(d) {
        d.value = +d.value;
        return d;
    }

    var chartData = [];
    var chart = {};

    chart = {
        "chart": {
            "paletteColors": "#7e6f6a,#36afb2,#9c6db2",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendBgAlpha": "0",
            "legendShadow": "0",
            "showHoverEffect": "1",
            "valueFontColor": "#000",
            "rotateValues": "1",
            "placeValuesInside": "1",
            "divlineColor": "#999999",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "canvasBgColor": "#ffffff",
            "canvasBgAlpha": "30",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "legendItemFontSize":"12"
        },
        "events": {
            "chartMousemove": function (eventObj, dataObj) {
                alert($(".chartToolTip").html());
            }
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "January"
                    },
                    {
                        "label": "February"
                    },
                    {
                        "label": "March"
                    },
                    {
                        "label": "April"
                    },
                    {
                        "label": "May"
                    },
                    {
                        "label": "June"
                    },
                    {
                        "label": "July"
                    },
                    {
                        "label": "August"
                    },
                    {
                        "label": "September"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Managed",
                "data": [
                   {
                       "value": 2
                   },
                   {
                       "value": 4
                   },
                   {
                       "value": 13
                   },
                   {
                       "value": 4
                   },
                   {
                       "value": 8
                   },
                   {
                       "value": 6
                   },
                   {
                       "value": 5
                   },
                   {
                       "value": 9
                   },
                   {
                       "value": 9
                   }
                ]
            },
            {
                "seriesname": "Closed",
                "data": [
                   {
                       "value": 6
                   },
                   {
                       "value": 7
                   },
                   {
                       "value": 6
                   },
                   {
                       "value": 1
                   },
                   {
                       "value": 9
                   },
                   {
                       "value": 7
                   },
                   {
                       "value": 5
                   },
                   {
                       "value": 3
                   },
                   {
                       "value": 2
                   }
                ]
            },
            {
                "seriesname": "Open",
                "data": [
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": null
                    },
                    {
                        "value": 3
                    }
                ]
            }
        ],
        "id": "1",
        "type": "stackedcolumn3d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "use3DLighting": "0",
            "showShadow": "0",
            "enableSmartLabels": "0",
            "startingAngle": "0",
            "decimals": "0",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "showPercentInTooltip": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "showHoverEffect": "1",
            "showLegend": "1",
            "legendBgColor": "#ffffff",
            "legendBorderAlpha": '0',
            "legendShadow": '0',
            "legendItemFontSize": '10',
            "legendItemFontColor": '#666666',
            "enableRotation": "0",
            "enableSlicing ": '1',
            "enableMultiSlicing": '0',
            "showLabels": '1',
            "showPercentValues": "0",
            "defaultCenterLabel": "",
            "centerLabel": "$label <br /> $value",
            "centerLabelBold": "1",
            "useDataPlotColorForLabels": "1",
            "legendItemFontSize": "12"
        },
        "data": [
            {
                "label": "Risk Class A",
                "value": "10"
            },
            {
                "label": "Risk Class B",
                "value": "15"
            },
            {
                "label": "Risk Class C",
                "value": "30"
            },
            {
                "label": "Risk Class D",
                "value": "40"
            }
        ],
        "id": "2",
        "type": "doughnut2d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "Top Smartphone Ratings",
            "subcaption": "By Features",
            "xAxisName": "Features",
            "yAxisName": "Model",
            "showplotborder": "1",
            "xAxisLabelsOnTop": "1",
            "plottooltext": "<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >$rowLabel :</div>{br}Rating : <b>$dataValue</b>{br}$columnLabel : <b>$tlLabel</b>{br}<b>$trLabel</b>",
            "baseFontColor": "#333333",
            "baseFont": "Helvetica Neue,Arial",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "showBorder": "0",
            "bgColor": "#ffffff",
            "showShadow": "0",
            "usePlotGradientColor": "0",
            "canvasBgColor": "#ffffff",
            "canvasBorderAlpha": "0",
            "legendBgAlpha": "0",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "legendItemFontSize": "10",
            "legendItemFontColor": "#666666",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5"
        },
        "rows": {
            "row": [
                {
                    "id": "SGS5",
                    "label": "Samsung Galaxy S5"
                },
                {
                    "id": "HTC1M8",
                    "label": "HTC One (M8)"
                },
                {
                    "id": "IPHONES5",
                    "label": "Apple iPhone 5S"
                },
                {
                    "id": "LUMIA",
                    "label": "Nokia Lumia 1520"
                }
            ]
        },
        "columns": {
            "column": [
                {
                    "id": "processor",
                    "label": "Processor"
                },
                {
                    "id": "screen",
                    "label": "Screen Size"
                },
                {
                    "id": "price",
                    "label": "Price"
                },
                {
                    "id": "backup",
                    "label": "Battery Backup"
                },
                {
                    "id": "cam",
                    "label": "Camera"
                }
            ]
        },
        "dataset": [
            {
                "data": [
                    {
                        "rowid": "SGS5",
                        "columnid": "processor",
                        "value": "8.7",
                        "tllabel": "Quad Core 2.5 GHz",
                        "trlabel": "OS : Android 4.4 Kitkat"
                    },
                    {
                        "rowid": "SGS5",
                        "columnid": "screen",
                        "value": "8.5",
                        "tllabel": "5.1 inch",
                        "trlabel": "AMOLED screen"
                    },
                    {
                        "rowid": "SGS5",
                        "columnid": "price",
                        "value": "9.3",
                        "tllabel": "$600"
                    },
                    {
                        "rowid": "SGS5",
                        "columnid": "backup",
                        "value": "9.7",
                        "tllabel": "29 Hrs",
                        "trlabel": "Battery : 2800 MAH"
                    },
                    {
                        "rowid": "SGS5",
                        "columnid": "cam",
                        "value": "8",
                        "tllabel": "16 MP",
                        "trlabel": "Front Camera : 2.1 MP"
                    },
                    {
                        "rowid": "HTC1M8",
                        "columnid": "processor",
                        "value": "9.2",
                        "tllabel": "Quad Core 2.3 GHz",
                        "trlabel": "OS : Android 4.4 Kitkat"
                    },
                    {
                        "rowid": "HTC1M8",
                        "columnid": "screen",
                        "value": "8.3",
                        "tllabel": "5 inch",
                        "trlabel": "LCD screen"
                    },
                    {
                        "rowid": "HTC1M8",
                        "columnid": "price",
                        "value": "7.3",
                        "tllabel": "$600"
                    },
                    {
                        "rowid": "HTC1M8",
                        "columnid": "backup",
                        "value": "8.8",
                        "tllabel": "20 Hrs",
                        "trlabel": "Battery : 2600 MAH"
                    },
                    {
                        "rowid": "HTC1M8",
                        "columnid": "cam",
                        "value": "8.7",
                        "tllabel": "4 MP",
                        "trlabel": "Front Camera : 5 MP"
                    },
                    {
                        "rowid": "IPHONES5",
                        "columnid": "processor",
                        "value": "9.1",
                        "tllabel": "Dual Core",
                        "trlabel": "OS : iOS 7"
                    },
                    {
                        "rowid": "IPHONES5",
                        "columnid": "screen",
                        "value": "8.6",
                        "tllabel": "4 inch",
                        "trlabel": "Retina LCD screen"
                    },
                    {
                        "rowid": "IPHONES5",
                        "columnid": "price",
                        "value": "7.2",
                        "tllabel": "$649"
                    },
                    {
                        "rowid": "IPHONES5",
                        "columnid": "backup",
                        "value": "8.4",
                        "tllabel": "10 Hrs",
                        "trlabel": "Battery : 1560 MAH"
                    },
                    {
                        "rowid": "IPHONES5",
                        "columnid": "cam",
                        "value": "9.5",
                        "tllabel": "8 MP",
                        "trlabel": "Front Camera : 1.2 MP"
                    },
                    {
                        "rowid": "LUMIA",
                        "columnid": "processor",
                        "value": "8.8",
                        "tllabel": "Quad Core 2.2 GHz",
                        "trlabel": "OS: Windows Phone 8"
                    },
                    {
                        "rowid": "LUMIA",
                        "columnid": "screen",
                        "value": "9.1",
                        "tllabel": "6 inch",
                        "trlabel": "LCD screen"
                    },
                    {
                        "rowid": "LUMIA",
                        "columnid": "price",
                        "value": "9.7",
                        "tllabel": "$470"
                    },
                    {
                        "rowid": "LUMIA",
                        "columnid": "backup",
                        "value": "9.2",
                        "tllabel": "27 Hrs",
                        "trlabel": "Battery : 3400 MAH"
                    },
                    {
                        "rowid": "LUMIA",
                        "columnid": "cam",
                        "value": "8.1",
                        "tllabel": "20MP",
                        "trlabel": "Front Camera : 1.2 MP"
                    }
                ]
            }
        ],
        "colorrange": {
            "gradient": "0",
            "minvalue": "0",
            "code": "E24B1A",
            "startlabel": "Poor",
            "endlabel": "Good",
            "color": [
                {
                    "code": "E24B1A",
                    "minvalue": "1",
                    "maxvalue": "5",
                    "label": "Bad"
                },
                {
                    "code": "F6BC33",
                    "minvalue": "5",
                    "maxvalue": "8.5",
                    "label": "Average"
                },
                {
                    "code": "6DA81E",
                    "minvalue": "8.5",
                    "maxvalue": "10",
                    "label": "Good"
                }
            ]
        },
        "id": "3",
        "type": "heatmap"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "SORT Reports",
            "subCaption": "Jan 2016 - Sep 2016",
            //"xAxisname": "Quarter",
            //"yAxisName": "Revenue (In USD)",
            "numberSuffix": "%",
            //"paletteColors": "#0075c2,#1aaf5d",
            "bgColor": "#ffffff",
            "borderAlpha": "20",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "valueFontColor": "#000",
            "showXAxisLine": "1",
            "xAxisLineColor": "#999999",
            "divlineColor": "#999999",
            "divLineDashed": "1",
            "showAlternateHGridColor": "0",
            "subcaptionFontBold": "0",
            "subcaptionFontSize": "14",
            "showHoverEffect": "1"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Aircraft General"
                    },
                    {
                        "label": "Auto Flight"
                    },
                    {
                        "label": "Electrical"
                    },
                    {
                        "label": "Indicating/Recording"
                    },
                    {
                        "label": "Navigation"
                    },
                    {
                        "label": "Water/Waste"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Success %",
                "data": [
                    {
                        "value": "86"
                    },
                    {
                        "value": "92"
                    },
                    {
                        "value": "88"
                    },
                    {
                        "value": "85"
                    },
                    {
                        "value": "90"
                    },
                    {
                        "value": "99"
                    }
                ]
            },
            {
                "seriesname": "Failures %",
                "data": [
                    {
                        "value": "14"
                    },
                    {
                        "value": "8"
                    },
                    {
                        "value": "12"
                    },
                    {
                        "value": "15"
                    },
                    {
                        "value": "10"
                    },
                    {
                        "value": "1"
                    }
                ]
            }
        ],
        "id": "4",
        "type": "stackedcolumn3d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "Occurrence Causes",
            "subCaption": "Jan 2016 - Sep 2016",
            "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "use3DLighting": "0",
            "showShadow": "0",
            "enableSmartLabels": "0",
            "startingAngle": "0",
            "showPercentValues": "1",
            "showPercentInTooltip": "0",
            "decimals": "1",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "showHoverEffect": "1",
            "showLegend": "1",
            "legendBgColor": "#ffffff",
            "legendBorderAlpha": '0',
            "legendShadow": '0',
            "legendItemFontSize": '10',
            "legendItemFontColor": '#666666'
        },
        "data": [
            {
                "label": "Electrical",
                "value": "12"
            },
            {
                "label": "Auto Flight",
                "value": "8"
            },
            {
                "label": "Aircraft general",
                "value": "8"
            },
            {
                "label": "Indicating/Recording",
                "value": "7"
            },
            {
                "label": "Navigation",
                "value": "5"
            },
            {
                "label": "Water/Waste",
                "value": "2"
            }
        ],
        "id": "5",
        "type": "doughnut2d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "SORT Reports",
            //"xAxisName": "Quarter",
            //"yAxisName": "Sales (In USD)",
            //"numberPrefix": "$",
            "paletteColors": "#0075c2,#1aaf5d,#f2c500",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendBgAlpha": "0",
            "legendShadow": "0",
            "showHoverEffect": "1",
            "valueFontColor": "#000",
            "rotateValues": "1",
            "placeValuesInside": "1",
            "divlineColor": "#999999",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "canvasBgColor": "#ffffff",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Aircraft General"
                    },
                    {
                        "label": "Auto Flight"
                    },
                    {
                        "label": "Electrical"
                    },
                    {
                        "label": "Indicating/Recording"
                    },
                    {
                        "label": "Navigation"
                    },
                    {
                        "label": "Water/Waste"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Success",
                "data": [
                    {
                        "value": 50
                    },
                    {
                        "value": 60
                    },
                    {
                        "value": 40
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 96
                    },
                    {
                        "value": 57
                    },
                    {
                        "value": 84
                    }
                ]
            },
            {
                "seriesname": "Failure",
                "data": [
                    {
                        "value": 50
                    },
                    {
                        "value": 40
                    },
                    {
                        "value": 60
                    },
                    {
                        "value": 14
                    },
                    {
                        "value": 8
                    },
                    {
                        "value": 4
                    },
                    {
                        "value": 43
                    },
                    {
                        "value": 26
                    }
                ]
            }
        ],
        "id": "2508",
        "type": "stackedcolumn3d"
    }
    chartData.push(chart);

    chart = {
        "chart": {
            "caption": "Over All By Subject, Year",
            //"xAxisName": "Quarter",
            //"yAxisName": "Sales (In USD)",
            //"numberPrefix": "$",
            "paletteColors": "#0075c2,#1aaf5d,#f2c500",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendBgAlpha": "0",
            "legendShadow": "0",
            "showHoverEffect": "1",
            "valueFontColor": "#000",
            "rotateValues": "1",
            "placeValuesInside": "1",
            "divlineColor": "#999999",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "canvasBgColor": "#ffffff",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Aircraft General"
                    },
                    {
                        "label": "Auto Flight"
                    },
                    {
                        "label": "Electrical"
                    },
                    {
                        "label": "Indicating/Recording"
                    },
                    {
                        "label": "Navigation"
                    },
                    {
                        "label": "Water/Waste"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "2011",
                "data": [
                    {
                        "value": 50
                    },
                    {
                        "value": 60
                    },
                    {
                        "value": 40
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 96
                    },
                    {
                        "value": 57
                    },
                    {
                        "value": 84
                    }
                ]
            },
            {
                "seriesname": "2012",
                "data": [
                    {
                        "value": 50
                    },
                    {
                        "value": 80
                    },
                    {
                        "value": 40
                    },
                    {
                        "value": 90
                    },
                    {
                        "value": 20
                    },
                    {
                        "value": 60
                    },
                    {
                        "value": 63
                    },
                    {
                        "value": 70
                    }
                ]
            },
            {
                "seriesname": "2013",
                "data": [
                    {
                        "value": 50
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 96
                    },
                    {
                        "value": 57
                    },
                    {
                        "value": 84
                    }
                ]
            },
            {
                "seriesname": "2014",
                "data": [
                    {
                        "value": 40
                    },
                    {
                        "value": 60
                    },
                    {
                        "value": 80
                    },
                    {
                        "value": 90
                    },
                    {
                        "value": 70
                    },
                    {
                        "value": 50
                    },
                    {
                        "value": 30
                    },
                    {
                        "value": 10
                    }
                ]
            },
            {
                "seriesname": "2015",
                "data": [
                    {
                        "value": 80
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 86
                    },
                    {
                        "value": 92
                    },
                    {
                        "value": 96
                    },
                    {
                        "value": 57
                    },
                    {
                        "value": 84
                    }
                ]
            }
        ],
        "id": "2509",
        "type": "mscolumn3d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "Pre Evaluation",
            "subCaption": "",
            //"xAxisname": "Quarter",
            //"yAxisName": "Revenue (In USD)",
            "numberSuffix": "%",
            //"paletteColors": "#0075c2,#1aaf5d",
            "bgColor": "#ffffff",
            "borderAlpha": "20",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "valueFontColor": "#000",
            "showXAxisLine": "1",
            "xAxisLineColor": "#999999",
            "divlineColor": "#999999",
            "divLineDashed": "1",
            "showAlternateHGridColor": "0",
            "subcaptionFontBold": "0",
            "subcaptionFontSize": "14",
            "showHoverEffect": "1"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Aircraft General"
                    },
                    {
                        "label": "Auto Flight"
                    },
                    {
                        "label": "Electrical"
                    },
                    {
                        "label": "Indicating/Recording"
                    },
                    {
                        "label": "Navigation"
                    },
                    {
                        "label": "Water/Waste"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Success %",
                "data": [
                    {
                        "value": "86"
                    },
                    {
                        "value": "92"
                    },
                    {
                        "value": "88"
                    },
                    {
                        "value": "85"
                    },
                    {
                        "value": "90"
                    },
                    {
                        "value": "99"
                    }
                ]
            },
            {
                "seriesname": "Failures %",
                "data": [
                    {
                        "value": "14"
                    },
                    {
                        "value": "8"
                    },
                    {
                        "value": "12"
                    },
                    {
                        "value": "15"
                    },
                    {
                        "value": "10"
                    },
                    {
                        "value": "1"
                    }
                ]
            }
        ],
        "id": "2511",
        "type": "stackedcolumn3d"
    }
    chartData.push(chart);

    chart = {};
    chart = {
        "chart": {
            "caption": "Previous Level by Subject",
            "subCaption": "",
            //"xAxisname": "Quarter",
            //"yAxisName": "Revenue (In USD)",
            "numberSuffix": "%",
            //"paletteColors": "#0075c2,#1aaf5d",
            "bgColor": "#ffffff",
            "borderAlpha": "20",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "valueFontColor": "#000",
            "showXAxisLine": "1",
            "xAxisLineColor": "#999999",
            "divlineColor": "#999999",
            "divLineDashed": "1",
            "showAlternateHGridColor": "0",
            "subcaptionFontBold": "0",
            "subcaptionFontSize": "14",
            "showHoverEffect": "1"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Aircraft General"
                    },
                    {
                        "label": "Auto Flight"
                    },
                    {
                        "label": "Electrical"
                    },
                    {
                        "label": "Indicating/Recording"
                    },
                    {
                        "label": "Navigation"
                    },
                    {
                        "label": "Water/Waste"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Success %",
                "data": [
                    {
                        "value": "86"
                    },
                    {
                        "value": "92"
                    },
                    {
                        "value": "88"
                    },
                    {
                        "value": "85"
                    },
                    {
                        "value": "90"
                    },
                    {
                        "value": "99"
                    }
                ]
            },
            {
                "seriesname": "Failures %",
                "data": [
                    {
                        "value": "14"
                    },
                    {
                        "value": "8"
                    },
                    {
                        "value": "12"
                    },
                    {
                        "value": "15"
                    },
                    {
                        "value": "10"
                    },
                    {
                        "value": "1"
                    }
                ]
            }
        ],        
        "id": "2512",
        "type": "stackedcolumn3d"
    }
    chartData.push(chart);

    // or we could create a function on the Array prototype directly

    Array.prototype.inArray = function (property, searchFor) {
        var retVal = -1;
        $.each(this, function (index, item) {
            if (item.hasOwnProperty(property)) {
                if (item[property] === searchFor) {
                    retVal = item;
                    return false;
                }
            }
        });
        return retVal;
    };

    return {
        getChartData: function (value) {
            var returnData = chartData.inArray("id", value.toString());
            return returnData;
        },
    };

})();