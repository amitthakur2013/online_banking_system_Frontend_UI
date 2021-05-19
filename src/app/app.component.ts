import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';  
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  
import { filter } from 'rxjs/operators'; 
import { HostListener } from '@angular/core';
import { LoginService } from './services/login.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Online Banking System';

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if(sessionStorage.getItem('token')){
      event.returnValue = 'You will be logged out!, Are you sure!';
    }
    //return false;
  }

  @HostListener('window:unload')
  unloadHandler() {
  if(sessionStorage.getItem('token')){
    if(this.loginService.logout()){
         this.navbarService.hide();
         this.router.navigate(['/banking/login']);
      }
    }
  }

  constructor(private router: Router,  
              private activatedRoute: ActivatedRoute,  
              private titleService: Title,
              private loginService:LoginService,
              private navbarService:NavbarService
              ) {  }  

  ngOnInit() {  
    this.router.events.pipe(  
        filter(event => event instanceof NavigationEnd),  
      ).subscribe(() => {  
        const rt = this.getChild(this.activatedRoute);  
        rt.data.subscribe(data => {  
          //console.log(data);  
          this.titleService.setTitle(data.title)});  
      });  
  }
  
  getChild(activatedRoute: ActivatedRoute) {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }  
  
  }  
}
