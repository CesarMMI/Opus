import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpOptions } from '../types/http-options';

@Injectable()
export class HttpService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  protected get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, options);
  }
  protected post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, options);
  }
  protected put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, body, options);
  }
  protected delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, options);
  }
}
