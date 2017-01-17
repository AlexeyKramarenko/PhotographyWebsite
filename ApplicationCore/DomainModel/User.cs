using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ApplicationCore.DomainModel
{
    //for MVC 3 project only
    public class User
    {
        [Key]
        public Guid UserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        //public Guid RoleID { get; set; }
        //[ForeignKey("RoleID")]
        //public virtual List<Role> Roles { get; set; }
    }

    //public class Role
    //{
    //    [Key]
    //    public Guid RoleID { get; set; }
    //    public string RoleName { get; set; }

    //    public Guid UserID { get; set; }
    //    [ForeignKey("UserID")]
    //    public virtual List<User> Users { get; set; }
    //}
}
