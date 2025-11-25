import { Component, OnInit, inject, Injector, signal } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationComponent } from "../ui/job-application.component";
import { JobApplication, JobApplicationStatus } from '../data-access/job-application';



@Component({
  selector: 'mfe-user-me-shell',
  imports: [
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
            <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
              <h2 class="mfe-user-text-2xl mfe-user-font-semibold mfe-user-text-gray-900">
                Applied Jobs
              </h2>
              <p class="mfe-user-text-gray-600 mfe-user-text-sm">
                Track your job applications in one place.
              </p>
            <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
                @for(app of applications(); track app.job.id) {
                  <mfe-user-job-application [application]="app" />
                }
                @empty {
                  <div class="mfe-user-text-center mfe-user-py-12 mfe-user-text-gray-500">
                    <i class="fa-solid fa-briefcase mfe-user-text-4xl mfe-user-mb-4 mfe-user-text-gray-300"></i>
                    <p class="mfe-user-text-lg">No job applications yet</p>
                    <p class="mfe-user-text-sm mfe-user-mt-1">Start applying to jobs to see your progress here</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <!-- fin -->
          </div>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">

        </div>
      </div>
    </mfe-user-section>
  `,
})
export class ShellAppliedJobsComponent implements OnInit {
  applications = signal<JobApplication[]>([
    {
        job: { id: 11, position: 'Frontend Developer' },
        company: { name: 'Satec', avatar: 'https://media.licdn.com/dms/image/v2/D4D0BAQEmsC7uLFcGtw/company-logo_100_100/company-logo_100_100/0/1734610939743/satec_logo?e=1765411200&v=beta&t=rhB5UlZy2Pt1dvbJhfEjqlUYgT_7ZBcpXiSWjjPIzj4' },
        status: JobApplicationStatus.INTERVIEW,
        notes: 'Prepare for the technical interview focusing on Angular and TypeScript.'
        },
        {
        job: { id: 10, position: 'Backend Developer' },
        company: { name: 'Satec', avatar: 'https://media.licdn.com/dms/image/v2/D4D0BAQEmsC7uLFcGtw/company-logo_100_100/company-logo_100_100/0/1734610939743/satec_logo?e=1765411200&v=beta&t=rhB5UlZy2Pt1dvbJhfEjqlUYgT_7ZBcpXiSWjjPIzj4' },
        status: JobApplicationStatus.VIEWED
    }
  ]);
  

  ngOnInit() {

    
  }


}
