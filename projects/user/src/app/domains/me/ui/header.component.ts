import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { UserHeader } from '../data-access/user';

@Component({
  selector: 'mfe-user-header',
  standalone: true,
  imports: [CommonModule, SkillsComponent],
  host: {
    class: 'mfe-user-w-full',
  },
  template: `
    <div class="mfe-user-border mfe-user-rounded-xl mfe-user-bg-white">
      <!-- Header background -->
      <div class="mfe-user-relative">
        <img
          class="mfe-user-w-full mfe-user-bg-cover mfe-user-bg-center mfe-user-max-h-[201px] mfe-user-border-t-4 mfe-user-rounded-t-md mfe-user-border-[#F8C77D]"
          [src]="user()?.bg"
          alt="bg"
        />
        <p
          class="mfe-user-absolute mfe-user-text-xs mfe-user-font-medium mfe-user-tracking-widest mfe-user-text-gray-300 mfe-user-uppercase mfe-user-left-1 mfe-user-top-2"
        >
          premium
        </p>
      </div>

      <!-- Avatar -->
      <div
        class="mfe-user-flex mfe-user-items-center mfe-user-justify-center max-sm:-mfe-user-mt-[2.5rem] -mfe-user-mt-[6rem] mfe-user-ml-[2rem] max-sm:mfe-user-w-[5rem] max-sm:mfe-user-h-[5rem] mfe-user-h-[150px] mfe-user-w-[150px] mfe-user-rounded-full"
      >
        <img
          class="mfe-user-z-10  mfe-user-w-full mfe-user-h-full mfe-user-border-white mfe-user-border-4 mfe-user-rounded-full"
          [src]="user()?.avatar"
          alt="Me"
        />
      </div>

      <!-- Name + Skills -->
      <div class="mfe-user-flex mfe-user-flex-col mfe-user-px-4 mfe-user-py-3">
        <h1
          class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-2xl"
        >
          {{ user()?.name }}
        </h1>
        <mfe-user-skills>{{ user()?.headline }}</mfe-user-skills>
      </div>
    </div>
  `,
})
export class HeaderComponent {
  user = input<UserHeader>();
}
