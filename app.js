const websites = require("./config/websites.json");
const cronExpressions = require("./config/cronExpressions.json");

const scheduleCronJob = require("./services/schedule");

for (const website of websites) {
  scheduleCronJob(website, cronExpressions[website.interval]);
}
