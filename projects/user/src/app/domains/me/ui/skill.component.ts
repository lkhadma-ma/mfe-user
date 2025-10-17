import { Component, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../data-access/skill';
import { FormSkillComponent } from './form-skill.component';


@Component({
  selector: 'mfe-user-skill',
  standalone: true,
  imports: [CommonModule, FormSkillComponent],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7 mfe-user-flex mfe-user-justify-between">skills

      @if(isCurrentUser()) {
        <i class="fa-solid fa-plus mfe-user-cursor-pointer hover:mfe-user-scale-105" (click)="form()?.openSkillModal();currentSkill.set(null)"></i>
      }
      </h1>
      @if (showCaption) {
              <div class="mfe-user-flex mfe-user-flex-wrap mfe-user-gap-2">
                @for (skill of skills(); track $index) {
                  <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-text-gray-900 mfe-user-rounded-3xl mfe-user-border mfe-user-border-black mfe-user-p-1.5">
                    {{ skill.label }}  
                    @if(isCurrentUser()) {
                      <i (click)="deleteSkill(skill.value)" class="fa-solid fa-trash mfe-user-cursor-pointer hover:mfe-user-scale-105"></i>  
                    }
                  </p>
                }@empty {
                  <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500 mfe-user-w-full">
                    <p>No skills details available.</p>
                  </div>
                }
              </div>
      } @else {
          <div class="mfe-user-relative">
              <div class="mfe-user-line-clamp-3">
                <div class="mfe-user-flex mfe-user-flex-wrap mfe-user-gap-2 mfe-user-m-4">
                  @for (skill of (skills() | slice: 0:6); track $index) {
                    <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-text-gray-900 mfe-user-rounded-3xl mfe-user-border mfe-user-border-black mfe-user-p-1.5">
                      {{ skill.label }}  
                      @if(isCurrentUser()) {
                        <i (click)="deleteSkill(skill.value)" class="fa-solid fa-trash mfe-user-cursor-pointer hover:mfe-user-scale-105"></i>  
                      }
                    </p>
                  }@empty {
                    <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500 mfe-user-w-full">
                      <p>No skills details available.</p>
                    </div>
                  }
                </div>
              </div>
              @if(skillsHasValues()){
                <button class="mfe-user-absolute mfe-user-bottom-0 mfe-user-right-1 mfe-user-text-gray-500 mfe-user-bg-white hover:mfe-user-underline hover:mfe-user-text-blue-500"
                        (click)="toggleCaption()">
                    ...see more
                </button>
              }
          </div>
      }
    </div>
</div>
  @if(isCurrentUser()) {
    <mfe-user-form-skill (onSubmit)="update.emit($event)" [initialData]="currentSkill()" ></mfe-user-form-skill>
  }
  `
})
export class SkillComponent {
  currentSkill = signal<Skill | null>(null);
  form = viewChild(FormSkillComponent);
  update = output<object>();
  isCurrentUser = input<boolean>(false);
  delete = output<string | number>();
  skills = input<Skill[]>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }

  deleteSkill(id: string | number) {
    this.delete.emit(id);
  }

  deleteCertification(id: string | number) {
    this.delete.emit(id);
  }

  skillsHasValues() {
    return this.skills() && this.skills()!.length > 0;
  }
}
