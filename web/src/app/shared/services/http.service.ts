import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SKIP_AUTH } from '../../auth/contexts/skip-auth.context';
import { HttpOptions } from '../types/http-options';

@Injectable()
export class HttpService {
  protected baseUrl = environment.apiUrl;
  protected httpClient = inject(HttpClient);

  protected get<T>(url: string, options?: HttpOptions) {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, this.addAuth(options));
  }
  protected post<T>(url: string, body: any, options?: HttpOptions) {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, this.addAuth(options));
  }
  protected put<T>(url: string, body: any, options?: HttpOptions) {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, body, this.addAuth(options));
  }
  protected delete<T>(url: string, options?: HttpOptions) {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, this.addAuth(options));
  }

  private addAuth(options?: HttpOptions) {
    if (!options) return {};
    if (options.skipAuth) {
      if (options.context) options.context.set(SKIP_AUTH, true);
      else options.context = new HttpContext().set(SKIP_AUTH, true);
    }
    return options;
  }
}
