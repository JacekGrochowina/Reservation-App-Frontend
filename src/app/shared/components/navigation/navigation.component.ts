import { Component } from '@angular/core';
import { navItem } from './interfaces/nav-item.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  navList: navItem[] = [
    {
      name: 'Domowa',
      icon: 'home',
      path: '',
    },
    {
      name: 'Kierowcy',
      icon: 'people',
      path: 'kierowcy',
    },
  ];
}
