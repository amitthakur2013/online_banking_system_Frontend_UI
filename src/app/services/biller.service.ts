import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillerService {

  constructor(private httpClient: HttpClient) { }

  getVendorsByCategory(cat):Observable<any>{
  	return this.httpClient.get<any>(`api/banking/payments/vendors/category/${cat}`);
  }

  addBiller(bill:Object):Observable<any>{
  	return this.httpClient.post(`api/banking/payments/biller`,bill,{responseType: "text"});
  }
}
