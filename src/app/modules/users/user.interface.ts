
export type IUser = {
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role: "customer" | "admin";
    status: 'in-progress' | 'blocked';
}