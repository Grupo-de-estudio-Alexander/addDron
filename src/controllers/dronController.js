const modelDron = require("../model/dronModel")



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

}

const controllerDron = new ControllerDron()

module.exports = controllerDron
