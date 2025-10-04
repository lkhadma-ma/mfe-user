import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'mfe-user-multi-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mfe-user-relative mfe-user-w-full">
  <!-- Selected Tags Display -->
  <div 
    class="mfe-user-flex mfe-user-flex-wrap mfe-user-items-center mfe-user-gap-2 mfe-user-p-3 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-lg mfe-user-min-h-[44px] mfe-user-cursor-pointer mfe-user-bg-white mfe-user-transition-colors mfe-user-duration-200"
    [class.mfe-user-border-red-500]="isInvalid"
    [class.mfe-user-border-blue-500]="isOpen"
    [class.mfe-user-ring-2]="isOpen"
    [class.mfe-user-ring-blue-200]="isOpen"
    (click)="toggleDropdown()"
  >
    <!-- Selected Tags -->
    <div 
      *ngFor="let selectedOption of selectedOptions; let i = index" 
      class="mfe-user-bg-blue-50 mfe-user-text-blue-700 mfe-user-px-3 mfe-user-py-1.5 mfe-user-rounded-full mfe-user-text-sm mfe-user-flex mfe-user-items-center mfe-user-gap-2 mfe-user-border mfe-user-border-blue-200 mfe-user-transition-colors mfe-user-duration-150"
    >
      <span class="mfe-user-font-medium">{{ selectedOption.label }}</span>
      <button 
        type="button"
        (click)="removeTag($event, i)"
        class="mfe-user-w-5 mfe-user-h-5 mfe-user-rounded-full mfe-user-bg-blue-100 hover:mfe-user-bg-blue-200 mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-text-blue-600 hover:mfe-user-text-blue-800 mfe-user-transition-colors mfe-user-duration-150 mfe-user-text-xs mfe-user-font-bold"
      >
        ×
      </button>
    </div>

    <!-- Input for new tags -->
    <input
      *ngIf="mode === 'tags'"
      #tagInput
      type="text"
      [placeholder]="selectedOptions.length === 0 ? placeholder : 'Add more...'"
      (keydown)="onTagInputKeydown($event)"
      (blur)="onTagInputBlur()"
      class="mfe-user-outline-none mfe-user-min-w-[120px] mfe-user-flex-1 mfe-user-bg-transparent mfe-user-text-gray-700 mfe-user-placeholder-gray-400"
    >

    <!-- Placeholder when no selection -->
    <div 
      *ngIf="selectedOptions.length === 0 && mode !== 'tags'" 
      class="mfe-user-text-gray-500 mfe-user-text-sm mfe-user-italic"
    >
      {{ placeholder }}
    </div>
  </div>

  <!-- Dropdown Arrow -->
  <div class="mfe-user-absolute mfe-user-top-1/2 mfe-user-right-3 mfe-user-transform mfe-user--translate-y-1/2 mfe-user-pointer-events-none mfe-user-transition-transform mfe-user-duration-200"
       [class.mfe-user-rotate-180]="isOpen">
    <svg class="mfe-user-w-4 mfe-user-h-4 mfe-user-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>

  <!-- Dropdown Menu -->
  <div 
    *ngIf="isOpen"
    class="mfe-user-absolute mfe-user-z-50 mfe-user-w-full mfe-user-bg-white mfe-user-border mfe-user-border-gray-200 mfe-user-rounded-lg mfe-user-shadow-xl mfe-user-mt-2 mfe-user-max-h-60 mfe-user-overflow-y-auto mfe-user-animate-in mfe-user-fade-in mfe-user-slide-in-from-top-1"
  >
    <!-- Search Input -->
    <div *ngIf="searchable" class="mfe-user-sticky mfe-user-top-0 mfe-user-bg-white mfe-user-p-3 mfe-user-border-b mfe-user-border-gray-100 mfe-user-z-10">
      <div class="mfe-user-relative">
        <svg class="mfe-user-absolute mfe-user-left-3 mfe-user-top-1/2 mfe-user-transform mfe-user--translate-y-1/2 mfe-user-w-4 mfe-user-h-4 mfe-user-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          #searchInput
          type="text"
          [placeholder]="searchPlaceholder"
          (input)="onSearchChange($event)"
          class="mfe-user-w-full mfe-user-pl-10 mfe-user-pr-3 mfe-user-py-2.5 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-lg mfe-user-text-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500 focus:mfe-user-border-blue-500 mfe-user-bg-gray-50"
        >
      </div>
    </div>

    <!-- Options -->
    <div class="mfe-user-py-2">
      <div 
        *ngFor="let option of filteredOptions"
        (click)="toggleOption(option)"
        [class.mfe-user-bg-blue-50]="isSelected(option)"
        [class.mfe-user-text-blue-700]="isSelected(option)"
        class="mfe-user-px-4 mfe-user-py-3 mfe-user-cursor-pointer mfe-user-text-sm mfe-user-transition-colors mfe-user-duration-150 hover:mfe-user-bg-gray-50 mfe-user-flex mfe-user-items-center mfe-user-justify-between mfe-user-border-l-2 mfe-user-border-transparent"
        [class.mfe-user-border-l-blue-500]="isSelected(option)"
      >
        <span class="mfe-user-font-medium">{{ option.label }}</span>
        <span *ngIf="isSelected(option)" class="mfe-user-text-blue-600 mfe-user-font-bold">
          <svg class="mfe-user-w-4 mfe-user-h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </div>

      <!-- No Results -->
      <div 
        *ngIf="filteredOptions.length === 0" 
        class="mfe-user-px-4 mfe-user-py-8 mfe-user-text-center mfe-user-text-gray-500 mfe-user-text-sm"
      >
        <svg class="mfe-user-w-12 mfe-user-h-12 mfe-user-mx-auto mfe-user-mb-2 mfe-user-text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="mfe-user-font-medium">No options found</p>
        <p class="mfe-user-text-xs mfe-user-mt-1">Try adjusting your search</p>
      </div>
    </div>
  </div>
</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: { value: any; label: string }[] = [];
  @Input() placeholder: string = 'Select options...';
  @Input() searchPlaceholder: string = 'Search...';
  @Input() mode: 'multiple' | 'tags' = 'multiple';
  @Input() searchable: boolean = true;
  @Input() isInvalid: boolean = false;

  selectedOptions: { value: any; label: string }[] = [];
  isOpen = false;
  searchTerm = '';
  filteredOptions: { value: any; label: string }[] = [];

  private onChange: (value: { value: any; label: string }[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  // ControlValueAccessor methods
  writeValue(value: { value: any; label: string }[]): void {
    if (value && Array.isArray(value)) {
      this.selectedOptions = value;
    } else {
      this.selectedOptions = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  // Component methods
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  toggleOption(option: { value: any; label: string }): void {
    const index = this.selectedOptions.findIndex(opt => 
      opt.value === option.value && opt.label === option.label
    );
    
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.emitValue();
  }

  removeTag(event: Event, index: number): void {
    event.stopPropagation();
    this.selectedOptions.splice(index, 1);
    this.emitValue();
  }

  onTagInputKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomTag(input.value);
      input.value = '';
    } else if (event.key === 'Backspace' && input.value === '' && this.selectedOptions.length > 0) {
      this.selectedOptions.pop();
      this.emitValue();
    }
  }

  onTagInputBlur(): void {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input && input.value) {
      this.addCustomTag(input.value);
      input.value = '';
    }
  }

  addCustomTag(label: string): void {
    if (label.trim()) {
      const newOption: { value: any; label: string } = {
        value: null, // null value for custom tags
        label: label.trim()
      };

      // Check if already exists in selected options
      const exists = this.selectedOptions.some(opt => 
        opt.label.toLowerCase() === label.trim().toLowerCase()
      );

      if (!exists) {
        this.selectedOptions.push(newOption);
        
        // Add to options if not already present
        const optionExists = this.options.some(opt => 
          opt.label.toLowerCase() === label.trim().toLowerCase()
        );
        
        if (!optionExists) {
          this.options.push(newOption);
          this.filteredOptions = [...this.options];
        }
        
        this.emitValue();
      }
    }
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.filterOptions();
  }

  filterOptions(): void {
    if (!this.searchTerm) {
      this.filteredOptions = [...this.options];
    } else {
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  isSelected(option: { value: any; label: string }): boolean {
    return this.selectedOptions.some(selected => 
      selected.value === option.value && selected.label === option.label
    );
  }

  private emitValue(): void {
    this.onChange([...this.selectedOptions]);
  }
}