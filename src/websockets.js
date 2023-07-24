import { WebSocketServer } from "ws"
import ejs from "ejs"
import { getAllMessagesByChatroom, getAllMessagesWithUsernames } from "./database/messages.js"
import { getUserByToken } from "./database/users.js"

/** @type {Map<string, Set<Websocket>>} */
const connectionsByChatroom = new Map()

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server })

  wss.on("connection", async (ws, req) => {
    
    const token = req.headers.cookie.slice(6)
    try {
      const user = await getUserByToken(token)
      if (user) {
        ws.user = user
        const chatroomId = req.url.substring(1)

        if(!connectionsByChatroom.has(chatroomId)) {
          connectionsByChatroom.set(chatroomId, new Set())
        }

        connectionsByChatroom.get(chatroomId).add(ws)
        console.log(`User ${user.id} connected to chatroom ${chatroomId}`)
        console.log("New connection", connectionsByChatroom.size)

      } else {
        console.error("User not found")
        ws.close()
      }
    } catch (e) {
      console.error("Error retrieving user information")
    }


    ws.on("close", () => {
      const { chatroomId } = ws
      if (chatroomId && connectionsByChatroom.has(chatroomId)) {
        // Remove the WebSocket connection from the chatroom's set
        connectionsByChatroom.get(chatroomId).delete(ws);
        console.log(`User ${ws.user.id} disconnected from chatroom ${chatroomId}`)
      }
    })
  })
}

export const sendMessagesToAllConnections = async (chatroomId) => {
  const messages = await getAllMessagesByChatroom(chatroomId)
  const messagesWithUsernames = await getAllMessagesWithUsernames(messages)


  const chatroomConnections = connectionsByChatroom.get(chatroomId)
  if  (chatroomConnections) {
  for (const connection of chatroomConnections) {
    const {user} = connection
    if (user) {
      const userId = user.id
      
      const html = await ejs.renderFile("views/_messages.ejs", {
        messages: messagesWithUsernames,
        userId: userId
      })

      const message = {
        type: "messages",
        html: html
      }
      
      const json = JSON.stringify(message)
      connection.send(json)
      console.log(`Sent message updates to user ${userId} in chatroom ${chatroomId}`)
      }
    }
  } else {
    console.log(`No WebSocket connections found for chatroom ${chatroomId}`)
  }
}
