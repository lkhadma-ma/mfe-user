// dynamic-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';

// Interfaces
export interface FormFieldConfig {
  key: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'date'
    | 'radio'
    | 'file'
    | 'number'
    | 'hidden'
    | 'multiselect'; // Add 'multiselect'
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  searchable?: boolean; // Add this for multi-select
  mode?: 'multiple' | 'tags'; // Add this for multi-select
}

export interface FormSectionConfig {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  columns?: number;
}

export interface FormConfig {
  id: string;
  title: string;
  subtitle?: string;
  sections: FormSectionConfig[];
  submitText?: string;
  cancelText?: string;
}

@Component({
  selector: 'mfe-user-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectComponent],
  template: `
    <!-- Modal Backdrop -->
    <div
      *ngIf="isOpen"
      class="mfe-user-fixed mfe-user-inset-0 mfe-user-bg-black mfe-user-bg-opacity-50 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-p-4 mfe-user-z-50 mfe-user-w-screen mfe-user-h-screen"
      (click)="onBackdropClick($event)"
    >
      <!-- Modal Container -->
      <div
        class="mfe-user-bg-white mfe-user-rounded-lg mfe-user-shadow-xl mfe-user-max-w-2xl mfe-user-w-full mfe-user-max-h-[90vh] mfe-user-overflow-hidden mfe-user-flex mfe-user-flex-col"
      >
        <!-- Form -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="mfe-user-flex mfe-user-flex-col mfe-user-h-full mfe-user-overflow-hidden"
        >
          <!-- Fixed Header -->
          <div
            class="mfe-user-flex-shrink-0 mfe-user-p-6 mfe-user-border-b mfe-user-border-gray-200 mfe-user-bg-white"
          >
            <h2
              class="mfe-user-text-2xl mfe-user-font-semibold mfe-user-text-gray-900"
            >
              {{ config.title }}
            </h2>
            <p
              *ngIf="config.subtitle"
              class="mfe-user-mt-1 mfe-user-text-sm mfe-user-text-gray-600"
            >
              {{ config.subtitle }}
            </p>
          </div>

          <!-- Scrollable Form Content -->
          <div class="mfe-user-flex-1 mfe-user-overflow-y-auto mfe-user-p-6">
            <div class="mfe-user-space-y-6">
              <!-- Form Sections -->
              <div
                *ngFor="let section of config.sections"
                class="mfe-user-space-y-4"
              >
                <!-- Section Header -->
                <div *ngIf="section.title" class="mfe-user-mb-4">
                  <h3
                    class="mfe-user-text-lg mfe-user-font-medium mfe-user-text-gray-900"
                  >
                    {{ section.title }}
                  </h3>
                  <p
                    *ngIf="section.description"
                    class="mfe-user-mt-1 mfe-user-text-sm mfe-user-text-gray-600"
                  >
                    {{ section.description }}
                  </p>
                </div>

                <!-- Form Fields Grid -->
                <div
                  [class]="getGridClass(section.columns || 1)"
                  class="mfe-user-gap-4"
                >
                  <!-- Text Input -->
                  <div
                    *ngFor="let field of section.fields"
                    [class.hidden]="field.hidden"
                    class="mfe-user-space-y-2"
                  >
                    <!-- Your existing modal structure remains the same -->

                    <!-- Inside the form fields section, add the multi-select case -->
                    <div *ngIf="field.type === 'multiselect'">
                      <label [for]="field.key" class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700">
                        {{ field.label }}
                        <span *ngIf="field.required" class="mfe-user-text-red-500">*</span>
                      </label>
                      
                      <mfe-user-multi-select
                        [formControlName]="field.key"
                        [options]="field.options || []"
                        [placeholder]="field.placeholder || 'Select options...'"
                        [mode]="field.mode || 'multiple'"
                        [searchable]="field.searchable ?? true"
                        [isInvalid]="isFieldInvalid(field)"
                      ></mfe-user-multi-select>
                      
                      <div *ngIf="isFieldInvalid(field)" class="mfe-user-text-sm mfe-user-text-red-600 mfe-user-mt-1">
                        {{ getFieldError(field) }}
                      </div>
                    </div>
                    <!-- Text, Email, Password -->
                    <div
                      *ngIf="
                        field.type === 'text' ||
                        field.type === 'email' ||
                        field.type === 'password'
                      "
                    >
                      <label
                        [for]="field.key"
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        [type]="field.type"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-user-border-red-300]="isFieldInvalid(field)"
                        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>
                    <!-- Number and hidden Input -->
                    <div
                      *ngIf="field.type === 'number' || field.type === 'hidden'"
                      [class.mfe-user-hidden]="
                        field.type === 'hidden'
                      "
                    >
                      <label
                        [for]="field.key"
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        type="number"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-user-border-red-300]="isFieldInvalid(field)"
                        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Textarea -->
                    <div *ngIf="field.type === 'textarea'">
                      <label
                        [for]="field.key"
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <textarea
                        [id]="field.key"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-user-border-red-300]="isFieldInvalid(field)"
                        rows="4"
                        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500 mfe-user-resize-none"
                      >
                      </textarea>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Select -->
                    <div *ngIf="field.type === 'select'">
                      <label
                        [for]="field.key"
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <select
                        [id]="field.key"
                        [formControlName]="field.key"
                        [class.mfe-user-border-red-300]="isFieldInvalid(field)"
                        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500"
                      >
                        <option value="">
                          {{ field.placeholder || 'Please select' }}
                        </option>
                        <option
                          *ngFor="let option of field.options"
                          [value]="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Checkbox -->
                    <div
                      *ngIf="field.type === 'checkbox'"
                      class="mfe-user-flex mfe-user-items-center"
                    >
                      <label
                        class="mfe-user-flex mfe-user-items-center mfe-user-space-x-2"
                      >
                        <input
                          type="checkbox"
                          [formControlName]="field.key"
                          class="mfe-user-w-4 mfe-user-h-4 mfe-user-text-blue-600 mfe-user-border-gray-300 mfe-user-rounded focus:mfe-user-ring-blue-500"
                        />
                        <span class="mfe-user-text-sm mfe-user-text-gray-700">{{
                          field.label
                        }}</span>
                      </label>
                    </div>

                    <!-- Date -->
                    <div *ngIf="field.type === 'date'">
                      <label
                        [for]="field.key"
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        type="date"
                        [formControlName]="field.key"
                        [class.mfe-user-border-red-300]="isFieldInvalid(field)"
                        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md mfe-user-shadow-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Radio -->
                    <div *ngIf="field.type === 'radio'">
                      <label
                        class="mfe-user-block mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-user-text-red-500"
                          >*</span
                        >
                      </label>
                      <div class="mfe-user-mt-2 mfe-user-space-y-2">
                        <div
                          *ngFor="let option of field.options"
                          class="mfe-user-flex mfe-user-items-center"
                        >
                          <input
                            type="radio"
                            [id]="field.key + '-' + option.value"
                            [formControlName]="field.key"
                            [value]="option.value"
                            class="mfe-user-w-4 mfe-user-h-4 mfe-user-text-blue-600 mfe-user-border-gray-300 focus:mfe-user-ring-blue-500"
                          />
                          <label
                            [for]="field.key + '-' + option.value"
                            class="mfe-user-ml-2 mfe-user-text-sm mfe-user-text-gray-700"
                          >
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-user-text-sm mfe-user-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fixed Actions -->
          <div
            class="mfe-user-flex-shrink-0 mfe-user-flex mfe-user-justify-end mfe-user-space-x-3 mfe-user-p-6 mfe-user-border-t mfe-user-border-gray-200 mfe-user-bg-gray-50"
          >
            <button
              type="button"
              (click)="onCancel()"
              class="mfe-user-px-4 mfe-user-py-2 mfe-user-text-sm mfe-user-font-medium mfe-user-text-gray-700 mfe-user-bg-white mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-md hover:mfe-user-bg-gray-50 focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500"
            >
              {{ config.cancelText || 'Cancel' }}
            </button>
            <button
              type="submit"
              [disabled]="isSubmitting"
              class="mfe-user-px-4 mfe-user-py-2 mfe-user-text-sm mfe-user-font-medium mfe-user-text-white mfe-user-bg-blue-600 mfe-user-border mfe-user-border-transparent mfe-user-rounded-md hover:mfe-user-bg-blue-700 focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 disabled:mfe-user-bg-blue-300"
            >
              {{ isSubmitting ? 'Saving...' : config.submitText || 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class DynamicFormComponent implements OnInit {
  @Input() config!: FormConfig;
  @Input() initialData: any = {};
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.patchFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.form) {
      this.createForm();
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    if (!this.form || !this.initialData) return;

    Object.keys(this.initialData).forEach((key) => {
      if (this.form.get(key)) {
        this.form.get(key)!.setValue(this.initialData[key]);
      }
    });
  }

  private createForm() {
    const formControls: any = {};

    this.config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const validators = this.getValidators(field);
        const value =
          this.initialData[field.key] ||
          (field.type === 'checkbox' ? false : '');

        formControls[field.key] = [value, validators];
      });
    });

    this.form = this.fb.group(formControls);
  }

  private getValidators(field: FormFieldConfig) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.validation) {
      if (field.validation.minLength) {
        validators.push(Validators.minLength(field.validation.minLength));
      }
      if (field.validation.maxLength) {
        validators.push(Validators.maxLength(field.validation.maxLength));
      }
      if (field.validation.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }
    }

    return validators;
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitted.emit(this.form.value);
      // Reset submitting state after a short delay
      setTimeout(() => {
        this.isSubmitting = false;
        this.close();
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.close();
  }

  close() {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (
      (event.target as HTMLElement).classList.contains('mfe-user-bg-opacity-50')
    ) {
      this.close();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(field: FormFieldConfig): string {
    const control = this.form.get(field.key);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${field.label} is required`;
      }
      if (control.errors['minlength']) {
        return `${field.label} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${field.label} must be less than ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return `${field.label} format is invalid`;
      }
    }
    return '';
  }

  isFieldInvalid(field: FormFieldConfig): boolean {
    const control = this.form.get(field.key);
    return !!(control?.invalid && control.touched);
  }

  getGridClass(columns: number): string {
    switch (columns) {
      case 1:
        return 'mfe-user-grid mfe-user-grid-cols-1';
      case 2:
        return 'mfe-user-grid mfe-user-grid-cols-1 md:mfe-user-grid-cols-2';
      case 3:
        return 'mfe-user-grid mfe-user-grid-cols-1 md:mfe-user-grid-cols-3';
      default:
        return 'mfe-user-grid mfe-user-grid-cols-1';
    }
  }
}
