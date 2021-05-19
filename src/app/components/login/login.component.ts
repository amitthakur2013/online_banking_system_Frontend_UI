import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aesUtil=new AesUtil();
	
	credentials={
	username:"",
	password:""
	}

  errFields=false;

  errUnauth=0;

  constructor(private loginService:LoginService, private router:Router, private navbarService: NavbarService ) { }

  ngOnInit(): void {
  
  }

  onFinalSubmit(){
    this.errFields=false;
   if((this.credentials.username !="" && this.credentials.password!="") && (this.credentials.username!=null && this.credentials.password!=null)){
  
    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.credentials.password.trim());
      this.credentials.password=ciphertext;

      // token generate
      this.loginService.generateToken(this.credentials).subscribe(response => {
        //console.log(response);
        this.loginService.loginUser(response['token']);
        this.navbarService.show();
        this.router.navigate(['/banking/account/dashboard']).then(() => {
          //window.location.reload();

         });
        this.errFields=false;
        this.errUnauth=0;

      },error => {
        this.errUnauth=error.status;
        console.log(error);
      });
      
      },
      error =>{ console.log(error) });
    


   } else{
     this.errFields=true;
     this.errUnauth=0;
   }
  }

  clearError(){
  this.errFields=false;
  this.errUnauth=0;
  }

}
