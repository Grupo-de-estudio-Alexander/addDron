const { model } = require("mongoose")
const modelDron = require("../model/dronModel")
const path = require('path')
const fs = require('fs')
const creadorReporte = require('../services/crearReporte')

const deleteFile = require("../services/deleteFile")

class ControllerDron {
    /// API Crea un Dron    //////////
    createDron = async(req, res) => {
        try {
            const dron = new modelDron(req.body)
            const saveDron = await dron.save()
            res.status(200).json(saveDron)

        } catch (error) {
            console.log(error.message)
            res.status(401).json(error)
        }
    }

    /////   Busca Todos los drones y los retorna /////
    AllDron = async(req, res) => {
        try {
            const drones = await modelDron.find({});
            res.status(200).json(drones)

        } catch (error) {
            console.log(error);
        }
    };
    //API LOGICA DE LA UBICACION DEL DRON 
    UbicacionDron = async(req, res) => {

        try {
            // Leer archivo con los parametros iniciales de la aplicación de entregas
            const initialConfigPath = path.join(__dirname, '../data/initial_parameters.json')
            console.log(initialConfigPath)
            const fileContents = fs.readFileSync(initialConfigPath, 'utf8')
            const initialConfig = JSON.parse(fileContents)

            const [id] = await modelDron.find({ id: req.body.droneId })
            console.log(req.body)
            const palabra = req.body.direccion
            const array = palabra.split("")
            let ubicacion = id.posicionInicial
            let estado = id.orientacion
            let tamañoGrilla = initialConfig.tamanoGrilla
            let capacidad = id.capacidad
            let historial = id.historial
            let envios = id.numeroDeEnvios + 1

            // 0 = NORTE, 1 ORIENTE, 2 SUR 3 OCCIDENTE
            array.forEach(letra => {
                if (letra === "A") {
                    if (estado == 0) ubicacion[1] += 1;
                    if (estado == 1) ubicacion[0] += 1;
                    if (estado == 2) ubicacion[1] -= 1;
                    if (estado == 3) ubicacion[0] -= 1;

                } else {
                    if (letra === 'D') {
                        if (estado === 0) estado = 1;
                        else if (estado == 1) estado = 2;
                        else if (estado == 2) estado = 3;
                        else if (estado == 3) estado = 0;
                    } else {
                        if (letra === 'I') {
                            if (estado === 0) estado = 3;
                            else if (estado == 1) estado = 0;
                            else if (estado == 2) estado = 1;
                            else if (estado == 3) estado = 2;
                        }
                    }
                }
            });
            if (ubicacion[0] > tamañoGrilla || ubicacion[0] < 0) res.status(400).json("salio de la grilla")
            if (ubicacion[1] > tamañoGrilla || ubicacion[1] < 0) res.status(400).json("salio de la grilla")
            id.historial.push(id.posicionInicial)
            id.posicionInicial = ubicacion
            await id.save()
            console.log(ubicacion)
            if (capacidad > 0) {
                capacidad -= 1
                await id.updateOne({ posicionInicial: ubicacion, capacidad: capacidad, orientacion: estado, numeroDeEnvios: envios })

            } else {
                await id.updateOne({ posicionInicial: [0, 0], capacidad: 3, orientacion: 0 })

            }
            // crear reporte
            creadorReporte(envios, ubicacion, req.body.droneId)

            if (req.body.type) {
                return id
            }
            res.status(200).json(id)


        } catch (error) {
            console.log(error);
        }


    }
    deleteAllDron = async(req, res) => {
        try {
            const datos = await modelDron.deleteMany({});
            console.log(datos)
            res.status(201).json("delete DB")

        } catch (error) {
            console.log(error);
        }


    }

deleteAllFiles = async(req, res) =>{
    try{
        deleteFile()
        res.status(200).json("delete file") 
    }catch(error){
        console.log(error);
    }
}
}

const controllerDron = new ControllerDron()


module.exports = controllerDron