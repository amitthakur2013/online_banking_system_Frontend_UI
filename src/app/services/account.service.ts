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
  	//return this.httpClient.get<any>(`${this.baseUrl}/dashboard`);
  	return this.httpClient.get<any>("api/banking/account/dashboard");
  }

  getAccountDetails(id:number): Observable<any> {
  	//return this.httpClient.get<any>(`${this.baseUrl}/details/${id}`);
  	return this.httpClient.get<any>(`api/banking/account/details/${id}`);
  }

  getMiniStatement(id:number):  Observable<any> {
  	//return this.httpClient.get<any>(`${this.baseUrl}/mini_statement/${id}`);
  	return this.httpClient.get<any>(`api/banking/account/mini_statement/${id}`);
  }
}
