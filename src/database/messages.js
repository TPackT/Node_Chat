import { db }from "../database.js"
import { getUserById } from "./users.js"

export const getAllMessagesByChatroom = async (chatroomId) => {
    const messages = await db("messages").select("*").where("chatroomId", chatroomId)
    return messages
}

export const getAllMessagesWithUsernames = async (messages) => {
    const messagesWithUsernames = await Promise.all(
        messages.map(async (msg) => {
            const user = await getUserById(msg.authorId)
            //spreading msg object - new username property from user.username if user is truthy.. Unknown User if not
            return { ...msg, author: user ? user.username : "Unknown User" }
          })
        )
        
    return messagesWithUsernames
}

export const createMessage = async (message) => {
    try {
    const newMessage = await db("messages").insert(message)
    
    return newMessage
    } catch(e) {
        console.error(e)
    }
}

export const deleteMessageById = async (messageId) => {
    try {
        await db("messages").delete().where("id", messageId)
    } catch (e) {
        console.error(e)
    }
}

export const getMessageById = async (messageId) => {
    try {
        const message = await db("messages").where("id", messageId).first()
        return message
    } catch (e) {
        console.error(e)
    }
}