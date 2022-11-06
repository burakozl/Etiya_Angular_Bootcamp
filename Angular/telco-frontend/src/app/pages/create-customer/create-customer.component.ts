import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;

  isChecked:boolean = true;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
  }

  createIndividualCustomerForm(){
    this.createIndividualCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalIdentity: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dateOfBirth:['',Validators.required]
    });
  }

  createCorporateCustomerForm(){
    this.createCorporateCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      companyName: ['', Validators.required],
      taxNumber: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  clickCustomerOption(selectedChoice:boolean) {
    this.isChecked = selectedChoice;
  }
}
