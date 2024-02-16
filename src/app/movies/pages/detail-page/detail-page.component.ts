import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  public movieData?: any;
  displayedColumns: string[] = ['category', 'value'];

  userActual: User | null = null;
  currentToken: string | null = "";

  permises!: Permises | null;

  constructor(
    private movieService: MovieService,
    private usersService: UsersService,
    private favService: FavService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

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

    this.getUserPorToken();
  }

  // Método para obtener el usuario a partir del token
  async getUserPorToken() {
    this.currentToken = localStorage.getItem("token");
    if (this.currentToken) {
      const RESPONSE = await this.usersService.getUserByToken(localStorage.getItem("token")).toPromise();
      if (RESPONSE !== undefined) {
        if (RESPONSE.permises !== undefined) {
          this.permises = RESPONSE.permises;

          if (RESPONSE.ok) {
            // Se almacena en la propiedad 'userActual' la respuesta de la solicitud
            this.userActual = RESPONSE.data[0] as User;

            // Se asigna a la propiedad 'currentUser' del servicio los valores del usuario
            // obtenidos a partir del token
            this.usersService.currentUser = this.userActual
          }
        }
      }
    }
  }

  async agregarFavorita(id_movie: string) {
    if (this.userActual) {
      let idprueba = this.userActual.id_usuario
      console.log(idprueba);

      const response = await this.favService.insertarFav(idprueba, id_movie).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/movies/home'])
  }
}
