const websites = require('./config/websites.json');
const cronExpressions = require('./config/cronExpressions.json');

const scheduleCronJob = require('./services/schedule');

console.log('Starting the application');

for (const website of websites) {
  try {
    scheduleCronJob(website, cronExpressions[website.interval]);
  } catch (e) {
    console.log('Error occured scheduling');
  }
}
