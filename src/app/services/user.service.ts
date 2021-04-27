import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	
token=this.loginService.getToken();

  constructor(private http:HttpClient,private loginService:LoginService) { }

  getUser() {
  return this.http.get(`api/getUsers`);
  }
}
