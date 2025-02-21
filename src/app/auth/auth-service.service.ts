import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private URL = 'http://localhost:3000/api/auth';

  constructor() {}

  registerUser(form: { username: string; fullname: string; password: string }) {
    console.log('Registering user:', form);
  }

  loginUser(form: { username: string; password: string }) {
    console.log('Logging in user:', form);
  }

  logoutUser() {
    console.log('Logging out user');
  }
}
