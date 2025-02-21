import { AuthServiceService } from './../../auth-service.service';
import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
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
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  form = {
    username: '',
    password: '',
  };

  error = signal('');
  usernameError = signal('');
  passwordError = signal('');

  hidePassword = signal(true);

  constructor(private authService: AuthServiceService) {}

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  updateError() {
    if (this.form.username === '') {
      this.usernameError.set('Please enter a username');
    }
    if (this.form.password === '') {
      this.passwordError.set('Please enter a password');
    }
    if (this.form.username !== '' && this.form.password !== '') {
      this.error.set('');
      this.usernameError.set('');
      this.passwordError.set('');

      return true;
    }

    return false;
  }

  login() {
    if (!this.updateError()) {
      return;
    }

    this.authService.loginUser(this.form);
  }
}
