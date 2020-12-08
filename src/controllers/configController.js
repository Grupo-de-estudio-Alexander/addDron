const path = require('path')
const fs = require('fs')

class ControllerConfiguracion {
    // API para modificar los parametros de la configuración inicial
    modificarParametros = async(req, res) => {
        try {
            // Leer archivo con los parametros iniciales de la aplicación de entregas
            const initialConfigPath = path.join(__dirname,'../data/initial_parameters.json')
            console.log(initialConfigPath)
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
                console.log('Punto incial actualizado a',req.body.puntoInicial)
            }
            //actualizar la orientación inicial de los drones
            if (req.body.orientacion) {
                initialConfig.orientacionInicial = req.body.orientacion
                console.log('Orientación inicial actualizado a',req.body.orientacion)
            }
            //actualizar la capacidad de entrega de los drones
            if (req.body.capacidad) {
                initialConfig.capacidadDrones = req.body.capacidad
                console.log('capacidad actualizado a',req.body.capacidad)
            }
            
            //Guardar nueva configuración en el archivo json
            fs.writeFileSync(initialConfigPath, JSON.stringify(initialConfig))

            //responder a frontend
            return res.send({ resultado: 'Actualización exitosa' })

        } catch(error) {
            console.log(error.message)
            res.status(401).json(error)
        }
    }
}

const controllerConfiguracion = new ControllerConfiguracion()
module.exports = controllerConfiguracion