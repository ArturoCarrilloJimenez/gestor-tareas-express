import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home-page/home-page.component').then(m => m.HomePageComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register-page/register-page.component').then(m => m.RegisterPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
