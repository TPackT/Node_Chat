import { db }from "../database.js"

export const getAllMessagesByChatroom = async (chatroomId) => {
    const messages = await db("messages").select("*").where("chatroomId", chatroomId)
    return messages
}

export const createMessage = async (message) => {
    const newMessage = await db("messages").insert(message)
    return newMessage
}

export const deleteMessageById = async () => {
    
}