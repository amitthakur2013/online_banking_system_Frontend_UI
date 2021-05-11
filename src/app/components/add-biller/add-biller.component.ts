import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillerService} from '../../services/biller.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-biller',
  templateUrl: './add-biller.component.html',
  styleUrls: ['./add-biller.component.css']
})
export class AddBillerComponent implements OnInit {

  firstFormGroup: FormGroup;

  cat=['Mobile_Recharge','Insurance','Electric_Bill'];

  vendorList=[];

  biller={
	  mobNo:"",
	  premiumNo:"",
	  electricbillNo:"",
	  vendorId:""
  };

  toggle=false;

  constructor(private _formBuilder: FormBuilder, private billerService:BillerService, private router:Router) { }

  ngOnInit(): void {
  	this.vendorList=[];
  	this.firstFormGroup = this._formBuilder.group({
  	  selectedCat:['',Validators.required],
      premiumNo: ['',Validators.required],
      mobNo: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      electricbillNo:['',Validators.required],
      vendorId:['',Validators.required]
 
    });

  }

  callVendors(){
  	this.firstFormGroup.value.vendorId="";
  	this.firstFormGroup.value.mobNo="";
  	this.firstFormGroup.value.electricbillNo="";
  	this.firstFormGroup.value.premiumNo="";

  	this.billerService.getVendorsByCategory(this.firstFormGroup.value.selectedCat).subscribe(data=>{
  	this.vendorList=data;
  	}, error=> console.log(error));
  }

  onSubmit(){
  if(this.firstFormGroup.value.mobNo.length || this.firstFormGroup.value.premiumNo.length || this.firstFormGroup.value.electricbillNo.length){
  	this.biller.mobNo=this.firstFormGroup.value.mobNo;
  	this.biller.premiumNo=this.firstFormGroup.value.premiumNo;
  	this.biller.electricbillNo=this.firstFormGroup.value.electricbillNo;
  	this.biller.vendorId=this.firstFormGroup.value.vendorId;

  	console.log(this.biller);
  	this.billerService.addBiller(this.biller).subscribe(data=>{
  	Swal.fire(
              'Status!',
              'Beneficiary Added Successfully!',
              'success'
            )
    this.ngOnInit();
  	},error => console.log(error));
  	
  }
  
  }

}
