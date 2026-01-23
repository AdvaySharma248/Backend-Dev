console.log("Hello")
const { add, sub, mul, div } = require('./hello1');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question("Enter first number: ", (a) => {
    r1.question("Enter second number: +++", (b) => {
        a = Number(a);
        b = Number(b);
        console.log(`Addition of ${a} and ${b} by using add function is ${add(a, b)}`);
        console.log(`Subtraction of ${a} and ${b} by using add function is ${sub(a, b)}`);
        console.log(`Multiplication of ${a} and ${b} by using add function is ${mul(a, b)}`);
        console.log(`Division of ${a} and ${b} by using add function is ${div(a, b)}`);
    });
});