const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) {
    console.log('Ошибка!');
  }
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log('Ошибка!');
  } else {
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile() && path.extname(files[i].name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', `${files[i].name}`), 'utf-8', (err, data) =>  {
          if (err) {
            console.log('Ошибка!');
          } else {
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
              if (err) {
                console.log('Ошибка!');
              }
            });
          }       
        });
      }
    }
  }  
});