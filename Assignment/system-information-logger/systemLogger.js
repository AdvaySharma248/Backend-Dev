// operating system information lena ke liye os module
const os = require("os");
// file system module files me likhne ke liye
const fs = require("fs");

// ye function system ki information log karta hai
function logSystemInfo() {
    // cpu ka model name lelo
    const cpuInfo = os.cpus()[0].model;
    // total memory kitni hai ye lelo
    const totalMemory = os.totalmem();
    // free memory kitni hai ye lelo
    const freeMemory = os.freemem();
    // operating system ka platform lelo
    const platform = os.platform();

    // log data string banana hai
    const logData = `
        Time: ${new Date().toLocaleString()}
        CPU: ${cpuInfo}
        Total Memory: ${totalMemory}
        Free Memory: ${freeMemory}
        Platform: ${platform}
        --------------------------
`;

    // log data ko file me append karo
    fs.appendFile("system-info.log", logData, (err) => {
        // agar error aaye to message print karo
        if (err) {
            console.log("Error writing system info");
        }
    });
}

// har 5 second ke baad function call karo
setInterval(logSystemInfo, 5000);
