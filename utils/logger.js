const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const logsFolderPath = path.join(rootDir, "logs");
const currentDate = new Date();
const logFileName = `${currentDate.toISOString().slice(0, 10)}.log`;
const resolvedLogFilePath = path.join(logsFolderPath, logFileName);

function log(message) {
  const formattedMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(resolvedLogFilePath, formattedMessage, (error) => {
    if (error) {
      console.error("Error writing to log file:", error);
    }
  });
}

module.exports = { log };
