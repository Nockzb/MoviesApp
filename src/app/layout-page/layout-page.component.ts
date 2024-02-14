import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'movies-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: [ './layout-page.component.css' ]
})

export class LayoutPageComponent {
  nombre_publico: string | null = ""
  usuario: string | null = ""

  constructor ( private authService: AuthService,
                private router: Router,
                ) {}

  public sidebarItems = [
    { label: 'Home', icon: 'home', url: '/movies/home' },
    // { label: 'Listado', icon: 'list', url: '/movies/list' },
    { label: 'Buscar', icon: 'search', url: '/movies/search' },
    { label: 'Gestión de usuarios', icon: 'supervisor_account', url: '/users' },
  ]

  hayToken(): boolean {
    let hayToken: boolean = false;
    let currentToken = localStorage.getItem('token');
    this.nombre_publico = localStorage.getItem('nombre_publico');
    this.usuario = localStorage.getItem('usuario');

    if (currentToken) {
      hayToken = true;
    } else {
      hayToken = false;
    }
    return hayToken;
  }

  logOut() {
    const logoutObservable: Observable<any> | undefined = this.authService?.doLogout?.();
    if (logoutObservable) {
      this.nombre_publico = "";
      this.usuario = "";
      logoutObservable.subscribe(response => {
        this.router.navigate(['/auth']);
      });
    } else {
      console.error('doLogout is not defined or does not return an Observable.');
      this.router.navigate(['/auth']);
    }
  }
}



