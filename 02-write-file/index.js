const fs = require('fs');
const path = require('path');
const { stdin } = process;
let writeText = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
console.log('Привет, теперь ты можешь ввести текст!');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    console.log('Увы, но это была твоя последняя попытка!');
    process.exit();
  } else {
    console.log('А ну, давай-ка еще...');
    writeText.write(data);
  }
});
process.on('SIGINT', () => {
  console.log('Ой, извини, это была твоя последняя попытка!');
  process.exit();
});