import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  // ?: null olabilir demek.
  // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
  categories !: Category[];

  categoryIdToDelete !:number;

  categoryAddForm!:FormGroup;

  error!:string;

  constructor(private categoriesService:CategoriesService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      description: ["",[Validators.required,Validators.minLength(10)]],
    });
  }

  getCategories() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => { //Observer design pattern
      this.categories = response;
    });
  }

  addCategory(){
    if(this.categoryAddForm.invalid){
      this.error = "Form is invalid";
      return;
    }
    //const {name , description} = this.categoryAddForm.value;
    const category: Category = {
      ...this.categoryAddForm.value
    };

    this.categoriesService.add(category).subscribe({
      next: (res) => {
        console.log(`Category (${res.id}) added`);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      },
      complete: () => {
        this.getCategories();
        this.categoryAddForm.reset();
      }
    });
  }

  delete(){
    this.categoriesService.delete(this.categoryIdToDelete).subscribe({
      next: (res) => {
        console.log(`Category (${res}) deleted`);
      },
      error: (err) => {
        console.log("Hataaa: "+ err.message);
      },
      complete: () => {
        this.categoryIdToDelete = 0;
        this.getCategories();
      }
    });
  }


}
