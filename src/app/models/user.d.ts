export interface User {
    firstAccess: boolean;
    emailActive: boolean;
    _id: string;
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    role: string;
    createdAt: string;
}

export interface UserResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
