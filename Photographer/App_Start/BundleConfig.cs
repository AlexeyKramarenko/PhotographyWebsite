using System.Web;
using System.Web.Optimization;

namespace Photographer
{
    public class BundleConfig
    {        
        public static void RegisterBundles(BundleCollection bundles)
        {  
            bundles.Add(new StyleBundle("~/Content/dark_theme_styles").Include(
                      "~/Content/Site.css",
                      "~/Content/dark/xmlrpc.phps",
                      "~/Content/dark/wp-content/themes/jphotolio/style.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/bootstrap.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/style.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/bootstrap-responsive.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/style-responsive.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/plugin.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/fotorama.css",
                      "~/Content/dark/wp-content/themes/jphotolio/css/dark.css",
                      "~/Content/dark/index.css"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/dark_theme_scripts").Include(
                     "~/Scripts/jquery-1.10.2.min.js",
                     "~/Content/dark/wp-includes/js/jquery/jquery-migrate.min.js",
                     "~/Content/dark/wp-content/themes/jphotolio/js/libs/modernizr-2.5.3.min.js",
                     "~/Content/dark/wp-content/themes/jphotolio/js/plugins.js",
                     "~/Content/dark/wp-content/themes/jphotolio/js/script.full.js"
                     )); 
        }
    }
}
