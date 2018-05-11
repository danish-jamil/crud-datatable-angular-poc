import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const cloneReq = req.clone({
      setHeaders: {
        'AuthKey': '123456789',
        'content-type': 'application/json'
      }
    });
    console.log(cloneReq);
    return next.handle(cloneReq);
  }
}
