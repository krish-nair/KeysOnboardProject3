using System.Data.Entity;

namespace KeysOnboardProj3.Models
{
    public class KnockoutDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<ProductSold> ProductSolds { get; set; }
    }
}