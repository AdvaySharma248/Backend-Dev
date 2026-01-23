const fs = require("fs");
// const readStream = fs.createReadStream("./example.txt", {
//     encoding: "utf-8",
//     highWaterMark: 64*1024
// });

// readStream.on("data", (chunk)=>{
//     console.log("chunk received", chunk.length);
// });

// readStream.on("end", ()=>{
//     console.log("File Reading complete");
// });

// const writeStream = fs.createWriteStream("./example.txt");
// writeStream.write("Hello Aadi\n");
// writeStream.write("Welcome to Stream\n");
// writeStream.end();

//Transform Stream
const {Transform} = require("stream");
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback){
        const data = chunk.toString();
        const modifiedData = data.charAt(0).toUpperCase() + data.slice(1);
        this.push(modifiedData);
        callback;
    }
});

fs.createReadStream("./example.txt")
.pipe(upperCaseTransform)
.pipe(fs.createWriteStream("./log.txt"));

//file copy using stream input.txt to output.txt

fs.createReadStream("example.txt")
  .pipe(fs.createWriteStream("output.txt"));