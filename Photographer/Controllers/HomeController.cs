using ApplicationCore.DomainServices;
using System.Web.Mvc;
using System.Web;
using Microsoft.Owin.Security;
using ApplicationCore.DomainModel;
using ApplicationCore.ApplicationServices;
using Photographer.Models.ViewModel;
using System.Collections.Generic;
using System;

namespace Photographer.Controllers
{
    public class HomeController : Controller
    {
        IUserRepository userRepo;
        IImagesRepository imagesRepo;
        ISessionService sessionService;
        IMessageService messageService;
        IMappingService mappingService;
        public HomeController(IUserRepository userRepo, IImagesRepository imagesRepo, ISessionService sessionService, IMessageService messageService, IMappingService mappingService)
        {
            this.userRepo = userRepo;
            this.imagesRepo = imagesRepo;
            this.sessionService = sessionService;
            this.messageService = messageService;
            this.mappingService = mappingService;
        }

        [HttpPost]
        public JsonResult SendMessage(MessageViewModel model)
        {
            string text = null;

            try
            {
                var msg = new Message
                {
                    Date = DateTime.Now,
                    Email = model.Email,
                    Name = model.Name,
                    Text = model.Text
                };
                messageService.SendMessage(msg);

                text = "Ваше повiдомлення вiдправлено.";
            }
            catch
            {
                text = "Виникла помилка при спробi вiдправити повiдомлення.";
            }

            return Json(text, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            int mainGalleryId = 1;
            var model = new List<PictureViewModel>();

            Gallery gallery = imagesRepo.GetGalleryByID(mainGalleryId);
            if (gallery != null)
            {
                ICollection<Picture> pictures = gallery.Pictures;
                if (pictures != null)
                    foreach (var pic in pictures)
                    {
                        PictureViewModel picture = mappingService.Map<Picture, PictureViewModel>(pic);
                        model.Add(picture);
                    }
            }
            return View(model);
        }

        public JsonResult GetGallery()
        {
            int mainGalleryId = 1;
            var model = new List<PictureViewModel>();

            Gallery gallery = imagesRepo.GetGalleryByID(mainGalleryId);
            if (gallery != null)
            {
                ICollection<Picture> pictures = gallery.Pictures;
                if (pictures != null)
                    foreach (var pic in pictures)
                    {
                        PictureViewModel picture = mappingService.Map<Picture, PictureViewModel>(pic);
                        model.Add(picture);
                    }
            }
            return Json(model);
        }
    }
}