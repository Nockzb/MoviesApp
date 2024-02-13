import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'movies-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})

export class LayoutPageComponent {

  constructor ( private authService: AuthService,
                private router: Router,
                ) {}

  public sidebarItems = [
    { label: 'Home', icon: 'home', url: '/movies/home' },
    // { label: 'Listado', icon: 'list', url: '/movies/list' },
    { label: 'Buscar', icon: 'search', url: '/movies/search' },
    { label: 'Gestión de usuarios', icon: 'supervisor_account', url: '/users' },
  ]

  logOut() {
    const logoutObservable: Observable<any> | undefined = this.authService?.doLogout?.();
    if (logoutObservable) {
      logoutObservable.subscribe(response => {
        // Hacer algo con la respuesta si es necesario
        this.router.navigate(['/auth']);
      });
    } else {
      console.error('doLogout is not defined or does not return an Observable.');
      // Si no se puede cerrar sesión, navega al componente de autenticación de todos modos
      this.router.navigate(['/auth']);
    }
  }
}



