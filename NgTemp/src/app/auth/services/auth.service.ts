import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
/* import { Usuarios } from '../interfaces/usuarios.interface'; */
import {
  Login,
  LoginError,
  LoginFields,
  RegisterFields,
  Respuesta,
} from '../interfaces/login.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6…2M30.wmyWsEvop1lZwKox1kxNlZGUcAVWNMaheBiWC0IJW2c';
  private headerz = new HttpHeaders({
    'x-token': '' /* encodeURI(this.token) */,
  });

  private baseUrl: string = 'http://localhost:3000/api';

  //public id?: number;

  /* getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios`, {
      headers: this.headerz,
    });
  } */

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
      /* tap((resp) => {
        this.id = resp.respuesta.id;
      }), */
      //!Capturamos el error con pipe y catchError, debemos colocar el tipo HttpErrorResponse
      catchError((err: HttpErrorResponse) => {
        //console.log('Error servicio login',err);
        //!retornamos un throwError con el error que viene de la API en el campo error
        //!Retornamos solamente err.error ya que es el arreglo que contiene el error el cual viene de la API
        //!Agregamos el tipo para convertir el error a el tipo que necesitemos, al hacer esto solo nos devolvera el json que nos manda la API
        //!De esta forma en el component podemos acceder mejor a los datos de este json(arreglo)
        //! return throwError(err.error as Login);
        return throwError((): Login => err.error as Login);
        //return of(err);
      })
    );
  }

  register(body: RegisterFields): Observable<Login> {
    //!Se hace la peticion post a la API con el objeto body que contiene los campos name, email y password
    return this.http.post<Login>(`${this.baseUrl}/usuarios`, body).pipe(
      /* tap((resp) => {
        this.id = resp.respuesta.id;
      }), */
      //!Capturamos el error con pipe y catchError, podemos colocar el tipo para que se pueda acceder a sus propiedades
      catchError((err: HttpErrorResponse) => {
        //console.log('Error servicio register',err);
        //!retornamos un throwError con el error que viene de la API en el campo error
        //!Retornamos solamente err.error ya que es el arreglo que contiene el error el cual viene de la API
        //!Podemos agregar el tipo aunque no es necesario
        //! return throwError(err.error as Login);
        return throwError((): Login => err.error);
        //return of(err);
      })
    );
  }

  validateToken(): Observable<Login> {
    
    const headers: HttpHeaders = this.sharedService.cleanToken();

    //!Retornamos la respuesta del get que es de tipo Login, a este get le pasamos los headers.
    return this.http.get<Login>(`${this.baseUrl}/auth/renew`, { headers }).pipe(
      /* tap((resp) => {
        this.id = resp.respuesta.id;
      }), */
      catchError((err: HttpErrorResponse) => {
        /* console.log('Error de renovando Token', err.error as Login);
        console.log('Error de renovando Token', err); */
        return throwError((): Login => err.error);
      })
    );
  }

  constructor(private http: HttpClient, private sharedService: SharedService) {}
}
