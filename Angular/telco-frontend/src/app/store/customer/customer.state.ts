import { CorporateCustomers } from "src/app/models/corporateCustomers";
import { IndividualCustomers } from "src/app/models/individualCustomers";
import { Service } from "src/app/models/service";

export interface CustomerStoreState {
  individualCustomerModel: IndividualCustomers ;
  corporateCustomerModel: CorporateCustomers ;
  serviceModel: Service ;
}

export const initialCustomerStoreState: CustomerStoreState = {
  individualCustomerModel: {
    customerId:0,
    firstName:'',
    lastName:'',
    nationalIdentity:0,
    dateOfBirth:''
  },
  corporateCustomerModel: {
    customerId: 0,
    companyName: '',
    taxNumber: 0
  },
  serviceModel: {
    id: 0,
    name: ''
  }
};
