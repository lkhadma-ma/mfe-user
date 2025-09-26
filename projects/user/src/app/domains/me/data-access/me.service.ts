import { Injectable, inject } from '@angular/core';
import { UserComplated } from './user';
import { AuthService } from '@shared/auth/auth.service';
import { httpFetch } from '@shared/util/http-fetch';

@Injectable({ providedIn: 'root' })
export class MeService {
  baseUrl = 'http://localhost:8080/mbe-user/api/v1';
  private http: AuthService = inject(AuthService);
  private meCache?: UserComplated;

  async getMe(forceRefresh = false): Promise<UserComplated> {
    if (this.meCache && !forceRefresh) return this.meCache;
  
    const header = await this.http.authorizationHeader();
    this.meCache = await httpFetch<UserComplated>(`${this.baseUrl}/me`, {
      method: 'GET',
      headers: { Authorization: header }
    });
    return this.meCache;
  }
}
