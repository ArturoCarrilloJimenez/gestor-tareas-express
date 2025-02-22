import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-register-page',
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  form = {
    username: '',
    fullname: '',
    password: '',
  };
  confirmPassword = '';

  error = signal('');
  usernameError = signal('');
  passwordError = signal('');
  fullnameError = signal('');
  confirmPasswordError = signal('');

  hidePassword = signal(true);

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  updateError() {
    let error = false;
    if (this.form.username === '') {
      this.usernameError.set('Please enter a username');
      error = true;
    }
    if (this.form.password === '') {
      this.passwordError.set('Please enter a password');
      error = true;
    }
    if (this.confirmPassword === '') {
      this.confirmPasswordError.set('Please confirm your password');
      error = true;
    }
    if (this.confirmPassword !== this.form.password) {
      this.confirmPasswordError.set('Passwords do not match');
      this.error.set('Passwords do not match');
      error = true;
    }
    if (!error) {
      this.error.set('');
      this.usernameError.set('');
      this.passwordError.set('');
      this.fullnameError.set('');
      this.confirmPasswordError.set('');

      return true;
    }

    return false;
  }

  register() {
    if (!this.updateError()) {
      return;
    }

    // Si no hay errores registra
    this.authService.registerUser(this.form).subscribe({
      next: () => {
        // Si todo va bien intenta hacer login
        this.authService.loginUser(this.form).subscribe({
          next: (response) => {
            // Hace login correctamente, redirige a home
            this.router.navigateByUrl('');
          },
          error: (error) => {
            // Algo falla al hacer login, redirige a login
            console.error(error);
            this.router.navigateByUrl('/login');
          },
        });
      },
      error: (error) => {
        console.error(error);
        this.error.set(
          'Algo ha fallado al intentar regístrate, inténtalo mas tarde'
        );
      },
    });
  }
}
