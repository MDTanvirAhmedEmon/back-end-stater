import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.post('/create', adminController.createAdmin)

export const AdminRouter = router