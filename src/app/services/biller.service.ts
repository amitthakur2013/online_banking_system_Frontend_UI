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

  addBiller(bill:Object,vid):Observable<any>{
  	return this.httpClient.post(`api/banking/payments/biller/${vid}`,bill,{responseType: "text"});
  }

  getAllBillers():Observable<any>{
  	return this.httpClient.get<any>(`api/banking/payments/biller/list`);
  }

  getVendorDetails(id):Observable<any>{
  	return this.httpClient.get<any>(`api/banking/payments/vendors/${id}`);
  }

  deleteBiller(id):Observable<any>{
  	return this.httpClient.delete(`api/banking/payments/biller/${id}`,{responseType: "text"});
  }

  makebillPayment(data:Object):Observable<any>{
    return this.httpClient.post(`api/banking/payments/pay_bill`,data);
  }
} 
