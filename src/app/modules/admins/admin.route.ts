import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const router = Router();

router.post('/create', validateRequest(adminValidation.adminValidationSchema), adminController.createAdmin)

export const AdminRouter = router