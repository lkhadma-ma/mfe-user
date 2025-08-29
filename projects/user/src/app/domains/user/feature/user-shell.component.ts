import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from "../ui/me.component";
import { RecentComponent } from "../ui/recent.component";

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [CommonModule, MeComponent, RecentComponent],
  template:`
  
  <app-me></app-me>
  <app-recent></app-recent>
  `
})
export class UsershellComponent {}
