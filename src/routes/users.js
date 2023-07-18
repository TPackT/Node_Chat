import express from "express"
import { createUser, getUserByPassword } from "../database/users.js"

export const router = express.Router()


router.get("/register", async (req, res) => {
    res.render("register")
})

router.post("/register", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
    const user = await createUser(username, password)
    res.cookie("token", user.token)
    } catch (e) {
        console.error(e)
    }

    res.redirect("/")
})

router.get("/login", async (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => { 
    const username = req.body.username
    const password = req.body.password
    try {
    const user = await getUserByPassword(username, password)
    res.cookie("token", user.token)
    } catch (e) {
        console.error(e)
    }
    
    res.redirect("/")
})

router.get("/logout", async (req, res) => {

    res.cookie("token", "")
    
    res.redirect("/")
})