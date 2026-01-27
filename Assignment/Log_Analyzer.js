// file system module ko require karo
// Q2: Streams are better for large files to avoid memory issues. Read entire file when file is small
const fs = require('fs');
// readline module ko require karo
const readline = require('readline');
// path module ko require karo
const path = require('path');

// log file analyze karne ke liye function
function analyzeLogFile(logFilePath, reportFilePath) {
    // log file ka stream create karo
    var fileStream = fs.createReadStream(logFilePath);
    // readline interface banao
    var rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // counters initialize karo
    var totalLines = 0;
    var errorCount = 0;
    var warningCount = 0;
    var infoCount = 0;

    // har line pe ye function chalega
    rl.on('line', function(line) {
        totalLines = totalLines + 1;  // line count badhao
        var upperLine = line.toUpperCase();  // line ko uppercase me convert karo
        
        // check karo ERROR hai ya nahi
        if (upperLine.indexOf('ERROR') !== -1) {
            errorCount = errorCount + 1;
        } else {
            // check karo WARNING hai ya nahi
            if (upperLine.indexOf('WARNING') !== -1) {
                warningCount = warningCount + 1;
            } else {
                // check karo INFO hai ya nahi
                if (upperLine.indexOf('INFO') !== -1) {
                    infoCount = infoCount + 1;
                }
            }
        }
    });

    // jab file read complete ho jaye
    rl.on('close', function() {
        // strings define karo report ke liye
        var lineText = 'Total Lines: ';
        var errorText = 'ERROR Count: ';
        var warningText = 'WARNING Count: ';
        var infoText = 'INFO Count: ';
        
        // numbers ko string me convert karo
        var totalLinesString = totalLines.toString();
        var errorCountString = errorCount.toString();
        var warningCountString = warningCount.toString();
        var infoCountString = infoCount.toString();
        
        // percentages calculate karo
        var errorRateNumber = (errorCount / totalLines) * 100;
        var warningRateNumber = (warningCount / totalLines) * 100;
        var infoRateNumber = (infoCount / totalLines) * 100;
        
        // percentages ko 2 decimal places tak format karo
        var errorRateString = errorRateNumber.toFixed(2);
        var warningRateString = warningRateNumber.toFixed(2);
        var infoRateString = infoRateNumber.toFixed(2);
        
        // poora report string banao
        var reportLine = 'Log Analysis Report\n=================\n\n' + lineText + totalLinesString + '\n' + errorText + errorCountString + '\n' + warningText + warningCountString + '\n' + infoText + infoCountString + '\n\nError Rate: ' + errorRateString + '%\nWarning Rate: ' + warningRateString + '%\nInfo Rate: ' + infoRateString + '%';

        // report file me likho
        fs.writeFile(reportFilePath, reportLine, function(err) {
            if (err) {
                // agar error aaye to print karo
                console.error('Error writing report:', err.message);
            } else {
                // successful hua to message print karo
                console.log('Analysis complete. Report saved to:', reportFilePath);
            }
        });
    });

    // agar file read me error aaye
    rl.on('error', function(err) {
        console.error('Error reading log file:', err.message);
    });
}

function main() {
    var arguments = process.argv.slice(2);
    var logFilePath = arguments[0];
    var reportFilePath = null;
    
    if (arguments[1] === undefined || arguments[1] === null || arguments[1] === '') {
        reportFilePath = 'log_report.txt';
    } else {
        reportFilePath = arguments[1];
    }

    if (logFilePath === undefined || logFilePath === null || logFilePath === '') {
        console.error('Usage: node Log_Analyzer.js <log_file_path> [report_file_path]');
        process.exit(1);
    }

    analyzeLogFile(logFilePath, reportFilePath);
}

main();