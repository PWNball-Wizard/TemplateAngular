import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  UserData,
  Usuario,
  UsuarioPassword,
  UsuarioProfile,
} from '../interfaces/usuario.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class RestrictedService {
  private baseUrl: string = 'http://localhost:3000/api';

  //!Metodo para obtener la información del usuario que esta logueado en la aplicación
  getUserData() {
    //!Se llama al metodo cleanToken del servicio SharedService para obtener los headers con el token limpio
    //!Como era un codigo repetido se creo un metodo en el servicio SharedService para limpiar el token y poder reutilizarlo en donde sea necesario
    const headers: HttpHeaders = this.sharedService.cleanToken();

    return this.http
      .get<UserData>(`${this.baseUrl}/usuarios/userData`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError((): UserData => err.error);
        })
      );
  }

  //!Metodo para actualizar la información del usuario, recibe un objeto de tipo UsuarioProfile o UsuarioPassword y devuelve un observable de tipo UserData
  updateUser(userData: UsuarioProfile | UsuarioPassword) {
    const headers: HttpHeaders = this.sharedService.cleanToken();
    return this.http
      .patch<UserData>(`${this.baseUrl}/usuarios/${userData.id}`, userData, {
        headers,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError((): UserData => err.error);
        })
      );
  }

  constructor(private http: HttpClient, private sharedService: SharedService) {}
}
