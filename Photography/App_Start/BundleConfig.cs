using System.Web;
using System.Web.Optimization;

namespace Photography
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

            bundles.Add(new ScriptBundle("~/bundles/angular_js").Include(
                "~/app/viewmodels.js",
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/angular-ui-router.min.js",
                "~/Scripts/angular-css.min.js",
                "~/app/photography.app.js",
                "~/app/photography.route.js",
                "~/app/http.service.js",
                "~/app/contacts/contacts.controller.js",
                "~/app/gallery/gallery.controller.js",
                "~/app/home/home.controller.js",
                "~/app/login/login.controller.js",
                "~/app/services/services.controller.js",
                "~/app/user.gallery/user.gallery.controller.js",
                "~/app/admin/admin.controller.js",
                "~/app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.controller.js",
                "~/app/admin/add.user/add.user.controller.js",
                "~/app/admin/edit.gallery.page/edit.gallery.page.controller.js",
                "~/app/admin/edit.service.page/edit.service.page.controller.js",
                "~/app/admin/gallery.page/gallery.page.controller.js",
                "~/app/admin/order/order.controller.js",
                "~/app/admin/order.list/order.list.controller.js",
                "~/app/admin/user.list/user.list.controller.js"
                          ));
        }
    }
}
