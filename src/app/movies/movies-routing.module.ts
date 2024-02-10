import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';

const routes: Routes = [
  {
    // .../auth/
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: ':id', component: MoviePageComponent },
      { path: '**', redirectTo: 'list' },
      // TODO: agregar mas rutas hijas
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
