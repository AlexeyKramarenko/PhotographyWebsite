using ApplicationCore.ApplicationServices;
using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using Photographer.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Photographer.Controllers
{
    public class GalleryController : Controller
    {
        IImagesRepository imagesRepo;
        ISessionService sessionService;
        IUserRepository userRepo;
        IMappingService mappingService;

        public GalleryController(IUserRepository userRepo, IImagesRepository imagesRepo, ISessionService sessionService, IMappingService mappingService)
        {
            this.userRepo = userRepo;
            this.imagesRepo = imagesRepo;
            this.sessionService = sessionService;
            this.mappingService = mappingService;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public JsonResult DeletePhotosByIDs(int[] ids)
        {
            DeletePhotosFromFolder(ids);
            int result = DeletePhotosFromDB(ids);

            if (result > 0)
                return Json("Фотографiї видалені успішно.", JsonRequestBehavior.AllowGet);

            return Json("Виникли проблеми під час видалення.", JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public JsonResult AddPhotoToGallery(NewGalleryPictureViewModel picture)
        {
            try
            {
                #region Move files from temp to destination directory
                string targetVirtualDir = "~/Images/gallery/";
                string targetDir = HttpContext.Server.MapPath(targetVirtualDir);

                string sourceLargeImagePath = HttpContext.Server.MapPath(picture.LargeImagePath);
                string destLargeImagePath = targetDir + Path.GetFileName(sourceLargeImagePath);
                Directory.Move(sourceLargeImagePath, destLargeImagePath);

                string sourceThumbnailImagePath = HttpContext.Server.MapPath(picture.ThumbnailImagePath);
                string destThumbnailImagePath = targetDir + Path.GetFileName(sourceThumbnailImagePath);
                Directory.Move(sourceThumbnailImagePath, destThumbnailImagePath);

                var pic = new Picture
                {
                    LargeImagePath = targetVirtualDir.Replace("~", "") + Path.GetFileName(sourceLargeImagePath),
                    ThumbnailImagePath = targetVirtualDir.Replace("~", "") + Path.GetFileName(sourceThumbnailImagePath),
                    GalleryID = picture.GalleryID
                };
                #endregion

                ClearTempDeirectory("~/Images/gallery/temp");
                imagesRepo.InsertPicture(pic);
                int result = imagesRepo.Save();


                if (result == 1)
                    return Json("Фотографiя додана успішно.", JsonRequestBehavior.AllowGet);

                return Json("Виникли проблеми під час додавання фото.", JsonRequestBehavior.AllowGet);
            }
            catch (Exception exc)
            {
                return Json("Виникли проблеми під час додавання фото.", JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        [ActionName("GetGalleryByID")]
        public JsonResult GetGalleryByID(int id)
        {
            Gallery gallery = imagesRepo.GetGalleryByID(id);
            if (gallery != null)
            {
                var model = new GalleryViewModel { GalleryID = gallery.GalleryID };
                foreach (var pic in gallery.Pictures)
                {
                    var p = mappingService.Map<Picture, PictureItemViewModel>(pic);
                    model.Pictures.Add(p);
                }

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(null, JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "admin")]
        [HttpDelete]
        public JsonResult DeleteGalleryByID(int id)
        {
            imagesRepo.DeleteGalleryByID(id);
            int result = imagesRepo.Save();
            if (result > 0)
                return Json("Галерея видалена успішно.", JsonRequestBehavior.AllowGet);
            return Json("Виникли проблеми.", JsonRequestBehavior.AllowGet);

        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        [ActionName("Upload")]
        public JsonResult Upload()
        {
            string tempImageDir = "~/Images/gallery/temp/";
            string[] formats = new string[] { "image/jpeg", "image/png" };
            HttpFileCollectionBase files = HttpContext.Request.Files;
            if (files.Count > 0)
            {
                HttpPostedFileBase file = files[0];
                if (file != null)
                {
                    if (formats.Contains(file.ContentType))
                    {
                        string fileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                        string tempImagePath = HttpContext.Server.MapPath(tempImageDir) + fileName;
                        string imageUrl = tempImageDir.Replace("~", "") + fileName;
                        file.SaveAs(tempImagePath);

                        return Json(imageUrl, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return null;
        }

        private void ClearTempDeirectory(string virtualPathTempDir)
        {
            string sourceDirectory = HttpContext.Server.MapPath(virtualPathTempDir);
            var di = new DirectoryInfo(sourceDirectory);

            foreach (FileInfo file in di.GetFiles())
                file.Delete();

        }
        private int DeletePhotosFromDB(int[] ids)
        {
            for (int i = 0; i < ids.Length; i++)
                imagesRepo.DeletePictureByID(ids[i]);

            int result = imagesRepo.Save();
            return result;
        }
        private void DeletePhotosFromFolder(int[] ids)
        {
            List<string> paths = new List<string>();

            for (int i = 0; i < ids.Length; i++)
            {
                var pic = imagesRepo.GetPictureByID(ids[i]);
                if (pic != null)
                {
                    paths.Add(pic.ThumbnailImagePath);
                    paths.Add(pic.LargeImagePath);
                }
            }

            foreach (string path in paths)
            {
                string fullPath = Request.MapPath("~" + path);
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
            }

        }
    }
}