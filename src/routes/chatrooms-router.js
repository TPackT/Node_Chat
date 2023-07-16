import express from "express"
import { db } from "../database.js"
import { createChatroom } from "../database/chatrooms-db.js"


export const router = express.Router()

router.post("/create-chatroom", async (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const password = req.body.password
    
    await createChatroom(name, password)
    res.redirect("/")
})

router.get("/get-chatroom", async (req, res) => {

})

router.get("/list-chatrooms", async (req, res) => {

})


router.post("/delete-chatroom", async (req, res) => {

})
router.post("/update-chatroom", async (req, res) => {

})