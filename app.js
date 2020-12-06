require("dotenv").config()
const dbConnection = require("./src/config/dbconnection")
dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
// const routeLogin = require("./routes/loginRoutes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

app.get("/", (req, res) => {
    console.log("funciona")
    res.send("servidor conectado")
})
// app.use("/netflix", routeLogin)


module.exports = app