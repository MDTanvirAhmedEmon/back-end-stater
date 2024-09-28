
export type IUser = {
    email: string;
    password: string;
    role: "customer" | "admin";
    status: 'in-progress' | 'blocked';
}