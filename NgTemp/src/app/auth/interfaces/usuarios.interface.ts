export interface Usuarios {
  ok: boolean;
  usuarios: Usuario[];
  email: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  img: null | string;
  rol_id: number;
  google: number;
}
