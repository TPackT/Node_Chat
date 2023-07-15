import express from "express"
import { db } from "./database.js"

export const app = express()
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    const messages = await db("messages").select("*")
    
    res.render("index", {
        messages: messages,
    })
})