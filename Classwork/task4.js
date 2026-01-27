// system information wala module import karo
const { getSystemInfo } = require('./systemInfo');
// logger module import karo
const { logData } = require('./logger');

// ye function system ko monitor karta hai
function monitorSystem() {
    // system ki information lelo
    const sysInfo = getSystemInfo();
    // saari information ek string me combine karo
    const dataString = `CPU Count: ${sysInfo.cpuCount}, Free Memory: ${sysInfo.freeMemory}, Total Memory: ${sysInfo.totalMemory}, Platform: ${sysInfo.platform}, Uptime: ${sysInfo.uptime}, Hostname: ${sysInfo.hostname}`;
    
    // information ko log file me likho
    logData(dataString, 'system-log.txt');
}

// start message print karo
console.log('System monitoring started...');
// har 5 second ke baad monitoring function call karo
setInterval(monitorSystem, 5000);