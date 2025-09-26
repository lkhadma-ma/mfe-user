import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private withAuthHeaders(options?: { headers?: HttpHeaders | Record<string, string> }) {
    return from(this.auth.authorizationHeader()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          ...(options?.headers ?? {}),
          Authorization: token,
        });
        return [ { ...options, headers } ];
      })
    );
  }

  get<T>(url: string, options?: any): Observable<T> {
    return this.withAuthHeaders(options).pipe(
      switchMap(opts => this.http.get<T>(url, opts))
    );
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.withAuthHeaders(options).pipe(
      switchMap(opts => this.http.post<T>(url, body, opts))
    );
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.withAuthHeaders(options).pipe(
      switchMap(opts => this.http.put<T>(url, body, opts))
    );
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.withAuthHeaders(options).pipe(
      switchMap(opts => this.http.delete<T>(url, opts))
    );
  }
}
