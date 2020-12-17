const router = require("express").Router()
const dronControllers = require("../controllers/dronController")
const configControllers = require("../controllers/configController") 
router.route("/").post(dronControllers.createDron)
router.route("/").get(dronControllers.AllDron)
router.route("/ubicacion").post(dronControllers.UbicacionDron)
// ruta para cambiar los parametros de la configuración inicial
router.route("/config").post(configControllers.modificarParametros)
router.route("/").delete(dronControllers.deleteAllDron)
router.route("/file").get(dronControllers.deleteAllFiles)
module.exports = router