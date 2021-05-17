import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {BillerService} from '../../services/biller.service';
import Swal from 'sweetalert2';
import {AesUtil} from '../../utilities/securitymech';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-biller',
  templateUrl: './update-biller.component.html',
  styleUrls: ['./update-biller.component.css']
})
export class UpdateBillerComponent implements OnInit {

	firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  vendorList=[];

  biller={
  premiumNo:"",
  mobNo:"",
  electricbillNo:"",
  vendor:{
  vendorId:"",
  category:"",
  vcompName:""
  }

  };

  passcode={
  transPwd:""
  }

  message=""

  selected;

  isEditable=true;

  aesUtil=new AesUtil();


  constructor(private _formBuilder: FormBuilder, private billerService:BillerService, private router:Router, private loginService:LoginService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.vendorList=[];
    this.getBillerDetail(this.route.snapshot.params.id);
    
  }

  getBillerDetail(id){
  this.billerService.getBillerDetails(id).subscribe(data=>{
  this.biller=data;
  this.callVendors(data.vendor.category);
  },error=>console.log(error),()=>{

  this.firstFormGroup = this._formBuilder.group({
      premiumNo: [this.biller.premiumNo],
      mobNo: [this.biller.mobNo,[Validators.minLength(10),Validators.maxLength(10)]],
      electricbillNo:[this.biller.electricbillNo],
      vendorId:[this.biller.vendor.vendorId,Validators.required]
 
    });

    this.secondFormGroup = this._formBuilder.group({
      transPwd: ['', Validators.required]
    });
  });
  }

  callVendors(categ){
    this.billerService.getVendorsByCategory(categ).subscribe(data=>{
    this.vendorList=data;
    }, error=> console.log(error));
  }

  firstFormData(stepper){
  if((this.firstFormGroup.value.mobNo.length || this.firstFormGroup.value.premiumNo.length || this.firstFormGroup.value.electricbillNo.length)){
    this.billerService.getVendorDetails(this.firstFormGroup.value.vendorId).subscribe(data=>{
      this.biller.vendor=data;
      this.biller.mobNo=this.firstFormGroup.value.mobNo;
      this.biller.premiumNo=this.firstFormGroup.value.premiumNo;
      this.biller.electricbillNo=this.firstFormGroup.value.electricbillNo;
      stepper.next();
    },error=>console.log(error),()=>{
    //console.log(this.biller);

    });
    
    var div =  document.querySelector('#initial_head');
    var div2= document.querySelector('.poscent');
    if(div!=null && div2!=null){

      div.classList.remove('checkheader');
      div2.classList.remove('poscent');

    }



    }
  
    
    
  }

  secondFormData(stepper){
    this.passcode.transPwd=this.secondFormGroup.value.transPwd.trim();

    this.loginService.generateKey().subscribe(data=>{
      var iv=data['iv'];
      var k=data['key'];
      var ciphertext = this.aesUtil.encrypt(iv,k,this.passcode.transPwd.trim());
      this.passcode.transPwd=ciphertext;

      this.billerService.authenticateBiller(this.passcode).subscribe((data)=>{
      if(data==="Invalid Password!"){
            this
            Swal.fire(
            "",
            data,
            'warning'
            )
            } else if(data==="valid"){
              this.billerService.updateBiller(this.biller).subscribe(data=>{
                this.message=data;
                this.isEditable=false;
                stepper.next();
              },error=>console.log(error));

            }
      },error=>console.log(error));

    },error=>console.log(error));

  }

  cancelTransaction(stepper){
  
  stepper.reset();
  this.ngOnInit();
  //location.reload();
  }

}
