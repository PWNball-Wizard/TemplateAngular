//!Interfaz de la respuesta que nos retorna la API cuando hacemos login o registro
export interface Login {
  ok: boolean;
  respuesta: Respuesta;
  error: LoginError;
}

//!Interfaz de la respuesta que nos retorna la API cuando hacemos login o registro satisfactoriamente
export interface Respuesta {
  msg: string;
  email: string;
  id: number
  token: string;
}

//!Interfaz de la respuesta que nos retorna la API cuando hay un error en el login o registro
export interface LoginError {
  msg: string;
}

//!Interfaz para el construir el body que enviaremos a la api para hacer login
export interface LoginFields {
  email: string;
  password: string;
}
//!Interfaz para construir el body que enviaremos a la api para registrar un usuario
export interface RegisterFields {
  nombre: string;
  email: string;
  password: string;
}
