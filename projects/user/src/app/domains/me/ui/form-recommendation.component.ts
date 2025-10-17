import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Recommendation } from '../data-access/recommendation';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'mfe-user-form-recommendation',
  template: `
    <mfe-user-dynamic-form
      [config]="recommendationFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="isrecommendationModalOpen"
      (submitted)="onRecommendationSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormRecommendationComponent {
  fetchUserOptions = input<(username: string) => Observable<any[]>>();
  fetchUserWrapper = (username: string): Observable<any[]> => {
    const fn = this.fetchUserOptions?.();
    return fn ? fn(username) : of([]);
  }
  isrecommendationModalOpen = false;
  initialData = input<Recommendation | null>();
  onSubmit = output<object>();

  recommendationFormConfig: FormConfig = {
    id: 'give-recommendation',
    title: 'Give Recommendation',
    subtitle: 'Give recommendation to show your professional background',
    sections: [
      {
        title: 'Information',
        fields: [
          {
            key: 'id',
            label: 'id',
            type: 'hidden',
            required: false,
          },
          {
            key: 'position',
            label: 'Position',
            type: 'text',
            required: true,
            placeholder: 'e.g. Software Engineer'
          },
          {
            key: 'relationship',
            label: 'Give your recommendation',
            type: 'userselect',
            required: true,
            placeholder: 'Select user...',
            fetchOptions: this.fetchUserWrapper
          },
          {
            key: 'recommendation',
            label: 'Your recommendation',
            type: 'textarea',
            required: true,
            placeholder: 'e.g. He is a great team player...etc'
          },
        ]
      }
     
    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openRecommendationModal() {
    this.isrecommendationModalOpen = true;
  }

  onRecommendationSubmit(recommendationData: any) {
    this.onSubmit.emit(recommendationData);
  }

  onModalClosed() {
    this.isrecommendationModalOpen = false;
  }
  
}
