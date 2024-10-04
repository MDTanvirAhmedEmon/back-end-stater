import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    authController.logInUser
)

router.post('/refresh-token',
    authController.createRefreshToken
)

router.post('/change-password',
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN)
    , authController.changePassword)

router.post(
    '/forget-password',
    authController.forgetPassword
);

router.post(
    '/verify-code',
    authController.verifyCode
);

router.post(
    '/reset-password',
    authController.resetPassword
);
// change password
// forget password
// reset password




export const AuthRouter = router;