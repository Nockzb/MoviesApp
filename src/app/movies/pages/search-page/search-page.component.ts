import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'movies-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})

export class SearchPageComponent implements OnInit { // Implementa OnInit
  public searchForm: FormGroup = new FormGroup({ // Inicializa el FormGroup aquí
    searchInput: new FormControl('')
  });

  constructor(public moviesService: MovieService) { }

  ngOnInit(): void {
  }

  // Método para realizar una búsqueda por titulo
  public searchMovies() {
    const busqueda = this.searchForm.get('searchInput')!.value;
    if (!busqueda.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    this.moviesService.getMoviesByQuery(busqueda).subscribe(
      respuesta => {
        // Almacena los resultados en la variable 'listadoMovies' del servicio
        this.moviesService.listadoMovies = respuesta.results;
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
}
