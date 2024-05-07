import { Company } from "./company";

export interface UserResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface User{
    firstAccess: boolean;
    emailActive: boolean;
    password: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    image?: string;
    company: Company
}
