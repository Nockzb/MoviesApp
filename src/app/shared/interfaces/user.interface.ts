export interface User {
  id_usuario: number;
  usuario: string;
  email: string;
  nombre_publico: string;
  pass_user: string;
  id_rol: number;
  token: string | null;
  token_sesion: string | null;
  lista_fav: string | null;
}
