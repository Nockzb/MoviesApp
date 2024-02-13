import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritPageComponent } from './favorit-page/favorit-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
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
