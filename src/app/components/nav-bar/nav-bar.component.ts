import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavbarService } from '../../services/navbar.service';
import { Subject } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

	public loggedIn=false;
  isLoading: Subject<boolean> = this.navbarService.isLoading;
  constructor(private loginService:LoginService, private navbarService: NavbarService,private router:Router) { }

  ngOnInit(): void {
  	this.loggedIn=this.loginService.isLoggedIn();
  }

  logoutUser() {
  	if(this.loginService.logout()){
       this.navbarService.hide();
       this.router.navigate(['/banking/login']);
    }
   
  	//location.reload();
  }

}
