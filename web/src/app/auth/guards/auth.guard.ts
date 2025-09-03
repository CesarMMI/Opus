import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

export const authGuard =
  (authenticated: boolean, redirectTo: string[]): CanActivateFn =>
  (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.authenticated$.pipe(
      map((auth) => {
        if (auth !== authenticated) return router.createUrlTree(redirectTo);
        return true;
      })
    );
  };
