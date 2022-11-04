import { Pipe, PipeTransform } from '@angular/core';
import { IndividualCustomers } from '../models/individualCustomers';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(value: IndividualCustomers[],key:string,name:string = ''):any {
    switch(key){
      case "name":
        if(value instanceof Array){
          return value.filter((customer) => customer.firstName.toLocaleLowerCase().includes(name.toLowerCase()));
          break;
        }else{
          return [];
          break;
        }
      case "id":
        return value.filter((customer) => customer.nationalIdentity.toString().includes(name));
        break;
      case "birthDay":
        return value.filter((customer) => customer.firstName.toLocaleLowerCase().includes(name.toLowerCase()));
        break;
      default:
         alert("not working");
         break;
  }

  }

}
