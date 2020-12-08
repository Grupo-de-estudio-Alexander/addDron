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
            if (req.body.tamanoGrilla) {
                initialConfig.tamanoGrilla = req.body.tamanoGrilla
                console.log('Tamaño de la grilla actualizado a',req.body.tamanoGrilla)
            }
            //actualizar el punto de partida
            if (req.body.posicionInicial) {
                initialConfig.posicionInicial = req.body.posicionInicial
                console.log('Punto incial actualizado a',req.body.posicionInicial)
            }
            //actualizar la orientación inicial de los drones
            if (req.body.orientacionInicial) {
                initialConfig.orientacionInicial = req.body.orientacionInicial
                console.log('Orientación inicial actualizado a',req.body.orientacionInicial)
            }
            //actualizar la capacidad de entrega de los drones
            if (req.body.capacidadDrones) {
                initialConfig.capacidadDrones = req.body.capacidadDrones
                console.log('capacidad actualizado a',req.body.capacidadDrones)
            }
            //actualizar la cantidad de drones
            if (req.body.cantidadDrones) {
                initialConfig.cantidadDrones = req.body.cantidadDrones
                console.log('capacidad actualizado a',req.body.cantidadDrones)
            }

            //Guardar nueva configuración en el archivo json
            fs.writeFileSync(initialConfigPath, JSON.stringify(initialConfig))

            //responder a frontend
            return res.send({ 
                resultado: 'Actualización exitosa',
                parametros: initialConfig
            })

        } catch(error) {
            console.log(error.message)
            res.status(401).json(error)
        }
    }
}

const controllerConfiguracion = new ControllerConfiguracion()
module.exports = controllerConfiguracion