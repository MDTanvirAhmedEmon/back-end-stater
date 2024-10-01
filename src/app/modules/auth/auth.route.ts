import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    authController.logInUser
)


export const AuthRouter = router;