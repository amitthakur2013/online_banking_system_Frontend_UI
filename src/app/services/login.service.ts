import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http:HttpClient) { }


// calling for key for encryption
generateKey(){
return this.http.get(`api/key`);
}

// calling the server to generate token
generateToken(credentials:any){
	// token generate 
	return this.http.post(`api/token`,credentials);
}


// for login user
loginUser(token) {
	//localStorage.setItem("token",token);
  sessionStorage.setItem("token",token);
	return true; 
}

//to check user is logged in
isLoggedIn() {
  //let token=localStorage.getItem("token");
	let token=sessionStorage.getItem("token");
	if(token == undefined || token=="" || token==null){
	return false;
	} else {
	return true;
	}
}

// to logout the user
logout(){
//localStorage.removeItem('token');
sessionStorage.removeItem('token');
return true;
}

// for getting the token
getToken() {
//return localStorage.getItem("token");
return sessionStorage.getItem("token");
}

}
