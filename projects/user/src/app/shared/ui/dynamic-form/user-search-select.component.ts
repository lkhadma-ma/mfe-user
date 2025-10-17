import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

export interface UserOption {
  username: string;
  avatar: string;
  name: string;
  headline?: string;
}

@Component({
  selector: 'mfe-user-search-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="mfe-user-relative mfe-user-w-full">
  <!-- Selected User -->
  <div 
    class="mfe-user-flex mfe-user-items-center mfe-user-justify-between mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-lg mfe-user-bg-white mfe-user-cursor-pointer mfe-user-min-h-[44px]"
    [class.mfe-user-border-red-500]="isInvalid"
    [class.mfe-user-border-blue-500]="isOpen"
    (click)="toggleDropdown()"
  >
    <div class="mfe-user-flex mfe-user-items-center mfe-user-gap-3">
      <img *ngIf="selectedUser" [src]="selectedUser.avatar" alt="avatar" class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full" />
      <div *ngIf="selectedUser; else placeholderTpl" class="mfe-user-flex mfe-user-flex-col">
        <span class="mfe-user-font-medium mfe-user-text-sm">{{ selectedUser.name }}</span>
        <span class="mfe-user-text-gray-500 mfe-user-text-xs">@{{ selectedUser.username }}</span>
      </div>
      <ng-template #placeholderTpl>
        <span class="mfe-user-text-gray-400 mfe-user-text-sm">{{ placeholder }}</span>
      </ng-template>
    </div>

    <!-- Arrow -->
    <svg class="mfe-user-w-4 mfe-user-h-4 mfe-user-text-gray-400 mfe-user-transition-transform"
         [class.mfe-user-rotate-180]="isOpen"
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>

  <!-- Dropdown -->
  <div *ngIf="isOpen" 
       class="mfe-user-absolute mfe-user-z-50 mfe-user-w-full mfe-user-bg-white mfe-user-border mfe-user-border-gray-200 mfe-user-rounded-lg mfe-user-shadow-xl mfe-user-mt-2 mfe-user-max-h-64 mfe-user-overflow-y-auto">
    
    <!-- Search Input -->
    <div class="mfe-user-p-3 mfe-user-border-b mfe-user-border-gray-100">
      <input
        type="text"
        [placeholder]="searchPlaceholder"
        (input)="onSearchInput($event)"
        class="mfe-user-w-full mfe-user-px-3 mfe-user-py-2 mfe-user-border mfe-user-border-gray-300 mfe-user-rounded-lg mfe-user-text-sm focus:mfe-user-outline-none focus:mfe-user-ring-2 focus:mfe-user-ring-blue-500"
      />
    </div>

    <!-- Loading -->
    <div *ngIf="loading" class="mfe-user-text-center mfe-user-text-gray-500 mfe-user-text-sm mfe-user-p-3">
      Searching...
    </div>

    <!-- User List -->
    <div *ngFor="let user of filteredUsers"
         (click)="selectUser(user)"
         class="mfe-user-flex mfe-user-items-center mfe-user-gap-3 mfe-user-px-4 mfe-user-py-3 mfe-user-cursor-pointer hover:mfe-user-bg-gray-50 mfe-user-transition">
      <img [src]="user.avatar" alt="avatar" class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full" />
      <div class="mfe-user-flex-1">
        <div class="mfe-user-font-medium mfe-user-text-sm">{{ user.name }}</div>
        <div class="mfe-user-text-gray-500 mfe-user-text-xs">@{{ user.username }}</div>
        <div *ngIf="user.headline" class="mfe-user-text-gray-400 mfe-user-text-xs">{{ user.headline }}</div>
      </div>
      <div *ngIf="selectedUser?.username === user.username" class="mfe-user-text-blue-600 mfe-user-font-bold">✓</div>
    </div>

    <!-- No Results -->
    <div *ngIf="!loading && filteredUsers.length === 0" 
         class="mfe-user-text-center mfe-user-text-gray-500 mfe-user-text-sm mfe-user-p-4">
      No users found
    </div>
  </div>
</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchSelectComponent),
      multi: true
    }
  ]
})
export class UserSearchSelectComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select a user...';
  @Input() searchPlaceholder = 'Search users...';
  @Input() isInvalid = false;
  @Input() fetchUsers!: (query: string) => Observable<UserOption[]>;

  selectedUser: UserOption | null = null;
  filteredUsers: UserOption[] = [];
  loading = false;
  isOpen = false;

  private searchTerms = new Subject<string>();
  private onChange: (value: UserOption | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        console.log('Searching for users with term:', term, this.fetchUsers);
        if (!term || !this.fetchUsers) return of([]);
        this.loading = true;
        return this.fetchUsers(term).pipe(
          catchError(() => of([]))
        );
      })
    ).subscribe(users => {
        console.log('Fetched users:', users);
      this.filteredUsers = users;
      this.loading = false;
    });
  }

  writeValue(value: UserOption | null): void {
    this.selectedUser = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim();
    this.searchTerms.next(term);
  }

  selectUser(user: UserOption): void {
    this.selectedUser = user;
    this.isOpen = false;
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange(this.selectedUser);
  }
}
