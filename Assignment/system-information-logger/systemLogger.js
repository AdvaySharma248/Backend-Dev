const os = require("os");
const fs = require("fs");

function logSystemInfo() {
    const cpuInfo = os.cpus()[0].model;
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const platform = os.platform();

    const logData = `
        Time: ${new Date().toLocaleString()}
        CPU: ${cpuInfo}
        Total Memory: ${totalMemory}
        Free Memory: ${freeMemory}
        Platform: ${platform}
        --------------------------
`;

    fs.appendFile("system-info.log", logData, (err) => {
        if (err) {
            console.log("Error writing system info");
        }
    });
}

setInterval(logSystemInfo, 5000);
