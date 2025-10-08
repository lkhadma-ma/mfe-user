import { EmploymentType } from "./employment-type";
import { LocationType } from "./location-type";
import { Skill } from "./skill";

export interface Experience {
    id: string;
    title: string;
    company: string;
    employmentType: EmploymentType;
    startDate: Date;
    currently: boolean;
    endDate: Date | null;
    location: string;
    locationType: LocationType;
    description: string;
    skills: Skill[];
  }