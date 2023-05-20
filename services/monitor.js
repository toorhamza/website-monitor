const axios = require('axios').default;
const cheerio = require('cheerio');
const logger = require('../utils/logger');

axios.interceptors.request.use((x) => {
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

axios.interceptors.response.use(
  (x) => {
    logger.log(
      `Execution time for: ${x.config.url} - ${
        new Date().getTime() - x.config.meta.requestStartedAt
      } ms`
    );
    return x;
  },
  (x) => {
    logger.log(
      `Execution time for: ${x.config.url} - ${
        new Date().getTime() - x.config.meta.requestStartedAt
      } ms`
    );
    throw x;
  }
);

async function monitorService(url, title) {
  logger.log(`Checking ${url} for Title: ${title}`);

  const status = await pingWebsite(url);

  if (!status || !status.statusCode) {
    logger.log(
      `Website connection/dns error with message: ${status.statusMessage}`
    );
    return;
  }

  logger.log(
    `StatusCode: ${status.statusCode}, Message: ${status.statusMessage}`
  );

  if (!status.data) {
    logger.log(
      `Website returned an error status code or did not returned valid HTML data so skipping title checks`
    );
    return;
  }

  const titleCheck = checkTitle(title, status.data);
}

async function pingWebsite(url) {
  try {
    const response = await axios.get(url);
    const statusCode = response.status;
    const statusMessage = response.statusText;
    const data = response.data;

    return { statusCode, statusMessage, data };
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error.response.status,
        statusMessage: error.message,
      };
    } else {
      return { statusMessage: error.message };
    }
  }
}

function checkTitle(title, data) {
  const $ = cheerio.load(data);
  const webPageTitle = $('title').text();

  logger.log(`Title expected: ${title}, Title Received: ${webPageTitle}`);

  if (webPageTitle !== title) {
    logger.log('Error: Title does not match');
    return false;
  } else if (webPageTitle === title) {
    logger.log('Congratulations! Title Matched');
    return true;
  }
}

module.exports = { monitorService };
