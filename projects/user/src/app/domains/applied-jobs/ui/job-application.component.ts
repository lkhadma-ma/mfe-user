import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplication, JobApplicationStatus } from '../data-access/job-application';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mfe-user-job-application',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    @let app = application();
    @if(app) {
        <div class="mfe-user-bg-white mfe-user-border mfe-user-border-gray-200 mfe-user-rounded-xl mfe-user-shadow-sm mfe-user-overflow-hidden">
          
          <!-- Header -->
          <div (click)="openAccordion.set(!openAccordion())" class=" mfe-user-p-6 max-sm:mfe-user-p-2 mfe-user-border-b mfe-user-border-gray-200">
            <div class="mfe-user-flex mfe-user-items-center mfe-user-gap-4">
              <!-- Company Avatar -->
              <img 
                [src]="app.company.avatar" 
                [alt]="app.company.name"
                class="max-sm:mfe-user-w-8 max-sm:mfe-user-h-8 mfe-user-w-12 mfe-user-h-12 mfe-user-rounded-lg mfe-user-object-cover mfe-user-border mfe-user-border-gray-200"
              >
              
              <!-- Job Info -->
              <div class="mfe-user-flex-1">
                <h3 [routerLink]="['/lk/jobs']"
                    [queryParams]="{ currentId: app.job.id }" class="mfe-user-cursor-pointer mfe-user-text-sm sm:mfe-user-text-lg mfe-user-font-semibold hover:mfe-user-underline mfe-user-text-gray-900 sm:mfe-user-w-max">
                  {{ app.job.position }}
                </h3>
                <p class="mfe-user-text-gray-600 mfe-user-mt-1 mfe-user-text-xs sm:mfe-user-text-md">
                  {{ app.company.name }}
                </p>
              </div>
              
              <!-- Status Badge -->
              <span [class]="statusBadgeClasses(app.status)" class="max-424:mfe-user-hidden mfe-user-px-3 mfe-user-py-1 mfe-user-rounded-full mfe-user-text-sm mfe-user-font-medium">
                {{ getStatusText(app.status) }}
              </span>
            </div>
          </div>
          @if(openAccordion()){
            <!-- Timeline -->
              <div class="mfe-user-p-6">
                <div class="mfe-user-relative">
                  <!-- Timeline Line -->
                  <div class="mfe-user-absolute mfe-user-left-4 mfe-user-top-0 mfe-user-bottom-0 mfe-user-w-0.5 mfe-user-bg-gray-200"></div>
                  
                  <!-- Timeline Steps -->
                  <div class="mfe-user-space-y-6">
                    
                    <!-- Submitted Step -->
                    <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">
                      <div [class]="getStepClasses('submitted', app.status)" 
                           class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2">
                        <i class="fa-solid fa-paper-plane mfe-user-text-xs"></i>
                      </div>
                      <div class="mfe-user-flex-1 mfe-user-pb-6">
                        <p class="mfe-user-font-medium mfe-user-text-gray-900">Application Submitted</p>
                        <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">Your application has been sent</p>
                      </div>
                    </div>
                    
                    <!-- Viewed Step -->
                    <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">
                      <div [class]="getStepClasses('viewed', app.status)" 
                           class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2">
                        <i class="fa-solid fa-eye mfe-user-text-xs"></i>
                      </div>
                      <div class="mfe-user-flex-1 mfe-user-pb-6">
                        <p class="mfe-user-font-medium mfe-user-text-gray-900">Application Viewed</p>
                        <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">Recruiter has reviewed your application</p>
                      </div>
                    </div>
                    
                    <!-- Interview Step -->
                    <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">
                      <div [class]="getStepClasses('interview', app.status)" 
                           class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2">
                        <i class="fa-solid fa-calendar mfe-user-text-xs"></i>
                      </div>
                      <div class="mfe-user-flex-1 mfe-user-pb-6">
                        <p class="mfe-user-font-medium mfe-user-text-gray-900">Interview</p>
                        <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">You will be contacted if you are shortlisted for the interview.</p>
                      </div>
                    </div>
                    
                    <!-- Accepted Step -->
                    @if(app.status == 'accepted'){
                        <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">
                          <div [class]="getStepClasses('accepted', app.status)" 
                               class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2">
                            <i class="fa-solid fa-check mfe-user-text-xs"></i>
                          </div>
                          <div class="mfe-user-flex-1">
                            <p class="mfe-user-font-medium mfe-user-text-gray-900">Accepted</p>
                            <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">Congratulations! Your application has been accepted</p>
                          </div>
                        </div>
                    }

                    <!-- rejected Step -->
                    @if(app.status == 'rejected'){
                        <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">
                          <div [class]="getStepClasses('rejected', app.status)" 
                               class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2 mfe-user-border-red-500 mfe-user-bg-red-50">
                            <i class="fa-solid fa-times mfe-user-text-xs"></i>
                          </div>
                          <div class="mfe-user-flex-1">
                            <p class="mfe-user-font-medium mfe-user-text-gray-900">Rejected</p>
                            <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">Unfortunately, your application was not selected</p>
                          </div>
                        </div>
                    }

                    
                  </div>
                </div>
              </div>
              
              <!-- Notes Section -->
              @if(app.notes) {
                <div class="mfe-user-px-6 mfe-user-pb-6">
                  <div class="mfe-user-bg-blue-50 mfe-user-border mfe-user-border-blue-200 mfe-user-rounded-lg mfe-user-p-4">
                    <p class="mfe-user-text-sm mfe-user-text-blue-800">{{ app.notes }}</p>
                  </div>
                </div>
              }
          }
    </div>
    }
  `,
})
export class JobApplicationComponent {
    openAccordion = signal<boolean>(false);
    application = input<JobApplication>();

  getStatusText(status: JobApplicationStatus): string {
    const statusMap = {
      submitted: 'Submitted',
      viewed: 'Viewed',
      interview: 'Interview',
      accepted: 'Accepted',
      rejected: 'Rejected'
    };
    return statusMap[status];
  }

  statusBadgeClasses(status: JobApplicationStatus): string {
    const baseClasses = 'mfe-user-px-3 mfe-user-py-1 mfe-user-rounded-full mfe-user-text-sm mfe-user-font-medium';
    
    const statusClasses = {
      submitted: 'mfe-user-bg-blue-100 mfe-user-text-blue-800',
      viewed: 'mfe-user-bg-purple-100 mfe-user-text-purple-800',
      interview: 'mfe-user-bg-yellow-100 mfe-user-text-yellow-800',
      accepted: 'mfe-user-bg-green-100 mfe-user-text-green-800',
      rejected: 'mfe-user-bg-red-100 mfe-user-text-red-800'
    };
    
    return `${baseClasses} ${statusClasses[status]}`;
  }

  getStepClasses(step: any, currentStatus: JobApplicationStatus): string {
    const stepOrder: JobApplicationStatus[] = [
        JobApplicationStatus.SUBMITTED, 
        JobApplicationStatus.VIEWED,
        JobApplicationStatus.INTERVIEW,
        JobApplicationStatus.ACCEPTED,
        JobApplicationStatus.REJECTED
    ];
    const currentStepIndex = stepOrder.indexOf(currentStatus);
    const stepIndex = stepOrder.indexOf(step);
    
    if (stepIndex < currentStepIndex) {
      // Completed step
      return 'mfe-user-bg-green-500 mfe-user-border-green-500 mfe-user-text-white';
    } else if (stepIndex === currentStepIndex) {
      // Current step
      return 'mfe-user-bg-white mfe-user-border-green-500 mfe-user-text-green-500';
    } else {
      // Upcoming step
      return 'mfe-user-bg-gray-100 mfe-user-border-gray-300 mfe-user-text-gray-400';
    }
  }
}