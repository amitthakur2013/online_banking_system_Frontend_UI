import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

private baseUrl="http://localhost:8080/banking/account";
  constructor(private httpClient: HttpClient) { }

  getUserDetails(): Observable<any>{
  	return this.httpClient.get<any>("api/banking/account/dashboard");
  }

  getAccountDetails(id:number): Observable<any> {
  	return this.httpClient.get<any>(`api/banking/account/details/${id}`);
  }

  getMiniStatement(id:number):  Observable<any> {
  	return this.httpClient.get<any>(`api/banking/account/mini_statement/${id}`);
  }

  getAllAccounts(): Observable<any> {
    return this.httpClient.get<any>(`api/banking/account/account_list`);
  }

  getAllBeneficiary(): Observable<any> {
    return this.httpClient.get<any>(`api/banking/transfer/beneficiary_list`);
  }

  transferFund(data:Object): Observable<any> {
    return this.httpClient.post(`api/banking/transfer/fund_transfer`,data);
  }

  getBeneficiaryDetails(id:number): Observable<any> {
    return this.httpClient.get<any>(`api/banking/transfer/beneficiary_details/${id}`);
  }

  addBeneficiary(data:Object): Observable<any> {
    return this.httpClient.post(`api/banking/transfer/beneficiary`,data,{responseType: "text"});
  }

  deleteBeneficiary(data:Object): Observable<any>{
    return this.httpClient.post(`api/banking/transfer/manage_beneficiary`,data,{responseType: "text"});
  }

  removeBeneficiary(id:number): Observable<any>{
    return this.httpClient.delete(`api/banking/transfer/manage_beneficiary/${id}`,{responseType: "text"});
  }

  updateBeneficiary(data:Object): Observable<any>{
    return this.httpClient.put(`api/banking/transfer/manage_beneficiary`,data,{responseType: "text"});
  }

}
