import express from "express"
import { db } from "./database.js"
import cookieParser from "cookie-parser"
import { router as chatroomsRouter } from "./routes/chatrooms.js"
import { router as usersRouter } from "./routes/users.js"
import { router as messagesRouter } from "./routes/messages.js"
import loadUser from "./middlewares/loadUser.js"
import requireAuth from "./middlewares/requireAuth.js"

export const app = express()
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
//middleware for form values formatting
app.use(cookieParser())

app.use(loadUser)

app.get("/", requireAuth, async (req, res) => {
    const messages = await db("messages").select("*")
    const chatrooms = await db("chatrooms").select("*")
    

    res.render("index", {
        messages: messages,
        chatrooms: chatrooms,
    })
})

app.use(usersRouter)
app.use(chatroomsRouter)
app.use(messagesRouter)

app.use((req, res) => {
    res.status(404).render('404')
  })