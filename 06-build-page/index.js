const fs = require('fs');
const path = require('path');

fs.rm( path.join(__dirname, 'project-dist'), { recursive: true, force: true }, err => {
  if (err) throw err;

  fs.mkdir( path.join(__dirname, 'project-dist'), err => {
    if (err) throw err;
    
    fs.mkdir( path.join(__dirname, 'project-dist', 'assets'), err => { 
      if (err) throw err; 
      copyFiles( path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets') );
    });

    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, templateData) => {
      if (err) throw err;
      let template = templateData;
      fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, components) => {
        if (err) throw err;

        for (const component of components) {

          fs.readFile( path.join(__dirname, 'components', component.name), 'utf8', (err, componentData) => {
            if (err) throw err;

            const componentName = component.name.slice(0, component.name.indexOf('.'));        
            template = template.replace( ('{{' + componentName + '}}') , componentData);

            fs.writeFile( path.join(__dirname, 'project-dist', 'index.html'), template, err => {
              if (err) throw err;
            });

          });
        }

      });
    });

    fs.promises.readdir( path.join(__dirname, 'styles') )
    .then( files => {
    
      fs.rm( path.join(__dirname, 'project-dist', 'style.css'), { force: true }, (err) => {
        if (err) throw error;
      });
    
      for (const file of files) {
        if ( file.slice(file.lastIndexOf('.') + 1) === 'css') {
          const input = fs.createReadStream( path.join(__dirname, 'styles', file) );
          input.on('data', (dataChunk) => {
            fs.appendFile( path.join(__dirname, 'project-dist', 'style.css'), dataChunk, (err) => {
              if (err) throw error;
            });
          });
        }
      }
    
    })
    .catch(err => {
      throw err;
    });
  });
});

const copyFiles = (src, dest) => {
  fs.readdir(src, { withFileTypes: true }, (err, items) => {
    if (err) throw err;

    for (const item of items) {
      if ( item.isFile() ){
        fs.copyFile( path.join(src, item.name), path.join(dest, item.name), err => { if (err) throw err; });        
      }
      else if ( !item.isFile() ) {
        fs.mkdir( path.join(dest, item.name), err => { if (err) throw err; });        
        copyFiles( path.join(src, item.name), path.join(dest, item.name));
      }
    }

  });
}
