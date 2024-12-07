
export type IAdmin = {
    firstName: string
    lastName: string
    email: string
    contactNo: string
    profileImageUrl?: string
    password: string
    role: "admin"
    status: 'in-progress' | 'blocked';
}