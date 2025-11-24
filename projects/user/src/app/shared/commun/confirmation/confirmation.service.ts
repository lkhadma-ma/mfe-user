import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogConfig } from './confirm-dialog.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private dialogComponentRef: ComponentRef<ConfirmDialogComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  confirm(config: ConfirmDialogConfig): Observable<boolean> {
    const resultSubject = new Subject<boolean>();

    // Create the component
    this.dialogComponentRef = createComponent(ConfirmDialogComponent, {
      environmentInjector: this.injector
    });

    // Set the config
    this.dialogComponentRef.instance.config = config;

    // Handle the result
    this.dialogComponentRef.instance.confirmed.subscribe((result: boolean) => {
      resultSubject.next(result);
      resultSubject.complete();
      this.closeDialog();
    });

    this.dialogComponentRef.instance.closed.subscribe(() => {
      if (!resultSubject.closed) {
        resultSubject.complete();
      }
      this.closeDialog();
    });

    // Attach to the DOM
    document.body.appendChild(this.dialogComponentRef.location.nativeElement);
    this.appRef.attachView(this.dialogComponentRef.hostView);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return resultSubject.asObservable();
  }

  private closeDialog(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  // Convenience methods
  confirmDelete(itemName: string, itemType: string = 'item'): Observable<boolean> {
    return this.confirm({
      title: `Delete ${itemType}`,
      message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  }

  confirmAction(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      type: 'warning',
      confirmText: 'Continue',
      cancelText: 'Cancel'
    });
  }

  confirmSuccess(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      type: 'success',
      confirmText: 'OK',
      cancelText: 'Cancel'
    });
  }

  confirmInfo(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      type: 'info',
      confirmText: 'Confirm',
      cancelText: 'Cancel'
    });
  }

  // Force close dialog (useful for route changes)
  forceClose(): void {
    this.closeDialog();
  }
}