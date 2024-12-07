import { Router } from "express";
import { chatsController } from "./chats.controller";


const router = Router();

router.get('/user-chats', chatsController.getUserChats)
router.get('/admin-chats')

export const ChatsRouter = router