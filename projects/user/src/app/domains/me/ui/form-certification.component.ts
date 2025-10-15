import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Certification } from '../data-access/certification';

@Component({
  selector: 'mfe-user-form-certification',
  template: `
    <mfe-user-dynamic-form
      [config]="certificationFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="iscertificationModalOpen"
      (submitted)="onCertificationSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormCertificationComponent {
  iscertificationModalOpen = false;
  initialData = input<Certification | null>();
  onSubmit = output<object>();

  certificationFormConfig: FormConfig = {
    id: 'add-certification',
    title: 'Add Certification',
    subtitle: 'Add certification to show your academic background',
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
            key: 'name',
            label: 'name',
            type: 'text',
            required: true,
            placeholder: 'e.g. AWS Certified Solutions Architect'
          },
          {
            key: 'organization',
            label: 'organization',
            type: 'text',
            required: true,
            placeholder: 'e.g. Amazon Web Services (AWS)'
          },
          {
            key: 'url',
            label: 'url',
            type: 'url',
            required: true,
            placeholder: 'e.g. https://aws.amazon.com/certifications/idCertification...etc'
          },
        ]
      },
      {
        title: 'Certification Period',
        columns: 2,
        fields: [
          {
            key: 'issueDate',
            label: 'Start date',
            type: 'date',
            required: true
          },
          {
            key: 'expirationDate',
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

  openCertificationModal() {
    this.iscertificationModalOpen = true;
  }

  onCertificationSubmit(certificationData: any) {
    this.onSubmit.emit(certificationData);
  }

  onModalClosed() {
    this.iscertificationModalOpen = false;
  }
  
}
