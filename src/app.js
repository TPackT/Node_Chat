import express from "express"
import { db } from "./database.js"
import { router as chatroomsRouter } from "./routes/chatrooms.js"


export const app = express()
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
//middleware for form values formatting

app.get("/", async (req, res) => {
    const messages = await db("messages").select("*")
    const chatrooms = await db("chatrooms").select("*")
    

    res.render("index", {
        messages: messages,
        chatrooms: chatrooms,
    })
})

app.use(chatroomsRouter)