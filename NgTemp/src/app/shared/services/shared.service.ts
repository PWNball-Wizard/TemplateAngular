import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  cleanToken(): HttpHeaders {
    //!Buscamos el key token en el localStorage, si no existe le asignamos un string vacio ''
    let token: string = localStorage.getItem('token') || '';
    //console.log(token);
    //!Eliminamos espacios en blanco y comillas adicionales al principio y al final del token con replace
    token = token.replace(/^"|"$/g, '').trim();
    //!Creamos los headers, enviamos la propiedad x-token que contiene el token
    const headers: HttpHeaders = new HttpHeaders({
      //!encodeURI es una funcion que codifica un URI, en este caso el token que viene del localStorage
      //!Esto es necesario ya que el token puede contener caracteres especiales que no son validos en una URL y al codificarlo se solucionan estos problemas
      'x-token': encodeURI(token),
    });
    return headers;
  }

  constructor() {}
}
