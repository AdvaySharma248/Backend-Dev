// File system module
// Q3: 'utf8' encoding ensures text is read/written as readable characters instead of binary data
const fs = require('fs').promises;
// Path module
const path = require('path');

// Directory se files ka list lene ke liye function
async function getDirectoryFiles(dirPath) {
    // Khali array banaya files store karne ke liye
    var listOfFiles = [];
    // Try block - errors ko catch karenge
    try {
        // Directory se file names le aao
        var fileItems = await fs.readdir(dirPath);
        // Loop chalao saare files ke liye
        for (var i = 0; i < fileItems.length; i++) {
            // Current item le lo
            var singleItem = fileItems[i];
            // Poora path banao
            var singlePath = path.join(dirPath, singleItem);
            // File ka information lo
            var statsInformation = await fs.stat(singlePath);
            // Check karo ki ye file hai ya nahi
            if (statsInformation.isFile()) {
                // Array me object daalo
                listOfFiles.push({
                    fileName: singleItem,           // File ka naam
                    file_path: singlePath,          // File ka poora path
                    mtime_seconds: statsInformation.mtime.getTime(),  // Last modify time
                    fileSize: statsInformation.size   // File ka size
                });
            }
        }
    } catch (error) {
        // Agar directory nahi mili
        if (error.code == 'ENOENT') {
            // Kuch mat karo
        } else {
            // Koi aur error aaya
            console.error('Error while reading directory', error.message);
            // Khali array return karo
            return [];  
        }
    }
    // Naye array banao
    var arr = [];
    // Files copy karo new array me
    for (var i = 0; i < listOfFiles.length; i++) {
        arr.push(listOfFiles[i]);
    }
    // Array return karo
    return arr;
}

// ye function source file ko target location par copy karega
async function copyFile(sourcePath, targetPath) {
    var success = false;  // yahan par result store hoga ki copy hua ya nahi
    try {
        // file copy karne ka command
        await fs.copyFile(sourcePath, targetPath);
        success = true;  // agar successful hua to true kardo
    } catch (error) {
        // agar error aaye to message print karo
        console.error('Failed to copy ' + sourcePath + ': ' + error.message);
        success = false;  // error aaya to false kardo
    }
    return success;  // result return karo
}

// ye function check karega ki directory exist karti hai ya nahi
async function ensureDirectory(dirPath) {
    var exists = true;  // assume karo ki directory exist karti hai
    try {
        // directory access karne ki koshish karo
        await fs.access(dirPath);
    } catch (error) {
        // agar error aaye to matlab directory nahi hai
        exists = false;
    }
    // agar directory nahi hai to bana do
    if (exists == false) {
        await fs.mkdir(dirPath, { recursive: true });  // recursive true matlab saare parent folders bhi ban jayenge
    }
}

// ye function do directories ko sync karega
async function syncDirectories(sourceDir, targetDir) {
    try {
        // pehle target directory exist karti hai ya nahi check karo
        await ensureDirectory(targetDir);
        
        // source aur target directory se files ka list le aao
        var sourceFiles = await getDirectoryFiles(sourceDir);
        var targetFiles = await getDirectoryFiles(targetDir);
        
        // counters initialize karo
        var filesCopied = 0;   // naye files copy hue
        var filesUpdated = 0;  // existing files update hue
        var filesDeleted = 0;  // extra files delete hue
        
        // source files pe loop chalao
        for (var i = 0; i < sourceFiles.length; i++) {
            var sourceInfo = sourceFiles[i];
            var filename = sourceInfo.fileName;
            
            // check karo ki ye file target me already hai ya nahi
            var found = false;
            var targetInfo = null;
            for (var j = 0; j < targetFiles.length; j++) {
                if (targetFiles[j].fileName == filename) {
                    found = true;
                    targetInfo = targetFiles[j];
                    break;
                }
            }
            
            // agar file target me nahi hai to copy karo
            if (found == false) {
                var targetPath = path.join(targetDir, filename);
                var result = await copyFile(sourceInfo.file_path, targetPath);
                if (result == true) {
                    console.log('Copied new file: ' + filename);
                    filesCopied = filesCopied + 1;
                }
            } else {
                // agar file hai to check karo ki update karni padegi ya nahi
                if (sourceInfo.mtime_seconds > targetInfo.mtime_seconds || sourceInfo.fileSize != targetInfo.fileSize) {
                    var targetPath = path.join(targetDir, filename);
                    var result = await copyFile(sourceInfo.file_path, targetPath);
                    if (result == true) {
                        console.log('Updated file: ' + filename);
                        filesUpdated = filesUpdated + 1;
                    }
                }
            }
        }
        
        // target files pe loop chalao extra files delete karne ke liye
        for (var i = 0; i < targetFiles.length; i++) {
            var filename = targetFiles[i].fileName;
            
            // check karo ki ye file source me bhi hai ya nahi
            var existsInSource = false;
            for (var j = 0; j < sourceFiles.length; j++) {
                if (sourceFiles[j].fileName == filename) {
                    existsInSource = true;
                    break;
                }
            }
            
            // agar source me nahi hai to delete kardo
            if (existsInSource == false) {
                var targetPath = path.join(targetDir, filename);
                try {
                    await fs.unlink(targetPath);  // file delete karo
                    console.log('Deleted file: ' + filename);
                    filesDeleted = filesDeleted + 1;
                } catch (error) {
                    console.error('Failed to delete ' + filename + ': ' + error.message);
                }
            }
        }
        
        // final report print karo
        console.log('');
        console.log('Synchronization complete:');
        console.log('- Files copied: ' + filesCopied);
        console.log('- Files updated: ' + filesUpdated);
        console.log('- Files deleted: ' + filesDeleted);
        
    } catch (error) {
        // agar koi error aaye to message print karo aur exit karo
        console.error('Synchronization failed: ' + error.message);
        process.exit(1);
    }
}

async function main() {
    var arguments = process.argv.slice(2);
    var sourceDir = arguments[0];
    var targetDir = arguments[1];
    
    if (sourceDir == undefined || sourceDir == null || sourceDir == '' || targetDir == undefined || targetDir == null || targetDir == '') {
        console.error('Usage: node File_Sync.js <source_directory> <target_directory>');
        process.exit(1);
    }
    
    await syncDirectories(sourceDir, targetDir);
}

main();