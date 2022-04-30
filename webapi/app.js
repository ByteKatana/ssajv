const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const path = require("path")

//Base Configuration
dotenv.config()
const env = process.env
const app = express()
app.use(helmet())

var corsOptions = {
  origin: `${env.WEBUI_PROTOCOL}://${env.WEBUI_URI}:${env.WEBUI_PORT}`,
  optionsSuccessStatus: 200
}

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "public")))

//Routes
const apiRouter = require("./routes/api")
const { request } = require("express")
app.use("/", cors(corsOptions), apiRouter)

/* app.listen(3000, () => {
  console.log(`Server is running on Port:${env.SERVER_PORT}`)
}) */

module.exports = app
