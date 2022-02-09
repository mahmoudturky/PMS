import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from "./task";

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  private apiURL = "https://localhost:44379/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiURL + '/Task')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.apiURL + '/Task/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiURL + '/Task/', JSON.stringify(task), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.apiURL + '/Task/' + id, JSON.stringify(task), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteTask(id: number) {
    return this.httpClient.delete<Task>(this.apiURL + '/Task/' + id, this.httpOptions)
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



