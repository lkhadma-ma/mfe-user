import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Project } from '../data-access/project';

@Component({
  selector: 'mfe-user-form-project',
  template: `
    <mfe-user-dynamic-form
      [config]="projectFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="isprojectModalOpen"
      (submitted)="onProjectSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormProjectComponent {
  isprojectModalOpen = false;
  initialData = input<Project | null>();
  onSubmit = output<object>();

  projectFormConfig: FormConfig = {
    id: 'add-project',
    title: 'Add Project',
    subtitle: 'Add project to show your academic background',
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
            placeholder: 'e.g. Project Name'
          },
          {
            key: 'description',
            label: 'description',
            type: 'textarea',
            required: true,
            placeholder: 'e.g. Project Description'
          },
          {
            key: 'url',
            label: 'url',
            type: 'url',
            required: true,
            placeholder: 'e.g. link to the project'
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

  openProjectModal() {
    this.isprojectModalOpen = true;
  }

  onProjectSubmit(projectData: any) {
    this.onSubmit.emit(projectData);
  }

  onModalClosed() {
    this.isprojectModalOpen = false;
  }
  
}
