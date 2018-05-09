import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Employee } from '../models/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeService {

  private apiUrl = 'http://localhost:4200/assets/data/company.json';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET employees from the server */
  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        tap(employees => console.log(`fetched Employees`)),
        catchError(this.handleError('getEmployees', []))
      );
  }

  /** GET Employee by id. Return `undefined` when id not found */
  getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(employees => employees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} Employee id=${id}`);
        }),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }

  /** GET Employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  /* GET Employeees whose name contains search term */
  searchEmployeees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty Employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(`api/Employees/?name=${term}`).pipe(
      tap(_ => console.log(`found Employees matching "${term}"`)),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Employee to the server */
  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee, httpOptions).pipe(
      tap((employee: Employee) => console.log(`added Employee w/ id=${employee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  /** DELETE: delete the Employee from the server */
  deleteEmployee (employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** PUT: update the Employee on the server */
  updateEmployee (employee: Employee): Observable<any> {
    return this.http.put(this.apiUrl, employee, httpOptions).pipe(
      tap(_ => console.log(`updated Employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
