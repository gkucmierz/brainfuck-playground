let bf = require('brainfuck-compiler');
let fs = require('fs');

let args = process.argv.slice(2);

if (args.length < 0) {
  console.log('run script with program name');
  console.log('for example: node index.js hello-world');
} else {
  let prog = fs.readFileSync(['src/', args[0], '.bf'].join(''));

  bf.config({memorySize: 1024, bits: 16});
  let compiled = bf.compile(prog);

  // console.log('compiled code:');
  // console.log(compiled+'');
  // console.log('');

  let time = [new Date()];
  let input = args[1] || '';
  console.log('input:', input);
  console.log('start:', time[0]);
  console.log('');
  let buf = [];
  compiled.run(input, (num, char) => {
    // console.log('output: ', char, num);
    if (char === '\n') {
      console.log(buf.join(''));
      buf = [];
    } else {
      buf.push(char);
    }
  });
  console.log(buf.join(''));
  console.log('');
  time.push(new Date());
  console.log('finish:', time[1]);
  console.log('elapsed [s]:', ((time[1] - time[0]) * 1e-3).toFixed(3));

}
