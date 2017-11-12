using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using DevExpress.XtraReports.Web;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.Web;
//Imports DevExpress.XtraReports.Web

//Imports newDevReport.Report
using System.IO;
using System.Xml;
using System.Data.SqlClient;
using DevExpress.XtraEditors;


using DevExpress.XtraReports.UI;
using DevExpress.XtraBars;
using DevExpress.XtraPrinting.Preview;
using DevExpress.XtraPrinting.Preview.Native;
using DevExpress.XtraPrinting;
using DevExpress.XtraRichEdit;

using log4net;


namespace BAE.ViewsStatic
{
    public partial class XtraReport : System.Web.UI.Page
    {
        protected static readonly log4net.ILog log = log4net.LogManager.GetLogger("XtraReport");
        protected void Page_Load(object sender, System.EventArgs e)
        {
            try
            {
                //if (Request.QueryString["Designer"] != null && Request.QueryString["Designer"].ToString() == "ON")
                //{
                //    chkDesigner.Visible = true;
                //}
                //else
                //{
                //    chkDesigner.Visible = false;
                //}


                getReport();
                //Session["imgPath"] = Server.MapPath("~\\\\App_Themes\\\\DevEx\\\\");

            }
            catch (Exception ex)
            {
            }
        }

        protected string getResponseSQL(string requestID)
        {
            string responseString = "";
            try
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnectionString"].ToString();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();

                    using (SqlCommand command = new SqlCommand("s_reportDetails '" + requestID + "'", con))
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            responseString = reader.GetString(0);
                        }
                    }
                }
            }
            catch (Exception exc)
            {
                log.Error(exc.Message, exc);
                responseString = "";
            }

            return responseString;
        }

        public void getReport()
        {
            string Id = "1";// Session["ReportID"].ToString();
            hndreportId.Value = Id;
            // Dim UId As String = Session["ReportID"].ToString()
            dynamic type = "1";
            //Request.QueryString("type")

            string reportName = "";
            //reportName = "test";
            string param = Request.QueryString["rp"];
            string export = Request.QueryString["export"];
            //bool mobilemode = Request.QueryString["mobile"].ToString()=="yes"?true:false;
            //ASPxWebDocumentViewer1.MobileMode = mobilemode;
            string fileName = "";
            Guid requestID;
            try
            {
                requestID = new Guid(Request.QueryString["r"]);
                fileName = getResponseSQL(requestID.ToString());
            }
            catch
            {
                Response.Redirect("~/index.html");
            }
            /*var data = getResponse(requestID.ToString());
            log.Info("Page load 4" + data);
            if (data == "") return;
            JObject jsonObj = JObject.Parse(data);
            string fileName = jsonObj["FileName"].Value<string>();*/


            if (fileName == null || fileName == "")
                fileName = "";
            string userid = Request.QueryString["userid"];
            if (userid == null || userid == "")
                userid = "0";

            reportName = fileName;
            int count = 0;
            //// Dim str_Query As String = "select title from l_menu where mnu_id=" & Id
            //string str_Query = "Select a.title,a.defaultreport,a.PublishedReport, b.cnt from (Select title,defaultreport,PublishedReport from l_menu where mnu_id=" + Id + " ) a, (Select  Count(*) Cnt from l_users where user_type = -1 and uid =" + Session["UserId"].ToString() + ") b ";
            //dynamic dt_menu = null; // DbInteract.Get_DataTable(str_Query);
            //if (dt_menu != null)
            //{
            //    if ((dt_menu.Rows.Count > 0))
            //    {
            //        hnddefaultreport.Value = dt_menu.Rows(0)("defaultreport");
            //        hndcustombutton.Value = dt_menu.Rows(0)("PublishedReport");
            //        reportName = dt_menu.Rows(0)("title");
            //        count = Convert.ToInt32(dt_menu.Rows(0)("Cnt"));
            //    }
            //}

            DevExpress.XtraReports.UI.XtraReport objReport = null;

            FilesystemReportStorageWebExtension report = new FilesystemReportStorageWebExtension(System.Web.HttpContext.Current);

            if (chkDesigner.Checked == true && reportName != null)
            {
                type = "2";
            }
            else if (type == null)
            {
                type = "1";
            }

            count = 1;
            //if (count > 0)
            //{
            //    if (Request.QueryString["Designer"] != null && Request.QueryString["Designer"].ToString() == "ON")
            //    {
            //        chkDesigner.Visible = true;
            //    }
            //    else
            //    {
            //        chkDesigner.Visible = false;
            //    }
            //}
            //else
            //{
            //    chkDesigner.Visible = false;
            //}


            string reportPath = "";
            string storagePath = Server.MapPath("~\\ReportStorage\\");
            // storagePath = "D:\\ReportStore\\";

            if (reportName != null)
            {

                if (reportName == "New")
                {
                    objReport = new DevExpress.XtraReports.UI.XtraReport();
                    hndreportId.Value = "0";
                    //ElseIf reportName = "Products" Then
                    //    objReport = New Products()
                }
                else
                {
                    //XtraReport1           
                    DevExpress.XtraReports.UI.XtraReport rep1 = new DevExpress.XtraReports.UI.XtraReport();
                    reportPath = (storagePath + Convert.ToString(reportName)) + ".resx";

                    //  rep1.LoadLayout(reportPath);
                    objReport = rep1;
                }
            }
            reportDesigner.Visible = false;

            if (!File.Exists(reportPath))
                return;

            if (objReport != null)
            {
                if (reportName == "New")
                {
                    reportDesigner.Visible = true;
                    reportDesigner.OpenReport(reportPath);
                    ASPxWebDocumentViewer1.Visible = false;
                }
                else if ((type == "2"))
                {
                    reportDesigner.Visible = true;
                    reportDesigner.OpenReport(reportPath);
                    ASPxWebDocumentViewer1.Visible = false;
                }
                else
                {
                    ASPxWebDocumentViewer1.Visible = true;
                    ASPxWebDocumentViewer1.OpenReport(reportPath);
                    reportDesigner.Visible = false;
                }

                // Session["export"] = export;

                if (export == "true")
                {

                    //DevExpress.XtraReports.UI.XtraReport reportfile = DevExpress.XtraReports.UI.XtraReport.FromFile(reportPath, true);
                    //MemoryStream stream = new MemoryStream();
                    //reportfile.ExportToPdf(stream);
                    //stream.Seek(0, SeekOrigin.Begin);
                    //byte[] reportByte = stream.ToArray();
                    //Response.Buffer = true;
                    //Response.Clear();
                    //Response.ContentType = "application/msword";
                    //Response.AddHeader("Accept-Header", stream.Length.ToString());
                    //Response.AddHeader("Content-Disposition", "attachment; filename=word.doc");
                    //Response.AddHeader("Content-Length", stream.Length.ToString());
                    //Response.OutputStream.Write(reportByte, 0, reportByte.Length);
                    //// Response.BinaryWrite(stream); // create the file
                    //Response.Flush();
                    //Response.End();


                    DevExpress.XtraReports.UI.XtraReport final = new DevExpress.XtraReports.UI.XtraReport();
                    //Create document first
                    final.CreateDocument();

                    final.Pages.AddRange(objReport.Pages);

                    ExportToDOC(final, "doc", DocumentFormat.Doc);

                }



            }

        }

        private void ExportToDOC(DevExpress.XtraReports.UI.XtraReport report, string extension, DocumentFormat df)
        {
            //Do not specify export options here
            
            
            
        }
        public static byte[] ToByteArray(Stream stream)
        {
            stream.Position = 0;
            byte[] buffer = new byte[stream.Length];
            for (int totalBytesCopied = 0; totalBytesCopied < stream.Length;)
                totalBytesCopied += stream.Read(buffer, totalBytesCopied, Convert.ToInt32(stream.Length) - totalBytesCopied);
            return buffer;
        }
        protected void cal_JavaScript(string method)
        {
            ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), Guid.NewGuid().ToString(), method, true);
        }

        protected void ChkDesigner_CheckedChanged(object sender, EventArgs e)
        {
            getReport();
        }

        [System.Web.Services.WebMethod()]
        public static string PublishReport(int ReportId, int IsPublish)
        {
            try
            {
                string strReturnMsg = string.Empty;
                if ((ReportId == 0))
                {
                }
                else
                {
                    string upd_Query = "update l_menu set defaultreport=0,PublishedReport=" + IsPublish.ToString() + " where mnu_id=" + ReportId.ToString();
                    // DbInteract.run_DBQuery(upd_Query);

                    strReturnMsg = "OK";
                }
                return strReturnMsg;
            }
            catch (Exception ex)
            {
                // logger.Error(ex.Message, ex);
                return "Err";
            }
        }


        [System.Web.Services.WebMethod()]
        public static string CustomReport(string ReportName)
        {
            try
            {
                string strReturnMsg = string.Empty;

                string str_Query = "Select title,defaultreport,PublishedReport,mnu_id from l_menu where title='" + ReportName + "'";
                dynamic dt_menu = null; // DbInteract.Get_DataTable(str_Query);
                if (dt_menu != null)
                {
                    if ((dt_menu.Rows.Count > 0))
                    {
                        strReturnMsg = dt_menu.Rows(0)("defaultreport");
                        strReturnMsg = strReturnMsg + "^" + dt_menu.Rows(0)("PublishedReport");
                        strReturnMsg = strReturnMsg + "^" + dt_menu.Rows(0)("mnu_id");
                    }
                }
                return strReturnMsg;
            }
            catch (Exception ex)
            {
                // logger.Error(ex.Message, ex);
                return "Err";
            }
        }
        //public XtraReport()
        //{
        //    Load += Page_Load;
        //}

    }
}


