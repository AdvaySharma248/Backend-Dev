// operating system information lena ke liye os module
const os = require('os');

// ye function system ki saari information collect karta hai
function getSystemInfo() {
    // object return karo jisme saari system information hogi
    return {
        cpuCount: os.cpus().length,      // cpu cores ka count
        freeMemory: os.freemem(),        // free memory in bytes
        totalMemory: os.totalmem(),      // total memory in bytes
        platform: os.platform(),         // operating system ka naam
        uptime: os.uptime(),             // system ka uptime in seconds
        hostname: os.hostname()          // computer ka naam
    };
}

// function ko export karo taaki dusri files me use kiya ja sake
module.exports = {
    getSystemInfo
};