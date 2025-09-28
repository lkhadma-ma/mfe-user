import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '@shared/util/markdown.service';
import { MarkdownPipe } from '@shared/pipe/markdown.pipe';

@Component({
  selector: 'mfe-user-description',
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
    @if (showCaption) {
      <div class="mfe-user-text-sm">
        <p class="prose" [innerHTML]="safeDescription() | markdown"></p>
      </div>
    } @else {
      <div class="mfe-user-relative">
        <div class="mfe-user-text-sm mfe-user-line-clamp-3 prose">
          <p class="prose" [innerHTML]="safeDescription() | markdown"></p>
        </div>
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

  constructor(private markdown: MarkdownService) {}

  // Computed to always sanitize when description changes
  safeDescription = computed(() => 
    this.markdown.toSafeHtml(this.description() ?? '')
  );

  toggleCaption() {
    this.showCaption = true;
  }
}
