import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';

@Component({
  selector: 'app-update-beneficiary',
  templateUrl: './update-beneficiary.component.html',
  styleUrls: ['./update-beneficiary.component.css']
})
export class UpdateBeneficiaryComponent implements OnInit {

  
  fullData={
  	"benifId":"",
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

  message="";

  isEditable=true;

  aesUtil=new AesUtil(128, 1000);

  constructor(private accountService : AccountService, private router:Router, private _formBuilder: FormBuilder,private route: ActivatedRoute) {
  	this.fullData.benifId=route.snapshot.params.id;
  	this.accountService.getBeneficiaryDetails(parseInt(this.fullData.benifId)).subscribe( data => {
  		this.fullData=data;
  		this.fullData.transPwd="";
  	}, error => {console.log(error)},
  	() => {

	  	this.firstFormGroup = this._formBuilder.group({
	      name: [this.fullData.name, Validators.required],
	      accountNo: [this.fullData.accountNo,Validators.required],
	      bankName:[this.fullData.bankName,Validators.required],
	      branchName:[this.fullData.branchName,Validators.required],
	      ifscCode:[this.fullData.ifscCode,Validators.required],
	      nickname:[this.fullData.nickname]
	    });

		this.secondFormGroup = this._formBuilder.group({
	      transPwd: ['', Validators.required]
	    });
	    }
  	);

   }

  ngOnInit(): void {

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

  secondFormData(){
  
    var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

    var ciphertext = this.aesUtil.encrypt(salt, iv,"thisissecret", this.secondFormGroup.value.transPwd.trim());
    var aesPassword = (iv + "::" + salt + "::" + ciphertext);
    var pwd = btoa(aesPassword);
    this.fullData.transPwd=pwd;

    console.log(this.fullData);

    this.accountService.updateBeneficiary(this.fullData).subscribe(data=>{
    	this.message=data;
    },error=>{
    	this.message=error;
    },()=>{

    this.isEditable=false;
    });
  
  }

  cancelTransaction(){
  this.router.navigate(['/banking/transfer/manage_beneficiary']);
  }

}
