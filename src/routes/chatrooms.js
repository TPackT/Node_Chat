import express from "express"
import { db } from "../database.js"
import { createChatroom, getChatroomById, deleteChatroom } from "../database/chatrooms.js"
import { getAllMessagesByChatroom, getAllMessagesWithUsernames } from "../database/messages.js"

export const router = express.Router()

router.post("/create-chatroom", async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    //const authorId = req.body.user.id

    
    await createChatroom(name, password)
    res.redirect("/")
})

router.get("/get-chatroom/:id", async (req, res) => {
    const chatroomId = Number(req.params.id)
    const chatroom = await getChatroomById(chatroomId)
    const messages = await getAllMessagesByChatroom(chatroomId)
    const messagesWithUsernames = await getAllMessagesWithUsernames(messages)
    
    res.render("chatroom", {
        chatroom: chatroom, 
        messages: messagesWithUsernames,
    })
})

router.get("/list-chatrooms", async (req, res) => {

})

/*
router.post("/delete-chatroom/:id", async (req, res) => {
    const idToDelete = Number(req.params.id)
    deleteChatroom(idToDelete)
    res.redirect("/")
})
*/
router.get("/delete-chatroom/:id", async (req, res) => {
    const idToDelete = Number(req.params.id)

    const chatroom = await db("chatrooms").where("id", idToDelete).first()

    if(!chatroom) {
      console.log("Chatroom not found");
      return res.redirect("back");
    }
    
    await deleteChatroom(idToDelete)
    
    res.redirect("/")
})



router.post("/update-chatroom", async (req, res) => {

})