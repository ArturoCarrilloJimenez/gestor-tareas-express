import { Routes } from '@angular/router';
import { AuthGuard } from './guard/AuthGuard.guard';
import { LoginGuard } from './guard/LoginGuard.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadComponent: () =>
      import('./auth/login/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    loadComponent: () =>
      import('./auth/register/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
