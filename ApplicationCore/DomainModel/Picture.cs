using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationCore.DomainModel
{
    public class Picture
    {
        [Key]
        public int PictureID { get; set; }
        [MaxLength(300)]
        public string LargeImagePath { get; set; }
        [MaxLength(300)]
        public string ThumbnailImagePath { get; set; }        
        public bool IsOrdered { get; set; }

        public int GalleryID { get; set; }

        [ForeignKey("GalleryID")]
        public virtual Gallery Gallery { get; set; }

    }


    
}
