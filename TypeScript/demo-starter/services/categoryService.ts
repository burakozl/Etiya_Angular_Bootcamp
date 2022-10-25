import { Category } from "../models/category-model";

export class CategoryService {
    private categories:Category[] = [];
    
    // GetAll, GetById, Add, Delete, Update

    getAll():Category[] {
        return this.categories;
    }

    getById(id:number){
        return this.categories.find(category => category.id === id);      
    }

    addCategory(category:Category){
        this.categories.push(category);
    }

    deleteCategory(id:number){
        this.categories = this.categories.filter(category => category.id !== id); 
    }

    updateCategory({id,name}:Category){
        let updateCategory = this.categories.find(category => category.id === id);
        if(updateCategory){
            updateCategory.name = name;
        }else{
            console.log("Güncellemek istediğiniz kategori bulunamadı...");    
        }
    }

}