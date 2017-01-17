using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationCore.DomainModel
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        [MaxLength(5000)]
        public string Comment { get; set; }

        
        [ForeignKey("Gallery")]
        public int GalleryID { get; set; }
        public virtual Gallery Gallery { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }

}
