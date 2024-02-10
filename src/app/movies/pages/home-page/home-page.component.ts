import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'movies-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  constructor( public moviesService: MovieService ) { }

  ngOnInit(): void {
    this.searchTrending();
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  public searchTrending() {
    this.moviesService.getTrendingMovies().subscribe(
      respuesta => {
        console.log(respuesta)
        // Almacena los resultados en la variable 'listadoMovies' del servicio
        this.moviesService.listadoMovies = respuesta.results;
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    )
  }
}
