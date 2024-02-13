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

  permises!: Permises | null;

  constructor(
    private movieService: MovieService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.usersService.currentUser;
  }

  ngOnInit(): void {
    const observables: Observable<Movie>[] = [];
    if (this.user != null) {
      const movieIDs: any = this.user.lista_fav;

      if (movieIDs != null) {
        for (const id of movieIDs) {
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
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}






  //  async getUser(id_usuario: number) {
  //   const RESPONSE = await this.usersService.getUserById(id_usuario).toPromise();
  //   console.log(RESPONSE?.data)
  //   if (RESPONSE !== undefined) {
  //     if (RESPONSE.permises !== undefined) {
  //       this.permises = RESPONSE.permises;

  //       if (RESPONSE.ok) {
  //         this.user = RESPONSE.data as User;



  //       }
  //     }
  //   }
  // }
