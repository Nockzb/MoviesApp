import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FavService } from '../../services/fav.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {

  public lista_fav: Movie[] = [];
  arrayIdsMovies: string[] = [];

  permises!: Permises | null;

  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public loca: User[],
    private movieService: MovieService,
    private router: Router,
    private favService: FavService
  ) {

  }

  ngOnInit(): void {
    this.getIdsFavoritas();
  }


  async getIdsFavoritas() {
    const RESPONSE = await this.favService.getFavs(this.loca[0].id_usuario).toPromise();
    if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
      console.log(RESPONSE.data[0]);
      // let prueba = RESPONSE.data[0]
      // prueba
      this.arrayIdsMovies = RESPONSE.data.map((item: { id_movie: any; }) => item.id_movie);
      console.log(RESPONSE.data);
    }

    this.obtenerPeliculas();
  }



  async obtenerPeliculas() {
    const observables: Observable<Movie>[] = [];

    for (const id of this.arrayIdsMovies) {
      console.log(this.arrayIdsMovies);
      console.log(id);
      const observable = this.movieService.getMovieByID(parseInt(id, 10)); // Asegúrate de convertir la cadena a un número si es necesario
      observables.push(observable);
  }


    console.log(this.arrayIdsMovies)

    forkJoin(observables).subscribe({
      next: (movies: Movie[]) => {
        this.lista_fav = movies;
        console.log(this.lista_fav);

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


