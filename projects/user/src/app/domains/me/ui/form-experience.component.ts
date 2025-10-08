import { Component, input, output } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Experience } from '../data-access/experience';

@Component({
  selector: 'mfe-user-form-experience',
  template: `
    <mfe-user-dynamic-form
      [config]="experienceFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="isexperienceModalOpen"
      (submitted)="onEducationSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormExperienceComponent {
  isexperienceModalOpen = false;
  initialData = input<Experience | null>();
  onSubmit = output<object>();

  experienceFormConfig: FormConfig = {
    id: 'add-experience',
    title: 'Add Experience',
    subtitle: 'Add experience to show your academic background',
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
            key: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            placeholder: 'e.g. Software Engineer'
          },
          {
            key: 'employmentType',
            label: 'Employment Type',
            type: 'select',
            required: false,
            options: [
              { value: 'FULL_TIME', label: 'Full-time' },
              { value: 'PART_TIME', label: 'Part-time' },
              { value: 'SELF_EMPLOYED', label: 'Self-employed' },
              { value: 'FREELANCE', label: 'Freelance' },
              { value: 'CONTRACT', label: 'Contract' },
              { value: 'INTERNSHIP', label: 'Internship' },
              { value: 'APPRENTICESHIP', label: 'Apprenticeship' },
              { value: 'TEMPORARY_CIVIL_SERVANT', label: 'Temporary civil servant' },
              { value: 'DIRECT_CONTRACT', label: 'Direct contract' },
              { value: 'LIFETIME_CIVIL_SERVANT', label: 'Lifetime civil servant' },
              { value: 'CO_OP', label: 'Co-op' }
            ]
          },
          {
            key: 'company',
            label: 'Company or organization',
            type: 'text',
            required: true,
            placeholder: 'e.g. Google'
          },
          {
            key: 'currently',
            label: 'I currently work here',
            type: 'checkbox',
            required: false
          
          }
        ]
      },
      {
        title: 'Experience Period',
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
        ]
      },
      {
        title: 'More Details',
        fields: [
          {
            key: 'location',
            label: 'Location',
            type: 'text',
            required: false,
            placeholder: 'e.g. Marrakech, Morocco'
          },
          {
            key: 'locationType',
            label: 'Location type',
            type: 'textarea',
            required: false,
            options: [
              { value: 'REMOTE', label: 'Remote' },
              { value: 'HYBRID', label: 'Hybrid' },
              { value: 'ON_SITE', label: 'On-site' }
            ]
            
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            placeholder: 'Describe your role and responsibilities...'
          },
          {
            key: 'skills',
            label: 'Skills',
            type: 'multiselect',
            required: true,
            placeholder: 'Select your skills...',
            mode: 'tags',
            searchable: true,
            options: [
              
            ]
          },
        ]
      },
     
    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openEducationModal() {
    this.isexperienceModalOpen = true;
  }

  onEducationSubmit(experienceData: any) {
    this.onSubmit.emit(experienceData);
  }

  onModalClosed() {
    this.isexperienceModalOpen = false;
  }
}
