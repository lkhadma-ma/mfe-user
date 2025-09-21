import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'mfe-user-about',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">About</h1>
      @if (showCaption) {
              <div>
                <p [innerHTML]="description()"></p>
              </div>
      } @else {
          <div class="mfe-user-relative">
              <p class="mfe-user-line-clamp-3">{{ description() }}</p>
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
export class AboutComponent {

  description = input<string>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }

}
