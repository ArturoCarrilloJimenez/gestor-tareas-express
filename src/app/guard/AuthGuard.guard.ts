import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceService) {}

  canActivate(): boolean {
    // Si no se ha logeado lo redirige a login y si no devuelvo true
    if (!this.authService.isLogged()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
