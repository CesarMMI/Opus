import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { HttpService } from '../../shared/services/http.service';
import { AuthResponse } from '../types/auth.response';
import { LoginRequest } from '../types/login.request';

@Injectable({ providedIn: 'root' })
export class PublicService extends HttpService {
  private authService = inject(AuthService);

  public login(request: LoginRequest): Observable<AuthResponse> {
    return this.post<AuthResponse>('/auth/login', request).pipe(
      tap((res) =>
        this.authService.login(res.tokens?.access ?? '', res.tokens?.refresh ?? '', res.user!)
      )
    );
  }
}
