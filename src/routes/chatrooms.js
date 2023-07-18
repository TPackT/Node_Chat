import express from "express"
import { db } from "../database.js"
import { createChatroom } from "../database/chatrooms.js"
import { getAllMessagesByChatroom } from "../database/messages.js"

export const router = express.Router()

router.post("/create-chatroom", async (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const password = req.body.password
    //const authorId = req.body.user.id

    
    await createChatroom(name, password)
    res.redirect("/")
})

router.get("/get-chatroom/:id", async (req, res) => {
    const chatroomId = Number(req.params.id)
    const chatroom = await db("chatrooms").where("id", chatroomId).first()
    const messages = await getAllMessagesByChatroom(chatroomId)

    res.render("chatroom", {
        chatroom: chatroom, 
        messages: messages,
    })
})

router.get("/list-chatrooms", async (req, res) => {

})


router.post("/delete-chatroom", async (req, res) => {

})
router.post("/update-chatroom", async (req, res) => {

})