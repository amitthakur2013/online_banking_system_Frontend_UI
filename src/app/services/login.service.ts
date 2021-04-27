import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080";
  constructor(private http:HttpClient) { }

// calling the server to generate token

generateToken(credentials:any){
	// token generate 
	return this.http.post(`api/token`,credentials);
}




  // for login user
  loginUser(token) {
  	localStorage.setItem("token",token);
  	return true; 
  }

//to check user is logged in
  isLoggedIn() {
  	let token=localStorage.getItem("token");
  	if(token == undefined || token=="" || token==null){
  	return false;
  	} else {
  	return true;
  	}
  }

// for logout the user
  logout(){
  console.log("I am from service logout");
  localStorage.removeItem('token');
  return true;
  }

  // for getting the token
  getToken() {
  return localStorage.getItem("token");
  }
}
