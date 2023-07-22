import express from "express"
import { createMessage } from "../database/messages.js"

export const router = express.Router()

router.post("/create-message", async (req, res) => {
    const newMsg = {
        text: req.body.text,
        chatroomId: req.body.chatroomId,
        authorId: res.locals.user.id
    }
    await createMessage(newMsg)

    res.redirect("back")
})