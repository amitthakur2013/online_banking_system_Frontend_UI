import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { finalize } from "rxjs/operators";
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private loginService:LoginService,private loaderService: LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

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

    return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
  }
}
