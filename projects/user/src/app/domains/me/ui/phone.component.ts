import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'mfe-user-phone',
  imports: [ReactiveFormsModule],
  template: `
  <div class="mfe-user-w-full mfe-user-border mfe-user-rounded-xl mfe-user-bg-white">
    <div class="mfe-user-w-full mfe-user-relative mfe-user-p-4 mfe-user-space-y-4">
      <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col">
        <div>
          <span class="mfe-user-text-xl mfe-user-font-semibold mfe-user-flex mfe-user-justify-between mfe-user-items-center">
            <span>
              Your phone 
            </span>
            
            <!-- Edit/Save/Cancel icons -->
            <div class="mfe-user-flex mfe-user-gap-2 mfe-user-absolute mfe-user-top-3 mfe-user-right-3">
              @if(!isEditing) {
                <div 
                  class="mfe-user-z-10 mfe-user-cursor-pointer hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-gray-100 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md"
                  (click)="startEditing()"
                >
                  <i class="fa-solid fa-pencil"></i>
                </div>
              } @else {
                <div 
                  class="mfe-user-z-10 mfe-user-cursor-pointer hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-green-100 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md"
                  (click)="savePhone()"
                  [class.mfe-user-opacity-50]="phoneForm.invalid"
                  [class.mfe-user-cursor-not-allowed]="phoneForm.invalid"
                >
                  <i class="fa-solid fa-check mfe-user-text-green-600"></i>
                </div>
                <div 
                  class="mfe-user-z-10 mfe-user-cursor-pointer hover:mfe-user-scale-105 mfe-user-w-10 mfe-user-h-10 mfe-user-rounded-full mfe-user-bg-red-100 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-shadow-md"
                  (click)="cancelEditing()"
                >
                  <i class="fa-solid fa-times mfe-user-text-red-600"></i>
                </div>
              }
            </div>
          </span>
          
            <div class="mfe-user-text-sm mfe-user-px-3 mfe-user-py-2">
              <p>Your phone number is visible only to you. It helps companies contact you regarding your job applications.</p>
            </div>

          <div class="mfe-user-flex mfe-user-items-center mfe-user-gap-3 mfe-user-mt-2">
            <i class="fa-solid fa-phone mfe-user-text-gray-400"></i>
            
            @if(!isEditing) {
              <span class="mfe-user-text-gray-400 mfe-user-text-base mfe-user-font-medium">+{{ phoneNumber() }}</span>
            } @else {
              <form [formGroup]="phoneForm" class="mfe-user-flex mfe-user-flex-col mfe-user-w-full">
                <input
                  type="tel"
                  formControlName="phone"
                  class="mfe-user-border mfe-user-border-gray-300 mfe-user-rounded mfe-user-px-3 mfe-user-py-2 mfe-user-text-base focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-transparent"
                  placeholder="Enter phone number"
                  (keyup.enter)="savePhone()"
                  (keyup.escape)="cancelEditing()"
                />
                
                @if(phoneForm.get('phone')?.invalid && phoneForm.get('phone')?.touched) {
                  <div class="mfe-user-mt-1 mfe-user-text-red-500 mfe-user-text-sm">
                    @if(phoneForm.get('phone')?.errors?.['required']) {
                      <span>Phone number is required</span>
                    }
                    @if(phoneForm.get('phone')?.errors?.['pattern']) {
                      <span>Please enter a valid phone number format</span>
                    }
                  </div>
                }
            </form>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
})
export class PhoneComponent {

    update = output<string>();
    phoneNumber = input<string | null>(null);

    isEditing: boolean = false;
    phoneForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.phoneForm = this.fb.group({
        phone: [
          this.phoneNumber() ?? '', 
          [
            Validators.required,
            Validators.pattern(/^\d{1,15}$/)
          ]
        ]
      });
    }
  
    startEditing(): void {
      this.isEditing = true;
      this.phoneForm.patchValue({ phone: this.phoneNumber() ?? '' });
      this.phoneForm.markAsUntouched();
    }
  
    savePhone(): void {
      if (this.phoneForm.valid) {
        this.isEditing = false;
        this.update.emit(this.phoneForm.value.phone);
      } else {
        this.phoneForm.markAllAsTouched();
      }
    }
  
    cancelEditing(): void {
      this.isEditing = false;
      this.phoneForm.markAsUntouched();
      this.phoneForm.patchValue({ phone: this.phoneNumber() ?? '' });
    }
}