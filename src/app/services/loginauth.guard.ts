import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loginService.isLoggedIn()){
    	return true;
    }
    this.router.navigate(['banking/account/dashboard']);
    return false;
  }
  
}
