import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'movies-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})

export class ListPageComponent {
  @Input()
  public listadoMovies: Movie[] = [];

  constructor( private moviesService: MovieService ) { }

  ngOnInit(): void {
    // this.moviesService.getMoviesByQuery('').subscribe((heroes: Hero[]) => {this.listaHeroes = heroes;});
  }
}
