import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Project } from "./project";

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  private apiURL = "https://localhost:44379/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.apiURL + '/Project')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getProject(id: number): Observable<Project> {
    return this.httpClient.get<Project>(this.apiURL + '/Project/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.apiURL + '/Project/', JSON.stringify(project), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.httpClient.put<Project>(this.apiURL + '/Project/' + id, JSON.stringify(project), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteProject(id: number) {
    return this.httpClient.delete<Project>(this.apiURL + '/Project/' + id, this.httpOptions)
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
