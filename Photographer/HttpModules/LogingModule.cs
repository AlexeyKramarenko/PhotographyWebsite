using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Photographer.HttpModules
{
    public class LoggingModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.Error += new EventHandler(Error);
        }

        private void Error(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();

            string path = HttpContext.Current.Server.MapPath("~/Errors/" + DateTime.Now.Ticks.ToString() + ".txt");

            string content = string.Format("{0}\n Exception: {1}\n{2}\n\n", DateTime.Now.ToLongDateString(), ex.Message, ex.StackTrace);

            File.WriteAllText(path, content);
        }

        public void Dispose()
        {

        }
    }
}
