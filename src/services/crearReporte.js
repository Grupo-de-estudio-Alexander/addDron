const path = require('path')
const fs = require('fs');

module.exports = (numeroEnvio, ubicacion, droneId) => {
    const reporteDirectory = './src/reportes'
    const fileName = `out${droneId}.txt`
    const filePath = path.join(reporteDirectory, fileName)

    let buffer = '';
    try {
        fs.appendFile(filePath, `Envio ${numeroEnvio}, ubicacion final en ${ubicacion}\n`, (error) => {
        if (error) throw new Error(error);
    });
    } catch (error) {
        console.dir(error);
    }
}