import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private accountService : AccountService, private router:Router, private _formBuilder: FormBuilder ) { }

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

    console.log(this.firstFormGroup.value);
  }

  secondFormData(){
    this.fullData.transPwd=this.secondFormGroup.value.transPwd;

    this.accountService.addBeneficiary(this.fullData).subscribe(data =>{
      console.log(data)
      this.message=data;
      }, error => {
      this.message=error;
      console.log(error);
      },() => {
      //alert(this.message.content);
      //location.reload();
    });
  
  }

  cancelTransaction(){
  location.reload();
  }



}

