import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';

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
  content:""
  };

  benifDetail={
  name:"",
  accountNo:0,
  bankName:""
  };

  constructor(private _formBuilder: FormBuilder, private accountService:AccountService) { }

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
  		this.accntList=data;
  		//console.log(this.accntList);
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
  }

  secondFormData(){
  	this.fullData.transPwd=this.secondFormGroup.value.transPwd;
   //console.log(this.fullData);

   this.accountService.transferFund(this.fullData).subscribe(data =>{
    
    this.message=data;
    }, error => this.message=error,() => {
    //alert(this.message.content);
    //location.reload();
    });
  
  }

  cancelTransaction(){
  location.reload();
  }

}
