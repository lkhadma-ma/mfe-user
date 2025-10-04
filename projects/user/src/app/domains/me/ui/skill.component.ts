import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../data-access/skill';


@Component({
  selector: 'mfe-user-skill',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">skills</h1>
      @if (showCaption) {
              <div class="mfe-user-flex mfe-user-flex-wrap mfe-user-gap-2">
                @for (skill of skills(); track $index) {
                  <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-text-gray-900 mfe-user-rounded-3xl mfe-user-border mfe-user-border-black mfe-user-p-1.5">{{ skill.label }}</p>
                }@empty {
                  <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500 mfe-user-w-full">
                    <p>No skills details available.</p>
                  </div>
                }
              </div>
      } @else {
          <div class="mfe-user-relative">
              <div class="mfe-user-line-clamp-3">
                <div class="mfe-user-flex mfe-user-flex-wrap mfe-user-gap-2">
                  @for (skill of (skills() | slice: 0:6); track $index) {
                    <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-text-gray-900 mfe-user-rounded-3xl mfe-user-border mfe-user-border-black mfe-user-p-1.5">{{ skill.label }}</p>
                  }@empty {
                    <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500 mfe-user-w-full">
                      <p>No skills details available.</p>
                    </div>
                  }
                </div>
              </div>
              <button class="mfe-user-absolute mfe-user-bottom-0 mfe-user-right-1 mfe-user-text-gray-500 mfe-user-bg-white hover:mfe-user-underline hover:mfe-user-text-blue-500"
                      (click)="toggleCaption()">
                  ...see more
              </button>
          </div>
      }
    </div>
</div>
  `
})
export class SkillComponent {

  skills = input<Skill[]>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }

}
