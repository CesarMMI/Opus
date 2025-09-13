import { Routes } from '@angular/router';

export const PUBLIC_ROUTE: string = 'auth';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then((p) => p.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((p) => p.RegisterPage),
  },
];
