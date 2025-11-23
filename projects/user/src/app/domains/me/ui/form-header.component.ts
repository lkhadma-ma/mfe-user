import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';

@Component({
  selector: 'mfe-user-form-header',
  template: `
    <mfe-user-dynamic-form
      [config]="headerFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="isheaderModalOpen"
      (submitted)="onHeaderSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormHeaderComponent {
  isheaderModalOpen = false;
  initialData = input<{
    name: string;
    headline: string;
    address: string;
  } | null>();
  onSubmit = output<any>();

  headerFormConfig: FormConfig = {
    id: 'add-header',
    title: 'Update Header Information',
    subtitle: 'Update your header to make your profile stand out',
    sections: [
      {
        title: 'Information',
        fields: [
          {
            key: 'name',
            label: 'Full Name',
            type: 'text',
            required: true,
            placeholder: 'e.g. Oussama Yaagoub'
          },
          {
            key: 'address',
            label: 'Address',
            type: 'text',
            required: true,
            placeholder: 'e.g. Marrakech, Morocco'
          },
          {
            key: 'headline',
            label: 'Headline',
            type: 'textarea',
            required: true,
            placeholder: 'e.g. Full Stack Developer & Angular architect'
          },
        ]
      }
    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openHeaderModal() {
    this.isheaderModalOpen = true;
  }

  onHeaderSubmit(headerData: any) {
    this.onSubmit.emit(headerData);
  }

  onModalClosed() {
    this.isheaderModalOpen = false;
  }
  
}
