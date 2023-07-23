import { WebSocketServer } from "ws"
import ejs from "ejs"
import { getAllMessagesByChatroom, getAllMessagesWithUsernames } from "./database/messages.js"
import { getUserByToken } from "./database/users.js"

/** @type {Set<Websocket>} */
const connections = new Set()

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server })

  wss.on("connection", async (ws, req) => {
    connections.add(ws)
    console.log("New connection", connections.size)
    const token = req.headers.cookie.slice(6)
    try {
      const user = await getUserByToken(token)
      if (user) {
        ws.user = user
      } else {
        console.error("User not found")
      }
    } catch (e) {
      console.error("Error retrieving user information")
    }


    ws.on("close", () => {
      connections.delete(ws)
      console.log("Closed connection", connections.size)
    })
  })
}

export const sendMessagesToAllConnections = async (chatroomId) => {
  const messages = await getAllMessagesByChatroom(chatroomId)
  const messagesWithUsernames = await getAllMessagesWithUsernames(messages)

  for (const connection of connections) {
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
      
      console.log("Sent to all")
      const json = JSON.stringify(message)
      connection.send(json)
    }
  }
}
