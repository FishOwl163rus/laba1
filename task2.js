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

    function sum(A, B) {
        let m = A.length, n = A[0].length, C = [];
        for (let i = 0; i < m; i++) {
            C[i] = [];
            for (let j = 0; j < n; j++) C[i][j] = A[i][j] + B[i][j];
        }
        return C;
    }

    let contents = content.split('\n');

    let a = JSON.parse(contents[0]);
    let b = JSON.parse(contents[1]);

    fs.writeFile(output, JSON.stringify(sum(a, b)), function (err) {
        if (err) return console.log(err);
        console.log('#TASK 2. The result was written to file.');
    });
});
