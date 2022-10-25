// Product - Category
// Servisler - Tipleri
// CRUD operasyonları Create Read Update Delete
// GetAll, GetById, Add, Delete, Update
// Bütün servisleri ve bütün aksiyonlarını main.ts'de test et.
import { CategoryService } from "./services/categoryService.js";
import { ProductService } from "./services/productService.js";
var products = new ProductService();
products.addProduct({ id: 1, name: "jeans", size: "M", price: 200, categoryId: 1 });
products.addProduct({ id: 2, name: "t-shirt", size: "xl", price: 100, categoryId: 2 });
products.addProduct({ id: 3, name: "kazak", size: "M", price: 200, categoryId: 1 });
products.addProduct({ id: 4, name: "hırka", size: "M", price: 200, categoryId: 1 });
console.log("-------Tüm ürünler--------------");
console.log(products.getAll());
console.log("------------Get Product By ID-----------");
console.log(products.getById(2));
console.log("--------------Ürün Silme--------------");
products.deleteProduct(2);
console.log(products.getAll());
console.log("--------------Ürün Güncelleme------------");
products.updateProduct({ id: 3, name: "www", size: "L", price: 500, categoryId: 3 });
console.log("-------------------------------------------------");
var categories = new CategoryService();
categories.addCategory({ id: 1, name: "Man" });
categories.addCategory({ id: 2, name: "Women" });
categories.addCategory({ id: 3, name: "Kid" });
console.log("----------------------Kategorileri Getir--------------------");
console.log(categories.getAll());
console.log("----------------------Kategori Güncelleme-------------------");
categories.updateCategory({ id: 2, name: "teen" });
console.log(categories.getAll());
console.log("----------------------Delete Kategori-----------------------");
categories.deleteCategory(3);
console.log(categories.getAll());
console.log("---------------------Get Category By ID---------------------");
console.log(categories.getById(1));
