import express from "express"
import ejs from "ejs"

const app = express()
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    res.render("index")
})


const port = 3000
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})