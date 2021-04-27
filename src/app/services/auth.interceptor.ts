

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


		let token=this.loginService.getToken();
		if(token!=null){

    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin':'*'
      },
    });
    }

    return next.handle(req);
  }
}
