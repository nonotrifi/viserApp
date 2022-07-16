import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login() {
    const headers: HttpHeaders = this.getHeaders();
    const user = { email: 'noor@gmail.com', password: '12345'}
    return this.http
      .post<any>('http://localhost:3000/api/users/signin', { ...user }, { headers })
  }

  // Access to XMLHttpRequest at 'http://localhost:3000/api/users/signin' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  headers = {
    'Content-Type': 'application/json',
  };

}
