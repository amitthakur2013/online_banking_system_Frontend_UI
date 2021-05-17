
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillerService} from '../../services/biller.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router';
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-add-biller',
  templateUrl: './add-biller.component.html',
  styleUrls: ['./add-biller.component.css']
})
export class AddBillerComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  cat=['Mobile_Recharge','Insurance','Electric_Bill'];

  vendorList=[];

  biller={
	  mobNo:"",
	  premiumNo:"",
	  electricbillNo:"",
    customerId:"",
    transPwd:""
  };

  vendorDetail={
  vcompName:""
  };

  message=""

  toggle=false;

  isEditable=true;

  aesUtil=new AesUtil();

  constructor(private _formBuilder: FormBuilder, private billerService:BillerService, private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  	this.vendorList=[];
  	this.firstFormGroup = this._formBuilder.group({
  	  selectedCat:['',Validators.required],
      premiumNo: [''],
      mobNo: ['',[Validators.minLength(10),Validators.maxLength(10)]],
      electricbillNo:[''],
      customerId:[''],
      vendorId:['']
 
    });

    this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });

  }

  get firstFormGroupControl() {
    return this.firstFormGroup.controls;
  }

  callVendors(){

  	this.billerService.getVendorsByCategory(this.firstFormGroup.value.selectedCat).subscribe(data=>{
  	this.vendorList=data;
    
    this.firstFormGroup.patchValue({
    vendorId:"",
    mobNo:"",
    electricbillNo:"",
    premiumNo:"",
    customerId:""
    });
    
    this.biller={
    mobNo:"",
    premiumNo:"",
    electricbillNo:"",
    customerId:"",
    transPwd:""
  };
  	}, error=> console.log(error));
  }

  firstFormData(stepper){
  if(this.firstFormGroup.value.mobNo.length || this.firstFormGroup.value.premiumNo.length || (this.firstFormGroup.value.electricbillNo.length && this.firstFormGroup.value.customerId.length)){
    this.biller.mobNo=this.firstFormGroup.value.mobNo;
    this.biller.premiumNo=this.firstFormGroup.value.premiumNo;
    this.biller.electricbillNo=this.firstFormGroup.value.electricbillNo;
    this.biller.customerId=this.firstFormGroup.value.customerId;
    //console.log(this.biller);
    this.billerService.getVendorDetails(this.firstFormGroup.value.vendorId).subscribe(data=>{
      this.vendorDetail=data;
    },error=> console.log(error));

    var div =  document.querySelector('#initial_head');
    var div2= document.querySelector('.poscent');
    if(div!=null && div2!=null){

      div.classList.remove('checkheader');
      div2.classList.remove('poscent');

    }
    stepper.next();
    
    
    }
  }

  secondFormData(stepper){
    this.biller.transPwd=this.secondFormGroup.value.transPwd.trim();

    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.biller.transPwd.trim());
      this.biller.transPwd=ciphertext;


      this.billerService.addBiller(this.biller,this.firstFormGroup.value.vendorId).subscribe(data=>{
            this.message=data;
            if(data==="Invalid Password!"){
            this
            Swal.fire(
            "",
            data,
            'warning'
            )
            } else {
              stepper.next();
            }
            },error =>this.message=error,() => {
            this.isEditable=false;
            });
      
      
      },
      error =>{ console.log(error) });

  }

  backForm(){
  //this.ngOnInit();
  }


  cancelTransaction(){
  this.router.navigate(['/banking/account/dashboard']);
  //location.reload();
  }



}
