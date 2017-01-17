using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        UserStore<IdentityUser> userStore;
        UserManager<IdentityUser> userManager;
        RoleStore<IdentityRole> roleStore;
        RoleManager<IdentityRole> roleManager;

        public UserRepository()
        {
            userStore = new UserStore<IdentityUser>(db);
            userManager = new UserManager<IdentityUser>(userStore);
            roleStore = new RoleStore<IdentityRole>(db);
            roleManager = new RoleManager<IdentityRole>(roleStore);

        }
        public bool UserIsInRole(string userName, string roleName)
        {
            IdentityRole role = (from r in db.Roles where r.Name.Contains(roleName) select r).FirstOrDefault();
            List<IdentityUser> users = db.Users.Where(x => x.Roles.Select(y => y.RoleId).Contains(role.Id)).ToList();
            if (users.Find(x => x.UserName == userName) != null)
            {
                return true;
            }
            return false;
        }
        public OperationResult CreateUser(string userName, string password)
        {
            var user = new IdentityUser() { UserName = userName };
            IdentityResult result = userManager.Create(user, password);
            if (result.Succeeded)
            {
                IdentityRole userRole = roleManager.FindByName("user");
                string userId = user.Id;
                userManager.AddToRole(userId, userRole.Name);
                var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);

                return new OperationResult { Succeded = true, Data = userIdentity };
            }
            return new OperationResult { Succeded = false, Message = "Возникли ошибки при создании пользователя." };
        }
        public OperationResult LoginUser(string userName, string password)
        {
            IdentityUser user = userManager.Find(userName, password);
            if (user != null)
            {
                var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
                return new OperationResult { Succeded = true, Data = userIdentity };
            }
            return new OperationResult { Succeded = false, Message = "Пользователя с таким именем или паролем нет." };
        }

        public OperationResult RemoveUserByID(string userId)
        {
            IdentityUser user = userManager.FindById(userId);
            string username = user.UserName;
            if (user != null)
            {
                IdentityResult result = userManager.Delete(user);
                if (result.Succeeded)
                    return new OperationResult { Succeded = true };
            }
            return new OperationResult { Succeded = false, Message = "Возникли ошибки при попытке удалить пользователя.", Data = username };
        }

        public OperationResult UpdateUser(IdentityUser user)
        {
            IdentityUser _user = userManager.FindById(user.Id);
            if (_user != null)
            {
                IdentityResult result = userManager.Update<IdentityUser, string>(user);
                if (result.Succeeded)
                    return new OperationResult { Succeded = true };
            }
            return new OperationResult { Succeded = false, Message = "Возникли ошибки при попытке изменить данные пользователя." };
        }
        public List<Gallery> GetGalleries()
        {
            List<Gallery> galleries = db.Galleries.ToList();
            Gallery mainGallery = galleries.Find(a => a.GalleryID == 1);
            galleries.Remove(mainGallery);

            return galleries;
        }

        public string GetUsernameByGalleryID(int galleryId)
        {
            Gallery gallery = db.Galleries.Find(galleryId);
            if (gallery != null)
                return gallery.Username;
            return null;
        }

        public OperationResult RemoveUserByName(string username)
        {
            IdentityUser user = userManager.FindByName(username);
            if (user != null)
            {
                IdentityResult result = userManager.Delete(user);
                if (result.Succeeded)
                    return new OperationResult { Succeded = true };
            }
            return new OperationResult { Succeded = false, Message = "Возникли ошибки при попытке удалить пользователя." };

        }
    }
}
