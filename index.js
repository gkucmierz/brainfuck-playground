let bf = require('brainfuck-compiler');
let fs = require('fs');

let args = process.argv.slice(2);

if (args.length < 0) {
  console.log('run script with program name');
  console.log('for example: node index.js hello-world');
} else {
  let prog = fs.readFileSync(['src/', args[0], '.bf'].join(''));

  bf.config({memorySize: 256, bits: 16});
  let compiled = bf.compile(prog);

  var buf = [];
  compiled.run('', (num, char) => buf.push(char));

  console.log('result:');
  console.log(buf.join(''));
}
