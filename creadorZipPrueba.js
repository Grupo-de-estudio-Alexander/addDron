// require modules
const fs = require('fs');
const archiver = require('archiver');
 
// create a file to stream archive data to.
const output = fs.createWriteStream('./reporte.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// pipe archive data to the file
archive.pipe(output);
 
// append a file from stream
const file1 = './reportes/out1.txt';
const file2 = './reportes/out2.txt';
const file3 = './reportes/out3.txt';
archive.append(fs.createReadStream(file1), { name: 'out1.txt' });
archive.append(fs.createReadStream(file2), { name: 'out2.txt' });
archive.append(fs.createReadStream(file3), { name: 'out3.txt' });

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();