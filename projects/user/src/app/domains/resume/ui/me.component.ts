import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { SaveIconComponent } from './save-icon.component';

@Component({
  selector: 'mfe-user-me',
  standalone: true,
  imports: [CommonModule, SkillsComponent, SaveIconComponent],
  template: `
  <div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
  <!-- Header background -->
  <div class="mfe-user-relative">
    <img
      class="mfe-user-w-full mfe-user-h-14 mfe-user-border-t-4 mfe-user-rounded-t-md mfe-user-border-[#F8C77D]"
      src="https://media.licdn.com/dms/image/v2/D4D16AQFU48bJCFCpeA/profile-displaybackgroundimage-shrink_350_1400/B4DZfEuh9cGgAc-/0/1751352221970?e=1759363200&v=beta&t=MkadpjZvTY5OqjSXddVBTtfH5isLMrrOfdt6wQe5eY0"
      alt="Samuel"
    />
    <p
      class="mfe-user-absolute mfe-user-text-xs mfe-user-font-medium mfe-user-tracking-widest mfe-user-text-gray-300 mfe-user-uppercase mfe-user-left-1 mfe-user-top-2">
      premium
    </p>
  </div>

  <!-- Avatar -->
  <div class="mfe-user-flex mfe-user-items-center mfe-user-justify-center -mfe-user-mt-8">
    <img
      class="mfe-user-z-10 mfe-user-w-[4.5rem] mfe-user-h-[4.5rem] mfe-user-border-2 mfe-user-border-white mfe-user-rounded-full"
      [src]="user()?.photoURL"
      alt="Me"
    />
  </div>

  <!-- Name + Skills -->
  <div class="mfe-user-flex mfe-user-flex-col mfe-user-items-center mfe-user-justify-center mfe-user-px-4 mfe-user-py-5">
    <h1 class="mfe-user-mb-1 mfe-user-font-semibold mfe-user-tracking-wide">{{user()?.name}}</h1>
    <mfe-user-skills></mfe-user-skills>
  </div>

  <hr class="mfe-user-h-[0.3px] mfe-user-bg-gray-300" />

  <!-- Stats -->
  <div class="mfe-user-px-4 mfe-user-py-4">
    <div class="mfe-user-flex mfe-user-justify-between mfe-user-mb-2 mfe-user-text-xs mfe-user-font-medium mfe-user-cursor-pointer hover:mfe-user-bg-gray-300">
      <p class="mfe-user-text-gray-600">Who viewed your profile</p>
      <p class="mfe-user-text-blue-600">224</p>
    </div>
    <div class="mfe-user-flex mfe-user-justify-between mfe-user-text-xs mfe-user-font-medium mfe-user-cursor-pointer hover:mfe-user-bg-gray-300">
      <p class="mfe-user-text-gray-600">Views of your post</p>
      <p class="mfe-user-text-blue-600">3624</p>
    </div>
  </div>

  <hr class="mfe-user-h-[0.3px] mfe-user-bg-gray-300" />

  <!-- Premium features -->
  <div class="mfe-user-py-4 mfe-user-cursor-pointer hover:mfe-user-bg-gray-200">
    <div class="mfe-user-flex mfe-user-items-center mfe-user-px-4 mfe-user-space-x-2 mfe-user-text-xs">
      <div class="mfe-user-h-3.5 mfe-user-w-3.5 mfe-user-rounded mfe-user-bg-[#E7A33E]"></div>
      <p class="mfe-user-font-semibold">See all Premium features</p>
    </div>
  </div>

  <hr class="mfe-user-h-[0.3px] mfe-user-bg-gray-300" />

  <!-- My items -->
  <div class="mfe-user-py-4 mfe-user-cursor-pointer hover:mfe-user-bg-gray-200">
    <div class="mfe-user-flex mfe-user-items-center mfe-user-px-4 mfe-user-space-x-2 mfe-user-text-xs">
      <mfe-user-save-icon></mfe-user-save-icon>
      <p class="mfe-user-font-semibold">My items</p>
    </div>
  </div>
</div>

  `
})
export class MeComponent {
  user = input<{ name: string; photoURL: string }>();
}
