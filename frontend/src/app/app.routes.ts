import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup').then((m) => m.SignupComponent),
  },
  {
    path: 'catalog',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
  },
];