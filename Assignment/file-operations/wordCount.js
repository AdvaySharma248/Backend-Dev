// ye file system module hai jo files read/write karne me help karta hai
const fs = require("fs");

// file read karna shuru karo
fs.readFile("input.txt", "utf8", (err, data) => {
    // agar error aaye to ye condition chalegi
    if (err) {
        console.log("Error reading file");
        return;
    }

    // data se words nikalo aur trim karo extra spaces hatane ke liye
    const words = data.trim().split(/\s+/);
    // words ka count nikalo
    const wordCount = words.length;

    // result string banana hai
    const result = `Word Count: ${wordCount}`;

    // result ko output.txt file me likho
    fs.writeFile("output.txt", result, (err) => {
        // agar writing me error aaye to ye chalega
        if (err) {
            console.log("Error writing file");
            return;
        }
        // success message print karo
        console.log("Word count written to output.txt");
    });
});
