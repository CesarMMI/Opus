import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

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
  constructor() {}
}
