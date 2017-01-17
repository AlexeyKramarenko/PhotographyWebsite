using ApplicationCore.DomainServices;
using System.Collections.Generic;
using System.Linq;
using ApplicationCore.DomainModel;
using System.Transactions;
using System;

namespace Infrastructure
{
    public class ImagesRepository : BaseRepository, IImagesRepository
    {
        public void DeletePictureByID(int pictureId)
        {
            Picture pic = db.Pictures.Find(pictureId);
            if (pic != null)
                db.Pictures.Remove(pic);
        }

        public Picture GetPictureByID(int pictureId)
        {
            Picture pic = db.Pictures.Find(pictureId);
            return pic;
        }

        public IEnumerable<Picture> GetPicturesByGalleryID(int galleryId)
        {
            IEnumerable<Picture> pictures = db.Pictures.Where(a => a.GalleryID == galleryId).ToList();
            return pictures;
        }

        public Gallery GetGalleryByID(int galleryId)
        {
            Gallery gallery = db.Galleries.Include("Pictures").FirstOrDefault(a => a.GalleryID == galleryId);
            return gallery;
        }
        public Gallery GetGalleryByUsername(string username)
        {
            Gallery gallery = db.Galleries.Include("Pictures").FirstOrDefault(a => a.Username == username);
            return gallery;
        }
        public void InsertPicture(Picture pic)
        {
            db.Pictures.Add(pic);
        }

        public void UpdatePicture(Picture pic)
        {
            db.Entry(pic).State = System.Data.Entity.EntityState.Modified;
        }
        public void CreateGalleryForAddedUser(string username)
        {
            var gallery = new Gallery { Username = username, CreatedDate = DateTime.Now };
            db.Galleries.Add(gallery);
        }
        public void DeleteGalleryByID(int galleryId)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                Gallery gallery = db.Galleries.Include("Pictures").FirstOrDefault(a => a.GalleryID == galleryId);
                if (gallery != null)
                {
                    //gallery.Pictures.ToList().ForEach(p => db.Pictures.Remove(p));
                    db.Galleries.Remove(gallery);
                }
            }
        }

        public IEnumerable<Picture> GetPicturesByIDs(int[] pictureIds)
        {
            var pictures = new List<Picture>();
            foreach (var id in pictureIds)
            {
                Picture pic = db.Pictures.Find(id);
                if (pic != null)
                    pictures.Add(pic);
            }
            return pictures;
        }
    }
}
