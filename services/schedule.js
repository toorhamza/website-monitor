const cron = require("node-cron");
const logger = require("../utils/logger");
const monitor = require("./monitor")

function scheduleCronJob(website, cronExpression) {
  logger.log(`Scheduled ${website.url} for ${website.interval} with ${cronExpression}`);

  return cron.schedule(
    cronExpression,
    async () => {
      monitor.monitorService(website.url, website.title)
    },
    {
      scheduled: true,
      timezone: "Europe/Helsinki",
    }
  );
}

module.exports = scheduleCronJob;