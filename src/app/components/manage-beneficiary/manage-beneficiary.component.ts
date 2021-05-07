import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogboxComponent} from '../dialogbox/dialogbox.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-manage-beneficiary',
  templateUrl: './manage-beneficiary.component.html',
  styleUrls: ['./manage-beneficiary.component.css']
})
export class ManageBeneficiaryComponent implements OnInit {

  constructor(private accountService : AccountService, private dialog: MatDialog) { }

  benifList=[]
  deleteData={
    benifId:"",
    transPwd:""
  }

  message="";

  ngOnInit(): void {
  	this.getBeneficiaryList();

  }

  getBeneficiaryList(){
  	this.accountService.getAllBeneficiary().subscribe(data => {
  		this.benifList=data;
  	}, error => console.warn(error));
  }

  removeBenif(id){
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover it',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
           /*Swal.fire({
                title: 'Please Wait !',
                html: 'Delete in progress!',// add html attribute if you want or remove
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });*/
          this.accountService.removeBeneficiary(id).subscribe(data=>{
            this.getBeneficiaryList();
            Swal.fire(
              'Deleted!',
              'Beneficiary Deleted Successfully!',
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

  /*openDialog(id) {

        this.deleteData.benifId=id;
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
          benifId: id
        };

        this.dialog.open(DialogboxComponent, dialogConfig);

        const dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
              if(data){
                if(data.transPwd.length){
                  this.deleteData.transPwd=data.transPwd;
                  this.accountService.deleteBeneficiary(this.deleteData).subscribe(data=>{
                    this.message=data;
                  }, error => {
                    this.message=error;
                  }, () => {
                  if(this.message=='Invalid Password!'){
                    Swal.fire(
                      {
                        title: 'Status',
                        text: this.message,
                        icon: 'warning'
                      }).then(result =>{} );
                  } else {
                    Swal.fire(
                      {
                        title: 'Status',
                        text: this.message,
                        icon: 'success'
                      }).then(result =>{} );
                  }
                  this.getBeneficiaryList();
                  });
                  } else{
                    alert("Empty Fields for trans pwd!");
                  } 
              }
            }); 


    }*/




}
