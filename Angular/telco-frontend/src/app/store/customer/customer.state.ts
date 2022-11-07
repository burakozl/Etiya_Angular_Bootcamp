import { CorporateCustomers } from "src/app/models/corporateCustomers";
import { IndividualCustomers } from "src/app/models/individualCustomers";

export interface CustomerStoreState {
  individualCustomerModel: IndividualCustomers | null;
  corporateCustomerModel: CorporateCustomers | null;
}

export const initialCustomerStoreState: CustomerStoreState = {
  individualCustomerModel:  null,
  corporateCustomerModel:  null
};
