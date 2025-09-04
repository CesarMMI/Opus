import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { tokenInterceptor } from './auth/interceptors/token.interceptor';
import { provideMaterialOverride } from './core/material-override/material-override';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideNativeDateAdapter(),
    provideMaterialOverride(),
  ],
};
