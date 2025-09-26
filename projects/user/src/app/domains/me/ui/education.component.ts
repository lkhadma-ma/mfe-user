import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from "./description.component";
import { Education } from '../data-access/education';

@Component({
  selector: 'mfe-user-education',
  standalone: true,
  imports: [CommonModule, DescriptionComponent],
  host: {
    class: 'mfe-user-w-full'
  },
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
    <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
      <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">Education</h1>
        @for (education of educations(); track $index) {
            <div class="mfe-user-flex mfe-user-space-x-4 mfe-user-mt-4">
              <img class="mfe-user-w-14 mfe-user-h-14" src="https://media.licdn.com/dms/image/v2/C4D0BAQFEzJhL1rYMEw/company-logo_100_100/company-logo_100_100/0/1663664586696/ies_juan_bosco_logo?e=1761177600&v=beta&t=6Ot7MuTDrD0Tu0SmsLet15ZLY9XRg25LU3NU6c3k5U0" alt="">
              <div>
                <h2 class="mfe-user-font-semibold mfe-user-tracking-wide">{{ education.school }}</h2>
                <h3 class="mfe-user-tracking-wide mfe-user-text-sm">{{ education.degree }}, {{ education.fieldOfStudy }}</h3>
                <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-text-gray-700">{{ education.startDate | date:'yyyy' }} - {{ education.endDate ? (education.endDate | date:'yyyy') : 'Present' }}</p>
                <p class="mfe-user-tracking-wide mfe-user-text-sm mfe-user-pb-3 mfe-user-text-gray-700">Grade: {{ education.grade }}</p>
                <mfe-user-description class="mfe-user-mb-2" [description]="education.description"></mfe-user-description>
                <a href="#" class="mfe-user-mt-4 mfe-user-font-semibold mfe-user-flex mfe-user-items-center">
                <!-- Diamond icon -->
                <span class="mfe-user-mr-1">
 
                  <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                  width="14" height="14" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                    <g>
                      <path d="M68.193,19.713L60.171,8.027c-1.539-2.262-4.937-3.967-7.903-3.967H19.721c-2.966,0-6.363,1.708-7.893,3.96L3.784,19.652
                        c-1.711,2.52-1.62,6.4,0.207,8.836l28.002,37.329c1.014,1.352,2.476,2.125,4.01,2.125c1.528,0,2.983-0.771,3.99-2.113l28.004-37.33
                        C69.842,26.035,69.93,22.262,68.193,19.713z M52.268,8.06c0.088,0,0.181,0.014,0.271,0.02l-0.782,0.715
                        c-0.408,0.372-0.436,1.005-0.064,1.412c0.197,0.217,0.469,0.326,0.74,0.326c0.239,0,0.48-0.086,0.674-0.262l1.718-1.569
                        c0.867,0.41,1.633,0.975,2.046,1.583l8.023,11.687c0.212,0.311,0.354,0.688,0.441,1.089h-26.24l8.34-7.612
                        c0.406-0.371,0.436-1.004,0.063-1.412c-0.371-0.407-1.005-0.438-1.413-0.064l-9.826,8.969c-0.038,0.035-0.056,0.081-0.087,0.119h-1
                        c-0.031-0.039-0.049-0.084-0.086-0.118L18.878,8.149c0.289-0.052,0.573-0.089,0.843-0.089H52.268z M15.127,10.282
                        c0.344-0.506,0.939-0.979,1.63-1.362L32.248,23.06H20.23c-0.001,0-0.001,0-0.002,0H6.743c-0.038,0-0.07,0.018-0.107,0.021
                        c0.083-0.435,0.226-0.842,0.447-1.167L15.127,10.282z M7.19,26.088c-0.217-0.289-0.375-0.647-0.481-1.035
                        c0.012,0,0.022,0.007,0.034,0.007h12.781l0.949,2.375c0.155,0.395,0.532,0.635,0.932,0.635c0.121,0,0.244-0.022,0.364-0.069
                        c0.513-0.201,0.767-0.781,0.566-1.295l-0.657-1.646h28.471l-14.16,36.531L25.008,33.534c-0.201-0.513-0.782-0.769-1.296-0.566
                        c-0.514,0.201-0.767,0.781-0.566,1.295l10.712,27.375L7.19,26.088z M38.093,61.697L52.294,25.06h12.988
                        c-0.106,0.386-0.266,0.744-0.485,1.038L38.093,61.697z"/>
                      <path d="M49.329,13.365c0.241,0,0.483-0.087,0.674-0.262l0.696-0.636c0.406-0.373,0.436-1.005,0.063-1.413
                        c-0.371-0.406-1.004-0.434-1.412-0.063l-0.695,0.636c-0.407,0.372-0.437,1.005-0.063,1.413
                        C48.788,13.256,49.059,13.365,49.329,13.365z"/>
                      <path d="M23.659,30.087l-0.351-0.895c-0.201-0.511-0.78-0.767-1.296-0.564c-0.513,0.201-0.767,0.781-0.566,1.295l0.351,0.895
                        c0.156,0.395,0.533,0.635,0.932,0.635c0.121,0,0.245-0.022,0.364-0.069C23.607,31.183,23.861,30.603,23.659,30.087z"/>
                    </g>
                  </svg>
                </span>

                <!-- Skills -->
                @if (education.skills.length > 2) {
                  <small>
                    {{ education.skills[0].name }},
                    {{ education.skills[1].name }}
                    and +{{ education.skills.length - 2 }} skills
                  </small>
                } @else {
                  @for (skill of education.skills; track $index) {
                    <small>
                      {{ skill.name }}{{ $index < education.skills.length - 1 ? ', ' : '' }}
                    </small>
                  }
                }
              </a>

              </div>
            </div>
        }@empty {
          <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
            <p>No education details available.</p>
          </div>
        }
    </div>
</div>
  `
})
export class EducationComponent {

  educations = input<Education[]>();
  showCaption = false;

  toggleCaption() {
    this.showCaption = true;
  }
}
