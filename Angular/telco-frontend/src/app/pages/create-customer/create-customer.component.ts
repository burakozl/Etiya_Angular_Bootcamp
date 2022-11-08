import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  servicesForm:boolean = false;
  isIndividual:boolean = true;
  title:string = "Select Customer Type";
  services!: Service[];
  serviceForm!: FormGroup;
  stepCount:number = 0;
  individualCustomer!:any;
  corporateCustomer!:any;
  checkedServices!:Service[];

  constructor(
    private formBuilder:FormBuilder,
    private individualCustomerService:IndividualCustomersService,
    private corporateCustomerService:CorporateCustomersService,
    private servicesService:ServicesService,
    private customerService:CustomerService,
    private subscriptionService:SubscriptionsService,
    private invoiceService:InvoicesService,
    private toastrService:ToastrMessageService,
    private router:Router
    ) {
      this.serviceForm = formBuilder.group({
        selectedServices:  new FormArray([])
       });
     }

  ngOnInit(): void {
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
    this.getServices();
  }

  createIndividualCustomerForm(){
    this.createIndividualCustomer = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth:['',Validators.required]
    });
  }

  createCorporateCustomerForm(){
    this.createCorporateCustomer = this.formBuilder.group({
      companyName: ['', Validators.required],
      taxNumber: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  clickCustomerOption(selectedChoice:boolean) {
    this.isIndividual = selectedChoice;

  }

  goNextForm(){
    if(this.isIndividual && this.stepCount === 0 ){
      this.servicesForm = true;
      this.title = "Select Services";
      //this.store.dispatch(this.createIndividualCustomer.value);
      this.saveIndividualStore(this.createIndividualCustomer.value);
      //console.log(this.createIndividualCustomer.value);
      this.stepCount++;

    }else if(!this.isIndividual && this.stepCount === 0){
      this.servicesForm = true;
      this.title = "Services";
      //this.store.dispatch(this.createIndividualCustomer.value);
      this.saveCorporateStore(this.createCorporateCustomer.value);
      this.stepCount++;
    }else if(this.stepCount === 1){
      //Todo : store 'a service kaydını yap
      //özet sayfası gösterilecek
      this.title = "Summary"
      this.saveServicesStore(this.serviceForm.value);
      this.stepCount++;


      const selectedservices = this.services.filter((service) => {
          return this.serviceForm.value.selectedServices.some((selectedService:any) => {
            return selectedService === service.name;
          });
        })
      console.log(selectedservices);
      this.checkedServices = selectedservices;

    }else{
      this.toastrService.error("Form alanı zorunludur","Sistem Mesajı :")
    }

  }

  getServices() {
    this.servicesService.getServices().subscribe((response) => {
      this.services = response;
   })
  }

  onCheckboxChange(event: any) {

    const selectedServices = (this.serviceForm.controls['selectedServices'] as FormArray);

    if (event.target.checked) {
      selectedServices.push(new FormControl(event.target.value));
    } else {
      const index = selectedServices.controls
      .findIndex(x => x.value === event.target.value);
      selectedServices.removeAt(index);
    }
  }

  saveIndividualStore(customer:IndividualCustomers){
    this.individualCustomerService.saveIndividualCustomer(customer);
    this.individualCustomerService.individualCustomerModel$.subscribe((res) => {
      this.individualCustomer = res;
      console.log("individual :" , res);
    });
  }

  saveCorporateStore(customer:CorporateCustomers){
    this.corporateCustomerService.saveCorporateCustomer(customer);
    this.corporateCustomerService.corporateCustomerModel$.subscribe((res) => {
      this.corporateCustomer = res;
      console.log("corporate :",res);
    });
  }

  saveServicesStore(services:Service){
    this.servicesService.saveServices(services);
    this.servicesService.serviceModel$.subscribe((res) => {
      console.log("services :",res);
    })
  }


  saveCustomer(){
    const newCustomer:Customer = {
      id:null,
      customerNumber: Math.floor(10000000 + Math.random() * 90000000)
    }
    this.customerService.createCustomer(newCustomer).subscribe({
      next: (res) => {
        if(this.isIndividual){//add individual
          const addToIndividual = {
            id:res.id,
            customerId: res.id,
            ...this.individualCustomer,
            nationalIdentity: Math.floor(10000000000 + Math.random() * 9000000000),
          };
          console.log(addToIndividual);

          this.individualCustomerService.createCustomer(addToIndividual).subscribe({
            next:(res) => {
              this.addServiceSubscriptionAndInvoice(res);
            }
          });

        }else{//add corporate
          const addToCorporate = {
            id:res.id,
            customerId: res.id,
            ...this.corporateCustomer,
          };
          console.log(addToCorporate);

          this.corporateCustomerService.createCustomer(addToCorporate).subscribe({
            next:(res) => {
              this.addServiceSubscriptionAndInvoice(res);
            }
          });
        }
      }
    });
  }

  addServiceSubscriptionAndInvoice(customer: any) {
    this.checkedServices.map((service) => {
      const subscription: Subscription = {
        customerId: customer.customerId,
        serviceId: service.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionService.postSubscription(subscription).subscribe({
        next: (response) => {
          let date = new Date(response.dateStarted);
          date.setDate(date.getDate() + 28);
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoice = {
            subscriptionId: response.id,
            dateCreated: response.dateStarted,
            dateDue: dateDue,
          };
          this.invoiceService.postInvoices(invoice).subscribe();
        },
        error: () => {
          this.toastrService.error('Something went wrong','System Message');
        },
        complete: () => {
          this.toastrService.success('Kayıt işlemi başarıyla tamamlandı...');
          this.router.navigateByUrl('/customers');
        },
      });
    });
  }

}
