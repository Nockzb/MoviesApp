import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  public movieData?: any;
  displayedColumns: string[] = ['category', 'value'];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtiene el ID de la película de los parámetros de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Verificar si id es null antes de usarlo
    if (id !== null) {
      this.movieService.getMovieByID(id).subscribe(
      (respuesta) => {
        if (!respuesta) return this.router.navigate(['/movies/home']);
        this.movieData = respuesta;

        return;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/movies/home'])
  }
}
