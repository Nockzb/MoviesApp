import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'movies-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

export class ListPageComponent {
  @Input()
  public listadoMovies: Movie[] = [];

  constructor( private moviesService: MovieService ) { }

  ngOnInit(): void {

  }

  updateListadoMovies(movies: Movie[]) {
    this.listadoMovies = movies;
  }
}
