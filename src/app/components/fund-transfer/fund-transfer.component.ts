import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

  	this.firstFormGroup = this._formBuilder.group({
      fromAccountNo: ['', Validators.required],
      toBenifId: ['',Validators.required],
      amount:['',[Validators.min(100),Validators.required]],
      remark:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });

    console.log(this.firstFormGroup.value);

  }

  firstFormData(){
  this.fullData.fromAccountNo=parseInt(this.firstFormGroup.value.fromAccountNo);
  this.fullData.toBenifId=parseInt(this.firstFormGroup.value.toBenifId);
  this.fullData.amount=parseFloat(this.firstFormGroup.value.amount);
  this.fullData.remark=this.firstFormGroup.value.remark;

  //console.log(this.fullData);
  }

  secondFormData(){
  	this.fullData.transPwd=this.secondFormGroup.value.transPwd;
   //console.log(this.fullData);
  
  }

  finalSubmit(){
  console.log(this.fullData);
  }

}
