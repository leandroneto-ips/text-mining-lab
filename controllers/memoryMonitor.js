const memoryMonitorDB = require('../database/memoryMonitor');

const getDBMemoryUsage = async () => {
    let dbMemoryUsage = await memoryMonitorDB.getDBMemoryUsage();
    // console.log(dbMemoryUsage);
    return dbMemoryUsage[0];
};

module.exports = {
    getDBMemoryUsage
};