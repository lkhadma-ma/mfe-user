import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplication, JobApplicationMessage, JobApplicationStatus } from '../data-access/job-application';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mfe-user-job-application',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    @let app = application();
    @if (app) {

      @let timeline = getOrderedTimeline(app);
      @let latestIndexValue = latestIndex(timeline);

      <div class="mfe-user-bg-white mfe-user-border mfe-user-border-gray-200 mfe-user-rounded-xl mfe-user-shadow-sm mfe-user-overflow-hidden">

        <!-- Header -->
        <div (click)="openAccordion.set(!openAccordion())"
             class="mfe-user-p-6 max-sm:mfe-user-p-2 mfe-user-border-b mfe-user-border-gray-200">

          <div class="mfe-user-flex mfe-user-items-center mfe-user-gap-4">

            <!-- Company Avatar -->
            <img [src]="app.job.company.avatar"
                 [alt]="app.job.company.name"
                 class="max-sm:mfe-user-w-8 max-sm:mfe-user-h-8 mfe-user-w-12 mfe-user-h-12 mfe-user-rounded-lg mfe-user-object-cover mfe-user-border mfe-user-border-gray-200">

            <!-- Job Info -->
            <div class="mfe-user-flex-1">
              <h3 [routerLink]="['/lk/jobs']"
                  [queryParams]="{ currentId: app.job.id }"
                  class="mfe-user-cursor-pointer mfe-user-text-sm sm:mfe-user-text-lg mfe-user-font-semibold hover:mfe-user-underline sm:mfe-user-w-max mfe-user-text-gray-900">
                {{ app.job.position }}
              </h3>
              <p class="mfe-user-text-gray-600 mfe-user-mt-1 mfe-user-text-xs sm:mfe-user-text-md">
                {{ app.job.company.name }}
              </p>
            </div>

            <!-- Status Badge -->
            <span [class]="statusBadgeClasses(getLatestStatus(app))"
                  class="max-424:mfe-user-hidden mfe-user-px-3 mfe-user-py-1 mfe-user-rounded-full mfe-user-text-sm mfe-user-font-medium">
              {{ getStatusText(getLatestStatus(app)) }}
            </span>

          </div>
        </div>

        @if (openAccordion()) {

          <!-- Timeline -->
          <div class="mfe-user-p-6">
            <div class="mfe-user-relative">

              <!-- Vertical line -->
              <div class="mfe-user-absolute mfe-user-left-[.95rem] mfe-user-top-0 mfe-user-bottom-0 mfe-user-w-0.5 mfe-user-bg-gray-200"></div>

              <div class="mfe-user-space-y-6">

                @for(stage of timeline; track stage.createdAt) {

                  @let index = stageIndex(stage, timeline);

                  <div class="mfe-user-relative mfe-user-flex mfe-user-gap-4">

                    <!-- Circle / Icon -->
                    <div [class]="getStepClasses(index, latestIndexValue)"
                         class="mfe-user-w-8 mfe-user-h-8 mfe-user-rounded-full mfe-user-flex mfe-user-items-center mfe-user-justify-center mfe-user-z-10 mfe-user-border-2">
                      <i class="{{ getIcon(stage.status) }} mfe-user-text-xs"></i>
                    </div>

                    <!-- Content -->
                    <div class="mfe-user-flex-1 mfe-user-pb-6">
                      <p class="mfe-user-font-medium mfe-user-text-gray-900">{{ getTitle(stage.status) }}</p>
                      @if(stage.status === 'SUBMITTED' || stage.status === 'VIEWED') {
                        <p class="mfe-user-text-sm mfe-user-text-gray-500 mfe-user-mt-1">
                            Your application has been sent
                        </p>
                      } @else {
                           
                        @if(stage?.note) {
                            <div class="mfe-user-bg-blue-50  mfe-user-border mfe-user-border-blue-200 mfe-user-rounded-lg mfe-user-p-4 mfe-user-mt-4">
                            <p class="mfe-user-text-sm mfe-user-text-blue-800">{{ stage?.note }}</p>
                            </div>
                        }
                      }
                    </div>

                  </div>
                }
              </div>

            </div>
          </div>
        }
      </div>
    }
  `,
})
export class JobApplicationComponent {
  openAccordion = signal<boolean>(false);
  application = input<JobApplication>();

  /** Get latest status from pipeline */
  getLatestStatus(app: JobApplication): JobApplicationStatus {
    return app.pipelineStage?.length
      ? app.pipelineStage[app.pipelineStage.length - 1].status
      : 'SUBMITTED';
  }

  /** Sort pipeline stages by createdAt ascending */
  getOrderedTimeline(app: JobApplication) {
    return [...(app.pipelineStage ?? [])].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  /** Get index of stage in timeline */
  stageIndex(stage: any, timeline: any[]): number {
    return timeline.indexOf(stage);
  }

  /** Get index of latest stage */
  latestIndex(timeline: any[]): number {
    return timeline.length - 1;
  }

  /** Step highlight classes */
  getStepClasses(stepIndex: number, latestIndex: number): string {
    if (stepIndex < latestIndex) {
      return 'mfe-user-bg-green-500 mfe-user-border-green-500 mfe-user-text-white';
    }
    if (stepIndex === latestIndex) {
      return 'mfe-user-bg-white mfe-user-border-green-500 mfe-user-text-green-500';
    }
    return 'mfe-user-bg-gray-100 mfe-user-border-gray-300 mfe-user-text-gray-400';
  }

  /** Map status to icons */
  getIcon(status: JobApplicationStatus): string {
    return {
      SUBMITTED: 'fa-solid fa-paper-plane',
      VIEWED: 'fa-solid fa-eye',
      INTERVIEW: 'fa-solid fa-calendar',
      ACCEPTED: 'fa-solid fa-check',
      REJECTED: 'fa-solid fa-times',
      PASSED: 'fa-solid fa-check-double'
    }[status];
  }

  /** Map status to titles */
  getTitle(status: JobApplicationStatus): string {
    return {
      SUBMITTED: 'Submitted',
      VIEWED: 'Viewed',
      INTERVIEW: 'Interview',
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      PASSED: 'Passed'
    }[status];
  }

  /** Badge text */
  getStatusText(status: JobApplicationStatus): string {
    return {
      SUBMITTED: 'Submitted',
      VIEWED: 'Viewed',
      INTERVIEW: 'Interview',
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      PASSED: 'Passed'
    }[status];
  }

  /** Badge classes */
  statusBadgeClasses(status: JobApplicationStatus): string {
    const base = 'mfe-user-px-3 mfe-user-py-1 mfe-user-rounded-full mfe-user-text-sm mfe-user-font-medium';
    const map = {
      SUBMITTED: 'mfe-user-bg-blue-100 mfe-user-text-blue-800',
      VIEWED: 'mfe-user-bg-purple-100 mfe-user-text-purple-800',
      INTERVIEW: 'mfe-user-bg-yellow-100 mfe-user-text-yellow-800',
      ACCEPTED: 'mfe-user-bg-green-100 mfe-user-text-green-800',
      REJECTED: 'mfe-user-bg-red-100 mfe-user-text-red-800',
      PASSED: 'mfe-user-bg-teal-100 mfe-user-text-teal-800',
    };
    return `${base} ${map[status]}`;
  }

  getMessageForStatus(status: JobApplicationMessage): string {

    const messageMap: Record<JobApplicationMessage, string> = {
      SUBMITTED: 'Your application has been submitted successfully.',
      VIEWED: 'The employer has viewed your application.',
    };
    
    return messageMap[status];
  }
}
