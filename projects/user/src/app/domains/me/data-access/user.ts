import { Certification } from "./certification";
import { Education } from "./education";
import { Experience } from "./experience";
import { Project } from "./project";
import { Recommendation } from "./recommendation";

export interface UserComplated {
    username: string;
    address: string;
    avatar: string;
    headline: string;
    name: string;
    bg: string;
    about: string;
    certifications: Certification[];
    recommendations: Recommendation[];
    educations: Education[];
    experiences: Experience[];
    projects: Project[];
    servicesHeadline: string;
    skills: {
        id: number;
        name: string;
    }[];
}

export type UserRecomandation = Pick<UserComplated, 'name' | 'headline' | 'avatar' | 'username'>;
export type UserHeader = Pick<UserComplated, 'name' | 'headline' | 'avatar' | 'bg'>;
