const fs = require('fs').promises;
const path = require('path');


async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: File not found - ${filePath}`);
        } else if (err.code === 'EACCES') {
            console.error(`Error: Permission denied - ${filePath}`);
        } else {
            console.error(`Error reading file: ${err.message}`);
        }
    }
}

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Successfully wrote to file: ${filePath}`);
    } catch (err) {
        if (err.code === 'EACCES') {
            console.error(`Error: Permission denied - ${filePath}`);
        } else {
            console.error(`Error writing to file: ${err.message}`);
        }
    }
}

async function appendToFile(filePath, content) {
    try {
        await fs.appendFile(filePath, content + '\n', 'utf8');
        console.log(`Successfully appended to file: ${filePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: File not found - ${filePath}`);
        } else if (err.code === 'EACCES') {
            console.error(`Error: Permission denied - ${filePath}`);
        } else {
            console.error(`Error appending to file: ${err.message}`);
        }
    }
}

async function copyFile(sourcePath, destPath) {
    try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`Successfully copied file from ${sourcePath} to ${destPath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: Source file not found - ${sourcePath}`);
        } else if (err.code === 'EACCES') {
            console.error(`Error: Permission denied`);
        } else {
            console.error(`Error copying file: ${err.message}`);
        }
    }
}

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`Successfully deleted file: ${filePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: File not found - ${filePath}`);
        } else if (err.code === 'EACCES') {
            console.error(`Error: Permission denied - ${filePath}`);
        } else {
            console.error(`Error deleting file: ${err.message}`);
        }
    }
}

async function listFiles(dirPath) {
    try {
        const files = await fs.readdir(dirPath);
        console.log(`Files in directory '${dirPath}':`);
        files.forEach(file => console.log(file));
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: Directory not found - ${dirPath}`);
        } else if (err.code === 'EACCES') {
            console.error(`Error: Permission denied - ${dirPath}`);
        } else {
            console.error(`Error listing directory: ${err.message}`);
        }
    }
}

function showHelp() {
    console.log(`
File Manager CLI Tool Usage:
  node tasknew.js read <filepath>          - Read a file
  node tasknew.js write <filepath> <text>  - Write content to a file
  node tasknew.js append <filepath> <text> - Append logs to a file
  node tasknew.js copy <source> <dest>     - Copy a file
  node tasknew.js delete <filepath>        - Delete a file
  node tasknew.js list <directory>         - List files in a directory
  node tasknew.js help                     - Show this help message
    `);
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || command === 'help') {
        showHelp();
        return;
    }

    switch (command.toLowerCase()) {
        case 'read':
            if (args.length !== 2) {
                console.error('Usage: node tasknew.js read <filepath>');
                return;
            }
            await readFile(args[1]);
            break;

        case 'write':
            if (args.length !== 3) {
                console.error('Usage: node tasknew.js write <filepath> <text>');
                return;
            }
            await writeFile(args[1], args[2]);
            break;

        case 'append':
            if (args.length !== 3) {
                console.error('Usage: node tasknew.js append <filepath> <text>');
                return;
            }
            await appendToFile(args[1], args[2]);
            break;

        case 'copy':
            if (args.length !== 3) {
                console.error('Usage: node tasknew.js copy <source> <dest>');
                return;
            }
            await copyFile(args[1], args[2]);
            break;

        case 'delete':
            if (args.length !== 2) {
                console.error('Usage: node tasknew.js delete <filepath>');
                return;
            }
            await deleteFile(args[1]);
            break;

        case 'list':
            if (args.length !== 2) {
                console.error('Usage: node tasknew.js list <directory>');
                return;
            }
            await listFiles(args[1]);
            break;

        default:
            console.error(`Unknown command: ${command}`);
            showHelp();
    }
}

main();