import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FavoritPageComponent } from './favorit-page/favorit-page.component';
import { MoviesModule } from '../movies/movies.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ UsersComponent, AddUserComponent, EditUserComponent, DeleteUserComponent, FavoritPageComponent ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    MoviesModule,
    MatDialogModule,
  ]
})
export class UsersModule { }
