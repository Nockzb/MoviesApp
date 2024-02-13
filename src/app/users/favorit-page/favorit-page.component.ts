import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Movie } from '../../shared/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorit-page',
  templateUrl: './favorit-page.component.html',
  styleUrls: ['./favorit-page.component.css'],
})

export class FavoritPageComponent implements OnInit {
  public user: User | null = null;
  public lista_fav: Movie[] = [];
  public listaSinCorchetes: string | null = "";
  public listaArray: string[] | null = ['2'];

  permises!: Permises | null;

  constructor(
    private movieService: MovieService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.currentUser;
    const observables: Observable<Movie>[] = [];

    if (this.user.lista_fav != null) {
      this.listaSinCorchetes = this.user.lista_fav.replace(/[\[\]']/g, '')
      this.listaArray = this.listaSinCorchetes?.split(',');

      for (const id of this.listaArray) {
        console.log(id);
        const observable = this.movieService.getMovieByID(id);
        observables.push(observable);
      }
    }

    forkJoin(observables).subscribe({
      next: (movies: Movie[]) => {
        this.lista_fav = movies;
      },
      error: (error: any) => {
        console.error('Error obteniendo películas favoritas:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}