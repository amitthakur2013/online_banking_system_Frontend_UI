import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  fullData={
  amount:0,
  remark:"",
  fromAccountNo:0,
  transPwd:"",
  toBenifId:0
  }

  accntList=[]
  benifList=[]

  message={
  category:"",
  content:"",
  refNo:""
  };

  benifDetail={
  name:"",
  accountNo:0,
  bankName:""
  };

  isEditable=true;

  aesUtil=new AesUtil();

  constructor(private _formBuilder: FormBuilder, private accountService:AccountService,private loginService:LoginService) { }

  ngOnInit(): void {
  	this.getAccountsList();
  	this.getBeneficiaryList();

  	this.firstFormGroup = this._formBuilder.group({
      fromAccountNo: ['', Validators.required],
      toBenifId: ['',Validators.required],
      amount:['',[Validators.min(100),Validators.required]],
      remark:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });

    //console.log(this.firstFormGroup.value);

  }

  getAccountsList(){
  	this.accountService.getAllAccounts().subscribe(data => {
  		this.accntList=data.filter(account => account.acctType !== 'fixed deposit');
  		//console.log(data);
  	}, error => console.warn(error));
  }

  getBeneficiaryList(){
  	this.accountService.getAllBeneficiary().subscribe(data => {
  		this.benifList=data;
  		//console.log(this.benifList);
  	}, error => console.warn(error));
  }

  firstFormData(){
  this.fullData.fromAccountNo=parseInt(this.firstFormGroup.value.fromAccountNo);
  this.fullData.toBenifId=parseInt(this.firstFormGroup.value.toBenifId);
  this.fullData.amount=parseFloat(this.firstFormGroup.value.amount);
  this.fullData.remark=this.firstFormGroup.value.remark;
  
    this.accountService.getBeneficiaryDetails(this.fullData.toBenifId).subscribe(data =>{
      this.benifDetail=data;
    }, error => console.log(error));
  

  //console.log(this.firstFormGroup.value);

  var div =  document.querySelector('#initial_head');
  var div2= document.querySelector('.poscent');
  div.classList.remove('checkheader');
  div2.classList.remove('poscent');
  }

  secondFormData(){

    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.secondFormGroup.value.transPwd.trim());
      this.fullData.transPwd=ciphertext;

      this.accountService.transferFund(this.fullData).subscribe(data =>{
    
      this.message=data;
      }, error => this.message=error,() => {
      });
      
    },
    error =>{ console.log(error) });

  	//this.fullData.transPwd=this.secondFormGroup.value.transPwd.trim();
    
    this.isEditable=false;
   
  
  }

  cancelTransaction(){
  location.reload();
  }

}
