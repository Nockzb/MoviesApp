import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { cantActivateGuard, cantMatchGuard } from './guards/public.guard';
import { canActivateGuard, canMatchGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
        // canActivate: [AuthGuardService]
        canMatch: [cantMatchGuard], //Anclamos la función del canMatch
        canActivate: [cantActivateGuard]
      },
      {
        // TODO: AGREGAR LAS RUTAS PARA USER EN LA BD
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        // canMatch: [cantMatchGuard], //Anclamos la función del canMatch
        // canActivate: [cantActivateGuard]
      },
      { 
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canMatch: [canMatchGuard], //Anclamos la función del canMatch
        canActivate: [canActivateGuard]
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
