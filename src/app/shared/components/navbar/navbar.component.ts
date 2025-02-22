import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../auth/auth-service.service';

@Component({
  selector: 'shared-navbar',
  imports: [
    MatToolbarModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthServiceService, private router: Router) {}

  get isLogin() {
    return this.authService.userIsLogin;
  }

  logout() {
    this.authService.logout();
    this.isLogin.set(this.authService.isLogged());
    this.router.navigateByUrl('/login');
  }
}
