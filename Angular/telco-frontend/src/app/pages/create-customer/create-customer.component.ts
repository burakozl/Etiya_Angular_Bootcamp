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

  createIndividualCustomer!: FormGroup; // individual form tanımlandı
  createCorporateCustomer!: FormGroup; //corporate form tanımlandı
  servicesForm:boolean = false; //ilgili service next butonuna basılmadan gösterilmesin...
  isIndividual:boolean = true; // burada müşteri tipine göre form göstermek için değişken tanımlandı
  title:string = "Select Customer Type"; // title dinamik olarak alınıyor değer forma göre değiştiriliyor
  services!: Service[];
  serviceForm!: FormGroup;//service form tanımlandı
  stepNumber:number = 0; // form steplerini temsil eder ilk gösterilecek form değeri 0'ı gösterir
  individualCustomer!:any;
  corporateCustomer!:any;
  checkedServices!:Service[]; //seçilen servisler burada tutulur...

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
    this.createIndividualCustomerForm(); // individual Formgroup oluşturacak metot
    this.createCorporateCustomerForm(); // corporate  Formgroup oluşturacak metot
    this.getServices(); // servisleri sayfa ilk yüklendiğinde çekecek metot
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

  clickCustomerOption(selectedChoice:boolean) { //radio buttondan gelen değer control değerine atar
    this.isIndividual = selectedChoice;
  }

  goNextForm(){ // next butonuna basıldığında koşullara göre form gösterir
    if(this.isIndividual && this.stepNumber === 0 ){ // müşteri tipine göre gösterilecek form alanı (individual)
      this.servicesForm = true;
      this.title = "Select Services";
      this.saveIndividualStore(this.createIndividualCustomer.value);
      this.stepNumber++;

    }else if(!this.isIndividual && this.stepNumber === 0){ // müşteri tipine göre gösterilecek form alanı (corporate)
      this.servicesForm = true;
      this.title = "Services";
      this.saveCorporateStore(this.createCorporateCustomer.value);
      this.stepNumber++;
    }else if(this.stepNumber === 1){ // (step 2 ) service form
      this.title = "Summary"
      this.saveServicesStore(this.serviceForm.value);
      this.stepNumber++;


      const selectedservices = this.services.filter((service) => { //seçilen servisler, services json içersinden filterelenip selectedservices değişkenine atanıyor..
          return this.serviceForm.value.selectedServices.some((selectedService:any) => {
            return selectedService === service.name;
          });
        })
      console.log(selectedservices);
      this.checkedServices = selectedservices; // ilgili değişkeni globale taşır...

    }else{
      this.toastrService.error("Form alanı zorunludur","Sistem Mesajı :")
    }

  }

  getServices() { // servisler servicesService classından get isteği ile services verileri alınır...
    this.servicesService.getServices().subscribe((response) => {
      this.services = response;
   })
  }

  onCheckboxChange(event: any) {//listelenen servisler içerisinde ilgili servislerin seçilip seçilmediği işleminin yapıldığı metot

    const selectedServices = (this.serviceForm.controls['selectedServices'] as FormArray);

    if (event.target.checked) {//seçili service arraye push edilir..
      selectedServices.push(new FormControl(event.target.value));
    } else { // seçili service çıkarılırsa arraydan silinir...
      const index = selectedServices.controls
      .findIndex(x => x.value === event.target.value);
      selectedServices.removeAt(index);
    }
  }

  saveIndividualStore(customer:IndividualCustomers){//individual form değerleri oluşturulan store'a kayıt edilir..
    this.individualCustomerService.saveIndividualCustomer(customer);
    this.individualCustomerService.individualCustomerModel$.subscribe((res) => {
      this.individualCustomer = res;//store'dan alınan individualCustomerModel ilgili değişkene atandı...
      console.log("individual :" , res);
    });
  }

  saveCorporateStore(customer:CorporateCustomers){//corporate form değerleri oluşturulan store'a kayıt edilir..
    this.corporateCustomerService.saveCorporateCustomer(customer);
    this.corporateCustomerService.corporateCustomerModel$.subscribe((res) => {
      this.corporateCustomer = res;//store'dan alınan corporateCustomer ilgili değişkene atandı...
      console.log("corporate :",res);
    });
  }

  saveServicesStore(services:Service){//service form değerleri oluşturulan store'a kayıt edilir..
    this.servicesService.saveServices(services);
    this.servicesService.serviceModel$.subscribe((res) => {
      console.log("services :",res);//store'dan alınan serviceModel ilgili değişkene atandı...
    })
  }


  saveCustomer(){ // son stepde save butonu ile gerçekleştirilecek işlemler...
    const newCustomer:Customer = {
      id:null,
      customerNumber: Math.floor(10000000 + Math.random() * 90000000)
    }
    this.customerService.createCustomer(newCustomer).subscribe({  //customer json'a post edildi..
      next: (res) => {
        if(this.isIndividual){//individiual customer seçilmiş ise...
          const addToIndividual = {
            id:res.id,
            customerId: res.id,
            ...this.individualCustomer,
            nationalIdentity: Math.floor(10000000000 + Math.random() * 9000000000),
          };
          console.log(addToIndividual);

          this.individualCustomerService.createCustomer(addToIndividual).subscribe({//individualCustomer json'a post edildi..
            next:(res) => {
              this.addServiceSubscriptionAndInvoice(res);//seçilen servislerin,subscription'ların ve invoice'lerin eklenme işlemlerinin yapıldığı metot...
            }
          });

        }else{//corporate customer seçilmiş ise...
          const addToCorporate = {//post edilecek değerler objeye atanıyor..
            id:res.id,
            customerId: res.id,
            ...this.corporateCustomer,
          };
          console.log(addToCorporate);

          this.corporateCustomerService.createCustomer(addToCorporate).subscribe({
            next:(res) => {
              this.addServiceSubscriptionAndInvoice(res);//seçilen servislerin,subscription'ların ve invoice'lerin eklenme işlemlerinin yapıldığı metot...
            }
          });
        }
      }
    });
  }

  addServiceSubscriptionAndInvoice(customer: any) {
    this.checkedServices.map((service) => {//seçilen servisler
      const subscription: Subscription = {
        customerId: customer.customerId,
        serviceId: service.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionService.postSubscription(subscription).subscribe({//service post işlemi
        next: (response) => { //invoice post için ilgili datalar...
          let date = new Date(response.dateStarted);
          date.setDate(date.getDate() + 28);
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoice = {
            subscriptionId: response.id,
            dateCreated: response.dateStarted,
            dateDue: dateDue,
          };
          this.invoiceService.postInvoices(invoice).subscribe();//invoice post işlemi...
        },
        error: () => {//hata varsa...
          this.toastrService.error('Something went wrong','System Message');
        },
        complete: () => {//başarıyla tamamlandıysa...
          this.toastrService.success('Kayıt işlemi başarıyla tamamlandı...');
          this.router.navigateByUrl('/customers');
        },
      });
    });
  }

}
