# Monitor Websites

## Install & Run instructions
      npm install
      npm run start
      
## Time Spent
* I spent less than 3 hours writing the whole code from scratch
      
## Features
* Reads a list of web pages (HTTP URLs) from json file in config folder
* Schedules the uptime checks based on time intervals in configuration which can be modified (please make sure to have cron expression too)
* Verifies the title of the page in this version (Cheerio can also read words from page but I kept it simple for now)
* Measures the time it took for web server to complete the whole request.
* Writes a log file in logs folder


I also had the idea to run this with serverless lambda but did not had the time to experiment with it so chose to go for the simple server way.
I think it would be more reliable to run it in AWS serverless instead of in a server. The monitoring would be better for this application.
