import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3333';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  signup(name: string, email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(
      `${this.apiUrl}/auth/signup`,
      { name, email, password }
    );
  }

  signin(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(
      `${this.apiUrl}/auth/signin`,
      { email, password }
    );
  }

  saveSession(token: string, user: any) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.isLoggedIn$.next(true);
  }

  signout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}