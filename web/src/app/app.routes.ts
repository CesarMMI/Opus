import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canActivate: [authGuard(false, ['/home'])],
    loadChildren: () => import('./public/public.routes').then((r) => r.publicRoutes),
  },
  {
    path: 'home',
    canActivate: [authGuard(true, ['/auth'])],
    loadChildren: () => import('./private/private.routes').then((r) => r.privateRoutes),
  },
];
