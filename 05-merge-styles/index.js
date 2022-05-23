const fs = require('fs');
const path = require('path');

fs.promises.readdir( path.join(__dirname, 'styles') )
.then( files => {

  fs.rm( path.join(__dirname, 'project-dist', 'bundle.css'), { force: true }, (err) => {
    if (err) throw error;
  });

  for (const file of files) {
    if ( file.slice(file.lastIndexOf('.') + 1) === 'css') {
      const input = fs.createReadStream( path.join(__dirname, 'styles', file) );
      input.on('data', (dataChunk) => {
        fs.appendFile( path.join(__dirname, 'project-dist', 'bundle.css'), dataChunk, (err) => {
          if (err) throw error;
        });
      });
    }
  }

})
.catch(err => {
  throw err;
});
