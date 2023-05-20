const axios = require("axios").default;
const cheerio = require("cheerio");
const logger = require("../utils/logger");

const loggerInstance = logger();

axios.interceptors.request.use((x) => {
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

axios.interceptors.response.use(
  (x) => {
    loggerInstance.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`);
    return x;
  },
  (x) => {
    loggerInstance.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`);
    throw x;
  }
);

async function monitorService(url, title) {
  console.log("running monitor service")
  const status = await pingWebsite(url);

  if (!status) {
    loggerInstance.log("Website connection error so skipping next checks");
    return;
  }

  const $ = cheerio.load(status.data);
  const webPageTitle = $("title").text();

  if (webPageTitle !== title) loggerInstance.log("Title does not match");
}

async function pingWebsite(url) {
  try {
    const response = await axios.get(url);
    const { statusCode, data } = response;

    return { statusCode, data };
  } catch (error) {
    if (error.response) {
      loggerInstance.log(`Status Code: ${error.response.status}, Error Message: ${error.message}`);
    } else {
      loggerInstance.log("Error Message:", error.message);
    }
    return null;
  }
}

//module.exports = monitorService;
monitorService("https://www.google.com")
