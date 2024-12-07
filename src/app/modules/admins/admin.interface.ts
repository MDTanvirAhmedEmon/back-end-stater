
export type IAdmin = {
    firstName: string
    lastName: string
    email: string
    contactNo: string
    profileImageUrl?: string
    password: string
    role: "admin"
    chatId: string
    status: 'in-progress' | 'blocked';
}