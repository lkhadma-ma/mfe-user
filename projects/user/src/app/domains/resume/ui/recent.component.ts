import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkItemsComponent } from './link-items.component';

@Component({
  selector: 'mfe-user-recent',
  standalone: true,
  imports: [CommonModule, LinkItemsComponent],
  template: `
  <!-- Icon templates -->
<ng-template #usersIcon><i class="fa-solid fa-users mfe-user-text-gray-500 mfe-user-text-sm"></i></ng-template>
<ng-template #hashtagIcon><i class="fa-solid fa-hashtag mfe-user-text-gray-500 mfe-user-text-sm"></i></ng-template>
<ng-template #videoIcon><i class="fa-solid fa-video mfe-user-text-gray-500 mfe-user-text-sm"></i></ng-template>

<div class="mfe-user-sticky mfe-user-pt-4 mfe-user-mt-2 mfe-user-text-gray-600 mfe-user-border mfe-user-rounded-md mfe-user-top-[65px] mfe-user-bg-primary">

  <!-- Recent -->
  <div class="mfe-user-mb-5">
    <h1 class="mfe-user-px-4 mfe-user-mb-3 mfe-user-text-xs">Recent</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <!-- Groups (reuse icons) -->
  <div class="mfe-user-mb-5">
    <h1 class="mfe-user-px-4 mfe-user-font-semibold mfe-user-mb-3 mfe-user-text-[#0E65C2] mfe-user-text-xs">Groups</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <!-- Events -->
  <div class="mfe-user-mb-5">
    <h1 class="mfe-user-px-4 mfe-user-font-semibold mfe-user-mb-3 mfe-user-text-[#0E65C2] mfe-user-text-xs">Events</h1>
    <app-link-items *ngFor="let item of recents"
      [name]="item.name"
      [icon]="item.icon === 'users' ? usersIcon : item.icon === 'hashtag' ? hashtagIcon : videoIcon">
    </app-link-items>
  </div>

  <hr />

  <div class="mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-py-2 mfe-user-text-xs hover:mfe-user-bg-gray-300 mfe-user-rounded-b-md">
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
