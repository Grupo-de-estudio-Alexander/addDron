const path = require('path')
const fs = require('fs');
module.exports = () => {
    const reporteDirectory = './src/reportes'
 

    let buffer = '';
//     try {
//        fs.unlink(filePath, (error) => {
//            if (error) throw new Error(error);
//          });
//     } catch (error) {
//         console.dir(error);
//    }
fs.readdir(reporteDirectory, function (err, archivos) {
if (err) {
onError(err);
return;
}
for (let i=0; i<archivos.length; i++) {

//console.log(archivos);
//console.log("diefrente" + archivos[0]);
const regex1 = /out([0-9]+).txt/i
const DroneId = archivos[i].match(regex1)[1]
console.log(DroneId)
const fileName = `out${DroneId}.txt`
const filePath = path.join(reporteDirectory, fileName)
    try {
      fs.unlink(filePath, (error) => {
               if (error) throw new Error(error);
             });
        } catch (error) {
            console.dir(error);
       }
}
});
}

