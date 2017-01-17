using ApplicationCore.DomainModel;
using System;
using System.Collections.Generic;


namespace ApplicationCore.DomainServices
{
    public interface IImagesRepository : IDisposable
    {
        void DeletePictureByID(int pictureId);
        void DeleteGalleryByID(int galleryId);
        Picture GetPictureByID(int pictureId);
        IEnumerable<Picture> GetPicturesByIDs(int[] pictureIds);
        Gallery GetGalleryByUsername(string username);
        IEnumerable<Picture> GetPicturesByGalleryID(int galleryId);
        Gallery GetGalleryByID(int galleryId);
        void CreateGalleryForAddedUser(string username);
        void InsertPicture(Picture pic);
        void UpdatePicture(Picture pic);
        int Save();

    }
}
