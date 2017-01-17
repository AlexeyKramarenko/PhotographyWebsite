using ApplicationCore.ApplicationServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
//using System.Web;

namespace Infrastructure
{
    public class SessionService : ISessionService
    { 
        public string UsersRole
        {
            get
            {
                if (HttpContext.Current.Session["Role"] != null)
                    return HttpContext.Current.Session["Role"].ToString();
                return null;
            }

            set
            {
                HttpContext.Current.Session["Role"] = value;
            }
        }
      
    }
}
