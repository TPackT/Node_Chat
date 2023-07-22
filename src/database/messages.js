import { db }from "../database.js"

export const getAllMessagesByChatroom = async (chatroomId) => {
    const messages = await db("messages").select("*").where("chatroomId", chatroomId)
    return messages
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