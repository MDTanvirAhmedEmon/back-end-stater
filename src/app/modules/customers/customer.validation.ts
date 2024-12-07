import { Types } from "mongoose";
import { z } from "zod";

export const customerValidatedSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),

    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string"
    }).min(1, "Address is too short"),

    gender: z.enum(['male', 'female', 'others'], {
        required_error: "Gender is required",
        invalid_type_error: "Gender must be 'male', 'female', or 'others'"
    }),

    contactNo: z.string().min(5, "Contact number is too short").max(20, "Contact Number is too long"),
    profileImageUrl: z.string().url("Profile image URL must be a valid URL").optional(),
    user: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID',
    }).optional(),
})