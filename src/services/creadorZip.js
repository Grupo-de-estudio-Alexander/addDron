var fs = require('fs');
var path = require('path');
const archiver = require('archiver');

const generarZip = async (archivos) => {

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
    archive.append(fs.createReadStream(archivo), { name: path.basename(archivo) });
  });

  archive.on('finish', () => {
    console.log('zip finalizado')
    
  })
  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
  
  ;
}

module.exports = generarZip