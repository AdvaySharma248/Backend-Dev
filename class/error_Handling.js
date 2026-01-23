const fs = require("fs");


//Common Errors
// ENOENT = File Not ecist
// EACESS = Access Denied
// EEXIST = File Already Exists
// EISDIR = File expected, Folder Not Found

// error Handling with useCallback

// fs.readFile("./example.txt", "utf-8", (err, data) => {
//     if (err) {
//         if (err.code === "ENOENT") {
//             console.log("File Not Found");
//         }
//         return;
//     }
//     console.log(data);
// })


// Error Handling with async await
// const fsPromises = require("fs").promises;

// async function readFileSafe() {
//     try {
//         const data = await fsPromises.readFile("./example.txt", "utf-8");
//         console.log(data);
//     } catch (err) {
//         console.log("Error: ", err.code);
//     }
// }

// readFileSafe();

// Stream Error Handling

const readStream = fs.createReadStream("./example.txt", "utf-8");
const writeStream = fs.createWriteStream("./example1.txt", "utf-8")

readStream.on("error", (err) => {
    console.log("Read Error:", err.message);
    writeStream.destroy();
});

writeStream.on("error", (err) => {
    console.log("Write Error:", err.message);
    readStream.destroy();
});

