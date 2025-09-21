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
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-2xl">Services</h1>
      <p class="mfe-user-text-sm mfe-user-font-bold">{{ services() }}</p>
    </div>
</div>
  `
})
export class ServiceComponent {

  services = input<string>();

}
