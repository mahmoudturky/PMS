import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL = "https://localhost:44379/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + '/Account')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + '/Account/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + '/Account/', JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiURL + '/Account/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteUser(id: string) {
    return this.httpClient.delete<User>(this.apiURL + '/Account/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

