import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, tap } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { StorageService } from '../../shared/services/storage.service';
import { AuthResponse } from '../types/auth.response';
import { LoginRequest } from '../types/login.request';
import { RefreshRequest } from '../types/refresh.request';
import { RegisterRequest } from '../types/register.request';
import { User } from '../types/user';

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpService {
  private storage = inject(StorageService);

  private _user = signal(this.storage.get<User>('user'));
  private _accessToken = signal(this.storage.get<string>('access-token'));
  private _refreshToken = signal(this.storage.get<string>('refresh-token'));

  readonly user = this._user.asReadonly();
  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();

  readonly authenticated = computed(() => !!this.user() && !!this.refreshToken());
  readonly authenticated$ = toObservable(this.authenticated).pipe(distinctUntilChanged());

  login(request: LoginRequest) {
    return this.request('/auth/login', request);
  }
  logout() {
    this.setAuth();
  }
  register(request: RegisterRequest) {
    return this.request('/auth/register', request);
  }
  refresh(request: RefreshRequest) {
    return this.request('/auth/refresh', request);
  }

  private request(url: string, request: any) {
    return this.post<AuthResponse>(url, request, { skipAuth: true }).pipe(
      tap((res) => this.setAuth(res.user, res.tokens?.access, res.tokens?.refresh))
    );
  }

  private setAuth(user?: User, accessToken?: string, refreshToken?: string) {
    this.setStorageSignal(this._user, 'user', user);
    this.setStorageSignal(this._accessToken, 'access-token', accessToken);
    this.setStorageSignal(this._refreshToken, 'refresh-token', refreshToken);
  }

  private setStorageSignal(signal: WritableSignal<any>, storageKey: string, value?: any) {
    signal.set(value);
    if (value === undefined) this.storage.remove(storageKey);
    else this.storage.set(storageKey, value);
  }
}
