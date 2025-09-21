import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../data-access/experience';
import { DescriptionComponent } from "./description.component";

@Component({
  selector: 'mfe-user-experience',
  standalone: true,
  imports: [CommonModule, DescriptionComponent],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-2xl">Experience</h1>
        @for (experience of experiences(); track $index) {
            <div class="mfe-user-flex mfe-user-space-x-4 mfe-user-mt-4">
              <img class="mfe-user-w-14 mfe-user-h-14 mfe-user-rounded-sm" src="https://media.licdn.com/dms/image/v2/D4D0BAQEmsC7uLFcGtw/company-logo_100_100/company-logo_100_100/0/1734610939743/satec_logo?e=1761177600&v=beta&t=Gqr6mDGfjQucih24uZRMxPd4zxDjcOv89e-IoEh1CqE" alt="">
              <div>
                <h2 class="mfe-user-font-semibold mfe-user-tracking-wide">{{ experience.position }}</h2>
                <h3 class="mfe-user-font-medium mfe-user-tracking-wide mfe-user-text-sm">{{ experience.company }} . {{ experience.employmentType }}</h3>
                <p class="mfe-user-text-sm mfe-user-font-bold">{{ experience.startDate | date:'MMM yyyy' }} - {{ experience.endDate ? (experience.endDate | date:'MMM yyyy') : 'Present' }}</p>
                <p class="mfe-user-text-sm">{{ experience.location }} . {{ experience.locationType }}</p>
                <mfe-user-description [description]="experience.description"></mfe-user-description>
                <p class="mfe-user-mt-2"> 
                @for (skill of experience.skills.slice(0, 4); track $index) {
                  <span
                    class="mfe-user-text-xs mfe-user-font-medium mfe-user-bg-gray-200 mfe-user-rounded-full mfe-user-px-2 mfe-user-py-1 mfe-user-mr-1 mfe-user-mt-1 mfe-user-inline-block"
                  >
                    {{ skill.name }}{{ $index < 3 && $index < experience.skills.length - 1 ? ', ' : '' }}
                  </span>
                }
                @if (experience.skills.length > 4) {
                  <span class="mfe-user-text-xs mfe-user-font-medium mfe-user-text-gray-500 mfe-user-ml-1">
                    ...
                  </span>
                }

                </p>
              </div>
            </div>
        }
    </div>
</div>
  `
})
export class ExperienceComponent {

  experiences = input<Experience[]>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }
}
