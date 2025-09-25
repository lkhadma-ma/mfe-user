import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-user-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="mfe-user-text-xs sm:mfe-user-text-base">
    <ng-content></ng-content>
    
    </p>

  ` 
})
export class SkillsComponent {}
