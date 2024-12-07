import { Router } from "express";
import { chatsController } from "./chats.controller";


const router = Router();

router.get('/user-chats', chatsController.getUserChats)
router.get('/admin-chats', chatsController.getAdminChats)

export const ChatsRouter = router