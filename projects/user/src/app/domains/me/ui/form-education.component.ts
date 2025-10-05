import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Education } from '../data-access/education';

@Component({
  selector: 'mfe-user-form-education',
  template: `
    <mfe-user-dynamic-form
      [config]="educationFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="iseducationModalOpen"
      (submitted)="onEducationSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormEducationComponent {
  iseducationModalOpen = false;
  initialData = input<Education | null>();
  onSubmit = output<object>();

  educationFormConfig: FormConfig = {
    id: 'add-education',
    title: 'Add Education',
    subtitle: 'Add education to show your academic background',
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
            key: 'school',
            label: 'School',
            type: 'text',
            required: true,
            placeholder: 'e.g. University of Oxford'
          },
          {
            key: 'degree',
            label: 'Degree',
            type: 'text',
            required: true,
            placeholder: 'e.g. Bachelor of Science'
          },
          {
            key: 'fieldOfStudy',
            label: 'Field of study',
            type: 'text',
            required: true,
            placeholder: 'e.g. Computer Science'
          },
        ]
      },
      {
        title: 'Education Period',
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
            key: 'grade',
            label: 'Grade',
            type: 'number',
            required: false,
            placeholder: 'e.g. 3.8'
          },
          {
            key: 'activities',
            label: 'Activities and societies',
            type: 'textarea',
            required: false,
            placeholder: 'e.g. Student Union, Football Club'
            
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            placeholder: 'List your major duties and successes. Highlight specific projects.'
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
              { value: 1, label: 'Angular' },
              { value: 2, label: 'React' },
              { value: 3, label: 'Vue.js' },
              { value: 4, label: 'TypeScript' },
              { value: 5, label: 'JavaScript' },
              { value: 6, label: 'Node.js' }
            ]
          },
        ]
      },
     
    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openEducationModal() {
    this.iseducationModalOpen = true;
  }

  onEducationSubmit(educationData: any) {
    this.onSubmit.emit(educationData);
  }

  onModalClosed() {
    this.iseducationModalOpen = false;
  }
}
