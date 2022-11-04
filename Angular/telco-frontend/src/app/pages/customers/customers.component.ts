import { Component, OnInit } from '@angular/core';

import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:any[];
  customerName:string = '';
  companyName:string = '';
  nationalId:string = '';
  taxNumber:string = '';
  individuals!:IndividualCustomers[];
  corporates!:CorporateCustomers[];
  selectedCustomer:boolean = true;
  dateOfBirth!:string;
  today:string = new Date().getFullYear().toString();

  constructor(private individualCustomers:IndividualCustomersService,private corporateCustomers:CorporateCustomersService) { }

  ngOnInit(): void {
    this.getIndividualCustomers();
  }


  getIndividualCustomers(){
    this.individualCustomers.getAllCustomers().subscribe((res) => {
      this.individuals = res;
    });
    this.selectedCustomer = true;
  }

  getCorporateCustomers(){
    this.corporateCustomers.getAllCustomers().subscribe((res) => {
      this.corporates = res;
    })
    this.selectedCustomer = false;
 }
}
