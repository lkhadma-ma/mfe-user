import { Injectable, inject } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { JobApplication } from './job-application';

@Injectable({providedIn: 'root'})
export class AppliedJobsService {
    private http = inject(AuthHttpService);

    private readonly baseUrl = 'http://localhost:8083/mbe-company/api/v1/applications';

    getAppliedJobs() {
        return this.http.get<JobApplication[]>(`${this.baseUrl}/applied-jobs`);
    }
    
}