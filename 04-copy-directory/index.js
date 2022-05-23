const fs = require('fs');
const path = require('path');

fs.promises
  .rm( path.join(__dirname, 'files-copy'), { recursive: true, force: true } )
  .then( () => {
    fs.promises
      .mkdir(path.join(__dirname, 'files-copy'), err => {
        if (err) throw err;
      })
      .then( () => {
        fs.promises
          .readdir(path.join(__dirname, 'files'), { withFileTypes: true }, err => {
            if (err) throw err;
          })
          .then( (files) => {
            for (const file of files) {
              fs.copyFile( (path.join(__dirname, 'files', file.name)), (path.join(__dirname, 'files-copy', file.name)), (err) => {
                if (err) throw err;
              });
            }
          })
      })
  });