import { Component, OnInit, inject, Injector, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '@shared/ui/section/section.component';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationComponent } from "../ui/job-application.component";
import { JobApplication, JobApplicationStatus } from '../data-access/job-application';

@Component({
  selector: 'mfe-user-me-shell',
  imports: [
    CommonModule,
    SectionComponent,
    JobApplicationComponent
  ],
  template: `
    <mfe-user-section ngxClass="md:mfe-user-pt-[5rem]" >
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
          <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
          <!-- start -->
          <div class="max-sm:mfe-user-h-[90vh] max-sm:mfe-user-border max-sm:mfe-user-rounded-lg mfe-user-bg-white">
            <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-4">
              <!-- Header -->
              <div class="mfe-user-space-y-2">
                <h2 class="mfe-user-text-2xl mfe-user-font-semibold mfe-user-text-gray-900">
                  Applied Jobs
                </h2>
                <p class="mfe-user-text-gray-600 mfe-user-text-sm">
                  Track your job applications in one place.
                </p>
              </div>

              <!-- Filter Tabs -->
              <div class="mfe-user-flex mfe-user-gap-2 mfe-user-overflow-x-auto mfe-user-pb-2">
                <button
                  *ngFor="let filter of statusFilters"
                  (click)="setStatusFilter(filter.value)"
                  [class]="getFilterButtonClasses(filter.value)"
                  class="mfe-user-px-4 mfe-user-py-2 mfe-user-rounded-lg mfe-user-text-sm mfe-user-font-medium mfe-user-transition mfe-user-duration-200 mfe-user-whitespace-nowrap"
                >
                  {{ filter.label }}
                  <span class="mfe-user-ml-1 mfe-user-text-xs mfe-user-opacity-70">
                    ({{ getApplicationCount(filter.value) }})
                  </span>
                </button>
              </div>

              <!-- Applications List -->
              <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
                @for(app of filteredApplications(); track app.job.id) {
                  <mfe-user-job-application [application]="app" />
                }
                @empty {
                  <div class="mfe-user-text-center mfe-user-py-12 mfe-user-text-gray-500">
                    <i class="fa-solid fa-briefcase mfe-user-text-4xl mfe-user-mb-4 mfe-user-text-gray-300"></i>
                    <p class="mfe-user-text-lg">
                      {{ getEmptyStateMessage() }}
                    </p>
                    <p class="mfe-user-text-sm mfe-user-mt-1">
                      {{ getEmptyStateSubMessage() }}
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
          <!-- fin -->
          </div>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
          <!-- Sidebar content can go here -->
        </div>
      </div>
    </mfe-user-section>
  `,
})
export class ShellAppliedJobsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  applications = signal<JobApplication[]>([
    {
      job: { id: 11, position: 'Frontend Developer',
      company: { name: 'Satec', avatar: 'https://media.licdn.com/dms/image/v2/D4D0BAQEmsC7uLFcGtw/company-logo_100_100/company-logo_100_100/0/1734610939743/satec_logo?e=1765411200&v=beta&t=rhB5UlZy2Pt1dvbJhfEjqlUYgT_7ZBcpXiSWjjPIzj4' },
      },
      status: 'INTERVIEW',
      notes: 'Prepare for the technical interview focusing on Angular and TypeScript.'
    },
    {
      job: { id: 10, position: 'Backend Developer',
      company: { name: 'Satec', avatar: 'https://media.licdn.com/dms/image/v2/D4D0BAQEmsC7uLFcGtw/company-logo_100_100/company-logo_100_100/0/1734610939743/satec_logo?e=1765411200&v=beta&t=rhB5UlZy2Pt1dvbJhfEjqlUYgT_7ZBcpXiSWjjPIzj4' },
      },
      status: 'VIEWED'
    },
    {
      job: { id: 12, position: 'Full Stack Developer',
      company: { name: 'Tech Corp', avatar: 'https://via.placeholder.com/100' },
      },
      status: 'SUBMITTED'
    },
    {
      job: { id: 13, position: 'Senior Angular Developer Senior Angular Developer',
      company: { name: 'Web Solutions', avatar: 'https://via.placeholder.com/100' },
      },
      status: 'ACCEPTED'
    },
    {
      job: { id: 14, position: 'React Developer' ,
      company: { name: 'Digital Agency', avatar: 'https://via.placeholder.com/100' },
      },
      status: 'REJECTED',
      notes: 'Focus on improving your React skills and understanding of Redux.'
    }
  ]);

  // Status filter signal
  statusFilter = signal<JobApplicationStatus | 'all'>('all');

  // Status filter options
  statusFilters = [
    { value: 'all' as const, label: 'All Applications' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'VIEWED', label: 'Viewed' },
    { value: 'INTERVIEW', label: 'Interview' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  // Computed filtered applications
  filteredApplications = computed(() => {
    const filter = this.statusFilter();
    const allApplications = this.applications();

    if (filter === 'all') {
      return allApplications;
    }

    return allApplications.filter(app => app.status === filter);
  });

  ngOnInit() {
    // You can initialize any route-based filtering here if needed
  }

  // Set status filter
  setStatusFilter(filter: any): void {
    this.statusFilter.set(filter as JobApplicationStatus | 'all');
  }

  // Get application count for each filter
  getApplicationCount(filter: any): number {
    if ((filter as JobApplicationStatus | 'all') === 'all') {
      return this.applications().length;
    }
    return this.applications().filter(app => app.status === filter).length;
  }

  // Get filter button classes
  getFilterButtonClasses(filter: any): string {
    const isActive = this.statusFilter() === filter as JobApplicationStatus | 'all';
    const baseClasses = 'mfe-user-px-4 mfe-user-py-2 mfe-user-rounded-lg mfe-user-text-sm mfe-user-font-medium mfe-user-transition mfe-user-duration-200 mfe-user-whitespace-nowrap';
    
    if (isActive) {
      return `${baseClasses} mfe-user-bg-blue-100 mfe-user-text-blue-700 mfe-user-border mfe-user-border-blue-200`;
    }
    
    return `${baseClasses} mfe-user-bg-gray-100 mfe-user-text-gray-700 mfe-user-border mfe-user-border-transparent hover:mfe-user-bg-gray-200`;
  }

  // Get empty state message based on filter
  getEmptyStateMessage(): string {
    const filter = this.statusFilter();
    
    if (filter === 'all') {
      return 'No job applications yet';
    }
    
    const filterMap: Record<JobApplicationStatus | 'all', string> = {
      'all': 'No job applications yet',
      ['SUBMITTED']: 'No submitted applications',
      ['VIEWED']: 'No applications viewed yet',
      ['INTERVIEW']: 'No interview invitations',
      ['ACCEPTED']: 'No accepted applications',
      ['REJECTED']: 'No rejected applications'
    };
    
    return filterMap[filter];
  }

  // Get empty state sub-message based on filter
  getEmptyStateSubMessage(): string {
    const filter = this.statusFilter();
    
    if (filter === 'all') {
      return 'Start applying to jobs to see your progress here';
    }
    
    return 'Applications with this status will appear here';
  }
}