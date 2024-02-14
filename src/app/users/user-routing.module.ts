import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritPageComponent } from './favorit-page/favorit-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {  // TODO: PROBAR
    path: 'profile-page',
    component: ProfilePageComponent
  },
  {
    path: 'favorit-page',
    component: FavoritPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
