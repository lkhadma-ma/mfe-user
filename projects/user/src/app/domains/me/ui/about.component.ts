import { Component, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from "./description.component";
import { FormControl } from '@angular/forms';
import { MarkdownEditorComponent } from "@shared/ui/markdown-editor/markdown-editor.component";

@Component({
  selector: 'mfe-user-about',
  standalone: true,
  imports: [CommonModule, DescriptionComponent, MarkdownEditorComponent],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7 mfe-user-flex mfe-user-justify-between">About
      <i (click)="toggleUpdate()" class="fa-solid fa-pencil mfe-user-cursor-pointer hover:mfe-user-scale-105"></i>
      </h1>
      @if(!showUpdate){
        @let descriptionView = description();
        @if (descriptionView) {
          <mfe-user-description [description]="descriptionView"></mfe-user-description>
        }@else {
          <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
            <p>No description details available.</p>
          </div>
        }
      } @else {
        <markdown-editor [control]="control" (leaveEvent)="save()"></markdown-editor>
      }
    </div>
</div>
  `
})
export class AboutComponent {

  description = input<string | null>();
  update = output<string>();
  control = new FormControl<string >(this.description() ?? 'Empty description');

  showUpdate = false;
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }

  toggleUpdate() {
    this.showUpdate = !this.showUpdate;
  }

  save() {
    this.update.emit(this.control.value ?? '');
  }

}
