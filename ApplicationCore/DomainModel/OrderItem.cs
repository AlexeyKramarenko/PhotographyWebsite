using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationCore.DomainModel
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; }
        [Required]
        public int PictureID { get; set; }


        [ForeignKey("Order")]
        public int OrderID { get; set; }
        public virtual Order Order { get; set; }

    }
}
