import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { MessageType } from '../types/message-type';
import { HttpError } from './../types/http-error';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        const error = err.error as HttpError;
        if (error.message)
          messageService.addMessage({ type: MessageType.Error, text: error.message });
      }
      return throwError(() => err);
    })
  );
};
