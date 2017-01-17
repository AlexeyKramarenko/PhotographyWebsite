using ApplicationCore.ApplicationServices;
using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Photographer.Models.ViewModel;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace Photography.Controllers
{
    public class UserController : Controller
    {
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        IUserRepository userRepo;
        IImagesRepository imagesRepo;
        ISessionService sessionService;
        IMappingService mappingService;
        IOrderRepository orderRepository;
        public UserController(IUserRepository userRepo, IImagesRepository imagesRepo, ISessionService sessionService, IMappingService mappingService, IOrderRepository orderRepository)
        {
            this.userRepo = userRepo;
            this.imagesRepo = imagesRepo;
            this.sessionService = sessionService;
            this.mappingService = mappingService;
            this.orderRepository = orderRepository;
        }
        [HttpPost]
        public JsonResult Login(LoginViewModel model)
        {
            OperationResult result = userRepo.LoginUser(model.Username, model.Password);
            object data = null;
            if (result.Succeded)
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                var userIdentity = (ClaimsIdentity)result.Data;
                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = false }, userIdentity);
                                
                if (userRepo.UserIsInRole(model.Username, "admin"))
                {
                    data = new
                    {
                        isAdmin = true
                    };
                }
                else
                {
                    data = new
                    {
                        isAdmin = false,
                        galleryId = imagesRepo.GetGalleryByUsername(model.Username).GalleryID
                    };
                }
            }
            else
            {
                data = new
                {
                    error = "Користувача з такими даними не iснує."
                };
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public JsonResult GetUserList()
        {
            List<Gallery> galleries = userRepo.GetGalleries();
            var users = new List<UserItemViewModel>();
            foreach (var gallery in galleries)
            {
                UserItemViewModel user = mappingService.Map<Gallery, UserItemViewModel>(gallery);
                users.Add(user);
            }
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete]
        public JsonResult RemoveUserByName(string id)
        {
            OperationResult res = userRepo.RemoveUserByName(id);
            if (res.Succeded)
            {
                Gallery gallery = imagesRepo.GetGalleryByUsername(id);

                foreach (var item in gallery.Pictures)
                {
                    System.IO.File.Delete(Server.MapPath("~" + item.LargeImagePath));
                    System.IO.File.Delete(Server.MapPath("~" + item.ThumbnailImagePath));
                }

                imagesRepo.DeleteGalleryByID(gallery.GalleryID);
                int res1 = imagesRepo.Save();

                orderRepository.RemoveOrderByID(gallery.GalleryID);
                int res2 = orderRepository.Save();

                return Json("Операція виконана успішно", JsonRequestBehavior.AllowGet);
            }
            else
                return Json("Виникли проблеми", JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public JsonResult CreateUser(NewUserViewModel model)
        {
            OperationResult result = userRepo.CreateUser(model.Username, model.Password);
            if (result.Succeded)
            {
                imagesRepo.CreateGalleryForAddedUser(model.Username);
                int res = imagesRepo.Save();
                if (res == 1)
                    return Json("Користувача додано успiшно.");
                else
                    return Json("Виникла помилка при створеннi користовача.", JsonRequestBehavior.AllowGet);
            }
            else
                return Json("Виникла помилка при створеннi користовача.", JsonRequestBehavior.AllowGet);

        }

    }
}



