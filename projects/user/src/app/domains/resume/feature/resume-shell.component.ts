import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from "../ui/me.component";
import { RecentComponent } from "../ui/recent.component";
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'mfe-user-shell',
  standalone: true,
  imports: [CommonModule, MeComponent, RecentComponent],
  template:`
  
  <mfe-user-me [user]="{
    name,
    photoURL
  }"></mfe-user-me>
  <mfe-user-recent></mfe-user-recent>
  `
})
export class UsershellComponent {
  name = '';
  photoURL = '';

  constructor(private auth: AuthService) {
    this.auth.getUser$().then(user$ => {
      user$.subscribe(user => {
        if (user) {
          this.name = user.displayName;
          this.photoURL = user.photoURL;
        }
      });
    });
  }
  
}


