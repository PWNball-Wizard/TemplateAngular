import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios.interface';
import { Login, LoginError, LoginFields } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNzIxMDE3Nzc2LCJleHAiOjE3MjEwNjA5NzZ9.6nsYIOHYS3UJRnijsm7GVEzOc4uSaSZzn22LyFDp7yM';

  private headers = new HttpHeaders({
    'x-token': this.token,
  });

  private baseUrl: string = 'http://localhost:3000/api';

  getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios`, {
      headers: this.headers,
    });
  }

  //!Metodo que recibe un objeto de tipo LoginFields y devuelve un observable de tipo Login, que es la forma en la que la API responde esta peticion
  /* 
  !Ejemplo de respuesta de la API cuando el login es correcto
    !{
    !  "ok": true,
    !  "respuesta": {
    !      "msg": "Inicio de sesion exitoso",
    !      "email": "usuario@gmail.com",
    !      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNzIxMDIxODA2LCJleHAiOjE3MjEwNjUwMDZ9.Zfg_oDtgphihiTMHTs_OD7AKUn8DhRk6ZvT69thFar0"
    !  }
    !}
  */
  login(body: LoginFields): Observable<Login> {
    //!Se hace la peticion post a la API con el objeto body que contiene los campos email y password
    return this.http.post<Login>(`${this.baseUrl}/auth/login`, body).pipe(
      //!Capturamos el error con pipe y catchError, podemos colocar el tipo para que se pueda acceder a sus propiedades
      catchError((err: Login) => {
        //console.log('Error servicio',err);
        //!retornamos un throwError con el error que viene de la API en el campo error
        //!Retornamos solamente err.error ya que es el arreglo que contiene el error el cual viene de la API
        //!Podemos agregar el tipo aunque no es necesario
        //! return throwError(err.error as Login);
        return throwError(err.error as Login);
        //return of(err);
      })
    );
  }

  constructor(private http: HttpClient) {}
}
