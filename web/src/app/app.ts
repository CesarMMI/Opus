import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
export class App {}
