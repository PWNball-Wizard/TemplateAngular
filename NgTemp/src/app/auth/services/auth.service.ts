import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios.interface';
import { Login, LoginFields } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNzIwMzg0OTk3LCJleHAiOjE3MjA0MjgxOTd9.ifRvdVuCkIe6g0fqPiFWJd-cdj0EiczuP6OZ9IMLM0A'

  private headers = new HttpHeaders({
    'x-token': this.token,
  })

  private baseUrl: string = 'http://localhost:3000/api';

  getUsuarios():Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios`, {headers:this.headers})
  }

  login(body: LoginFields):Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/auth/login`, body)
  }

  constructor(private http: HttpClient) { }

}
