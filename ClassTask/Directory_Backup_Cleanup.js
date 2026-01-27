// file system module ko require karo
// Q4: Common error codes - ENOENT(file not found), EACCES(permission denied), EISDIR(expected file got directory)
const fs = require('fs').promises;
// path module ko require karo
const path = require('path');

// log file me message likhne ke liye function
async function logOperation(message, logFile) {
    // agar logFile nahi diya gaya to default 'backup.log' use karo
    if (logFile == undefined) {
        logFile = 'backup.log';
    }
    
    // current date time lelo
    var today = new Date();
    var timestamp = today.toISOString();
    
    // brackets banalo timestamp ke liye
    var opening = '[';
    var closing = ']';
    // poora message string banao
    var messageToLog = opening + timestamp + closing + ' ' + message + '\n';
    
    // message log file me append karo
    await fs.appendFile(logFile, messageToLog);
    
    // message console pe bhi print karo
    console.log(message);
}

async function createBackupDirectory(backupPath) {
    var result = true;
    var error = null;
    
    try {
        await fs.access(backupPath);
    } catch (err) {
        error = err;
        if (error.code == 'ENOENT') {
            result = false;
            await fs.mkdir(backupPath, { recursive: true });
        } else {
            throw error;
        }
    }
    
    return result;
}

async function getFileStats(filePath) {
    var result = null;
    var error = null;
    
    try {
        result = await fs.stat(filePath);
    } catch (err) {
        error = err;
        var msg = 'Cannot access file ' + filePath + ': ' + error.message;
        throw new Error(msg);
    }
    
    return result;
}

async function copyFileToBackup(sourcePath, backupPath, filename) {
    var currentDate = new Date().toISOString();
    
    var badChar1 = currentDate.replace(/:/g, '-');
    var finalTimestamp = badChar1.replace(/\./g, '-');
    
    var backupFilename = finalTimestamp + '_' + filename;
    
    var destinationPath = path.join(backupPath, backupFilename);
    
    var error = null;
    try {
        await fs.copyFile(sourcePath, destinationPath);
    } catch (err) {
        error = err;
        var errorMessage = 'Failed to copy ' + filename + ': ' + error.message;
        throw new Error(errorMessage);
    }
    
    return backupFilename;
}

async function deleteOldFiles(directoryPath, daysOld) {
    if (daysOld == undefined) {
        daysOld = 7;
    }
    
    var hours = 24;
    var minutes = 60;
    var seconds = 60;
    var milliseconds = 1000;
    
    var calculation1 = hours * minutes * seconds * milliseconds;
    var calculation2 = daysOld * calculation1;
    var cutoffTime = Date.now() - calculation2;
    
    var deletedCount = 0;
    
    var error = null;
    
    try {
        var listOfFiles = await fs.readdir(directoryPath);
        
        for (var i = 0; i < listOfFiles.length; i++) {
            var singleFile = listOfFiles[i];
            
            var filePath = path.join(directoryPath, singleFile);
            
            var fileStats = await getFileStats(filePath);
            
            if (fileStats.isFile()) {
                var lastModifiedTime = fileStats.mtime.getTime();
                
                if (lastModifiedTime < cutoffTime) {
                    try {
                        await fs.unlink(filePath);
                        
                        var message = 'Deleted old file: ' + singleFile;
                        await logOperation(message);
                        
                        deletedCount = deletedCount + 1;
                    } catch (err) {
                        error = err;
                        
                        var errorText = 'Failed to delete ';
                        var errorMsg = errorText + singleFile + ': ' + error.message;
                        
                        await logOperation(errorMsg);
                    }
                }
            }
        }
    } catch (err) {
        error = err;
        
        var beginningText = 'Error reading directory ';
        var errorMessage = beginningText + directoryPath + ': ' + error.message;
        
        throw new Error(errorMessage);
    }
    
    return deletedCount;
}

async function backupDirectory(sourcePath, backupPath) {
    var backupStartedMsg = 'Starting backup process from ' + sourcePath + ' to ' + backupPath;
    
    await logOperation(backupStartedMsg);
    
    try {
        await createBackupDirectory(backupPath);
        
        var dirReady = 'Backup directory ready: ';
        await logOperation(dirReady + backupPath);
    } catch (error) {
        var failMessage = 'Failed to create backup directory: ' + error.message;
        throw new Error(failMessage);
    }

    var backupCount = 0;
    
    try {
        var files = await fs.readdir(sourcePath);
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            var filePath = path.join(sourcePath, file);
            
            var stats = await getFileStats(filePath);
            
            if (stats.isFile()) {
                try {
                    var backupFilename = await copyFileToBackup(filePath, backupPath, file);
                    
                    var backupMsg = 'Backed up: ' + file + ' -> ' + backupFilename;
                    
                    await logOperation(backupMsg);
                    
                    backupCount = backupCount + 1;
                } catch (error) {
                    var failMsg = 'Backup failed for ' + file + ': ' + error.message;
                    
                    await logOperation(failMsg);
                }
            }
        }
    } catch (error) {
        var scanError = 'Error scanning directory ' + sourcePath + ': ' + error.message;
        
        throw new Error(scanError);
    }
    
    return backupCount;
}

async function runBackupAndCleanup(sourceDir, backupDir, daysOld) {
    if (daysOld == undefined) {
        daysOld = 7;
    }
    
    try {
        await logOperation('=== Directory Backup & Cleanup Utility Started ===');
        
        var backupCount = await backupDirectory(sourceDir, backupDir);
        
        var backupCompleted = 'Backup completed. ' + backupCount + ' files backed up.';
        await logOperation(backupCompleted);
        
        var deletedCount = await deleteOldFiles(sourceDir, daysOld);
        
        var cleanupCompleted = 'Cleanup completed. ' + deletedCount + ' old files deleted.';
        await logOperation(cleanupCompleted);
        
        await logOperation('=== Directory Backup & Cleanup Utility Completed ===\n');
        
    } catch (error) {
        var fatal = 'FATAL ERROR: ' + error.message;
        await logOperation(fatal);
        
        throw error;
    }
}

async function main() {
    var arguments = process.argv.slice(2);
    
    var sourceDir = arguments[0];
    
    var backupDir = null;
    if (arguments[1] == undefined || arguments[1] == null || arguments[1] == '') {
        backupDir = 'backup';
    } else {
        backupDir = arguments[1];
    }
    
    var daysOld = null;
    if (arguments[2] == undefined || arguments[2] == null || arguments[2] == '') {
        daysOld = 7;
    } else {
        daysOld = parseInt(arguments[2]);
    }

    if (sourceDir == undefined || sourceDir == null || sourceDir == '') {
        console.error('Usage: node Directory_Backup_Cleanup.js <source_directory> [backup_directory] [days_old]');
        console.error('Example: node Directory_Backup_Cleanup.js ./uploads ./backup 7');
        process.exit(1);
    }

    try {
        await runBackupAndCleanup(sourceDir, backupDir, daysOld);
        
        console.log('Backup and cleanup process completed successfully.');
    } catch (error) {
        console.error('Process failed:', error.message);
        process.exit(1);
    }
}

main();