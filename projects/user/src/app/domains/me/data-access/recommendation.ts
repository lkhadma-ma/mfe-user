import { UserRecomandation } from "./user";

export interface Recommendation {
    id: number;
    relationship: UserRecomandation;
    user: UserRecomandation;
    position: string;
    recommendation: string;
    createdAt: Date;
}