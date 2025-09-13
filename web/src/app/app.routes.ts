import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { rootAuthGuard } from './auth/guards/root-auth.guard';
import { PUBLIC_ROUTE } from './public/public.routes';
import { PRIVATE_ROUTE } from './private/private.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: rootAuthGuard(PUBLIC_ROUTE, PRIVATE_ROUTE),
  },
  {
    path: PUBLIC_ROUTE,
    canActivate: [authGuard(false, PRIVATE_ROUTE)],
    loadChildren: () => import('./public/public.routes').then((r) => r.publicRoutes),
  },
  {
    path: PRIVATE_ROUTE,
    canActivate: [authGuard(true, PUBLIC_ROUTE)],
    loadChildren: () => import('./private/private.routes').then((r) => r.privateRoutes),
  },
];
