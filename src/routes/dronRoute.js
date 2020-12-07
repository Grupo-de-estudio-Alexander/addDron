const router = require("express").Router()
const dronControllers = require("../controllers/dronController")

router.route("/").post(dronControllers.createDron)
router.route("/").get(dronControllers.AllDron)

module.exports = router