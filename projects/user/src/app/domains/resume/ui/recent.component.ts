import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkItemsComponent } from './link-items.component';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule, LinkItemsComponent],
  template: `
  <!-- Icon templates -->
<ng-template #usersIcon><i class="fa-solid fa-users text-gray-500 text-sm"></i></ng-template>
<ng-template #hashtagIcon><i class="fa-solid fa-hashtag text-gray-500 text-sm"></i></ng-template>
<ng-template #videoIcon><i class="fa-solid fa-video text-gray-500 text-sm"></i></ng-template>

<div class="sticky pt-4 mt-2 text-gray-600 border rounded-md top-[65px] bg-primary">

  <!-- Recent -->
  <div class="mb-5">
    <h1 class="px-4 mb-3 text-xs">Recent</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <!-- Groups (reuse icons) -->
  <div class="mb-5">
    <h1 class="px-4 font-semibold mb-3 text-[#0E65C2] text-xs">Groups</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <!-- Events -->
  <div class="mb-5">
    <h1 class="px-4 font-semibold mb-3 text-[#0E65C2] text-xs">Events</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <hr />

  <div class="flex items-center justify-center py-2 text-xs hover:bg-gray-300 rounded-b-md">
    <button class="font-bold">Discover more</button>
  </div>
</div>

  `
})
export class RecentComponent {
  @ViewChild('usersIcon', { static: true }) usersIcon!: TemplateRef<any>;
  @ViewChild('hashtagIcon', { static: true }) hashtagIcon!: TemplateRef<any>;
  @ViewChild('videoIcon', { static: true }) videoIcon!: TemplateRef<any>;

  recents = [
    { icon: 'users', name: 'Premium Career Group' },
    { icon: 'users', name: 'Javascript developers.com' },
    { icon: 'hashtag', name: 'Freelancers.com' },
    { icon: 'video', name: 'Antwistudioweb Conference' },
    { icon: 'users', name: 'FrontEnd developers Group' },
  ];
}
