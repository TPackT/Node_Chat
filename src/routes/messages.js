import express from "express"
import { createMessage, deleteMessageById, getMessageById } from "../database/messages.js"

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

router.get("/delete-message/:id", async (req, res) => {
    const idToDelete = req.params.id
    const userId = res.locals.user.id
    
    try {
        const message = await getMessageById(idToDelete)
        
        if (!message) {
            return res.status(400).render("400", {
                error: "Message does not exist"
            })
        }

        if (message.authorId === userId) {
            await deleteMessageById(idToDelete)
            res.redirect("back")
        } else {
            console.error("User not authorized to delete this message")
            return res.status(400).render("400", {
                error: "User not authorized to delete this message"
            })
        }
    } catch (e) {
        return res.status(500).render("500", {
            error: "An error occurred while deleting the message"
        })
        //return res.status(500).json({ error: "An error occurred while deleting the message" })
    }
    
})