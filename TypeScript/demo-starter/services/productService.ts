import { Product } from '../models/product-model.js';

export class ProductService {
    private products:Product[] = [];
    // constructor(){

    // }
    // GetAll, GetById, Add, Delete, Update
    getAll():Product[] {
        return this.products;
    }

    getById(id:number){
        return this.products.find(product => product.id === id);      
    }

    addProduct(product:Product){
        this.products.push(product);
        
    }

    deleteProduct(id:number){
        this.products = this.products.filter(product => product.id !== id); 
    }

    updateProduct({id,name,size,price,categoryId}:Product){
        let updatedProduct:Product = this.products.find(product => product.id === id);
        if(updatedProduct){
            updatedProduct.name = name;
            updatedProduct.size = size;
            updatedProduct.price = price;
            updatedProduct.categoryId = categoryId;
        }else{
            console.log("Güncellemek istediğiniz ürün bulunamadı...");
            
        }
        console.log(this.products);
        
    }
}