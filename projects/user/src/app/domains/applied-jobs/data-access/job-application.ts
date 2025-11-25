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
    note?: string;
}

export type JobApplicationStatus = 'SUBMITTED' | 'VIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED'