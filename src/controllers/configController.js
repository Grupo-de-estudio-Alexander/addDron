const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

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
                myEmitter.emit('Parametro actualizado', 'Tamaño grilla', initialConfig.tamanoGrilla);
            }
            //actualizar el punto de partida
            if (req.body.posicionInicial) {
                initialConfig.posicionInicial = req.body.posicionInicial
                myEmitter.emit('Parametro actualizado', 'Posición inicial', initialConfig.posicionInicial);
            }
            //actualizar la orientación inicial de los drones
            if (req.body.orientacionInicial) {
                initialConfig.orientacionInicial = req.body.orientacionInicial
                myEmitter.emit('Parametro actualizado', 'Orientación inicial', initialConfig.orientacionInicial);
            }
            //actualizar la capacidad de entrega de los drones
            if (req.body.capacidadDrones) {
                initialConfig.capacidadDrones = req.body.capacidadDrones
                myEmitter.emit('Parametro actualizado', 'Capacidad drones', initialConfig.capacidadDrones);
            }
            //actualizar la cantidad de drones
            if (req.body.cantidadDrones) {
                initialConfig.cantidadDrones = req.body.cantidadDrones
                myEmitter.emit('Parametro actualizado', 'Cantidad drones', initialConfig.cantidadDrones);
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

myEmitter.on('Parametro actualizado', (parametro, valor) => {
    console.log(`El parametros ${parametro} se ha actualizado con el valor: ${valor}`);
  });

const controllerConfiguracion = new ControllerConfiguracion()
module.exports = controllerConfiguracion