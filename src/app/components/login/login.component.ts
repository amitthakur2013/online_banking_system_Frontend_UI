import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	credentials={
	username:"",
	password:""
	}

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(){
   if((this.credentials.username !="" && this.credentials.password!="") && (this.credentials.username!=null && this.credentials.password!=null)){
   	//console.log("We have to submit the form to server!");

   	// token generate
   	this.loginService.generateToken(this.credentials).subscribe(response => {
   	
   	console.log(response);
   	this.loginService.loginUser(response['token']);
   	window.location.href="/banking/account/dashboard";

   	},error => {
   	
   	console.log(error);
   	});


   } else{
   console.log("Fields are empty");
   }
  }

}
