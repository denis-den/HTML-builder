const fs = require('fs');
const path = require('path');
const { stdin: input } = require('process');

const output = fs.createWriteStream(path.join(__dirname, 'write.txt'));

console.log('Введите ваш текст:');

input.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    console.log('Ввод текста завершен, программа остановлена');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  console.log('Ввод текста завершен, программа остановлена');
  process.exit();
});