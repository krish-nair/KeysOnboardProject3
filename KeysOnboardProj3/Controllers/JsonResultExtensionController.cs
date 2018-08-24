using KeysOnboardProj3.Models;

namespace KeysOnboardProj3.Controllers
{
    internal class JsonResultEXtension
    {
        private ProductSold productSold;
        private string v;

        public JsonResultEXtension(ProductSold productSold, string v)
        {
            this.productSold = productSold;
            this.v = v;
        }
    }
}