using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Photographer.Models.ViewModel
{
    public class MessageViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Text { get; set; }
    }
    public class PictureViewModel
    {
        public int PictureID { get; set; }
        public string LargeImagePath { get; set; }
        public string ThumbnailImagePath { get; set; }
    }
    public class LoginViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class PictureItemViewModel
    {
        public int PictureID { get; set; }
        public int GalleryID { get; set; }
        public string LargeImagePath { get; set; }
        public string ThumbnailImagePath { get; set; }
        public bool Checked { get; set; }
    }
    public class GalleryViewModel
    {
        public GalleryViewModel()
        {
            Pictures = new List<PictureItemViewModel>();
        }
        public int GalleryID { get; set; }
        public List<PictureItemViewModel>  Pictures { get; set; }
    }
    public class NewGalleryPictureViewModel
    {
        public int GalleryID { get; set; }
        public string LargeImagePath { get; set; }
        public string ThumbnailImagePath { get; set; }
    }
    public class GalleryItemViewModel
    {
        public int PictureID { get; set; }
        public string ThumbnailImagePath { get; set; }
        public bool Checked { get; set; }
    }
    public class OrderViewModel
    {
        public int GalleryID { get; set; }
        public string Comment { get; set; }
        public int[] PictureIDs { get; set; }        
    }
    public class UserOrderViewModel
    { 
        public UserOrderViewModel()
        {
            Pictures = new List<PictureItemViewModel>();
        }
        public string Username { get; set; }
        public string Comment { get; set; }
        public int OrderID { get; set; }
        public List<PictureItemViewModel> Pictures { get; set; }  
    } 
    public class OrderItemViewModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public DateTime OrderDate { get; set; }
        public int GalleryID { get; set; } 
    }
    public class UserItemViewModel
    {
        public int GalleryID { get; set; }
        public string Username { get; set; }
        public DateTime CreatedDate { get; set; }

    }
    public class NewUserViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}