import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  goBack(): void {
    this.dialogRef.close();
    // this.router.navigate(['/users']);
  }
  }


