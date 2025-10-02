import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';

@Component({
  selector: 'mfe-user-form-education',
  template: `
    <mfe-user-dynamic-form
      [config]="educationFormConfig"
      [initialData]="initialeducationData"
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
  initialeducationData = {};

  educationFormConfig: FormConfig = {
    id: 'add-education',
    title: 'Add Education',
    subtitle: 'Add education to show your academic background',
    sections: [
      {
        title: 'Information',
        fields: [
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
          }
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
    console.log('education data submitted:', educationData);
    // TODO: call API or update state
  }

  onModalClosed() {
    this.iseducationModalOpen = false;
  }
}
