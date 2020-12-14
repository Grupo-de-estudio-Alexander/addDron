require("dotenv").config()
const dbConnection = require("./src/config/dbconnection")

dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const routeDrones = require("./src/routes/dronRoute")

const app = express()

app.use(express.json()) // for parsing application/json

app.use(morgan("dev"))
app.use(helmet())
app.use(cors())


app.get("/", (req, res) => {
    console.log("funciona")
    res.status(201).json("servidor conectado")
})
app.use("/drones", routeDrones)

// api de prueba para devolver zip
const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

app.get('/reporte', (req, res) => {
    const fileName = './reporte.zip'
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
})


// api para recibir reportes del frontend
const path = require('path')
const multer = require('multer') // v1.0.5
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname)
    }
  })
const upload = multer({ storage: storage }) // for parsing multipart/form-data
app.post('/input',upload.single('file'), (req, res) => {
    console.log('post')
    res.status(200)
})


module.exports = app