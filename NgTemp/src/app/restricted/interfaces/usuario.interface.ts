export interface UserData {
  ok: boolean;
  respuesta: Respuesta;
  error: Error;
}

export interface Respuesta {
  usuario: Usuario[];
  msg: string;
  email: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  img: null;
  rol_id: number;
  google: number;
}

export interface UsuarioProfile {
  id?: number;
  nombre: string;
  email: string;
  rol_id?: number;
}

export interface UsuarioPassword {
  id?: number;
  password: string;
}

export interface Error {
  msg: string;
}
