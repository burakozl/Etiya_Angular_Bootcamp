var CategoryService = /** @class */ (function () {
    function CategoryService() {
        this.categories = [];
    }
    // GetAll, GetById, Add, Delete, Update
    CategoryService.prototype.getAll = function () {
        return this.categories;
    };
    CategoryService.prototype.getById = function (id) {
        return this.categories.find(function (category) { return category.id === id; });
    };
    CategoryService.prototype.addCategory = function (category) {
        this.categories.push(category);
    };
    CategoryService.prototype.deleteCategory = function (id) {
        this.categories = this.categories.filter(function (category) { return category.id !== id; });
    };
    CategoryService.prototype.updateCategory = function (_a) {
        var id = _a.id, name = _a.name;
        var updateCategory = this.categories.find(function (category) { return category.id === id; });
        if (updateCategory) {
            updateCategory.name = name;
        }
        else {
            console.log("Güncellemek istediğiniz kategori bulunamadı...");
        }
    };
    return CategoryService;
}());
export { CategoryService };
