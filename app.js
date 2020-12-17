require("dotenv").config()
const dbConnection = require("./src/config/dbconnection")

dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const routeDrones = require("./src/routes/dronRoute")
const dronControlador = require('./src/controllers/dronController')

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

const fs = require('fs')
const path = require('path')
const generarZip = require('./src/services/creadorZip.js')
// API para generar el reporte zip con la ubicación final de los drones
app.get('/reporte', async (req, res) => {
    
    // Leer los archivos de reportes que se tienen
    const reportesDirectory = './src/reportes'
   
    fs.readdir(reportesDirectory, async function (err, files) {
      if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
      }
      console.log('files: ', files)
      reportes = files.map(archivo => path.join(reportesDirectory, archivo))
      console.log('files: ', reportes)

      // Generar zip con los reportes
      await generarZip(reportes)

      // enviar archivo zip generado
      const reporteZip = './src/reporte.zip'

      // res.status(200).sendFile(reporteZip, options, function (err) {
      //   if (err) {
      //     next(err)
      //   } else {
      //     console.log('Sent:', reporteZip)
      //   }
      // })
      setTimeout(() => {
        res.status(200)
        .sendFile(reporteZip, options, function (err) {
          if (err) {
            next(err)
          } else {
            console.log('Sent:', reporteZip)
          }
        })
      }, 2000)
    }) 
})


// api para recibir reportes del frontend

const multer = require('multer') // modulo para recibir archivos
var storage = multer.memoryStorage() // metodo para leer el contenido del archivo
const upload = multer({ storage: storage }) // setting para poder leer el contenido

app.post('/input',upload.any(), async (req, res) => {
  
  // se puede acceder a los archivos con req.files

  // iterar por cada archivo subido
  for (let i=0; i<req.files.length; i++) {

    const tempFile = req.files[i]
    
    // información del archivo
    // console.log('files:',req.files) // ver todas las propiedades del archivo
    console.log('filaname:', tempFile.originalname) // ver el nombre del archivo
    // console.log('size', tempFile.size) // ver tamaño del archivo

    // determinar numero del dron
    const regex1 = /in([0-9]+).txt/i
    const droneId = tempFile.originalname.match(regex1)[1]
    
    // Leer el contenido del archivo
    const regex2 = /\r\n/ // regex porque el contenido llega así: AAA\r\nAIAA\r\nADAAI
    const direcciones = tempFile.buffer.toString().split(regex2)

    // Función a realizar por cada dirección recibida
    for (let j=0; j<direcciones.length; j++) {
      console.log('droneId:', droneId, 'direccion:',direcciones[j])
      await dronControlador.UbicacionDron({
        body: {
          droneId,
          direccion: direcciones[j],
          type: 'input'
        }
      })
    }
    // direcciones.forEach( direccion => {
      
      // AGREGAR FUNCION PARA CALCULAR LA NUEVA POSICION DEL DRON
      // await dronControlador.UbicacionDron({
      //   body: {
      //     droneId,
      //     direccion,
      //     type: 'input'
      //   }
      // })
      
      // setTimeout( () => {
      //   }, 3000)
    // });
  }
  console.log('api terminadaa')
  return res.status(200).send('termino')
})


module.exports = app