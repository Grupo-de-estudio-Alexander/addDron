const router = require("express").Router()
const dronControllers = require("../controllers/dronController")
const configControllers = require("../controllers/configController")

router.route("/").post(dronControllers.createDron)
router.route("/").get(dronControllers.AllDron)
// ruta para cambiar los parametros de la configuración inicial
router.route("/config").post(configControllers.modificarParametros)

module.exports = router