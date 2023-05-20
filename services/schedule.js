const cron = require("node-cron");

function scheduleCronJob(website, cronExpression) {
  console.log(`Scheduled ${website.url} for ${website.interval} with ${cronExpression}`);

  return cron.schedule(
    cronExpression,
    () => {
      console.log(`Ran ${website} for ${cronExpression}`);
    },
    {
      scheduled: true,
      timezone: "Europe/Helsinki",
    }
  );
}

module.exports = scheduleCronJob;
