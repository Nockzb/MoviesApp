import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'movies-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent {

  constructor( private movieService: MovieService ) { }

}
