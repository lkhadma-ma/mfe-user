import { Injectable, inject, signal } from '@angular/core';
import { AppliedJobsService } from './applied-jobs.service';
import { JobApplication } from './job-application';

@Injectable({providedIn: 'root'})
export class AppliedJobsStore {
    private appliedJobsService = inject(AppliedJobsService);
    
    private jobApplicationSignal = signal<JobApplication[] | null>([]);

    jobApplications = this.jobApplicationSignal.asReadonly();

    loadJobApplications() {
        this.jobApplicationSignal.set(null);
        this.appliedJobsService.getAppliedJobs().subscribe({
            next: (applications) => {
                this.jobApplicationSignal.set(applications);
            }
        });
    }
}