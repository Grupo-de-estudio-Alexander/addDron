const { model } = require("mongoose")
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
 //API LOGICA DE LA UBICACION DEL DRON 
    UbicacionDron = async(req,res) => {
        try{
            const [id] = await modelDron.find({id:req.body.id})
            const palabra = req.body.cadena
            const array = palabra.split("")
            let ubicacion = id.posicionInicial
            let estado = id.orientacion
            let tamañoGrilla = id.grilla
            let capacidad = id.capacidad 

            // 0 = NORTE, 1 ORIENTE, 2 SUR 3 OCCIDENTE
            array.forEach(letra => {
                if (letra === "A" ){
                    if(estado==0) ubicacion[1]+=1;
                    if(estado==1) ubicacion[0]+=1;
                    if(estado==2) ubicacion[1]-=1;
                    if(estado==3) ubicacion[0]-=1;
                    
                }else{
                    if(letra ==='D'){
                        if(estado === 0)estado=1;
                        else if(estado==1)estado=2;
                        else if(estado==2)estado=3;
                        else if(estado==3)estado=0;
                }else{
                    if(letra ==='I'){
                        if(estado === 0)estado=3;
                        else if(estado==1)estado=0;
                        else if(estado==2)estado=1;
                        else if(estado==3)estado=2;
                       }
                    }
              }
            });
            if (ubicacion[0] > tamañoGrilla || ubicacion[0] < 0 ) res.status(400).json("salio de la grilla")
            if (ubicacion[1] > tamañoGrilla || ubicacion[1] < 0 ) res.status(400).json("salio de la grilla")
            id.historial.push(id.posicionInicial)
            await id.save()
            console.log(ubicacion)
            if (capacidad > 0 ) {
                capacidad -= 1
                await id.updateOne({posicionInicial:ubicacion,capacidad:capacidad}) 

            }else{
                await id.updateOne({posicionInicial:[0,0],capacidad:3}) 
                
            }

            res.status(200).json(id)


        }catch(error){
            console.log(error);   
        }

        
    }


}

const controllerDron = new ControllerDron()


module.exports = controllerDron
