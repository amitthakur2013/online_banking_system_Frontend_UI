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

  errFields=false;

  errUnauth=0;

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
    this.errFields=false;
    this.errUnauth=0;

   	},error => {
   	this.errUnauth=error.status;
   	console.log(error);
   	});


   } else{
   this.errFields=true;
   console.log("Fields are empty");
   }
  }

}
