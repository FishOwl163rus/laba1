const commander = require('commander');
const program = new commander.Command();
const fs = require('fs')
const prompt = require("prompt-sync")({ sigint: true });

program
    .option('-i, --input <string>', 'Specify input file')
    .option('-o, --output <string>', 'Specify output file');

program.parse();

let opts = program.opts();

let input = opts.input;

if (input === undefined || input === '') {
    input = prompt("Specify input file: ");
}

let output = opts.output;

if (output === undefined || input === '') {
    output = prompt("Specify output file: ");
}

fs.readFile(input, 'utf8', function (err, content) {
    if (err) return console.log(err);

    let result = content.replace(/one|t[wh]|.i|[fsz]/g," $&").trimStart();

    fs.writeFile(output, result, function (err) {
        if (err) return console.log(err);
        console.log('#TASK 1. The result was written to file.');
    });
});

