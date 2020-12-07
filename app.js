require("dotenv").config()
const dbConnection = require("./src/config/dbconnection")
dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const routeDrones = require("./src/routes/dronRoute")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

app.get("/", (req, res) => {
    console.log("funciona")
    res.status(201).json("servidor conectado")
})
app.use("/drones", routeDrones)


module.exports = app