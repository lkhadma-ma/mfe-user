import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-xs text-center text-gray-500">
    Full-Stack Developer & Angular Architect
    </p>

  ` 
})
export class SkillsComponent {}
