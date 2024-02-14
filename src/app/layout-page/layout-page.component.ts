import { Component, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilePageComponent } from '../users/profile-page/profile-page.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { UsersService } from '../services/users.service';
import { Permises } from '../shared/interfaces/api-response.interface';
import { User } from '../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'movies-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: [ './layout-page.component.css' ]
})

export class LayoutPageComponent {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  nombre_publico: string | null = ""
  userActual: User | null = null;
  permises!: Permises | null;
  displayedColumns!: string[];
  currentToken: string | null = "";

  constructor ( private authService: AuthService,
                private router: Router,
                public dialog: MatDialog,
                private overlay: Overlay,
                private usersService: UsersService,
                // @Inject(MAT_DIALOG_DATA) public user: User,
                ) {
                  this.currentToken = this.tokenActual()
                }

  public sidebarItems = [
    { label: 'Home', icon: 'home', url: '/movies/home' },
    // { label: 'Listado', icon: 'list', url: '/movies/list' },
    { label: 'Buscar', icon: 'search', url: '/movies/search' },
    { label: 'Gestión de usuarios', icon: 'supervisor_account', url: '/users' },
  ]

  hayToken(): boolean {
    let hayToken: boolean = false;
    this.currentToken = localStorage.getItem('token');
    this.nombre_publico = localStorage.getItem('nombre_publico');    

    if (this.currentToken) {
      hayToken = true;
    } else {
      hayToken = false;
    }
    return hayToken;
  }

  tokenActual(): string | null {
    return localStorage.getItem("token");
  }

  async getUserPorToken() {
    if (this.currentToken) {
      const RESPONSE = await this.usersService.getUserByToken(localStorage.getItem("token")).toPromise();      
      console.log(RESPONSE);
    if (RESPONSE !== undefined) {
      
      if (RESPONSE.permises !== undefined) {
        this.permises = RESPONSE.permises;

        if (RESPONSE.ok) {
          this.userActual = RESPONSE.data as User;  
          console.log(RESPONSE.data);
                  
          // this.displayedColumns = ['id_user', 'usuario', 'email', 'nombre_publico', 'pass_user', 'id_rol', 'token_sesion', 'lista_fav'];
          this.usersService.currentUser = this.userActual          
          
          this.openProfile(this.userActual)
          // this.dataSource.data = this.userActual;
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.filterPredicate = this.createFilter();
          // this.selection = new SelectionModel<User>(false, [this.user]);

          // this.onChanges();
        }
      }
    }
  }
  }

  async openProfile(user: User) {
    const dialogRef = this.dialog.open(ProfilePageComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });

    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        // this.ngOnInit();
      }
    }
  }

  logOut() {
    const logoutObservable: Observable<any> | undefined = this.authService?.doLogout?.();
    if (logoutObservable) {
      this.nombre_publico = "";      
      logoutObservable.subscribe(response => {
        this.router.navigate(['/auth']);
      });
    } else {
      console.error('doLogout is not defined or does not return an Observable.');
      this.router.navigate(['/auth']);
    }
  }
}