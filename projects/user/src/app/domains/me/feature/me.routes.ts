import { Routes } from '@angular/router';


export const ME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./me-shell.component').then((c) => c.MeShellComponent),
    title: 'Me'
  },
  
];

