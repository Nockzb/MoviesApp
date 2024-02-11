import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../movies/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { SearchResponse } from '../movies/interfaces/SearchResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  public listadoMovies: Movie[] = [];

  private BASE_URL_MOVIES = 'https://api.themoviedb.org/3/';
  private TOKEN_MOVIES = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmMwMWQxZGJhNTM4OWJjZjI5MDUzMzc0ZWNiZDUxZCIsInN1YiI6IjY1Yzc1MGUyNTRhMDk4MDE4NDAxOWJkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPpDboS8MDXxdvnDizQXZ_IiHAc72Ekvi65X9nAhifc';

  constructor( private http: HttpClient ) { }

  // Metodo de autentificacion
  getAuthentication() {
    // Define las cabeceras con el token de acceso
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    // Realiza la petición GET a la API de autenticación
    return this.http.get(`${this.BASE_URL_MOVIES}authentication`, { headers });
  }

  // Método que realiza la búsqueda por título y número de página
  getMoviesByQuery(busqueda: string, page: number): Observable<SearchResponse> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${this.BASE_URL_MOVIES}search/movie?query=${busquedaTrim}&page=${page}`, { headers });
  }

  // Método que realiza la búsqueda por titulo
  getMovieByID(id: number | string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${this.BASE_URL_MOVIES}/movie/${id}`, { headers });
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  getTrendingMovies(): Observable<SearchResponse> {
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${this.TOKEN_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${this.BASE_URL_MOVIES}trending/movie/week?language=es-ES`, { headers });
  }
}
