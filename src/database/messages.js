import { db }from "../database.js"

export const getAllMessagesByChatroom = async (chatroomId) => {
    const messages = await db("messages").select("*").where("chatroomId", chatroomId)
    console.log("messages by chatroomId" + messages)
    return messages
}

