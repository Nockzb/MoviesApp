import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API_SGE } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';


const ENDPOINT = 'movies_users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  user!: User;
  users: User[] = [];

  constructor(private http: HttpClient,
              private commonService: CommonService
              ) { }

  setUser(user: User) {
    this.user = user;
  }

  setDatosBasicosAlumno(formUser: any) {
    this.user.id_user = formUser.id_alumno;
    this.user.username = formUser.username;
    this.user.email = formUser.email;
    this.user.nombre = formUser.nombre;
    this.user.apellidos = formUser.apellidos;
  }

  // Método para obtener todos los usuarios
  getUsers() {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php` , { headers: this.commonService.headers });
  }

  // Método para obtener los datos de un usuario por su ID
  getDatosUsuario(id_user: number) {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_user=${id_user}`, { headers: this.commonService.headers });
  }
}
  // addAlumno(alumno: User) {
  //   const body = JSON.stringify(alumno);
  //   return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  // }

  // editAlumno(alumno: User) {
  //   const body = JSON.stringify(alumno);
  //   return this.http.put<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  // }

  // deleteAlumno(id: number) {
  //   return this.http.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_alumno=${id}`, { headers: this.commonService.headers });
  // }
// }
