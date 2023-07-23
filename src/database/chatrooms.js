import { db } from "../database.js"
import crypto from "crypto"

export const createChatroom = async (name, password, authorId) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")

    const [chatroom] = await db("chatrooms").insert({ name, salt, hash, authorId}).returning('*')

    return chatroom
    }

export const deleteChatroom = async(chatroomId) => {
    try {
        await db("chatrooms").delete().where("id", chatroomId)
    } catch (e) {
        console.error(e)
    }
}

export const getChatroomById = async (chatroomId) => {
    const chatroom = await db("chatrooms").where("id", chatroomId).first()
    return chatroom 
}

export const verifyChatroomPassword = async (chatroom, password) => {
    const { salt, hash } = chatroom
    const enteredHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")
    //incorrect password
    if (hash !== enteredHash) {
      console.error(e)
    }
}