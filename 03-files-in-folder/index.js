const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    if ( file.isFile() ) {
      fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) throw err;

        const fileName = file.name.slice(0, file.name.indexOf('.'));
        const fileExt = file.name.slice(file.name.indexOf('.') + 1);
        const fileSize = stats.size + 'bytes';

        console.log(`${fileName} - ${fileExt} - ${fileSize}`);
      });
    }
  }  
});