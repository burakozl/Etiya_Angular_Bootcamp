import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CorporateCustomers } from '../models/corporateCustomers';

@Injectable({
  providedIn: 'root',
})
export class CorporateCustomersService  {

  private controllerUrl = `${environment.apiUrl}/corporateCustomers`;

  constructor(private httpClient: HttpClient) {}

  getAllCustomers(): Observable<CorporateCustomers[]> {
    return this.httpClient.get<CorporateCustomers[]>(this.controllerUrl);
  }
  getCustomerDetail(id:number){
    return this.httpClient.get<CorporateCustomers[]>(`${this.controllerUrl}?customerId=${id}`);
  }
}
