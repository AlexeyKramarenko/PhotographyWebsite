using ApplicationCore.DomainModel;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;

namespace Infrastructure
{
    public class DataBaseContext : IdentityDbContext<IdentityUser>
    {
        public DataBaseContext() : base("DB")
        {
            Database.SetInitializer(new DBInitializer());
        }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Message> Messages { get; set; }
    }


   public class DBInitializer : DropCreateDatabaseIfModelChanges<DataBaseContext>

  //public class DBInitializer : DropCreateDatabaseAlways<DataBaseContext>
    {
        protected override void Seed(DataBaseContext db)
        {
            var userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(db));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(db));

            var adminRole = new IdentityRole { Name = "admin" };
            var userRole = new IdentityRole { Name = "user" };

            roleManager.Create(adminRole);
            roleManager.Create(userRole);

            #region Admin
            var admin = new IdentityUser { UserName = "admin" };
            string password = "123123";
            var result = userManager.Create(admin, password);
            if (result.Succeeded)
            {
                userManager.AddToRole(admin.Id, adminRole.Name);
            }
            #endregion
             

            var gallery = new Gallery
            {
                GalleryID = 1,
                Username = "admin",
                CreatedDate = DateTime.Now,
                Pictures = new List<Picture>
                {
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/1.jpg", ThumbnailImagePath = "/Images/gallery/1_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/2.jpg", ThumbnailImagePath = "/Images/gallery/2_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/3.jpg", ThumbnailImagePath = "/Images/gallery/3_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/4.jpg", ThumbnailImagePath = "/Images/gallery/4_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/5.jpg", ThumbnailImagePath = "/Images/gallery/5_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/6.jpg", ThumbnailImagePath = "/Images/gallery/6_thumb.jpg" },
                        new Picture { GalleryID = 1, LargeImagePath = "/Images/gallery/7.jpg", ThumbnailImagePath = "/Images/gallery/7_thumb.jpg" },
                }
            };
            db.Galleries.Add(gallery);
            db.SaveChanges();
            var article = new Article
            {
                ArticleID = 1,
                PageName = "Послуги",
                Text = ""
            };
            db.Articles.Add(article);
            db.SaveChanges();
        }
    }
}
