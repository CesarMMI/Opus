import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SKIP_AUTH } from '../contexts/skip-auth.context';
import { AuthService } from '../service/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const skipAuth = req.context.get(SKIP_AUTH);
  if (skipAuth) return next(req);

  const authService = inject(AuthService);
  const cloned = cloneReq(req, authService);

  return next(cloned).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        const refreshToken = authService.refreshToken() ?? '';
        return authService.refresh({ refreshToken }).pipe(
          catchError((err) => {
            authService.logout();
            return throwError(() => err);
          }),
          switchMap(() => {
            const cloned = cloneReq(req, authService);
            return next(cloned);
          })
        );
      }
      return throwError(() => err);
    })
  );
};

const cloneReq = (req: HttpRequest<unknown>, authService: AuthService): HttpRequest<unknown> => {
  return req.clone({
    headers: new HttpHeaders({ Authorization: `Bearer ${authService.accessToken()}` }),
  });
};
