export type JobApplication = {
    job: {
      id: number;
      position: string;
      company: {
        name: string;
        avatar: string;
      };
    };
    status: JobApplicationStatus;
    notes?: string;
}

export enum JobApplicationStatus {
    SUBMITTED = 'submitted',
    VIEWED = 'viewed',
    INTERVIEW = 'interview',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}