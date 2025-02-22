import { Login } from './interfaces/login.interface';
import { Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService implements OnInit {
  private URL = 'http://localhost:3000/api/';
  public userIsLogin = signal(true);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userIsLogin.set(this.isLogged());
    console.log(this.isLogged());
  }

  registerUser(form: { username: string; fullname: string; password: string }) {
    return this.http.post(this.URL + 'users', form).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Algo a fallado al registrar usuario')
        );
      })
    );
  }

  loginUser(form: { username: string; password: string }) {
    return this.http.post<Login>(this.URL + 'auth/login', form).pipe(
      tap((resp) => {
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('userId', resp.userId);
        this.userIsLogin.set(true);
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              'Error al intentar iniciar sesión, comprueba que este correcto el usuario y la contraseña'
            )
        );
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.userIsLogin.set(true);
  }

  isLogged(): boolean {
    let token = sessionStorage.getItem('token');
    let userId = sessionStorage.getItem('userId');

    return !!token && !!userId;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getUserId() {
    return sessionStorage.getItem('userId');
  }
}
