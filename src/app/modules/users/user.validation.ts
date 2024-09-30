import { z } from 'zod';

export const userValidationSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email("Invalid email address"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).min(8, "Password must be at least 8 characters long"),
    role: z.enum(['customer', 'admin']).optional(), // role validation is not required because role will not send from client
    status: z.enum(['in-progress', 'blocked']).optional(),
});
