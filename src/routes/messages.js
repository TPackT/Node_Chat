import express from "express"
import { createMessage, deleteMessageById, getMessageById, updateMessageLikeStatus } from "../database/messages.js"
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


router.get("/like-message/:id", async (req, res, next) => {
    const idToLike = Number(req.params.id)
    const msgToLike = await getMessageById(idToLike)

    const chatroomId = msgToLike.chatroomId


    if (!msgToLike) {
        return next()
    }

    const userId = res.locals.user.id
    
    const likeList = JSON.parse(msgToLike.likeList); // parse the likeList as an array

    const isLiked = likeList.includes(userId)

    const updatedLikeValue = !isLiked
    const updatedLikeList = updatedLikeValue
        ? [...likeList, userId] // add user to array
        : likeList.filter((id) => id !== userId) // remove user from array

    const updatedLikeCount = updatedLikeList.length

    console.log(updatedLikeList)
    console.log(updatedLikeCount)

    await updateMessageLikeStatus(idToLike, updatedLikeList, updatedLikeCount)

    sendMessagesToAllConnections(chatroomId)
    
    res.redirect("back")
  })