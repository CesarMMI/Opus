import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    ToolbarComponent,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./../../styles/container.scss', './login.page.scss'],
})
export class LoginPage {
  private publicService = inject(PublicService);

  private passVisible = signal(false);
  protected passVisibilityIcon = computed(() => `visibility_${this.passVisible() ? 'off' : 'on'}`);
  protected passInputType = computed(() => (this.passVisible() ? 'text' : 'password'));

  protected form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  protected togglePassVisibility() {
    this.passVisible.update((visible) => !visible);
  }

  protected onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value;
    this.publicService.login(value).pipe(first()).subscribe();
  }
}
