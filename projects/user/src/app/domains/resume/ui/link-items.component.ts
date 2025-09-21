import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-link-items',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <button class='mfe-user-block mfe-user-w-full mfe-user-py-1 hover:mfe-user-bg-gray-300'>
      <div class='mfe-user-flex mfe-user-items-center mfe-user-px-4 mfe-user-space-x-3'>
      <ng-container *ngTemplateOutlet="icon"></ng-container>
        <p class='mfe-user-text-xs mfe-user-font-semibold mfe-user-text-gray-500'>{{name}}</p>
      </div>
    </button>
  `
})
export class LinkItemsComponent {
  @Input() name!: string;
  @Input() icon!: TemplateRef<any>;
}
