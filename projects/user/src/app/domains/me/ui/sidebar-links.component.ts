import { Component, inject, input, output, forwardRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'mfe-user-sidebar-links',
  imports: [ReactiveFormsModule, forwardRef(() => SidebarLinkItemComponent)],
  template: `
  <div class="mfe-user-w-full mfe-user-border mfe-user-rounded-xl mfe-user-bg-white">
    <div class="mfe-user-w-full mfe-user-relative mfe-user-p-4 mfe-user-space-y-4">
      <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col">
        <div>
          <span class="mfe-user-text-xl mfe-user-font-semibold mfe-user-flex mfe-user-justify-between mfe-user-items-center">
            <span>
              Menu
            </span>
          </span>
          <div class="mfe-user-mt-4 mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
            @for (link of links; track $index) {
              <mfe-user-sidebar-link-item [link]="link" />
            }
          </div>
          
        </div>
      </div>
    </div>
  </div>
  `,
})
export class SidebarLinksComponent {

    links = [
      {
        title: 'Applied Jobs',
        routerLink: '/lk/applied-jobs',
        note: 'View and manage the jobs you have applied for.'
      }
    ];

}

@Component({
  selector: 'mfe-user-sidebar-link-item',
  imports: [ReactiveFormsModule],
  template: `
  <div class="mfe-user-w-full mfe-user-justify-between mfe-user-items-center mfe-user-flex">
    <div class="mfe-user-text-base mfe-user-font-semibold mfe-user-flex mfe-user-flex-col mfe-user-justify-start mfe-user-items-center">
      <div class="mfe-user-font-semibold mfe-user-flex mfe-user-justify-start mfe-user-items-center">
        {{ link()?.title }}
        <span 
          class="mfe-user-relative mfe-user-inline-block mfe-user-ml-1"
          (click)="showTooltip = !showTooltip">
          <i class="fa-solid fa-info-circle mfe-user-cursor-pointer mfe-user-text-gray-400"></i>
        </span>
      </div>
    </div>
    <div 
    class="mfe-user-cursor-pointer hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-gray-100 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md"
    (click)="goToLink()"
    >
    <i class="fa-solid fa-eye"></i>
  </div>
</div>
  @if(showTooltip) {
    <div class="mfe-user-text-sm mfe-user-px-3 mfe-user-py-2 mfe-user-text-gray-500">
      @if(link()?.note) {
        <p class="mfe-user-text-sm mfe-user-text-gray-600">{{ link()?.note }}</p>
      }
    </div>
  }
  `,
})
export class SidebarLinkItemComponent {

    private router = inject(Router);
    showTooltip: boolean = true;

    link = input<{
      note?: string;
      title: string;
      routerLink: string;
    }>();
  
    goToLink(): void {
      this.router.navigate([this.link()?.routerLink!]);
    }
}
















