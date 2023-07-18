import express from "express"
import { db } from "./database.js"
import cookieParser from "cookie-parser"
import { router as chatroomsRouter } from "./routes/chatrooms.js"
import { router as usersRouter } from "./routes/users.js"
import loadUser from "./middlewares/loadUser.js"

export const app = express()
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
//middleware for form values formatting
app.use(cookieParser())

app.use(loadUser)

app.get("/", async (req, res) => {
    const messages = await db("messages").select("*")
    const chatrooms = await db("chatrooms").select("*")
    

    res.render("index", {
        messages: messages,
        chatrooms: chatrooms,
    })
})

app.use(chatroomsRouter)
app.use(usersRouter)