import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Post } from '../shared/models/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostsService {
  private apiUrl = 'http://jsonplaceholder.typicode.com/posts'; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET employees from the server */
  getPosts(offset, limit): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.apiUrl}?_page=${offset}&_limit=${limit}`)
      .pipe(
        tap(employees => console.log(`fetched posts`)),
        catchError(this.handleError('getPosts', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
