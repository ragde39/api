import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
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
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(tap((res) => this.tokenSubject.next(res.token)));
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((res) => this.tokenSubject.next(res.token)));
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.tokenSubject.pipe(map((token) => !!token));
  }

  logout(): void {
    this.tokenSubject.next(null);
  }
}
