<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportForm.aspx.cs" Inherits="BAE.ViewsStatic.ReportForm" Culture="en-GB" %>

<!DOCTYPE html>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=14.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="reportForm" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <div style="overflow: hidden">
            <rsweb:ReportViewer ID="mainReportViewer" AsyncRendering="true" runat="server" SizeToReportContent="False" Width="98%" Height="700px" ProcessingMode="Remote">
            </rsweb:ReportViewer>

        </div>
        <asp:HiddenField ID="HiddenField1" runat="server" />
    </form>
</body>
<script>
    (function () {
        Sys.Application.add_load(function () {
            $find("mainReportViewer").add_propertyChanged(viewerPropertyChanged);
        });

        function viewerPropertyChanged(sender, e) {
            if (e.get_propertyName() === "isLoading") {
                var viewer = $find("mainReportViewer");
                var button = document.getElementById("Button1");
                var loading = viewer.get_isLoading();
                if (!loading) {
                    $($("div[id*='VisibleReportContentmainReportViewer']").find("table")[0]).attr("align", "center");

                    //$("#reportIframe").contents().find('head').append('<link href="../Content/navcon-style.css" rel="stylesheet" type="text/css" />');

                    $(".SubmitButtonCell").css("vertical-align", "middle");

                    $("a[title='MHTML (web archive)']").parent().css("display", "none");
                    $("a[title='XML file with report data']").parent().css("display", "none");
                    $("a[title='Data Feed']").parent().css("display", "none");

                    $(".ToolbarZoom.WidgetSet select").on("change", function (sender, event) {
                        var height = $($("div[id*=_oReportDiv]").parent().parent()).height();
                        var zoomText = sender.target.selectedOptions[0].innerText.toLowerCase().replace("%", "");
                        if (zoomText === "page width" || zoomText === "whole page" || parseFloat(zoomText) > 100) {
                            $("div[id*=_oReportDiv] table").css("overflow", "auto");
                            $("div[id*=_oReportDiv] table").css("height", height + "px");
                        } else {
                            $("div[id*=_oReportDiv] table").css("height", "");
                        }
                    });
                }
            }
        }
    })();
</script>
</html>
