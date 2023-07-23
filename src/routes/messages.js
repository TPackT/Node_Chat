import express from "express"
import { createMessage, deleteMessageById, getMessageById } from "../database/messages.js"
import { sendMessagesToAllConnections } from "../websockets.js"

export const router = express.Router()

router.post("/create-message", async (req, res) => {
    const authorId = res.locals.user?.id
    const chatroomId = req.body.chatroomId
    
    if (!authorId) {
        return res.status(400).render("400", {
            error: "You need to be logged in to send a message"
        })
    }

    const newMsg = {
        text: req.body.text,
        chatroomId: chatroomId,
        authorId: authorId
    }
    await createMessage(newMsg)

    sendMessagesToAllConnections(chatroomId)

    res.redirect("back")
})

router.get("/delete-message/:id", async (req, res) => {
    const idToDelete = req.params.id
    const userId = res.locals.user.id

    const messageToDelete = await getMessageById(idToDelete)
    const chatroomId = messageToDelete.chatroomId
    
    if (messageToDelete && messageToDelete.authorId === userId){
        await deleteMessageById(idToDelete)
    } else {
        console.log("A message can only be deleted by its author")
        return res.redirect("back")
    }

    sendMessagesToAllConnections(chatroomId)

    res.redirect("back")
})