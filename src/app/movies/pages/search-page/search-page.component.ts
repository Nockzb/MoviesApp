import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'movies-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
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
