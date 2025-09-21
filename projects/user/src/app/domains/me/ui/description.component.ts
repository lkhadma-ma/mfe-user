import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-user-description',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `

    @if (showCaption) {
            <div class="mfe-user-text-sm">
                <p [innerHTML]="description()"></p>
            </div>
    } @else {
        <div class="mfe-user-relative">
            <p class="mfe-user-text-sm mfe-user-line-clamp-2">{{ description() }}</p>
            <button class="mfe-user-absolute mfe-user-bottom-0 mfe-user-right-1 mfe-user-text-gray-500 mfe-user-bg-white hover:mfe-user-underline hover:mfe-user-text-blue-500"
                    (click)="toggleCaption()">
                ...see more
            </button>
        </div>
    }

  `
})
export class DescriptionComponent {

  description = input<string>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }
}
