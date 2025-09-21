import { Skill } from "./skill";

export interface Experience {
    id: string;
    position: string;
    company: string;
    employmentType: string;
    startDate: Date;
    currently: boolean;
    endDate: Date | null;
    location: string;
    locationType: string;
    description: string;
    skills: Skill[];
  }