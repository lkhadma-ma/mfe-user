import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-link-items',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <button class='block w-full py-1 hover:bg-gray-300'>
      <div class='flex items-center px-4 space-x-3'>
      <ng-container *ngTemplateOutlet="icon"></ng-container>
        <p class='text-xs font-semibold text-gray-500'>{{name}}</p>
      </div>
    </button>
  `
})
export class LinkItemsComponent {
  @Input() name!: string;
  @Input() icon!: TemplateRef<any>;
}
