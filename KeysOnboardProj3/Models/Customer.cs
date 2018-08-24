using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace KeysOnboardProj3.Models
{
    public class Customer
    {
        public virtual int Id { get; set; }

        [Display(Name = "Customer Name")]
        [Required(ErrorMessage = "Customer name is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special charecters are not allowed")]
        public virtual string Name { get; set; }

        [Display(Name = "Customer Address")]
        [Required(ErrorMessage = "Please intput Customer Address")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Address { get; set; }

    }
}