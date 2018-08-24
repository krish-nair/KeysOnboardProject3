﻿using System;
using System.Linq;
using System.Web.Mvc;
using KeysOnboardProj3.Models;

namespace KeysOnboardProj3.Controllers
{
    public class ProductsController : Controller
    {
        private KnockoutDbContext db = new KnockoutDbContext();

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllProducts()
        {
            return Json(db.Products, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddProduct(Product item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            db.Products.Add(item);
            db.SaveChanges();
            return Json(item, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult EditProduct(Product item)
        {
            try
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }

                var product = db.Products.Single(a => a.Id == item.Id);
                product.Name = item.Name;
                product.Price = item.Price;
                db.SaveChanges();
            }
            catch
            {
                return Json(null);
            }
            return Json(db.Products, JsonRequestBehavior.AllowGet);

        }


        // POST: Products/Delete/5
        [HttpPost]
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                Product product = db.Products.Find(id);
                db.Products.Remove(product);
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
