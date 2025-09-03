import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { User } from '../types/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = this.getStorageSignal('user');
  private _accessToken = this.getStorageSignal('access-token');
  private _refreshToken = this.getStorageSignal('refresh-token');

  public readonly user = this._user.asReadonly();
  public readonly accessToken = this._accessToken.asReadonly();
  public readonly refreshToken = this._refreshToken.asReadonly();

  public readonly authenticated = computed(() => !!this.user() && !!this.refreshToken());
  public readonly authenticated$ = toObservable(this.authenticated).pipe(distinctUntilChanged());

  public login(accessToken: string, refreshToken: string, user: User): boolean {
    this.setStorageSignal(this._user, 'user', user);
    this.setStorageSignal(this._accessToken, 'access-token', accessToken);
    this.setStorageSignal(this._refreshToken, 'refresh-token', refreshToken);
    return this.authenticated();
  }

  private getStorageSignal<T>(storageKey: string): WritableSignal<T | undefined> {
    const valueStr = localStorage.getItem(storageKey);
    if (!valueStr) return signal<T | undefined>(undefined);
    try {
      return signal<T | undefined>(JSON.parse(valueStr) as T);
    } catch (e) {
      return signal<T | undefined>(undefined);
    }
  }

  private setStorageSignal<T>(
    signal: WritableSignal<T | undefined>,
    storageKey: string,
    value?: T
  ): void {
    signal.set(value);
    if (value === undefined) localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, JSON.stringify(value));
  }
}
