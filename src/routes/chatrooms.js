import express from "express"
import { db } from "../database.js"
import { createChatroom, getChatroomById, deleteChatroom, verifyChatroomPassword } from "../database/chatrooms.js"
import { getAllMessagesByChatroom, getAllMessagesWithUsernames, getMessageCountByChatroomId } from "../database/messages.js"

export const router = express.Router()

router.post("/create-chatroom", async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const authorId = res.locals.user.id

    await createChatroom(name, password, authorId)
    res.redirect("/")
})

router.get("/chatroom/:id", async (req, res) => {
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
    const chatroom = await getChatroomById(idToDelete)
    
    if(!chatroom) {
        console.log("Chatroom not found");
        return res.redirect("back");
    }
    const userId = res.locals.user.id
    const chatroomAuthorId = chatroom.authorId

    if (chatroomAuthorId !== userId) {
        return res.status(400).render("400", {
            error: "Chatroom can only be deleted by its creator"
        })   
    }

    const messageCount = await getMessageCountByChatroomId(idToDelete)
    const count = Number(messageCount.count)
    
    if (count > 0) {
        return res.render("delete-chatroom", {
            chatroomId: idToDelete
        })
    }
    await deleteChatroom(idToDelete)
    
    res.redirect("/")
    
})

router.post("/delete-chatroom/:id/confirmed", async (req, res) => {
    const idToDelete = Number(req.params.id)
    const chatroom = await getChatroomById(idToDelete)
    
    if(!chatroom) {
        console.log("Chatroom not found");
        return res.redirect("back");
    }
    const userId = res.locals.user.id
    const chatroomAuthorId = chatroom.authorId

    if (chatroomAuthorId !== userId) {
        return res.status(400).render("400", {
            error: "Chatroom can only be deleted by its creator"
        })   
    }

    await deleteChatroom(idToDelete)
    
    res.redirect("/")
    
})




router.post("/update-chatroom", async (req, res) => {

})


router.get("/join-chatroom/:id", async (req, res) => {
    const chatroomId = req.params.id

    const chatroom = await getChatroomById(chatroomId)

    if (!chatroom) {
      return res.redirect("/")
    }

    res.render("join-chatroom", { chatroom })
})

router.post("/join-chatroom/:id", async (req, res) => {
    const chatroomId = req.params.id
    const password = req.body.password
  
    const chatroom = await getChatroomById(chatroomId)

    if(!chatroom) {
      return res.redirect("/")
    }

    try {
        await verifyChatroomPassword(chatroom, password)
        res.redirect(`/chatroom/${chatroomId}`)
    } catch (e) {
        return res.redirect(`/join-chatroom/${chatroomId}`)
    }
  })