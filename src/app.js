require("dotenv").config()
const dbConnection = require("./config/dbconnection")
const path = require('path')
const fs = require('fs')

// dbConnection()
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

// para renderizar los archivos html
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);

//Directorio public
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.get("/", (req, res) => {
    console.log("funciona")
    console.log(publicDirectory)
    res.send("servidor conectado")
})
// app.use("/netflix", routeLogin)



//app.com/parametros
app.get('/parametros', (req, res) => {
    // res.send('Que pasa')
    res.render('parametros.html')
})

app.use(express.json()) // for parsing application/json

//app.com/config API para configuración de la aplicación
app.post('/config', function (req, res) {
    // Leer archivo con los parametros iniciales de la aplicación de entregas
    const initialConfigPath = path.join(__dirname,'./data/initial_parameters.json')
    const fileContents = fs.readFileSync(initialConfigPath, 'utf8')
    const initialConfig = JSON.parse(fileContents)

    //actualizar el tamaño de la grilla
    if (req.body.grilla) {
        initialConfig.tamanoGrilla = req.body.grilla
        console.log('Tamaño de la grilla actualizado a',req.body.grilla)
    }
    //actualizar el punto de partida
    if (req.body.puntoInicial) {
        initialConfig.posicionInicial = req.body.puntoInicial
        console.log('Tamaño de la grilla actualizado a',req.body.puntoInicial)
    }
    //actualizar la orientación inicial de los drones
    if (req.body.orientacion) {
        initialConfig.orientacionInicial = req.body.orientacion
        console.log('Tamaño de la grilla actualizado a',req.body.orientacion)
    }
    //actualizar la capacidad de entrega de los drones
    if (req.body.capacidad) {
        initialConfig.capacidadDrones = req.body.capacidad
        console.log('Tamaño de la grilla actualizado a',req.body.capacidad)
    }
    
    //Guardar nueva configuración en el archivo json
    fs.writeFileSync(initialConfigPath, JSON.stringify(initialConfig))

    //responder a frontend
    return res.send({ resultado: 'Actualización exitosa' })
  })


module.exports = app