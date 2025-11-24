import { Routes } from '@angular/router';


export const ME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shell-me.component').then((c) => c.ShellMeComponent),
    title: 'Me'
  },
  
];
