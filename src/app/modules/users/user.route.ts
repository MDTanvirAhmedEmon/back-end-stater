import { Router } from "express";
import { customerController } from "./user.controller";

const router = Router();

router.use('/create-customer', customerController.createCustomer)

export const UserRouter = router;