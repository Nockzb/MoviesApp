import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    // .../auth/
    path: '',
    component: LayoutPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})

export class AuthRoutingModule { }
