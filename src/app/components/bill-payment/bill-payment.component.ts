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
  vendorList=[]

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

  selectedCat="";

  v_name="";

  aesUtil=new AesUtil();

  constructor(private _formBuilder: FormBuilder, private accountService:AccountService,private loginService:LoginService,private billerService:BillerService, private router:Router) { }

  ngOnInit(): void {
  	this.getAccountsList();
    this.getVendorList();

  	this.firstFormGroup = this._formBuilder.group({
      fromAccountNo: ['', Validators.required],
      biller: ['',Validators.required],
      amount:['',[Validators.min(1),Validators.required]],
      remark:[''],
      vendor:[[],Validators.required]
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

  getBillerList(){
    this.v_name=this.firstFormGroup.value.vendor.split(",")[0];
    this.selectedCat=this.firstFormGroup.value.vendor.split(",")[1];
  	this.billerService.getAllBillers().subscribe(data=>{
      //console.log(data);
  		this.billerList=data.filter(d => d.vendor.vcompName === this.v_name);
  	},error => console.log(error));
  }

  getVendorList(){
    this.billerService.getVendorsofUser().subscribe(data =>{
      this.vendorList=data;
      //console.log(this.vendorList);
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
    if(div !=null && div2!=null){
    div.classList.remove('checkheader');
    div2.classList.remove('poscent');
    }
  }

  secondFormData(stepper){
    if(this.secondFormGroup.value.transPwd === '' || this.secondFormGroup.value.transPwd==null){
    return;
    }
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
