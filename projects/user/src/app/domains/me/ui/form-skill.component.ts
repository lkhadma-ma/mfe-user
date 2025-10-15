import { Component, input, output, signal } from '@angular/core';
import { DynamicFormComponent, FormConfig } from '@shared/ui/dynamic-form/dynamic-form.component';
import { Skill } from '../data-access/skill';

@Component({
  selector: 'mfe-user-form-skill',
  template: `
    <mfe-user-dynamic-form
      [config]="skillFormConfig"
      [initialData]="initialData() || {}"
      [isOpen]="isskillModalOpen"
      (submitted)="onSkillSubmit($event)"
      (closed)="onModalClosed()"
    >
    </mfe-user-dynamic-form>
  `,
  imports: [DynamicFormComponent],
})
export class FormSkillComponent {
  isskillModalOpen = false;
  initialData = input<Skill | null>();
  onSubmit = output<object>();

  skillFormConfig: FormConfig = {
    id: 'add-skill',
    title: 'Add Skill',
    subtitle: 'Add skill to show your academic background',
    sections: [
      {
        title: 'Information',
        fields: [
          {
            key: 'value',
            label: 'value',
            type: 'hidden',
            required: false,
          },
          {
            key: 'label',
            label: 'skill name',
            type: 'text',
            required: true,
            placeholder: 'e.g. Angular'
          }
        ]
      },

    ],
    submitText: 'Save',
    cancelText: 'Cancel'
  };

  openSkillModal() {
    this.isskillModalOpen = true;
  }

  onSkillSubmit(skillData: any) {
    this.onSubmit.emit(skillData);
  }

  onModalClosed() {
    this.isskillModalOpen = false;
  }
  
}
