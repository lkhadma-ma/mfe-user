import { Injectable, inject, signal } from "@angular/core";
import { UserComplated } from "./user";
import { AuthHttpService } from "@shared/auth/auth-http.service";



@Injectable({ providedIn: 'root' })
export class UserStore {
    // Inject
    private http = inject(AuthHttpService);

    // Constants
    private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';
    
    // Signals
    private userSignal = signal<UserComplated | null>(null);

    // Methods
    user = this.userSignal.asReadonly();

    // Actions
    loadUser(username: string) {
        this.http.get<UserComplated>(`${this.baseUrl}/users/${username}`).subscribe(user => {
            this.userSignal.set(user);
        });
    }

    updateAbout(about: string) {
        this.http.put<void>(`${this.baseUrl}/users/about`, { about }).subscribe(() => {
          const current = this.userSignal();
          if (!current) return;
      
          this.userSignal.set({
            ...current,
            about,
          });
        });
    }


      



}