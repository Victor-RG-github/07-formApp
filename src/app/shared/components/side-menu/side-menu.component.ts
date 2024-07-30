import { Component } from '@angular/core';

interface MenuIten {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {
  reactiveMenu: MenuIten[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  authMenu: MenuIten[] = [
    {
      title: 'Registro',
      route: './auth/sign-up',
    },
  ];
}
