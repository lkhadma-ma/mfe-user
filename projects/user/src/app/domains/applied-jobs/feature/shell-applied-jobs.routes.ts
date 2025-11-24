import { Routes } from '@angular/router';


export const APPLIED_JOBS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shell-applied-jobs.component').then((c) => c.ShellAppliedJobsComponent),
    title: 'Applied Jobs'
  },
  
];
