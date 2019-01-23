const chalk = require("chalk");
const winston = require("winston");

const { combine, timestamp, label, printf } = winston.format;

const logformat = printf(info => {
  let level = chalk.magenta(`[${info.level}]`);
  switch (info.level) {
    case "info":
      level = chalk.green(`[${info.level}]`);
      break;
    case "warn":
      level = chalk.yellow(`[${info.level}]`);
      break;
    case "error":
      level = chalk.red(`[${info.level}]`);
      break;
  }
  return chalk.cyan(`{${info.label}} `) + level + ` \t${info.message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "core" }), timestamp(), logformat),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
