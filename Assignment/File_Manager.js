// File system module ko import karo
// Q1: Synchronous operations block the code until complete, asynchronous operations don't block and use callbacks/promises
//     fs.readFileSync vs fs.readFile, fs.writeFileSync vs fs.writeFile
const fs = require('fs').promises;
// Path module ko import karo
const path = require('path');

// File read karne ke liye function
async function readFile(filePath) {
    // Variables initialize karo
    var data = null;
    var error = null;
    
    // Try block - agar koi error aaye to catch me handle karenge
    try {
        // File ko read karo
        data = await fs.readFile(filePath, 'utf8');
        // File ka content print karo
        console.log(data);
    } catch (err) {
        // Error ko catch karo
        error = err;
        
        // Check karo ki error kaun sa hai
        if (error.code === 'ENOENT') {
            // File ya directory nahi mili
            console.error('Error: File or directory not found (reading file)');
        } else if (error.code === 'EACCES') {
            // Permission nahi hai
            console.error('Error: Permission denied (reading file)');
        } else if (error.code === 'EISDIR') {
            // Directory mila file ki jagah
            console.error('Error: Expected a file but found a directory (reading file)');
        } else {
            // Koi aur error aaya
            console.error('Error reading file:', error.message);
        }
    }
}

// File write karne ke liye function
async function writeFile(filePath, content) {
    // Error variable
    var error = null;
    
    // Try block
    try {
        // File me content likho
        await fs.writeFile(filePath, content, 'utf8');
        // Success message print karo
        console.log('File written successfully');
    } catch (err) {
        // Error ko store karo
        error = err;
        
        // Error type check karo
        if (error.code === 'ENOENT') {
            // File ya directory nahi mili
            console.error('Error: File or directory not found (writing file)');
        } else if (error.code === 'EACCES') {
            // Permission nahi hai
            console.error('Error: Permission denied (writing file)');
        } else {
            // Koi aur error
            console.error('Error writing file:', error.message);
        }
    }
}

async function copyFile(sourcePath, targetPath) {
    var error = null;
    try {
        await fs.copyFile(sourcePath, targetPath);
        console.log('File copied successfully');
    } catch (err) {
        error = err;
        if (error.code === 'ENOENT') {
            console.error('Error: File or directory not found (copying file)');
        } else if (error.code === 'EACCES') {
            console.error('Error: Permission denied (copying file)');
        } else {
            console.error('Error copying file:', error.message);
        }
    }
}

async function deleteFile(filePath) {
    var error = null;
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        error = err;
        if (error.code === 'ENOENT') {
            console.error('Error: File or directory not found (deleting file)');
        } else if (error.code === 'EACCES') {
            console.error('Error: Permission denied (deleting file)');
        } else {
            console.error('Error deleting file:', error.message);
        }
    }
}

async function listDirectory(dirPath) {
    var files = null;
    var error = null;
    try {
        files = await fs.readdir(dirPath);
        console.log('Files in directory:');
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fullPath = path.join(dirPath, file);
            var stats = await fs.stat(fullPath);
            var type = '';
            if (stats.isDirectory() === true) {
                type = ' [DIR]';
            }
            var lineNumber = i + 1;
            console.log('  ' + lineNumber + '. ' + file + type);
        }
    } catch (err) {
        error = err;
        if (error.code === 'ENOENT') {
            console.error('Error: File or directory not found (listing directory)');
        } else if (error.code === 'EACCES') {
            console.error('Error: Permission denied (listing directory)');
        } else {
            console.error('Error listing directory:', error.message);
        }
    }
}

// Main function - program ka starting point
async function main() {
    // Command line arguments ko slice karo (first 2 skip karo)
    var allArgs = process.argv.slice(2);
    // Pehla argument command hoga
    var command = allArgs[0];
    // Dusra argument file path hoga
    var filePath = allArgs[1];
    // Baki ke arguments
    var otherArgs = allArgs.slice(2);
    // Baki ke arguments ko join karo ek string me
    var contentOrTarget = otherArgs.join(' ');

    // Check karo ki command diya gaya hai ya nahi
    if (command === undefined || command === null || command === '') {
        // Usage instructions print karo
        console.log('Usage: node File_Manager.js <command> <file_path> [content/target]');
        console.log('Available commands: read, write, copy, delete, list');
        // Process exit karo
        process.exit(1);
    }

    if (command === 'read') {
        if (filePath === undefined || filePath === null || filePath === '') {
            console.error('Error: File path is required for read command');
            process.exit(1);
        }
        await readFile(filePath);
    } else if (command === 'write') {
        if (filePath === undefined || filePath === null || filePath === '') {
            console.error('Error: File path is required for write command');
            process.exit(1);
        }
        if (contentOrTarget === undefined || contentOrTarget === null || contentOrTarget === '') {
            console.error('Error: Content is required for write command');
            process.exit(1);
        }
        await writeFile(filePath, contentOrTarget);
    } else if (command === 'copy') {
        if (filePath === undefined || filePath === null || filePath === '') {
            console.error('Error: Source file path is required for copy command');
            process.exit(1);
        }
        if (contentOrTarget === undefined || contentOrTarget === null || contentOrTarget === '') {
            console.error('Error: Destination file path is required for copy command');
            process.exit(1);
        }
        await copyFile(filePath, contentOrTarget);
    } else if (command === 'delete') {
        if (filePath === undefined || filePath === null || filePath === '') {
            console.error('Error: File path is required for delete command');
            process.exit(1);
        }
        await deleteFile(filePath);
    } else if (command === 'list') {
        if (filePath === undefined || filePath === null || filePath === '') {
            console.error('Error: Directory path is required for list command');
            process.exit(1);
        }
        await listDirectory(filePath);
    } else {
        console.log('Invalid command.');
        console.log('Available commands: read, write, copy, delete, list');
        process.exit(1);
    }
}

main();