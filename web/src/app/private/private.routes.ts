import { Routes } from '@angular/router';

export const PRIVATE_ROUTE: string = 'home';

export const privateRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tasks-list/tasks-list.page').then((p) => p.TasksListPage),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/task-form/task-form.page').then((p) => p.TaskFormPage),
  },
];
