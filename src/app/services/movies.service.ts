import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../movies/interfaces/movie.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { SearchResponse } from '../movies/interfaces/SearchResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  public listadoMovies: Movie[] = [];

  private BASE_URL_MOVIES = 'https://api.themoviedb.org/3/';
  private TOKEN_MOVIES = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmMwMWQxZGJhNTM4OWJjZjI5MDUzMzc0ZWNiZDUxZCIsInN1YiI6IjY1Yzc1MGUyNTRhMDk4MDE4NDAxOWJkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPpDboS8MDXxdvnDizQXZ_IiHAc72Ekvi65X9nAhifc';

  constructor(private http: HttpClient) { }

  getAuthentication() {
    // Define las cabeceras con el token de acceso
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    // Realiza la petición GET a la API de autenticación
    return this.http.get(`${this.BASE_URL_MOVIES}authentication`, { headers });
  }

  // TODO: Modificar el método para recibir un parámetro de consulta
  getMoviesByQuery(busqueda: string): Observable<SearchResponse> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    // Se asigna el resultado de la consulta a la variable listadoMovies
    return this.http.get<SearchResponse>(`${this.BASE_URL_MOVIES}search/movie?query=${busquedaTrim}`, { headers });
  }
}
