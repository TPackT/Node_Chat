import { db }from "../database.js"

export const getAllMessagesByChatroom = async (chatroomId) => {
    const messages = await db("messages").select("*").where("chatroomId", chatroomId)

    return messages
}
