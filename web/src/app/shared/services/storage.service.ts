import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public get<T>(key: string) {
    const stringValue = localStorage.getItem(key);
    if (!stringValue) return;
    try {
      return JSON.parse(stringValue) as T;
    } catch (e) {
      return;
    }
  }

  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}
