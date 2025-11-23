import { Injectable, inject, signal } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { AlertService } from '@shared/commun/alert.service';

@Injectable({providedIn: 'root'})
export class PhoneStore {
    
    private http = inject(AuthHttpService);
    private alert = inject(AlertService);


    private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';

    private phoneNumberSignal = signal<string | null>('212 xxx xxx xxx');

    phoneNumber = this.phoneNumberSignal.asReadonly();

    updatePhoneNumber(phoneNumber: string): void {
        this.http.put<{phoneNumber: string}>(`${this.baseUrl}/users/me/phone`, { phoneNumber }).subscribe({
            next: (response) => {
                this.phoneNumberSignal.set(response.phoneNumber);
                this.alert.show('Phone number updated successfully.','success');
            },
            error: () => {
                this.alert.show('Failed to update phone number. Please try again.', 'error');
            }
        });
    }

    loadPhoneNumber(): void {
        this.http.get<{phoneNumber: string | null}>(`${this.baseUrl}/users/me/phone`).subscribe({
            next: (response) => {
                this.phoneNumberSignal.set(response.phoneNumber);
            },
            error: () => {
                this.alert.show('Failed to load phone number. Please try again.', 'error');
            }
        });
    }
}