import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
	
  fullData={
    "name":"",
    "accountNo":"",
    "bankName":"",
    "branchName":"",
    "ifscCode":"",
    "nickname":"",
    "transPwd":""
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  message=""

  isEditable=true;

  aesUtil=new AesUtil();

  constructor(private accountService : AccountService, private router:Router, private _formBuilder: FormBuilder, private loginService:LoginService ) { }

  ngOnInit(): void {

  this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      accountNo: ['',Validators.required],
      bankName:['',Validators.required],
      branchName:['',Validators.required],
      ifscCode:['',Validators.required],
      nickname:['']
    });

  this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });

  }

  

  firstFormData(){
    this.fullData.name=this.firstFormGroup.value.name;
    this.fullData.accountNo=this.firstFormGroup.value.accountNo;
    this.fullData.bankName=this.firstFormGroup.value.bankName;
    this.fullData.branchName=this.firstFormGroup.value.branchName;
    this.fullData.ifscCode=this.firstFormGroup.value.ifscCode;
    this.fullData.nickname=this.firstFormGroup.value.nickname;

    //console.log(this.firstFormGroup.value);
    var div =  document.querySelector('#initial_head');
    var div2= document.querySelector('.poscent');
    div.classList.remove('checkheader');
    div2.classList.remove('poscent');

  }

  secondFormData(stepper){
    if(!this.secondFormGroup.value.transPwd.length)
      return;
    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.secondFormGroup.value.transPwd.trim());
      this.fullData.transPwd=ciphertext;

      this.accountService.addBeneficiary(this.fullData).subscribe(data =>{
        this.message=data;
        if(data==="Invalid Password!"){
            this
            Swal.fire(
            "",
            data,
            'warning'
            )
            } else if(data==="Beneficiary added Successfully!")
            {
              
                this.isEditable=false;
                stepper.next();
              }

      }, error => {
        this.message=error;
        console.log(error);
      },() => {
        //this.isEditable=false;
      });
      
    },
    error =>{ console.log(error) });


    //this.fullData.transPwd=this.secondFormGroup.value.transPwd.trim();
  
  }

  cancelTransaction(){
  location.reload();
  }



}

