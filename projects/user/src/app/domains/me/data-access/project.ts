import { Skill } from "./skill";

export interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
    skills: Skill[];
  }