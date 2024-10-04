import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    authController.logInUser
)

router.post('/refresh-token',
    authController.createRefreshToken
)

router.post('/change-password', authController.changePassword)

// change password
// forget password
// reset password




export const AuthRouter = router;