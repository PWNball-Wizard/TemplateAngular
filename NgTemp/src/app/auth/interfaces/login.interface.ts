export interface Login {
  ok: boolean;
  msg: string;
  respuesta: Respuesta | null;
  error: LoginError;
}

export interface Respuesta {
  email: string;
  token: string;
}

export interface LoginError {
  msg: string;
}

export interface LoginFields {
  email: string;
  password: string;
}
