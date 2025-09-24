import { User } from "./user";

export interface Recommendation {
    id: number;
    relationship: User;
    user: User;
    position: string;
    recommendation: string;
    createdAt: Date;
}