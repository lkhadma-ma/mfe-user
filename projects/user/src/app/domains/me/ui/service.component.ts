import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'mfe-user-service',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">Services</h1>
      @let servicesView = services();
      @if (servicesView) {
        <p class="mfe-user-text-sm mfe-user-font-bold">{{ servicesView }}</p>
      } @else {
        <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
          <p>No services details available.</p>
        </div>
      }
    </div>
</div>
  `
})
export class ServiceComponent {

  services = input<string>();

}
