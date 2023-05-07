const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log('Ошибка!');
  } else {
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', `${files[i].name}`), (err, stat) => {
          if (err) {
            console.log('Ошибка!');
          } else {
            console.log(`${files[i].name.split('.').slice(0, -1).join('')} - ${path.extname(files[i].name).slice(1)} - ${stat.size/1024}kb`);
          }
        })
      }
    }
  }  
});