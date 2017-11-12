using System.Web.Optimization;

namespace BAE.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
        }

    }
}