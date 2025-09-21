import { Skill } from "./skill";

export interface Education {
    id: number;
    school: string;
    description: string;
    activities: string;
    grade: number;
    startDate: Date;
    endDate: Date;
    fieldOfStudy: string;
    degree: string;
    skills: Skill[];
  }