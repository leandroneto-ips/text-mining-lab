
const dbMemoryUsage = require('../controllers/memoryMonitor');

const formatToMBLabel = (number, decimalPoints = 2) => {
  return (number / 1024 /1024).toFixed(decimalPoints) + ' MB';
};

const trackMemory = (intervalSeconds = 5) => {
    setInterval(async () => {
        const mysqlMemoryUsage = await dbMemoryUsage.getDBMemoryUsage();
        const nodeMemoryUsage = process.memoryUsage();
        console.log(`[ Memory Usage ---> | nodeHeapTotal: ${formatToMBLabel(nodeMemoryUsage.heapTotal)} | nodeHeapUsed: ${formatToMBLabel(nodeMemoryUsage.heapUsed)} | nodeRss: ${formatToMBLabel(nodeMemoryUsage.rss)} | mySqlTotal: '${mysqlMemoryUsage.value_in_MB}' | ]`);
    }, intervalSeconds * 1000);
}

module.exports = {
    trackMemory
};


