import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../shared/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { SearchResponse } from '../shared/interfaces/search-response.interface';
import { URL_API_MOVIES, TOKEN_API_MOVIES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  public listadoMovies: Movie[] = [];
  constructor( private http: HttpClient ) { }

  // Metodo de autentificacion
  getAuthentication() {
    // Define las cabeceras con el token de acceso
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
      'accept': 'application/json'
    });

    // Realiza la petición GET a la API de autenticación
    return this.http.get(`${URL_API_MOVIES}authentication`, { headers });
  }

  // Método que realiza la búsqueda por título y número de página
  getMoviesByQuery(busqueda: string, page: number): Observable<SearchResponse> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${URL_API_MOVIES}search/movie?query=${busquedaTrim}&page=${page}`, { headers });
  }

  // Método que realiza la búsqueda por titulo
  getMovieByID(id: number | string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${URL_API_MOVIES}movie/${id}`, { headers });
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  getTrendingMovies(): Observable<SearchResponse> {
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
      'accept': 'application/json'
    });

    return this.http.get<SearchResponse>(`${URL_API_MOVIES}trending/movie/week?language=es-ES`, { headers });
  }
}
