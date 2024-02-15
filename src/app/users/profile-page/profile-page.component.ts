import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {

  public lista_fav: Movie[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public loca: User[],
    private movieService: MovieService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    const observables: Observable<Movie>[] = [];

    let listaSinCorchetes: string | null = "";
    let listaArray: string[] | null = ['2'];

    if (this.loca[0].lista_fav != null) {
      listaSinCorchetes = this.loca[0].lista_fav.replace(/[\[\]']/g, '')
      listaArray = listaSinCorchetes.split(',');

      for (const id of listaArray) {
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

  redirectToMovie(id_movie: number) {
    // Combinamos la ruta base con la ruta a la película
    const newUrl = `/movies/${id_movie}`;

    // Verificamos si la nueva URL es diferente a la URL actual
    if (this.router.url !== newUrl) {
      // Si la nueva URL es diferente, navegamos a ella
      this.router.navigateByUrl(newUrl).then(() => {
        // Luego cerramos el diálogo después de redirigir
        this.goBack();
      });
    } else {
      // Si la nueva URL es la misma que la actual, simplemente cerramos el diálogo
      this.goBack();
    }
  }

  goBack(): void {
    this.dialogRef.close();
  }
}


