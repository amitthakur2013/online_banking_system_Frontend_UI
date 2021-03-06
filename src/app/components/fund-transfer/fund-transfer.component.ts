import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private _formBuilder: FormBuilder, private accountService:AccountService,private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  	this.getAccountsList();
  	this.getBeneficiaryList();

  	this.firstFormGroup = this._formBuilder.group({
      fromAccountNo: ['', Validators.required],
      toBenifId: ['',Validators.required],
      amount:['',[Validators.min(1),Validators.required]],
      remark:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });

    //console.log(this.firstFormGroup.value);

  }

  get firstFormGroupControl() {
    return this.firstFormGroup.controls;
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
  if(this.fullData.fromAccountNo && this.fullData.toBenifId && this.fullData.amount){
    this.accountService.getBeneficiaryDetails(this.fullData.toBenifId).subscribe(data =>{
      this.benifDetail=data;
    }, error => console.log(error));
    var div =  document.querySelector('#initial_head');
    var div2= document.querySelector('.poscent');
    if(div!=null && div2!=null){
      div.classList.remove('checkheader');
      div2.classList.remove('poscent');
    }
  }
  

  //console.log(this.firstFormGroup.value);

  }

  secondFormData(stepper){
    if(!this.secondFormGroup.value.transPwd.length)
      return;
    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.secondFormGroup.value.transPwd.trim());
      this.fullData.transPwd=ciphertext;

      this.accountService.transferFund(this.fullData).subscribe(data =>{
    
      this.message=data;
      if(data.category==="failure"){
            this
            Swal.fire(
            "",
            data.content,
            'warning'
            )
      } else if(data.category==="success"){
            stepper.next();
            this.isEditable=false;
        }

      }, error => this.message=error,() => {
      });
      
    },
    error =>{ console.log(error) });

  	//this.fullData.transPwd=this.secondFormGroup.value.transPwd.trim();
   
  
  }

  cancelTransaction(){
  //location.reload();
  this.router.navigate(['/banking/account/dashboard']);
  }

  resetForm(stepper){
  /*stepper.reset();
  this.ngOnInit();*/
  this.router.navigateByUrl('/banking/account/dashboard', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/banking/transfer/fund_transfer']);
  }); 
  }

}
