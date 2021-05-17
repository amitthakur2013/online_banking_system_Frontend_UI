import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import * as CryptoJS from 'crypto-js';  
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';
import {BillerService} from '../../services/biller.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.css']
})
export class BillPaymentComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  fullData={
  amount:0,
  remark:"",
  fromAccountNo:0,
  transPwd:"",
  biller:""
  }

  accntList=[]
  billerList=[]

  message={
  category:"",
  content:"",
  refNo:""
  };

  billerDetail={
  category:"",
  company:""
  };

  isEditable=true;

  aesUtil=new AesUtil();

  constructor(private _formBuilder: FormBuilder, private accountService:AccountService,private loginService:LoginService,private billerService:BillerService, private router:Router) { }

  ngOnInit(): void {
  	this.getAccountsList();
  	this.getBillerList();

  	this.firstFormGroup = this._formBuilder.group({
      fromAccountNo: ['', Validators.required],
      biller: ['',Validators.required],
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

  getBillerList(){
  	this.billerService.getAllBillers().subscribe(data=>{
  		this.billerList=data;
  	},error => console.log(error));
  }

  firstFormData(){
  this.fullData.fromAccountNo=parseInt(this.firstFormGroup.value.fromAccountNo);
  this.fullData.biller=this.firstFormGroup.value.biller;
  this.fullData.amount=parseFloat(this.firstFormGroup.value.amount);
  this.fullData.remark=this.firstFormGroup.value.remark;

  //console.log(this.firstFormGroup.value);

  var div =  document.querySelector('#initial_head');
  var div2= document.querySelector('.poscent');
  div.classList.remove('checkheader');
  div2.classList.remove('poscent');
  }

  secondFormData(stepper){

    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.secondFormGroup.value.transPwd.trim());
      this.fullData.transPwd=ciphertext;

      this.billerService.makebillPayment(this.fullData).subscribe(data =>{

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
  stepper.reset();
  this.ngOnInit();
  }

}
