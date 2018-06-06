import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ErrorHandlerService } from '@admin/error-handler/error-handler.service';
import { Entity } from '@admin/models/entity';

@Injectable()
export abstract class RestService<T> {
	constructor(protected http: HttpClient, protected errorHandler: ErrorHandlerService) {}

	abstract getId(model: T): number;
	abstract getUri(): string;
	abstract getInstance(): Entity;

	create(model: T): Observable<Entity> {
		return this.http
			.post<Entity>(`${this.getUri()}.json`, model)
			.map((response: Entity) => {
				return this.getInstance().deserialize(response);
			})
			.pipe(catchError(this.errorHandler.handleError));
	}
	delete(id: number): Observable<boolean> {
		return this.http
			.delete(`${this.getUri()}/${id}.json`, { observe: 'response' })
			.map((response: HttpResponse<T>) => {
				return response.status === 200 && response.statusText === 'OK';
			})
			.pipe(catchError(this.errorHandler.handleError));
	}
	deleteAll(selectedIds: Array<number>):Observable<boolean>{
		return this.http
			.put(
				`${this.getUri()}/bulk-operation.json`,
				{ operation: 'delete', discountids: selectedIds },
				{ observe: 'response' }
			)
			.map((response: HttpResponse<T>) => {
				return response.status === 200 && response.statusText === 'OK';
			})
			.pipe(catchError(this.errorHandler.handleError));
	}
	update(model: T): Observable<boolean> {
		return this.http
			.put<T>(`${this.getUri()}/${this.getId(model)}.json`, model, { observe: 'response' })
			.map((response: HttpResponse<T>) => {
				return response.status === 200 && response.statusText === 'OK';
			})
			.pipe(catchError(this.errorHandler.handleError));
	}
	getAll(): Observable<Entity[]> {
		return this.http
			.get<Entity[]>(`${this.getUri()}.json`)
			.map((response: Entity[]) => {
				return response.map((item) => this.getInstance().deserialize(item));
			})
			.pipe(catchError(this.errorHandler.handleError));
  }
  get(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.getUri()}/${id}.json`)
      .map((response: T) => {
        return response;
      })
      .pipe(catchError(this.errorHandler.handleError));
  }
}
