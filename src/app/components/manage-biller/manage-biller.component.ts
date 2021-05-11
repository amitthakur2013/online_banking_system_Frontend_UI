import { Component, OnInit } from '@angular/core';
import {BillerService} from '../../services/biller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-biller',
  templateUrl: './manage-biller.component.html',
  styleUrls: ['./manage-biller.component.css']
})
export class ManageBillerComponent implements OnInit {

  constructor(private billerService:BillerService) { }

  billers=[]

  ngOnInit(): void {
  	this.getAllBillers();
  	var ans=this.getVendorCompany(101);
  	console.log(ans)
  }

  getAllBillers(){
   this.billerService.getAllBillers().subscribe(data=>{
   	this.billers=data;
   	//console.log(this.billers);
   },error=>console.log(error));
  }

  getVendorCompany=function(id){
  	var ans;
  	this.billerService.getVendorDetails(id).subscribe(data=>{
  		ans=data.vcompName.toString();
  	},error=>{},()=>{
  	return ans;
  	});
  }

  removeBiller(bid){

 	Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover it',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
          this.billerService.deleteBiller(bid).subscribe(data=>{
            this.getAllBillers();
            Swal.fire(
              'Deleted!',
              'Biller Deleted Successfully!',
              'success'
            )
          },error=>{
            Swal.fire(
              'Cancelled',
              'Something went wrong! :(',
              'error'
            )
          },()=>{
          
          })
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            
          }
        })
  }

}
