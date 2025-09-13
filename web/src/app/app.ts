import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './core/message/services/message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet/>',
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      width: min(100%, 600px);
      height: 100%;
      margin: 0 auto;
      overflow: auto;
    }
  `,
})
export class App {
  constructor(matSnackBar: MatSnackBar, messageService: MessageService) {
    messageService.queue$
      .pipe(takeUntilDestroyed())
      .subscribe((message) => messageService.openSnackbar(matSnackBar, message));
  }
}
