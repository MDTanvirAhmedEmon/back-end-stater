import { z } from 'zod';

export const adminValidationSchema = z.object({
    firstName: z.string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
    }),
    lastName: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email("Invalid email address"),
    contactNo: z.string({
        required_error: "Contact number is required",
        invalid_type_error: "Contact number must be a string",
    }).optional(),
    profileImageUrl: z.string().url("Invalid URL format").optional(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(8, "Password must be at least 8 characters long"),
    role: z.string({
        required_error: "Role must be 'admin'",
        invalid_type_error: "Role must be a string with value 'admin'",
    }).optional(),
    chatId: z.string({
        required_error: "Chat ID is required",
        invalid_type_error: "Chat ID must be a string",
    }).optional(),
    status: z.enum(["in-progress", "blocked"], {
        required_error: "Status must be 'in-progress' or 'blocked'",
    }).optional(),
});

export const adminValidation = {
    adminValidationSchema
}