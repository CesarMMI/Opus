import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard(false, ['/'])],
    loadChildren: () => import('./public/public.routes').then((r) => r.publicRoutes),
  },
  {
    path: '',
    canActivate: [authGuard(true, ['/auth'])],
    loadChildren: () => import('./private/private.routes').then((r) => r.privateRoutes),
  },
];
