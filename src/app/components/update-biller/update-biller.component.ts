import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {BillerService} from '../../services/biller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-biller',
  templateUrl: './update-biller.component.html',
  styleUrls: ['./update-biller.component.css']
})
export class UpdateBillerComponent implements OnInit {

	biller={
	vendor:{
	category:""
	}
	};

	passcode={
	transPwd:""
	}

  constructor(private route:ActivatedRoute, private billerService:BillerService,private router:Router) { }

  ngOnInit(): void {
  	this.getBiller(this.route.snapshot.params.id);
  }

  getBiller(id){
  	this.billerService.getBillerDetails(id).subscribe(data=>{
  		this.biller=data;
  		//console.log(this.biller);
  	},error => console.log(error));
  }

  onSubmit(){
  

  Swal.fire({
    title: "Authentication!",
    text: "Enter Your High Security Password:",
    input: 'password',
    showCancelButton: true        
    }).then((result) => {
        if (result.value) {
            this.passcode.transPwd=result.value.trim();
            this.billerService.authenticateBiller(this.passcode).subscribe(data=>{
            if(data === "Invalid Password!"){
	            Swal.fire(
	              'Status!',
	              data,
	              'warning'
	            )
              
            } else if(data==='valid'){

	            this.billerService.updateBiller(this.biller).subscribe(data=>{
			  	Swal.fire(
	                        'Status!',
	                        'Biller Updated Successfully!',
	                        'success'
	                      )
	            this.router.navigate(["/banking/payments/manage_biller"]);
			  }, error=> console.log(error));
            }
            this.ngOnInit();
            },error => console.log(error));
            
        }
    });





  /*this.billerService.updateBiller(this.biller).subscribe(data=>{
  	alert(data);
  }, error=> console.log(error));*/

  }

}
