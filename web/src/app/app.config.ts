import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { tokenInterceptor } from './core/auth/interceptors/token.interceptor';
import { provideMaterialOverride } from './core/material-override/material-override';
import { messageInterceptor } from './core/message/interceptors/message.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, messageInterceptor])),
    provideMaterialOverride(),
  ],
};
