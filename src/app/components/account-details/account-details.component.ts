import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent implements OnInit {

  accountsinfo:Object;
  transinfo:[];
  id:number;

  constructor(private accountService : AccountService, private route:ActivatedRoute) { }
  
  ngOnInit(): void {
  	this.id=this.route.snapshot.params['id'];
  	this.getAccount(this.id);
  	this.getMiniStatement(this.id);
  }

  private getAccount(id) {
  	this.accountService.getAccountDetails(id).subscribe(data => {
  		this.accountsinfo=data;
  		//console.log(data);
  	}, error => console.warn(error));
  }

  private getMiniStatement(id){
  	this.accountService.getMiniStatement(id).subscribe(data => {
  		this.transinfo=data;
  		//console.log(data);
  	}, error => console.warn(error));
  }

}
