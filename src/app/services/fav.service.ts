import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API_SGE } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';


const ENDPOINT = 'movies_fav';

@Injectable({
  providedIn: 'root'
})

export class FavService {

  user!: User;
  users: User[] = [];
  currentUser!: User;

  constructor(private http: HttpClient,
              private commonService: CommonService
              ) { }

  setUser(user: User) {
    this.user = user;
  }

  // Método para obtener todos los usuarios
  getFavs(id_usuario: number) {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_usuario=${61}` , { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUser(user: User,  route?: string) {
    const body = JSON.stringify(user);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteFav(id_fav: number | string) {
    return this.http.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_fav=${id_fav}`, { headers: this.commonService.headers });
  }

  insertarFav(id_usuario: number, id_movie: string) {
    const body = JSON.stringify({ id_usuario: id_usuario, id_movie: id_movie });
    return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }
}
