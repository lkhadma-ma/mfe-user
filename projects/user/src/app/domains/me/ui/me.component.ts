import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { SaveIconComponent } from './save-icon.component';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, SkillsComponent, SaveIconComponent],
  template: `
  <div class="border rounded-lg bg-white">
  <!-- Header background -->
  <div class="relative">
    <img
      class="w-full h-14 border-t-4 rounded-t-md border-[#F8C77D]"
      src="https://media.licdn.com/dms/image/v2/D4D16AQFU48bJCFCpeA/profile-displaybackgroundimage-shrink_350_1400/B4DZfEuh9cGgAc-/0/1751352221970?e=1759363200&v=beta&t=MkadpjZvTY5OqjSXddVBTtfH5isLMrrOfdt6wQe5eY0"
      alt="Samuel"
    />
    <p
      class="absolute text-xs font-medium tracking-widest text-gray-300 uppercase left-1 top-2">
      premium
    </p>
  </div>

  <!-- Avatar -->
  <div class="flex items-center justify-center -mt-8">
    <img
      class="z-10 w-[4.5rem] h-[4.5rem] border-2 border-white rounded-full"
      [src]="user()?.photoURL"
      alt="Me"
    />
  </div>

  <!-- Name + Skills -->
  <div class="flex flex-col items-center justify-center px-4 py-5">
    <h1 class="mb-1 font-semibold tracking-wide">{{user()?.name}}</h1>
    <app-skills></app-skills>
  </div>

  <hr class="h-[0.3px] bg-gray-300" />

  <!-- Stats -->
  <div class="px-4 py-4">
    <div class="flex justify-between mb-2 text-xs font-medium cursor-pointer hover:bg-gray-300">
      <p class="text-gray-600">Who viewed your profile</p>
      <p class="text-blue-600">224</p>
    </div>
    <div class="flex justify-between text-xs font-medium cursor-pointer hover:bg-gray-300">
      <p class="text-gray-600">Views of your post</p>
      <p class="text-blue-600">3624</p>
    </div>
  </div>

  <hr class="h-[0.3px] bg-gray-300" />

  <!-- Premium features -->
  <div class="py-4 cursor-pointer hover:bg-gray-200">
    <div class="flex items-center px-4 space-x-2 text-xs">
      <div class="h-3.5 w-3.5 rounded bg-[#E7A33E]"></div>
      <p class="font-semibold">See all Premium features</p>
    </div>
  </div>

  <hr class="h-[0.3px] bg-gray-300" />

  <!-- My items -->
  <div class="py-4 cursor-pointer hover:bg-gray-200">
    <div class="flex items-center px-4 space-x-2 text-xs">
      <app-save-icon></app-save-icon>
      <p class="font-semibold">My items</p>
    </div>
  </div>
</div>

  `
})
export class MeComponent {
  user = input<{ name: string; photoURL: string }>();
}
