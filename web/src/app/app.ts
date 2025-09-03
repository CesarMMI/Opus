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
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.authService.authenticated$.pipe(takeUntilDestroyed()).subscribe(() => this.reloadRouter());
  }

  private reloadRouter(): void {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
