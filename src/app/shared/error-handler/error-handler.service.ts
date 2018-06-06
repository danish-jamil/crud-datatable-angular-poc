import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomNGXLoggerService, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {
	Logger: NGXLogger;
	constructor(private loggerService: CustomNGXLoggerService) {
		this.Logger = this.loggerService.create({ level: NgxLoggerLevel.ERROR });
	}
	handleError<T>(error: HttpErrorResponse) {
		console.log(error.message);
		return Observable.throw(error || 'Server Error');
	}
}
