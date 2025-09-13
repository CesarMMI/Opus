import { makeEnvironmentProviders } from '@angular/core';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

export const provideMaterialOverride = () =>
  makeEnvironmentProviders([
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' } as MatFormFieldDefaultOptions,
    },
  ]);
