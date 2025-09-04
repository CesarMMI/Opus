import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { StorageService } from '../../shared/services/storage.service';
import { AuthResponse } from '../types/auth.response';
import { LoginRequest } from '../types/login.request';
import { RefreshRequest } from '../types/refresh.request';
import { RegisterRequest } from '../types/register.request';
import { User } from '../types/user';

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpService {
  private router = inject(Router);
  private storage = inject(StorageService);
  private _user = signal(this.storage.get<User>('user'));
  private _accessToken = signal(this.storage.get<string>('access-token'));
  private _refreshToken = signal(this.storage.get<string>('refresh-token'));

  public readonly user = this._user.asReadonly();
  public readonly accessToken = this._accessToken.asReadonly();
  public readonly refreshToken = this._refreshToken.asReadonly();

  public readonly authenticated = computed(() => !!this.user() && !!this.refreshToken());
  public readonly authenticated$ = toObservable(this.authenticated).pipe(distinctUntilChanged());

  public login(request: LoginRequest): Observable<AuthResponse> {
    return this.request('/auth/login', request);
  }
  public logout(): void {
    this.setAuth();
  }
  public register(request: RegisterRequest): Observable<AuthResponse> {
    return this.request('/auth/register', request);
  }
  public refresh(request: RefreshRequest): Observable<AuthResponse> {
    return this.request('/auth/refresh', request);
  }

  private request(url: string, request: any): Observable<AuthResponse> {
    return this.post<AuthResponse>(url, request, { skipAuth: true }).pipe(
      tap((res) => this.setAuth(res.user, res.tokens?.access, res.tokens?.refresh))
    );
  }

  private setAuth(user?: User, accessToken?: string, refreshToken?: string) {
    this.setStorageSignal(this._user, 'user', user);
    this.setStorageSignal(this._accessToken, 'access-token', accessToken);
    this.setStorageSignal(this._refreshToken, 'refresh-token', refreshToken);
    this.redirectTo('/');
  }

  private setStorageSignal(signal: WritableSignal<any>, storageKey: string, value?: any): void {
    signal.set(value);
    if (value === undefined) this.storage.remove(storageKey);
    else this.storage.set(storageKey, value);
  }

  private redirectTo(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    });
  }
}
