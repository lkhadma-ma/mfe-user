import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';

@Component({
  selector: 'mfe-user-form-education',
  template: `
    <mfe-user-dynamic-form
      [config]="experienceFormConfig"
      [initialData]="initialExperienceData"
      [isOpen]="isExperienceModalOpen"
      (submitted)="onExperienceSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormEducationComponent {
  isExperienceModalOpen = false;
  initialExperienceData = {};

  experienceFormConfig: FormConfig = {
    id: 'add-experience',
    title: 'Add experience',
    subtitle: 'Notify network - Turn on to modify your network of key profile changes',
    sections: [
      {
        title: 'Basic Information',
        fields: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            placeholder: 'e.g. Retail Sales Manager'
          },
          {
            key: 'employmentType',
            label: 'Employment type',
            type: 'select',
            required: true,
            placeholder: 'Please select',
            options: [
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'freelance', label: 'Freelance' }
            ]
          },
          {
            key: 'company',
            label: 'Company or organization',
            type: 'text',
            required: true,
            placeholder: 'e.g. Microsoft'
          }
        ]
      },
      {
        title: 'Employment Period',
        columns: 2,
        fields: [
          {
            key: 'startDate',
            label: 'Start date',
            type: 'date',
            required: true
          },
          {
            key: 'endDate',
            label: 'End date',
            type: 'date',
            required: false
          },
          {
            key: 'currentRole',
            label: 'I am currently working in this role',
            type: 'checkbox',
            required: false
          }
        ]
      },
      {
        title: 'Location',
        fields: [
          {
            key: 'location',
            label: 'Location',
            type: 'text',
            required: false,
            placeholder: 'e.g. London, United Kingdom'
          },
          {
            key: 'locationType',
            label: 'Location type',
            type: 'select',
            required: false,
            placeholder: 'Please select',
            options: [
              { value: 'onsite', label: 'On-site' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'remote', label: 'Remote' }
            ]
          }
        ]
      },
      {
        title: 'Description',
        fields: [
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            placeholder: 'List your major duties and successes. Highlight specific projects.'
          }
        ]
      }
    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openExperienceModal() {
    this.isExperienceModalOpen = true;
  }

  onExperienceSubmit(experienceData: any) {
    console.log('Experience data submitted:', experienceData);
    // TODO: call API or update state
  }

  onModalClosed() {
    this.isExperienceModalOpen = false;
  }
}
