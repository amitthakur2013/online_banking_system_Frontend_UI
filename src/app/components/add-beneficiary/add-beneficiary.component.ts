import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
	
  beneficiary={
  name:"",
  accountNo:"",
  bankName:"",
  branchName:"",
  ifscCode:"",
  nickname:""
  }

  constructor(private accountService : AccountService, private router:Router ) { }

  ngOnInit(): void {
  }

  onSubmit(){
  if(this.beneficiary.name=="" || this.beneficiary.accountNo == "" || this.beneficiary.bankName=="" || this.beneficiary.branchName=="" || this.beneficiary.ifscCode=="" || this.beneficiary.nickname==""){
  alert("Fields Cannot be left empty!!");

  } else {
	  this.accountService.addBeneficiary(this.beneficiary).subscribe(data => {
	  alert("Beneficiary Added Successfully");
	  this.router.navigate(['/#banking/transfer/manage_beneficiary']);
	  },
	  error=> console.log(error));
  	}

	}
}
