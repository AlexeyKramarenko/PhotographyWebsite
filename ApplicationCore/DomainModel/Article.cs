

using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.DomainModel
{
    public class Article
    {
        [Key]
        public int ArticleID { get; set; }
        
        [MaxLength(10000)]
        public string Text { get; set; }

        [MaxLength(20)]
        [Required]
        public string PageName { get; set; } 
    }
}
