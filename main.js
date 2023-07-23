import { app } from "./src/app.js"
import { createWebSocketServer } from "./src/websockets.js"


const port = 3000
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})


createWebSocketServer(server)