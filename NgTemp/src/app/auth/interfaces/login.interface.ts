export interface Login {
  ok: boolean;
  msg: string;
  respuesta: Respuesta;
}

export interface Respuesta {
  email: string;
  token: string;
}

export interface LoginFields{
  email:string,
  password: string
}