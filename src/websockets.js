import { WebSocketServer } from "ws"
import ejs from "ejs"
import { getAllMessagesByChatroom, getAllMessagesWithUsernames } from "./database/messages.js"

/** @type {Set<Websocket>} */
const connections = new Set()

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server })
  wss.on("connection", (ws) => {
    connections.add(ws)
    console.log("New connection", connections.size)

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
    const html = await ejs.renderFile("views/_messages.ejs", {
      messages: messagesWithUsernames,
    })

    const message = {
      type: "messages",
      html: html,
    }

    const json = JSON.stringify(message)
    connection.send(json)
  }
}
