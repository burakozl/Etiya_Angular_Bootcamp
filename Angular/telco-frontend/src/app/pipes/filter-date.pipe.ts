import { Pipe, PipeTransform } from '@angular/core';

import { IndividualCustomers } from '../models/individualCustomers';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(value:IndividualCustomers[], a:string) {
    if(value instanceof Array){
      // return value.filter((item) => {
      //   let str = item.dateOfBirth.split(".").splice(2,1);
      //    str[0] === a;
      // });
      return value;
    }else{
      return [];
    }

  }

}
