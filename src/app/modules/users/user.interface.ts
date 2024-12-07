
export type IUser = {
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role: "customer";
    status: 'in-progress' | 'blocked';
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}