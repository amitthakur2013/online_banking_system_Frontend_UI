import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-manage-beneficiary',
  templateUrl: './manage-beneficiary.component.html',
  styleUrls: ['./manage-beneficiary.component.css']
})
export class ManageBeneficiaryComponent implements OnInit {

  constructor(private accountService : AccountService) { }

  benifList:[]

  ngOnInit(): void {
  	this.getBeneficiaryList();

  }

  getBeneficiaryList(){
  	this.accountService.getAllBeneficiary().subscribe(data => {
  		this.benifList=data;
  		//console.log(this.benifList);
  	}, error => console.warn(error));
  }


}
