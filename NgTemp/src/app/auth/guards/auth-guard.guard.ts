import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  private correcto: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> /* | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree */ {
    //!retornamos el metodo validateToken que convertimos a un observable con pipe y map y catchError
    //!pipe es un metodo que se utiliza para encadenar operadores de rxjs
    return this.authService.validateToken().pipe(
      //!map se utiliza para transformar un observable en otro observable diferente, en este caso
      //!transformamos el observable que devuelve validateToken a un observable de tipo boolean
      map((respuesta) => {
        //!Si la respuesta no es un error, retornamos retornamos true, en este caso no usamos el of ya que map ya retorna un observable

        return true;
        //TODO Crear una forma de insertar en la base de datos una clave cada que el usuario inicia sesion, esta clave nos servira para comparar
      }),
      //!catchError es un operador de rxjs que se utiliza para capturar errores en un observable y manejarlos
      catchError((error: Login) => {
        //!Si hay un error, lo mostramos en la consola y retornamos false
        //!En este caso usamos of para retornar un observable de tipo boolean ya que catchError no retorna un observable como map
        //console.log(error);
        this.router.navigateByUrl('/auth/login');
        return of(false);
      })
    );
  }

  /* 
    !map es como una estación de la cadena de producción que simplemente toma un producto y lo transforma en otro. Si entra una caja azul, sale una caja roja.
    !catchError es como una estación de control de calidad que detecta un producto defectuoso y en lugar de dejar que continúe por la cadena,
                                                  !reemplaza el producto defectuoso con uno nuevo y adecuado (en este caso, emitiendo false).
   */

  constructor(private authService: AuthService, private router: Router) {}
}
