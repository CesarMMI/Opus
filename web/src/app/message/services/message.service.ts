import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../types/message';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private _queue$ = new Subject<Message>();
  private ref = signal<MatSnackBarRef<any> | undefined>(undefined);
  private durationSec = 5;

  readonly queue$ = this._queue$.asObservable();

  public addMessage(message: Message) {
    this._queue$.next(message);
  }

  public openSnackbar(matSnackBar: MatSnackBar, message: Message) {
    const ref = matSnackBar.open(message.text, 'OK', { duration: this.durationSec * 1000 });
    this.ref.update((old) => {
      old?.dismiss();
      return ref;
    });
    return ref;
  }
}
