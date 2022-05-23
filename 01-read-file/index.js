const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));

let fileData = '';

stream.on('data', fileDataChunk => fileData += fileDataChunk);
stream.on('end', () => console.log(fileData));