using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using KeysOnboardProj3.Models;

namespace KeysOnboardProj3.Controllers
{
    public class ProductSoldsController : Controller
    {
        private KnockoutDbContext db = new KnockoutDbContext();

        // GET: Sales List
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResultExtension GetAllProductSolds()
        {
            var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);

            return new JsonResultExtension(productSolds, "dd/MM/yy");
        }

        // Code to save items into database
        [HttpPost]
        public JsonResult AddProductSold(ProductSold item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            db.ProductSolds.Add(item);
            db.SaveChanges();
            return new JsonResultExtension(item, "dd/MM/yy"); ;
        }

        [HttpPost]
        public ActionResult EditProductSold(ProductSold item)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var productSold = db.ProductSolds.FirstOrDefault(a => a.Id == item.Id);

                    productSold.ProductId = item.ProductId;
                    productSold.CustomerId = item.CustomerId;
                    productSold.StoreId = item.StoreId;
                    productSold.DateSold = item.DateSold;
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Json(new { success = false });
                }
                return RedirectToAction("Index");
            }
            return Json(new { success = false });
        }

        [HttpPost]
        public JsonResult DeleteProductSold(int id)
        {
            try
            {
                ProductSold productSold = db.ProductSolds.Find(id);
                db.ProductSolds.Remove(productSold);
                db.SaveChanges();
            }
            catch
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
