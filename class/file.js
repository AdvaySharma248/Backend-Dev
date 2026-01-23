// const fs = require('fs');
// const os = require('os');
// console.log(os.cpus().length);

// fs.writeFileSync("./example.txt", "Hello World!!!!");
// const result = fs.readFileSync("./example.txt", "utf-8");
// console.log(result);
// fs.readFile("./unknown.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log("Error Reading File:", err);
//     } else {
//         console.log("File Read Successfully:", data);
//     }
// });

// fs.appendFile("./example.txt", `\n ${Date.now()} hey there\n`, (err) => {
//     if (err) {
//         console.log("Error Appending File:", err);
//     } else {
//         console.log("Append Sucessfull");
//     }
// });
// fs.cpSync("./example.txt", "./example1.txt");
// fs.unlinkSync("./example1.txt");

// console.log(fs.statSync("./example.txt").isFile());

// fs.mkdirSync("./my-docs/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/r/s/t/u/v/w/x/y/z", { recursive: true });
// fs.rmSync("./my-docs", { recursive: true, force: true });



const fs = require("fs");

// const promises = require("fs/promises");

// fs.writeFileSync("./newfile.txt", "This is the content in the new file");

//Async Method need call back function
// fs.writeFile("./newfile.txt", "This is input using with Async method", (err) => { });

//readFile
// console.log(fs.readFileSync("./newfile.txt", "utf-8"));

//using Async
// fs.readFile("./newfile.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error Reading File");
//     } else {
//         console.log(result);
//     }
// });

//append file
// fs.appendFileSync("./newfile.txt", `\n${new Date().getDate().toLocaleString()}`);

//copy file
// fs.cpSync("./newfile.txt", "./newfile1.txt");

//delete file
// fs.unlinkSync("./newfile1.txt");

// console.log(fs.statSync("./newfile.txt"));
// console.log(fs.statSync("./newfile.txt").isFile());

// create directory
// fs.mkdirSync("./new-Folder/a", { recursive: true });
// fs.mkdirSync("./new-Folder/b", { recursive: true });

// remove directory
fs.rmSync("./new-Folder", { recursive: true });

