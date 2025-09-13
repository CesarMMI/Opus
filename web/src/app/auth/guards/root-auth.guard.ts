import { inject } from '@angular/core';
import { RedirectFunction } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const rootAuthGuard =
  (publicRoute: string, privateRoute: string): RedirectFunction =>
  () =>
    inject(AuthService).authenticated$.pipe(map((auth) => (auth ? privateRoute : publicRoute)));
