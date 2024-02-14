import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { AuthGuardService as AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
        canActivate: [AuthGuard]
      },
      {
        // TODO: AGREGAR LAS RUTAS PARA USER EN LA BD
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        // canActivate: [AuthGuard]
      },
      { path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
    ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
