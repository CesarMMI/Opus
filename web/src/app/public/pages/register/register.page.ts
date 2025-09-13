import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../../core/auth/service/auth.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-register-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ToolbarComponent,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./../../styles/container.scss', './register.page.scss'],
})
export class RegisterPage {
  private authService = inject(AuthService);

  private passVisible = signal(false);
  protected passVisibilityIcon = computed(() => `visibility_${this.passVisible() ? 'off' : 'on'}`);
  protected passInputType = computed(() => (this.passVisible() ? 'text' : 'password'));

  protected form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
    confirmPassword: new FormControl<string | null>(null, [
      Validators.required,
      confirmPasswordValidator,
    ]),
  });

  protected togglePassVisibility() {
    this.passVisible.update((visible) => !visible);
  }

  protected onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value;
    delete value.confirmPassword;
    this.authService.register(value).pipe(first()).subscribe();
  }
}
