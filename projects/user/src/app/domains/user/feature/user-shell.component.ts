import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from "../ui/me.component";
import { RecentComponent } from "../ui/recent.component";
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [CommonModule, MeComponent, RecentComponent],
  template:`
  
  <app-me [user]="{
    name,
    photoURL
  }"></app-me>
  <app-recent></app-recent>
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
          console.log("name", this.name, "photoURL", this.photoURL);
        }
      });
    });
  }
  
}


