import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from "./description.component";


@Component({
  selector: 'mfe-user-about',
  standalone: true,
  imports: [CommonModule, DescriptionComponent],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">About</h1>
      @let descriptionView = description();
      @if (descriptionView) {
        <mfe-user-description [description]="descriptionView"></mfe-user-description>
      }@else {
        <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
          <p>No description details available.</p>
        </div>
      }
    </div>
</div>
  `
})
export class AboutComponent {

  description = input<string | null>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }

}
