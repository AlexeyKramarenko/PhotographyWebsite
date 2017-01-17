using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationCore.DomainModel
{
    public class Message
    {
        [Key]
        public Guid MessageID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MaxLength(3000)]
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
