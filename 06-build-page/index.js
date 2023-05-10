const fs = require('fs');
const path = require('path');
const promise = require('fs/promises');

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

async function copyAssets () {
  let assetsRoot = await promise.readdir(path.join(__dirname, 'assets'));
  for (const asset of assetsRoot) {
    await promise.mkdir(path.join(__dirname, 'project-dist', 'assets', `${asset}`), { recursive: true });
    let assetCopy = await promise.readdir(path.join(__dirname, 'project-dist', 'assets', `${asset}`));
    for (const file of assetCopy) {
      await promise.unlink(path.join(__dirname, 'project-dist', 'assets', `${asset}`, `${file}`));
    }
    let assetRoot = await promise.readdir(path.join(__dirname, 'assets', `${asset}`));
    for (const file of assetRoot) {
      await promise.copyFile(path.join(__dirname, 'assets', `${asset}`, `${file}`), path.join(__dirname, 'project-dist', 'assets', `${asset}`, `${file}`));  
    }
  }
}  
copyAssets();

async function createHtml () {
  let template = await promise.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  let components = await promise.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
  for (const comp of components) {
    if (comp.isFile() && path.extname(comp.name) === '.html') {
      let file = await promise.readFile(path.join(__dirname, 'components', `${comp.name}`), 'utf-8');
      template = template.replace(`{{${comp.name.split('.').slice(0, -1).join('')}}}`, file);
    }   
  }
 await promise.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}
createHtml();


async function createCss () {
  await promise.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '',);

  let styles = await promise.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  for (const style of styles) {
    if (style.isFile() && path.extname(style.name) === '.css') {
      let appendStyle = await promise.readFile(path.join(__dirname, 'styles', `${style.name}`), 'utf-8')
      await promise.appendFile(path.join(__dirname, 'project-dist', 'style.css'), appendStyle, (err) => {
        if (err) {
          console.log('Ошибка!');
        }
      });
    }
  }
}
createCss();

