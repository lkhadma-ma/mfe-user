import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComplated } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  
  baseUrl = 'http://localhost:8080/mbe-user/api/v1';

  constructor(private http: HttpClient) { }

  getMe(): Observable<UserComplated> {
    return this.http.get<UserComplated>(`${this.baseUrl}/me`);
  }

}
