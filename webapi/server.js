const dotenv = require("dotenv")
const app = require("./app")
dotenv.config()
const env = process.env

app.listen(3000, () => {
  console.log(`Server is running on Port:${env.SERVER_PORT}`)
})
