import express from "express"

export const app = express()
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    res.render("index")
})