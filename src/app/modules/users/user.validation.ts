import { z } from 'zod';

export const userValidationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(['customer', 'admin']).optional(),
    status: z.enum(['in-progress', 'blocked']).optional(),
});
