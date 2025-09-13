import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const authGuard =
  (authenticated: boolean, redirectTo: string): CanActivateFn =>
  () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authenticated$.pipe(
      map((auth) => (auth !== authenticated ? router.createUrlTree(['/', redirectTo]) : true))
    );
  };
