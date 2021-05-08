import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aesUtil=new AesUtil(128, 1000);
	
	credentials={
	username:"",
	password:""
	}

  errFields=false;

  errUnauth=0;

  constructor(private loginService:LoginService, private router:Router ) { }

  ngOnInit(): void {
    //console.log(CryptoJS.AES.encrypt('my message', 'secret key').toString());
  
  }

  onSubmit(){
    this.errFields=false;
   if((this.credentials.username !="" && this.credentials.password!="") && (this.credentials.username!=null && this.credentials.password!=null)){
   	
    var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

    var ciphertext = this.aesUtil.encrypt(salt, iv,"thisissecret", this.credentials.password.trim());
    var aesPassword = (iv + "::" + salt + "::" + ciphertext);
    var pwd = btoa(aesPassword);
    this.credentials.password=pwd;
    //console.log(this.credentials);

   	// token generate
   	this.loginService.generateToken(this.credentials).subscribe(response => {
   	
   	//console.log(response);
   	this.loginService.loginUser(response['token']);
    this.router.navigate(['/banking/account/dashboard']).then(() => {
    window.location.reload();
     });
    this.errFields=false;
    this.errUnauth=0;

   	},error => {
   	this.errUnauth=error.status;
   	console.log(error);
   	});


   } else{
   this.errFields=true;
   this.errUnauth=0;
   console.log("Fields are empty");
   }
  }

  clearError(){
  this.errFields=false;
  this.errUnauth=0;
  }

}
