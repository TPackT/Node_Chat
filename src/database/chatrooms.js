import { db } from "../database.js"
import crypto from "crypto"

export const createChatroom = async (name, password) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")

    const [chatroom] = await db("chatrooms").insert({ name, salt, hash}).returning('*')

    return chatroom
    }