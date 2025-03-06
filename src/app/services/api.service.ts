import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.local';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = environment.BASE_URL;
 
  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}
  
  // constructor() { }

   /**
   * Perform a GET request
   */
   getData(): Observable<any> {
    return this.http.get(this.BASE_URL).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a POST request with data
   * @param data Data to be sent in the request body
   */
  postData(endpoint: string, data: any): Observable<any> {
    if(!data){
      console.log("no data")
      return this.http.post(`${this.BASE_URL}${endpoint}`,null).pipe(
        catchError(this.handleError)
      );
    }
    console.log("yes data")
    return this.http.post(`${this.BASE_URL}${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }
  

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error);
  }

}



