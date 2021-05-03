import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {
	userdata:Object;
	accountsdata:[];
	selectedLevel;
	setEnable:true;

  constructor(private accountService : AccountService, private router: Router) { }

  ngOnInit(): void {
  	this.getUser();
  }

  private getUser() {
  	this.accountService.getUserDetails().subscribe(data => {
  		this.userdata=data.user;
  		this.accountsdata=data.accounts;
  		//console.log(data);
  	}, error => console.warn(error));
  }

  selected(){
  	document.getElementById("act_detail_btn").removeAttribute("disabled");
  }

  getAccntDetails(){
  	this.router.navigate(['#banking/account/details',this.selectedLevel]);
  }

}
