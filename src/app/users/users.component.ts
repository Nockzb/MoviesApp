import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../shared/interfaces/user.interface';
import { UsersService } from '../services/users.service';
import { Permises } from '../shared/interfaces/api-response.interface';

// import { DeleteAlumnoComponent } from './delete-user/delete-user.component';
// import { EditAlumnoComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  idUserFilter = new FormControl();
  usernameFilter = new FormControl();
  emailFilter = new FormControl();
  nombreFilter = new FormControl();
  apellidosFilter = new FormControl();

  permises!: Permises | null;
  selection!: SelectionModel<User>;
  user!: User;

  displayedColumns!: string[];
  private filterValues = {id_usuario: '', usuario: '', email: '', nombre_publico: '', id_rol: ''};

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private overlay: Overlay,
    // @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadCentro,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const RESPONSE = await this.usersService.getUsers().toPromise();
    if (RESPONSE !== undefined) {
      if (RESPONSE.permises !== undefined) {
        this.permises = RESPONSE.permises;

        if (RESPONSE.ok) {
          this.users = RESPONSE.data as User[];
          this.displayedColumns = ['id_user', 'usuario', 'email', 'nombre_publico', 'pass_user', 'id_rol', 'token', 'token_sesion', 'lista_fav'];
          this.dataSource.data = this.users;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.createFilter();
          this.selection = new SelectionModel<User>(false, [this.user]);

          this.onChanges();
        }
      } else {
        // Manejar el caso donde RESPONSE.permises es undefined
      }
    } else {
      // Manejar el caso donde RESPONSE es undefined
    }
  }

  async addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.usersService.users.push(RESULT.data);
        this.dataSource.data = this.usersService.users;
        this.getUsers();
      }
    }
  }

  // async editAlumno(alumno: User) {
  //   const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       this.dataSource.data = this.usersService.users;
  //       this.getusers(this.unidadCentro.id_unidad_centro);
  //     }
  //   }
  // }


  async deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        this.dataSource.data = this.usersService.users;
        this.getUsers();
      }
    }
  }

  createFilter(): (alumno: User, filter: string) => boolean {
    const filterFunction = (alumno: User, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.nombre_publico.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
             && alumno.usuario.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
    };

    return filterFunction;
  }

  onChanges() {
    this.nombreFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre_publico = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.apellidosFilter.valueChanges
    .subscribe(value => {
        this.filterValues.usuario = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
