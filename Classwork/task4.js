const { getSystemInfo } = require('./systemInfo');
const { logData } = require('./logger');

function monitorSystem() {
    const sysInfo = getSystemInfo();
    const dataString = `CPU Count: ${sysInfo.cpuCount}, Free Memory: ${sysInfo.freeMemory}, Total Memory: ${sysInfo.totalMemory}, Platform: ${sysInfo.platform}, Uptime: ${sysInfo.uptime}, Hostname: ${sysInfo.hostname}`;
    
    logData(dataString, 'system-log.txt');
}

console.log('System monitoring started...');
setInterval(monitorSystem, 5000);