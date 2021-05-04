import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  form: FormGroup;

  transferData={
  transPwd:"",
  benifId:""
  }

  message="";

  constructor(
  private accountService : AccountService,
  private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogboxComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) { 
  this.transferData.benifId=data.benifId;
  }

  ngOnInit(): void {

  this.form = this.fb.group({
            transPwd: ['']
        });
  }

   save() {
   		if(this.form.value.transPwd.length){
             this.dialogRef.close(this.form.value);
   		}

    }

    close() {
        this.dialogRef.close();
    }

}
