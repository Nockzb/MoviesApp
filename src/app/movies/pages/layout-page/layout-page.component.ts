import { Component } from '@angular/core';

@Component({
  selector: 'movies-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Home', icon: 'home', url: './home' },
    { label: 'Listado', icon: 'list', url: './list' },
    { label: 'Buscar', icon: 'search', url: './search' },
    // { label: 'Listado', icon: 'label', url: './list' }, agregar detallePage
  ]

}
