var ProductService = /** @class */ (function () {
    function ProductService() {
        this.products = [];
    }
    // constructor(){
    // }
    // GetAll, GetById, Add, Delete, Update
    ProductService.prototype.getAll = function () {
        return this.products;
    };
    ProductService.prototype.getById = function (id) {
        return this.products.find(function (product) { return product.id === id; });
    };
    ProductService.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductService.prototype.deleteProduct = function (id) {
        this.products = this.products.filter(function (product) { return product.id !== id; });
    };
    ProductService.prototype.updateProduct = function (_a) {
        var id = _a.id, name = _a.name, size = _a.size, price = _a.price, categoryId = _a.categoryId;
        var updatedProduct = this.products.find(function (product) { return product.id === id; });
        if (updatedProduct) {
            updatedProduct.name = name;
            updatedProduct.size = size;
            updatedProduct.price = price;
            updatedProduct.categoryId = categoryId;
        }
        else {
            console.log("Güncellemek istediğiniz ürün bulunamadı...");
        }
        console.log(this.products);
    };
    return ProductService;
}());
export { ProductService };
