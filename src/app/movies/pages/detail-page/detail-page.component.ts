import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styles: [],
})
export class DetailPageComponent implements OnInit {
  public movieData?: any;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtiene el ID de la película de los parámetros de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getMovieByID(id).subscribe(
      (respuesta) => {
        console.log({ respuesta });
        if (!respuesta) return this.router.navigate(['/heroes/list']);
        this.movieData = respuesta;

        return;
      });
  }
}
