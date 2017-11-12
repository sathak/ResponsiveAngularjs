
using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;

using System.IO;
using DevExpress.XtraReports.UI;
using System.Web;
using System.ServiceModel;
using System.Linq;

using System.Data.SqlClient;
//Imports SimpleWebReportCatalog.CatalogDataTableAdapters

public class report
{
    public string ReportID;
    public string DisplayName;
}

public class FilesystemReportStorageWebExtension : DevExpress.XtraReports.Web.Extensions.ReportStorageWebExtension
{
    private HttpContext _context;

    private string storagePath = string.Empty;
    public FilesystemReportStorageWebExtension(HttpContext context__1)
    {
        this._context = context__1;
        storagePath = _context.Server.MapPath("~\\ReportStorage\\");
    }

    public HttpContext Context
    {
        get { return _context; }
    }

    protected string GetPath(string url)
    {
        if (Path.IsPathRooted(url))
        {
            return url;
        }
        //  url = Context.Server.MapPath(url);
        url = (storagePath + url) + ".resx";
        return url;
    }

    public override bool CanSetData(string url)
    {
        string filePath = GetPath(url);
        return File.Exists(filePath);
    }

    public virtual IList<report> GetMenuUrls()
    {
        Dictionary<string, string> urls = new Dictionary<string, string>();
        List<report> rep = new List<report>();
        urls = GetUrls();

        foreach (KeyValuePair<string, string> keyVal in urls)
        {
            report repo = new report();
            if (true)
            {
                repo.ReportID = keyVal.Key.ToString();
                repo.DisplayName = keyVal.Value.ToString();
            }
            rep.Add(repo);
        }
        return rep;
    }

    public override byte[] GetData(string url)
    {
        try
        {
            // url = "XtraReport1";
            //string storagePath = Context.Server.MapPath(@"~\ReportStorage\");
            //Dim reportPath As String = (storagePath & url) + ".resx"
            //Dim filePath As String = GetPath(reportPath)
            string filePath = GetPath(url);
            // filePath = "D:\\DevExpressReport\\ReportsStorage\\" + url +".resx";
            return File.ReadAllBytes(filePath);
        }
        catch (Exception ex)
        {
            //Pass readable exception message to the Web Report Designer
            throw null;
        }
    }

    public override Dictionary<string, string> GetUrls()
    {
        // string storagePath = Context.Server.MapPath(@"~\ReportStorage\"); //ReportsStorage

        Dictionary<string, string> urls = new Dictionary<string, string>();
        string[] reportFiles = Directory.GetFiles(storagePath, "*.resx", SearchOption.AllDirectories);

        foreach (string filePath in reportFiles)
        {
            // string fNamefull = filePath.Replace(storagePath, String.Empty);
            string fName = filePath.Replace(storagePath, String.Empty).Replace(".resx", String.Empty);
            // Dim fName As String = filePath
            urls.Add(filePath, fName);
        }
        return urls;
    }

    public override bool IsValidUrl(string url)
    {
        //string storagePath = Context.Server.MapPath(@"~\Report\");
        //string reportPath = storagePath + url + ".resx";
        //string filePath = GetPath(reportPath);
        string filePath = GetPath(url);

        if (File.Exists(filePath))
        {
            return true;
        }

        try
        {
            File.Create(filePath).Close();
            File.Delete(filePath);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public override void SetData(XtraReport report, string url)
    {
        try
        {
            // string storagePath = Context.Server.MapPath(@"~\ReportStorage\");
            //Dim reportPath As String = (storagePath & url) + ".resx"
            //Dim filePath As String = GetPath(reportPath)
            string filePath = GetPath(url);

            //string filePath = GetPath(url);
            //throw new NotSupportedException("Saving is not allowed."); //Comment this line to enable saving
            report.SaveLayout(filePath, true);
        }
        catch (Exception ex)
        {
            //Pass readable exception message to the Web Report Designer
           // throw new FaultException(ex.Message);
        }
    }

    public override string SetNewData(XtraReport report, string defaultUrl)
    {
        try
        {
            //Dim reportPath As String = (storagePath & defaultUrl) + ".resx"
            //Dim filePath As String = GetPath(reportPath)
            string filePath = GetPath(defaultUrl);
            //string filePath = GetPath(defaultUrl);
            // throw new NotSupportedException("Saving is not allowed."); //Comment this line to enable saving
            report.SaveLayout(filePath, true);

            //int MenuID = 0;
            //string str_Query = "select max(mnu_id) as mnu_id from l_menu ";
            //dynamic dt_EmpID = null; // DbInteract.Get_DataTable(str_Query);
            //if (dt_EmpID != null)
            //{
            //    if ((dt_EmpID.Rows.Count > 0))
            //    {
            //        MenuID = dt_EmpID.Rows(0)("mnu_id");
            //        MenuID = MenuID + 1;
            //    }
            //}

            //string qry_ReportExists = "select * from l_menu where title=N'" + defaultUrl + "' ";
            //dynamic dt_report = null; //DbInteract.Get_DataTable(qry_ReportExists);
            //if (dt_report != null)
            //{
            //    if ((dt_report.Rows.Count == 0))
            //    {
            //        str_Query = "insert into l_menu(pid, mnu_id, title, img_file, page_url, menu_type, menu_header, Content_Type, Target, So, isDel, Cdt, Cby, Mby,defaultreport, PublishedReport, Menu_Rights)" + "VALUES(141," + MenuID + ",N'" + defaultUrl + "','default.jpg','~/AppAdmin/DevExReport.aspx',3,N'" + defaultUrl + "',NULL,0,1000,0,GETDATE(),NULL,0,0,0,0)";
            //    }
            //    else {
            //        str_Query = "update l_menu set img_file='default.jpg', page_url ='~/AppAdmin/DevExReport.aspx',  menu_header = N'" + defaultUrl + "' where title = N'" + defaultUrl + "'";
            //    }


            //    string constr = "";// DbInteract.get_ConnLMS;
            //    SqlConnection con = new SqlConnection(constr);
            //    SqlCommand cmd = new SqlCommand(str_Query, con);
            //    cmd.CommandType = CommandType.Text;
            //    con.Open();
            //    cmd.ExecuteNonQuery();
            //    con.Close();

            //}
            return filePath;
        }
        catch (Exception ex)
        {
            //Pass readable exception message to the Web Report Designer
          throw null;
        }
    }
}

