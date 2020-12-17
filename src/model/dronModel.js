const { Schema, model } = require("mongoose")

const dronSchema = new Schema({
    id: {
        type: Number,
    },
    posicionInicial: [{
        type: Number,
    }],
    orientacion: {
        type: Number
    },
    historial: [{
        type: Array,
    }],
    capacidad: {
        type: Number,
    },
    grilla: {
        type: Number
    },
    numeroDeEnvios:{
        type:Number,
        default: 0
    }
}, {
    timestamps: true
})

//// Ejemplo de funcion.... //////
dronSchema.methods.encryptIp = async function() {
    this.ip = await bcrypt.hash(this.ip, 8)
}


const dron = new model("drones", dronSchema)
module.exports = dron