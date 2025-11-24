// confirm-dialog.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'info' | 'danger' | 'success';
}

@Component({
  selector: 'mfe-user-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mfe-user-fixed mfe-user-inset-0 mfe-user-z-50 mfe-user-overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="mfe-user-fixed mfe-user-inset-0 mfe-user-bg-black mfe-user-bg-opacity-50 mfe-user-transition-opacity"
        (click)="onBackdropClick()"
      ></div>
      
      <!-- Dialog -->
      <div class="mfe-user-flex mfe-user-min-h-full mfe-user-items-center mfe-user-justify-center mfe-user-p-4">
        <div class="mfe-user-relative mfe-user-bg-white mfe-user-rounded-lg mfe-user-shadow-xl mfe-user-max-w-md mfe-user-w-full mfe-user-transform mfe-user-transition-all">
          <!-- Header -->
          <div class="mfe-user-p-6 mfe-user-text-center">
            <!-- Icon -->
            <div [class]="iconClasses" class="mfe-user-mx-auto mfe-user-w-16 mfe-user-h-16 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-rounded-full mfe-user-mb-4">
              <i [class]="iconText"></i>
            </div>
            
            <h3 class="mfe-user-text-xl mfe-user-font-semibold mfe-user-text-gray-900 mfe-user-mb-2">
              {{ config.title }}
            </h3>
            
            <p class="mfe-user-text-gray-600 mfe-user-mb-6">
              {{ config.message }}
            </p>
          </div>
          
          <!-- Actions -->
          <div class="mfe-user-flex mfe-user-justify-center mfe-user-gap-4 mfe-user-px-6 mfe-user-pb-6">
            <button
              type="button"
              (click)="onCancel()"
              class="mfe-user-px-6 mfe-user-py-3 mfe-user-text-base mfe-user-font-medium mfe-user-text-gray-700 mfe-user-bg-white mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-lg mfe-user-shadow-sm hover:mfe-user-bg-gray-50 focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-offset-2 focus:mfe-user-ring-blue-500 mfe-user-transition mfe-user-duration-200 mfe-user-min-w-24"
            >
              {{ config.cancelText || 'Cancel' }}
            </button>
            
            <button
              type="button"
              (click)="onConfirm()"
              [class]="confirmButtonClasses"
              class="mfe-user-px-6 mfe-user-py-3 mfe-user-text-base mfe-user-font-medium mfe-user-text-white mfe-user-border mfe-user-border-transparent mfe-user-rounded-lg mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-offset-2 mfe-user-transition mfe-user-duration-200 mfe-user-min-w-24"
            >
              {{ config.confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() config!: ConfirmDialogConfig;
  @Input() closeOnBackdrop: boolean = true;
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit(true);
    this.closed.emit();
  }

  onCancel(): void {
    this.confirmed.emit(false);
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.onCancel();
    }
  }

  get iconClasses(): string {
    const baseClasses = 'mfe-user-mx-auto mfe-user-w-16 mfe-user-h-16 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-rounded-full mfe-user-mb-4';
    
    switch (this.config.type) {
      case 'warning':
        return `${baseClasses} mfe-user-bg-yellow-100 mfe-user-text-yellow-600`;
      case 'danger':
        return `${baseClasses} mfe-user-bg-red-100 mfe-user-text-red-600`;
      case 'success':
        return `${baseClasses} mfe-user-bg-green-100 mfe-user-text-green-600`;
      case 'info':
      default:
        return `${baseClasses} mfe-user-bg-blue-100 mfe-user-text-blue-600`;
    }
  }

  get iconText(): string {
    const baseClasses = 'mfe-user-text-2xl';
    
    switch (this.config.type) {
      case 'warning':
        return `${baseClasses} fas fa-exclamation-triangle`;
      case 'danger':
        return `${baseClasses} fas fa-times-circle`;
      case 'success':
        return `${baseClasses} fas fa-check-circle`;
      case 'info':
      default:
        return `${baseClasses} fas fa-info-circle`;
    }
  }

  get confirmButtonClasses(): string {
    const baseClasses = 'focus:mfe-user-ring-2 focus:mfe-user-ring-offset-2';
    
    switch (this.config.type) {
      case 'warning':
        return `${baseClasses} mfe-user-bg-yellow-600 hover:mfe-user-bg-yellow-700 focus:mfe-user-ring-yellow-500`;
      case 'danger':
        return `${baseClasses} mfe-user-bg-red-600 hover:mfe-user-bg-red-700 focus:mfe-user-ring-red-500`;
      case 'success':
        return `${baseClasses} mfe-user-bg-green-600 hover:mfe-user-bg-green-700 focus:mfe-user-ring-green-500`;
      case 'info':
      default:
        return `${baseClasses} mfe-user-bg-blue-600 hover:mfe-user-bg-blue-700 focus:mfe-user-ring-blue-500`;
    }
  }
}