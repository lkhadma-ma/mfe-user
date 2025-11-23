import { Component, Input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeadlineComponent } from './user-headline.component';
import { UserHeader } from '../data-access/user';
import { FormsModule } from '@angular/forms';
import { FormHeaderComponent } from "./form-header.component";

@Component({
  selector: 'mfe-user-header',
  standalone: true,
  imports: [CommonModule, UserHeadlineComponent, FormsModule, FormHeaderComponent],
  host: {
    class: 'mfe-user-w-full',
  },
  template: `
    <div class="mfe-user-border mfe-user-rounded-xl mfe-user-bg-white">
      <!-- Header background -->
      <div class="mfe-user-relative mfe-user-aspect-[16/4]">
        <img loading="lazy"
          class="mfe-user-w-full mfe-user-bg-cover mfe-user-bg-center mfe-user-max-h-[201px] mfe-user-border-t-4 mfe-user-rounded-t-md mfe-user-border-[#F8C77D]"
          [src]="user.bg"
          alt="bg"
        />
        <p
          class="mfe-user-absolute mfe-user-text-xs mfe-user-font-medium mfe-user-tracking-widest mfe-user-text-gray-300 mfe-user-uppercase mfe-user-left-1 mfe-user-top-2"
        >
          premium
        </p>

        <!-- Edit background -->
        <span
          *ngIf="isCurrentUser"
          (click)="loadImageFromDrive('bg')"
          class="mfe-user-cursor-pointer mfe-user-absolute mfe-user-top-0 mfe-user-right-[0.5rem] hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-white mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md mfe-user-mt-3 mfe-user-ml-3"
        >
          <i class="fa-solid fa-pencil"></i>
        </span>

      
      </div>

      <!-- Avatar -->
      <div
        class="mfe-user-bg-white mfe-user-relative mfe-user-flex mfe-user-items-center mfe-user-justify-center max-sm:-mfe-user-mt-[2.5rem] -mfe-user-mt-[6rem] mfe-user-ml-[2rem] max-sm:mfe-user-w-[5rem] max-sm:mfe-user-h-[5rem] mfe-user-h-[150px] mfe-user-w-[150px] mfe-user-rounded-full"
      >
        <!-- Edit avatar -->
        <span
            *ngIf="isCurrentUser"
            (click)="loadImageFromDrive('avatar')"
            class="mfe-user-z-[12] mfe-user-cursor-pointer mfe-user-absolute mfe-user-top-0 mfe-user-right-[-0.5rem] hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-white mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md mfe-user-mt-3 mfe-user-mr-3"
          >
            <i class="fa-solid fa-pencil"></i>
        </span>
        <img
          class="mfe-user-z-10 mfe-user-w-full mfe-user-h-full mfe-user-border-white mfe-user-border-4 mfe-user-rounded-full"
          [src]="user.avatar"
          alt="Me"
          loading="lazy"
        />
      </div>

      <!-- Name + Headline + Skills -->
      <div class="mfe-user-flex mfe-user-flex-col mfe-user-px-4 mfe-user-py-3 mfe-user-relative">
        <span
            *ngIf="isCurrentUser"
            (click)="from()?.openHeaderModal()"
            class="mfe-user-z-10 mfe-user-cursor-pointer mfe-user-absolute mfe-user-top-[-4rem] mfe-user-right-[-.25rem] hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-white mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md mfe-user-mt-3 mfe-user-mr-3"
          >
            <i class="fa-solid fa-pencil"></i>
        </span>
          <span
            class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-2xl"
          >
            {{ user.name }}
          </span>

        <!-- Headline -->
          <mfe-user-headline>
            {{ user.headline }}
          </mfe-user-headline>
          <span
            class="mfe-user-text-xs sm:mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-2"
          >
            {{ user.address }}
          </span>
      </div>
    </div>
    @if (isCurrentUser) {
      <mfe-user-form-header
        (onSubmit)="updateHeader($event)" 
        [initialData]="{
          name: user.name,
          headline: user.headline,
          address: user.address
        }"
      >
      </mfe-user-form-header>
    }
  `,
})
export class HeaderComponent {
  from = viewChild(FormHeaderComponent);
  update = output<{
    name?: string;
    headline?: string;
    address?: string;
    avatar?:File;
    bg?:File;
    action:string;
  }>();
  @Input() isCurrentUser: boolean = false;
  @Input() user!: UserHeader;

  updateHeader(data: { name: string; headline: string, address:string, phone:string }) {
    const dataWithAction = { ...data, action: 'info' };
    this.update.emit(dataWithAction);
  }

  updateBg(imageBase64: { bg: File }) {
    const dataWithAction = { ...imageBase64, action: 'bg' };
    this.update.emit(dataWithAction);
  }

  updateAvatar(data: { avatar: File }) {
    const dataWithAction = { ...data, action: 'avatar' };
    this.update.emit(dataWithAction);
  }

  loadImageFromDrive(type: 'avatar' | 'bg') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (type === 'avatar') {
          this.updateAvatar({ avatar: file });
        } else {
          this.updateBg({ bg: file });
        }
      }
    };
  }
}
