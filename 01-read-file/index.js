const fs = require('fs');
const path = require('path');
const readText = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';
readText.on('data', chunk => data += chunk);
readText.on('end', () => console.log(data));
