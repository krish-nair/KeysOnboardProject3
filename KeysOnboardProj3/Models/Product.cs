using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KeysOnboardProj3.Models
{
    public class Product
    {
        public virtual int Id { get; set; }

        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Product name is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special charecters are not allowed")]
        public virtual string Name { get; set; }

        [Display(Name = "Product Price")]
        [Required(ErrorMessage = "Product price is required")]
        public virtual decimal Price { get; set; }


    }
}