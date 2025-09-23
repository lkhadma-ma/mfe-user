import { Skill } from "./skill";

export interface Certification {
    id: number;
    name: string;
    organization: string;
    url: string;
    issueDate: Date;
    expirationDate: Date | null;
    skills: Skill[];
  }