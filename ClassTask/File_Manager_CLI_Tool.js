
// file system module ko require karo
// Q5: To safely delete directory with contents, first delete all files then the directory itself
const fs = require("fs");
// path module ko require karo
const path = require("path");

// command line arguments lelo (pehle 2 skip karo)
var arguments = process.argv.slice(2);
// pehla argument command hoga
var command = arguments[0];
// dusra argument file path hoga
var filePath = arguments[1];
// baki ke arguments content ya target path honge
var contentOrTarget = arguments.slice(2).join(' ');

// errors handle karne ke liye function
function handleError(err, operation) {
    // agar file ya directory nahi mili
    if (err.code == 'ENOENT') {
        console.error('Error: File or directory not found (' + operation + ')');
    } else {
        // agar permission nahi hai
        if (err.code == 'EACCES') {
            console.error('Error: Permission denied (' + operation + ')');
        } else {
            // agar directory mila file ki jagah
            if (err.code == 'EISDIR') {
                console.error('Error: Expected a file but found a directory (' + operation + ')');
            } else {
                // agar file already exist karti hai
                if (err.code == 'EEXIST') {
                    console.error('Error: File already exists (' + operation + ')');
                } else {
                    // koi aur error
                    console.error('Error ' + operation + ':', err.message);
                }
            }
        }
    }
}

if (command == undefined || command == null || command == '') {
    console.log("Usage: node File_Manager_CLI_Tool.js <command> <file_path> [content/target]");
    console.log("Available commands: read, write, append, copy, delete, list");
    process.exit(1);
}

if (command == "read") {
    if (filePath == undefined || filePath == null || filePath == '') {
        console.error("Error: File path is required for read command");
        process.exit(1);
    }
    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
            handleError(err, 'reading file');
        } else {
            console.log(data);
        }
    });
} else {
    if (command == "write") {
        if (filePath == undefined || filePath == null || filePath == '') {
            console.error("Error: File path is required for write command");
            process.exit(1);
        }
        if (contentOrTarget == undefined || contentOrTarget == null || contentOrTarget == '') {
            console.error("Error: Content is required for write command");
            process.exit(1);
        }
        // Q8: writeFile overwrites entire file, appendFile adds content to end of existing file
        fs.writeFile(filePath, contentOrTarget, 'utf-8', function(err) {
            if (err) {
                handleError(err, 'writing file');
            } else {
                console.log("File written successfully");
            }
        });
    } else {
        if (command == "append") {
            if (filePath == undefined || filePath == null || filePath == '') {
                console.error("Error: File path is required for append command");
                process.exit(1);
            }
            if (contentOrTarget == undefined || contentOrTarget == null || contentOrTarget == '') {
                console.error("Error: Content is required for append command");
                process.exit(1);
            }
            fs.appendFile(filePath, contentOrTarget, 'utf-8', function(err) {
                if (err) {
                    handleError(err, 'appending to file');
                } else {
                    console.log("Content appended successfully");
                }
            });
        } else {
            if (command == "copy") {
                if (filePath == undefined || filePath == null || filePath == '') {
                    console.error("Error: Source file path is required for copy command");
                    process.exit(1);
                }
                if (contentOrTarget == undefined || contentOrTarget == null || contentOrTarget == '') {
                    console.error("Error: Destination file path is required for copy command");
                    process.exit(1);
                }
                fs.copyFile(filePath, contentOrTarget, function(err) {
                    if (err) {
                        handleError(err, 'copying file');
                    } else {
                        console.log("File copied successfully");
                    }
                });
            } else {
                if (command == "delete") {
                    if (filePath == undefined || filePath == null || filePath == '') {
                        console.error("Error: File path is required for delete command");
                        process.exit(1);
                    }
                    fs.unlink(filePath, function(err) {
                        // Q7: Error handling is important to prevent crashes and provide user feedback about what went wrong
                        if (err) {
                            handleError(err, 'deleting file');
                        } else {
                            console.log("File deleted successfully");
                        }
                    });
                } else {
                    if (command == "list") {
                        if (filePath == undefined || filePath == null || filePath == '') {
                            console.error("Error: Directory path is required for list command");
                            process.exit(1);
                        }
                        fs.readdir(filePath, function(err, files) {
                            if (err) {
                                handleError(err, 'listing directory');
                            } else {
                                console.log("Files in directory:");
                                
                                for (var index = 0; index < files.length; index++) {
                                    var file = files[index];
                                    
                                    var fullPath = path.join(filePath, file);
                                    
                                    var directoryStats = fs.lstatSync(fullPath);
                                    
                                    var directoryString = directoryStats.isDirectory() ? ' [DIR]' : '';
                                    
                                    var countNumber = index + 1;
                                    
                                    console.log("  " + countNumber + ". " + file + directoryString);
                                }
                            }
                        });
                    } else {
                        console.log("Invalid command.");
                        console.log("Usage: node File_Manager_CLI_Tool.js <command> <file_path> [content/target]");
                        console.log("Available commands:");
                        console.log("  read <file_path>        - Read file content");
                        console.log("  write <file_path> <content>  - Write content to file");
                        console.log("  append <file_path> <content> - Append content to file");
                        console.log("  copy <source> <target>  - Copy file from source to target");
                        console.log("  delete <file_path>      - Delete file");
                        console.log("  list <dir_path>         - List files in directory");
                        process.exit(1);
                    }
                }
            }
        }
    }
}