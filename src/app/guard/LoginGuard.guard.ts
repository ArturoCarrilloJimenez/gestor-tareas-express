import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {
   constructor(private router: Router, private authService: AuthServiceService) {}

  canActivate(): boolean {
    // Si se ha logeado lo redirige a home y si no devuelvo true
    if (this.authService.isLogged()) {
      this.router.navigateByUrl('');
      return false;
    }

    return true;
  }
}
