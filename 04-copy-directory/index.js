const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), recursive = true, (err) => {
  if (err) {
    console.log('Папка не создана!');
  }
});

function copyDir () {
  fs.readdir(path.join(__dirname, 'files-copy'), (err, file) => {
    if (err) {
      console.log('Ошибка!');
    } else {
      for (let i = 0; i < file.length; i++) {
        fs.unlink(path.join(__dirname, 'files-copy', `${file[i]}`), (err) => {
          if (err) {
            console.log('Ошибка!');
          }
        });
      }
    }  
  });
  fs.readdir(path.join(__dirname, 'files'), (err, file) => {
    if (err) {
      console.log('Ошибка!');
    } else {
      for (let i = 0; i < file.length; i++) {
        fs.copyFile(path.join(__dirname, 'files', `${file[i]}`), path.join(__dirname, 'files-copy', `${file[i]}`), (err) => {
          if (err) {
            console.log('Ошибка!');
          }
        });
      }
    }  
  });
}
copyDir()