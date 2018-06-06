import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import * as _global from '../constants/constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class EspwebsiteAuthInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.url);
    const reqClone = req.clone({ headers: _global.Constant.asi.AuthHeaders });
    this.spinner.show();
    return next
      .handle(reqClone)
      .do(event => { }, err => this.spinner.hide(), () => this.spinner.hide());
  }
}
