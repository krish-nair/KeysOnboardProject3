using System;
using System.ComponentModel.DataAnnotations;


namespace KeysOnboardProj3.Models
{
    public class ProductSold
    {
        public virtual int Id { get; set; }
        public virtual int ProductId { get; set; }
        public virtual int CustomerId { get; set; }
        public virtual int StoreId { get; set; }

        //[JsonConverter(typeof(IsoDateTimeConverter))]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yy}")]
        public virtual DateTime DateSold { get; set; }
        public virtual Product Product { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Store Store { get; set; }
    }
}