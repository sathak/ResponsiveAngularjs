<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="XtraReport.aspx.cs" Inherits="BAE.ViewsStatic.XtraReport" %>


<%@ Register Assembly="DevExpress.XtraReports.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraReports.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web.ClientControls" TagPrefix="cc1" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    <title></title>
    <style type="text/css">
        .publishClass {
            background-image: url('/Images/Publish.png');
            background-repeat: no-repeat;
        }

        .unpublishClass {
            background-image: url('/Images/unpublish.png');
            background-repeat: no-repeat;
        }
    </style>
    <script type="text/javascript" src='/Scripts/jquery-1.8.2.min.js'></script>
    <script type="text/html" id="custom-dx-date">
        <%-- <div data-bind="dxDateBox: { value: value, closeOnValueChange: true, type: 'date', disabled: disabled }, dxValidator: { validationRules: validationRules || [] }"></div>--%>
        <div data-bind="dxDateBox: { value: value, closeOnValueChange: true, format: 'date', formatString: 'dd/MM/yyyy', disabled: disabled }, dxValidator: { validationRules: validationRules || [] }"></div>

    </script>
    <script type="text/javascript">
        {
            function Viewer_CustomizeParameterEditors(s, e) {
                if (e.parameter.name.slice(-4) !== undefined && e.parameter.name.slice(-4).toLowerCase() === 'date') {
                    e.info.editor = { header: 'custom-dx-date' };
                }
            }

            function init(sender) {
                sender.designerModel.fieldListActionProviders.push({
                    getActions: function (context) {
                        var actions = [];
                        if (context.path.startsWith("parameters")) {
                            var parameter = context.data;
                            var parameters = sender.designerModel.model().parameters;
                            actions.push({
                                text: "Move Down",
                                imageClassName: "dx-image-movedown",
                                disabled: ko.pureComputed(function () {
                                    return parameters.indexOf(parameter) > parameters().length - 2;
                                }),
                                clickAction: function (model) {
                                    var i = parameters.indexOf(parameter),
                                        array = parameters();
                                    parameters.splice(i, 2, array[i + 1], array[i]);
                                }
                            });
                            actions.push({
                                text: "Move Up",
                                imageClassName: "dx-image-moveup",
                                disabled: ko.pureComputed(function () {
                                    return parameters.indexOf(parameter) < 1;
                                }),
                                clickAction: function (model) {
                                    var i = parameters.indexOf(parameter),
                                        array = parameters();
                                    parameters.splice(i - 1, 2, array[i], array[i - 1]);
                                }
                            });
                        }


                        return actions;
                    }
                });

                var menus = sender.designerModel.actionLists.menuItems;
                var custombutton = document.getElementById("hndcustombutton").value;
                var defaultreport = document.getElementById("hnddefaultreport").value;
                $.each(menus, function (index, menu) {
                    if (defaultreport == "True") {
                        if (menu.text == "Unpublish" || menu.text == "Publish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "none");
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }
                    }
                    else if (custombutton == "True") {
                        if (menu.text == "Publish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }
                        if (menu.text == "Unpublish") {
                            menu.visible = true;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "block");
                        }
                    }
                    else if (custombutton != "True") {
                        if (menu.text == "Publish") {
                            menu.visible = true;
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "block");
                        }
                        if (menu.text == "Unpublish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }
                    }
                });
                $($(".dxrd-toolbar-item-image.unpublishClass").parents(".dxrd-toolbar-item")).css("display", "none");
                $($(".dxrd-toolbar-item-image.publishClass").parents(".dxrd-toolbar-item")).css("display", "none");
            }

            function Viewer_ReportOpening(sender, evtargs) {
                var evt = evtargs;
                var repPath = evtargs.Url.split("\\");
                var repName = repPath[repPath.length - 1];
                repName = repName.replace(".resx", "");

                //$.ajax({
                //    type: "POST",
                //    url: "XtraReport.aspx/CustomReport",
                //    data: "{ReportName:'" + repName + "'}",
                //    contentType: "application/json; charset=utf-8",
                //    async: false,
                //    dataType: "json",
                //    success: function (msg) {
                //        if (msg.d == "Err")
                //            alert("Unable to open, contact administrator");
                //        else {
                //            document.getElementById("hndcustombutton").value = msg.d.split("^")[1];
                //            document.getElementById("hnddefaultreport").value = msg.d.split("^")[0];
                //            document.getElementById("hndreportId").value = msg.d.split("^")[2];
                //        }
                //    },
                //    error: function (msg) {
                //        alert(msg.statusText)
                //        bRet = false;
                //    }
                //});
            }

            function Viewer_ReportOpened(sender, evtargs) {
                // debugger;
                var menus = sender.designerModel.actionLists.menuItems;
                var custombutton = document.getElementById("hndcustombutton").value;
                var defaultreport = document.getElementById("hnddefaultreport").value;
                $.each(menus, function (index, menu) {
                    if (defaultreport == "True") {
                        if (menu.text == "Unpublish" || menu.text == "Publish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "none");
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }

                    }
                    else if (custombutton == "True") {
                        if (menu.text == "Publish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }
                        if (menu.text == "Unpublish") {
                            menu.visible = true;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "block");
                        }
                    }
                    else if (custombutton != "True") {
                        if (menu.text == "Publish") {
                            menu.visible = true;
                            $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "block");

                        }
                        if (menu.text == "Unpublish") {
                            menu.visible = false;
                            $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "none");
                        }
                    }
                });

            }


            function PublishReport(Sender, evtargs) {
                // debugger;
                var m = document.getElementById("hndreportId");
                var IsUpdatable = 0;
                var text = evtargs.model.text;
                if (text == "Publish")
                    IsUpdatable = 1;

                //$.ajax({
                //    type: "POST",
                //    url: "XtraReport.aspx/PublishReport",
                //    data: "{ReportId:'" + m.value + "',IsPublish:'" + IsUpdatable + "'}",
                //    contentType: "application/json; charset=utf-8",
                //    async: false,
                //    dataType: "json",
                //    success: function (msg) {
                //        if (msg.d == "Err")
                //            alert("Unable to publish, contact administrator");
                //        else if (msg.d == "OK")
                //        {
                //            if (text == "Publish") {
                //                $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "none");
                //                $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "block");
                //            }
                //            else {
                //                $($(".dxrd-menu-item-image.publishClass").parents(".dxrd-menu-item")).css("display", "block");
                //                $($(".dxrd-menu-item-image.unpublishClass").parents(".dxrd-menu-item")).css("display", "none");
                //            }
                //        }
                //        else if (msg.d != "OK")
                //            bRet = confirm(msg.d)
                //    },
                //    error: function (msg) {
                //        alert(msg.statusText)
                //        bRet = false;
                //    }
                //});
            }

            function exportReport(s, e) {
                debugger;
                s.previewModel.exportModel.actions[0].clickAction("pdf");
                //var reportPreview = s.GetPreviewModel().reportPreview;
                //var currentExportOptions = reportPreview.exportOptionsModel;
                //var optionsUpdating = false;
                //var inlineResult="";
                //var ExportValue = "true";
                //if (ExportValue != null && ExportValue == "true") {
                //    var fixExportOptions = function (options) {
                //        try {
                //            optionsUpdating = true;
                //            if (!options) {
                //                currentExportOptions(null);
                //            } else {
                //                var ExportOptions = "ALL";
                //                var setOptions = [];
                //                if (ExportOptions[0] == "ALL") {

                //                } else {
                //                    $.each(options, function (index, value) {
                //                        var set = 0;
                //                        for (var m = 0; m < ExportOptions.length; m++) {
                //                            if (index.toUpperCase() == ExportOptions[m]) {
                //                                set = 1;
                //                            }
                //                        }

                //                        if (set == 0) {
                //                            delete options[index];
                //                        }
                //                    })
                //                }


                //                currentExportOptions(options);
                //            }
                //        } finally {
                //            optionsUpdating = false;
                //        }
                //    };
                //    currentExportOptions.subscribe(function (newValue) {
                //        !optionsUpdating && fixExportOptions(newValue);
                //        s.ExportTo("pdf",);
                //    });
                //    fixExportOptions(currentExportOptions());
                //}
            }

        }
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:CheckBox ID="chkDesigner" runat="server"
                OnCheckedChanged="ChkDesigner_CheckedChanged" Text="Report Designer" AutoPostBack="true" />
            <asp:HiddenField ID="hndreportId" runat="server" Value="" />
            <asp:HiddenField ID="hndcustombutton" runat="server" Value="" />
            <asp:HiddenField ID="hnddefaultreport" runat="server" Value="" />
        </div>
        <div>
            <dx:ASPxReportDesigner ID="reportDesigner" runat="server">
                <MenuItems>
                    <cc1:ClientControlsMenuItem Text="Publish" JSClickAction="PublishReport" ImageClassName="publishClass">
                    </cc1:ClientControlsMenuItem>
                    <cc1:ClientControlsMenuItem Text="Unpublish" JSClickAction="PublishReport" ImageClassName="unpublishClass">
                    </cc1:ClientControlsMenuItem>
                </MenuItems>
                <ClientSideEvents Init="init" CustomizeParameterEditors="Viewer_CustomizeParameterEditors" ReportOpened="Viewer_ReportOpened" ReportOpening="Viewer_ReportOpening" />
            </dx:ASPxReportDesigner>
        </div>
        <div>
            <dx:ASPxWebDocumentViewer ID="ASPxWebDocumentViewer1" runat="server" >
                <ClientSideEvents CustomizeParameterEditors="Viewer_CustomizeParameterEditors" />
            </dx:ASPxWebDocumentViewer>
            
        </div>
    </form>
</body>
</html>
