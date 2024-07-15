export interface Usuarios {
  ok: boolean;
  usuarios: Usuario[];
  email: string;
}

export interface Usuario {
  //!Para indicarle a Angular que un campo es opcional, se le coloca un signo de interrogación al final del nombre del campo.
  //?Ejemplo: img?: string;
  id: number;
  nombre?: string;
  email: string;
  password?: string;
  img?: null | string;
  rol_id?: number;
  google?: number;
}
