const axios = require("axios").default;
const cheerio = require("cheerio");

axios.interceptors.request.use((x) => {
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

axios.interceptors.response.use(
  (x) => {
    console.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`);
    return x;
  },
  (x) => {
    console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`);
    throw x;
  }
);

async function monitorService(url) {
  const status = await pingWebsite(url);

  if (!status) {
    console.log("website error so skipping next checks");
    return;
  }

  const $ = cheerio.load(status.data);
  const title = $("title").text();

  console.log(title);
}

async function pingWebsite(url) {
  try {
    const response = await axios.get(url);
    const { statusCode, data } = response;

    return { statusCode, data };
  } catch (error) {
    if (error.response) {
      console.error(`Status Code: ${error.response.status}, Error Message: ${error.message}`);
    } else {
      console.error("Error Message:", error.message);
    }
    return null;
  }
}

monitorService("https://www.bing.com");
