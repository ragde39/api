import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

import { environment } from "./../environments/environment";
import {
  User,
  LoginCredentials,
  AuthResponse,
} from "../shared/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private platformId: Object) {}

  register(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  private setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token");
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
