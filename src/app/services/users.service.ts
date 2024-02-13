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
  currentUser!: User;

  constructor(private http: HttpClient,
              private commonService: CommonService
              ) { }

  setUser(user: User) {
    this.user = user;
  }

  // setDatosBasicosAlumno(formUser: any) {
  //   this.user.id_usuario = formUser.id_usuario;
  //   this.user.usuario = formUser.usuario;
  //   this.user.email = formUser.email;
  //   this.user.nombre_publico = formUser.nombre_publico;
  //   this.user.id_rol = formUser.id_rol;
  // }

  // Método para obtener todos los usuarios
  getUsers() {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php` , { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.put<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteUser(id_usuario: number) {
    return this.http.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }

  getUserById(id_usuario: number) {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_usuario=${id_usuario}` , { headers: this.commonService.headers });
  }
}
