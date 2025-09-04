import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public get<T>(key: string): T | undefined {
    const stringValue = localStorage.getItem(key);
    if (!stringValue) return;
    try {
      return JSON.parse(stringValue) as T;
    } catch (e) {
      return;
    }
  }

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
