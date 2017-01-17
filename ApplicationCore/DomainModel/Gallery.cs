using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ApplicationCore.DomainModel
{
    public class Gallery
    {
        [Key]
        public int GalleryID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        public DateTime CreatedDate { get; set; }


        public virtual ICollection<Picture> Pictures { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
