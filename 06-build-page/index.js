const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    console.log('Папка не создана!');
  }
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) {
    console.log('Папка не создана!');
  }
});  

function copyAssets () {
  fs.readdir(path.join(__dirname, 'assets'), (err, dir) => {
    if (err) {
      console.log('Ошибка!');
    } else {
      for (let i = 0; i < dir.length; i++) {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${dir[i]}`), { recursive: true }, (err) => {
          if (err) {
            console.log('Папка не создана!');
          }
        });
        fs.readdir(path.join(__dirname, 'project-dist', 'assets', `${dir[i]}`), (err, file) => {
          if (err) {
            console.log('Ошибка!');
          } else {
            for (let j = 0; j < file.length; j++) {
              fs.unlink(path.join(__dirname, 'project-dist', 'assets', `${dir[i]}`, `${file[j]}`), (err) => {
                if (err) {
                  console.log('Ошибка!');
                }
              });
            }
          }  
        });  
        fs.readdir(path.join(__dirname, 'assets', `${dir[i]}`), (err, file) => {
          if (err) {
            console.log('Ошибка!');
          } else {
            for (let j = 0; j < file.length; j++) {
              fs.copyFile(path.join(__dirname, 'assets', `${dir[i]}`, `${file[j]}`), path.join(__dirname, 'project-dist', 'assets', `${dir[i]}`, `${file[j]}`), (err) => {
                if (err) {
                  console.log('Ошибка!');
                }
              });
            }
          }  
        });  
      }
    }
  });
}  
copyAssets();

function createHtml () {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
    if (err) {
      console.log('Ошибка!');
    } else {
      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, templ) =>  {
        if (err) {
          console.log('Ошибка!');
        } else {
          fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
            if (err) {
              console.log('Ошибка!');
            } else {
              for (let i = 0; i < files.length; i++) {
                if (files[i].isFile() && path.extname(files[i].name) === '.html') {
                  fs.readFile(path.join(__dirname, 'components', `${files[i].name}`), 'utf-8', (err, comp) =>  {
                    if (err) {
                      console.log('Ошибка!');
                    } else {
                      templ = templ.replace(`{{${files[i].name.split('.').slice(0, -1).join('')}}}`, comp);
                      fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templ, (err) => {
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
        }       
      });    
    }
  });
}
createHtml();

function createCss () {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
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
              fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
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
}
createCss();

