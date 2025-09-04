import { ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control): ValidationErrors | null => {
  const passwordControl = control.parent?.get('password');
  if (!passwordControl) return null;

  const value = control.value;
  const target = passwordControl.value;
  if (value === target) return null;

  return { confirmPassword: { value, target } };
};
