var fs = require('fs');
var path = require('path');
const archiver = require('archiver');
const {waitForAll} = require('wait-for-event');
const {EventEmitter} = require('events');

const generarZip = async (archivos) => {
    const emitters = []
    let i = 0

    // create a file to stream archive data to.
    pathReporte = fs.createWriteStream(path.join(__dirname, '../reporte.zip')) //path donde va a quedar el reporte
    const output = pathReporte 
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
  });

  // pipe archive data to the file
  archive.pipe(output);

  // directorios donde van a estar los reportes a comprimir
  archivos.forEach(archivo => {
    let newEmitter = new EventEmitter()
    emitters.push(newEmitter)

    archive.append(fs.createReadStream(archivo), { name: path.basename(archivo) });

    // Emitir evento cuando el zip se finalice
    archive.on('end', () => {
      console.log('Zip finalido')
      emitters[i].emit('zipFinalizado')
      i++
    })
    
  });
  


  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()

  // esperar a que el evento end se haya emitido para devolver la funcion
  return await waitForAll('zipFinalizado', emitters)
  
  ;
}

module.exports = generarZip