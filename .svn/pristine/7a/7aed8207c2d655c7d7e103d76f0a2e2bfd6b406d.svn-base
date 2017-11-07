using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
//using AngularAspNetMvc.Data.Models;
//using AngularAspNetMvc.DataAccess.Repository;
using Microsoft.Reporting.WebForms;
using WebGrease.Css.Extensions;
using ReportParameter = Microsoft.Reporting.WebForms.ReportParameter;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data.SqlClient;

using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.Collections.Specialized;
using System.IO;
using System.Text;
using System.Globalization;
using System.Diagnostics;

namespace BAE.ViewsStatic
{
    public partial class ReportForm : System.Web.UI.Page
    {
        protected static readonly log4net.ILog log = log4net.LogManager.GetLogger("ReportForm");

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                log.Info("Page load Started");
                if (!IsPostBack && HiddenField1.Value != "loaded")
                {
                    log.Info("Page load 3");
                    string param = Request.QueryString["rp"];
                    string export = Request.QueryString["export"];
                    Guid requestID = new Guid(Request.QueryString["r"]);
                    /*var data = getResponse(requestID.ToString());
                    log.Info("Page load 4" + data);
                    if (data == "") return;
                    JObject jsonObj = JObject.Parse(data);
                    string fileName = jsonObj["FileName"].Value<string>();*/

                    string fileName = getResponseSQL(requestID.ToString());
                    if (fileName == null || fileName == "")
                        fileName = "";
                    string userid = Request.QueryString["userid"];
                    if (userid == null || userid == "")
                        userid = "0";
                    log.Info("Page load 5" + userid);
                    string reportServerUser = ConfigurationManager.AppSettings["ReportServerUser"];
                    string reportServerPassword = ConfigurationManager.AppSettings["ReportServerPassword"];
                    string reportServerDomain = ConfigurationManager.AppSettings["ReportServerDomain"];
                    string reportPath = ConfigurationManager.AppSettings["ReportServerPath"];
                    log.Info("Page load 6" + reportPath);

                    IReportServerCredentials irsc = new CustomReportCredentials(reportServerUser, reportServerPassword, reportServerDomain);
                    log.Info("Page load 7" + irsc.ToString());
                    mainReportViewer.ServerReport.ReportServerCredentials = irsc;
                    mainReportViewer.ServerReport.ReportServerUrl =
                        new Uri(ConfigurationManager.AppSettings["ReportServerUrl"]);
                    mainReportViewer.ServerReport.ReportPath =
                        string.Format(ConfigurationManager.AppSettings["ReportPath"], reportPath.Substring(1) + "/" + fileName);
                    mainReportViewer.ProcessingMode = ProcessingMode.Remote;
                    log.Info("Page load 8" + mainReportViewer.ServerReport.ReportPath.ToString());

                    // Set the report parameters for the report 
                    if (param != null)
                    {
                        Dictionary<string, string> reportParams = JsonConvert.DeserializeObject<Dictionary<string, string>>(param);
                        if (reportParams.Count > 0)
                        {
                            ReportParameter[] reportParameter = new ReportParameter[reportParams.Count];

                            int iLoop = 0;
                            foreach (var para in reportParams)
                            {
                                reportParameter[iLoop] = new ReportParameter(para.Key.ToString(), para.Value.ToString());
                                iLoop++;
                            }

                            if (iLoop > 0) mainReportViewer.ServerReport.SetParameters(reportParameter);
                            log.Info("Page load 9" + iLoop);
                        }
                    }

                    try
                    {
                        mainReportViewer.ServerReport.SetParameters(new ReportParameter("path", reportPath));
                        mainReportViewer.ServerReport.SetParameters(new ReportParameter("pam_UserId", userid));
                    }
                    catch (Exception exc)
                    {
                        log.Error(exc.Message, exc);
                    }

                    mainReportViewer.ServerReport.Refresh();
                    HiddenField1.Value = "loaded";
                    if (export == "true")
                    {
                        string title = Request.QueryString["title"];
                        CreateWord(mainReportViewer, title);


                    }
                }
            }
            catch (Exception exc)
            {
                log.Error(exc.Message, exc);
            }
        }

        private void CreateWord(ReportViewer mainReportViewer, string fileName)
        {
            try
            {
                Warning[] warnings;
                string[] streamids;
                string mimeType, encoding, extension, deviceInfo;

                extension = "docx";

                byte[] bytes = mainReportViewer.ServerReport.Render("Word", null, out mimeType, out encoding, out extension, out streamids, out warnings);

                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = mimeType;
                Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName + "." + extension);
                Response.BinaryWrite(bytes); // create the file
                Response.Flush();
                Response.End();
            }
            catch (Exception exc)
            {
                log.Error(exc.Message, exc);
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

        protected string getResponse(string requestID)
        {
            string responseString = "";
            try
            {
                log.Info("getResponse Calling");
                using (var client = new HttpClient())
                {
                    //client.BaseAddress = new Uri("http://1.0.0.135/tmspublish/");
                    string urlAPI = ConfigurationManager.AppSettings["urlAPI"];
                    client.BaseAddress = new Uri(urlAPI);
                    log.Error("getResponse" + urlAPI);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIxMDc0IiwidW5pcXVlX25hbWUiOiJCYWh1cnVkZWVuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiN2JjMTJlNDktN2E2NS00MWU1LWI0ZmUtYzBiZTA1N2Q0ZTFhIiwicm9sZSI6IlVzZXJHcm91cDIiLCJGVEUiOiIwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTgyMiIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIiwiZXhwIjoxNDcyNzM3NTI0LCJuYmYiOjE0NzI2NTExMjR9.303JwYIB6LrPw6P4Vh06ojIrxDAhBXIohc3huORtX54");
                    log.Info("getResponse" + requestID.ToString());
                    HttpResponseMessage response = client.GetAsync("api/Reports/GetById/" + requestID).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        var responseContent = response.Content;
                        responseString = responseContent.ReadAsStringAsync().Result;
                    }
                    else
                    {
                        log.Error("Response Failure :" + response.Content.ToString());
                    }
                }

                return responseString;
            }
            catch (Exception exc)
            {
                log.Error(exc.Message, exc);
                return responseString;
            }
        }
    }

    public class CustomReportCredentials : IReportServerCredentials
    {
        private string _UserName;
        private string _PassWord;
        private string _DomainName;

        public CustomReportCredentials(string UserName, string PassWord, string DomainName)
        {
            _UserName = UserName;
            _PassWord = PassWord;
            _DomainName = DomainName;
        }

        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get { return null; }
        }

        public ICredentials NetworkCredentials
        {
            get { return new NetworkCredential(_UserName, _PassWord, _DomainName); }
        }

        public bool GetFormsCredentials(out Cookie authCookie, out string user,
         out string password, out string authority)
        {
            authCookie = null;
            user = password = authority = null;
            return false;
        }
    }


}