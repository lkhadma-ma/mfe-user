export type JobApplication = {
    job: {
      id: number;
      position: string;
      company: {
        name: string;
        avatar: string;
      };
    };
    pipelineStage: {
        status: JobApplicationStatus;
        createdAt: string;
        note?: string;
    }[];
}

export type JobApplicationStatus = 'SUBMITTED' | 'VIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED' | 'PASSED';

export type JobApplicationMessage = 'SUBMITTED' | 'VIEWED';
